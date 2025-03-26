import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

import crypto from "crypto-js";

const generate_iv = () => {
  return crypto.lib.WordArray.random(16);
};

const generate_key = () => {
  return crypto.PBKDF2("vishal", crypto.lib.WordArray.random(16), {
    keySize: 256 / 32, // AES-256 requires a 32-byte key
    iterations: 1000
  });
};

const key = generate_key();

const encrypt_message = (text) => {
  const iv = generate_iv();
  try {
    const cipher = crypto.AES.encrypt(text, key, {
      iv: iv,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7
    });

    //* return the iv and cipher text in base64 format
    return iv.toString(crypto.enc.Base64) + ":" + cipher.toString();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const decrypt_message = (cipherText) => {
  try {
    const [ivBase64, encryptedText] = cipherText.split(":");
    //* convert the iv from base64 to WordArray
    const iv = crypto.enc.Base64.parse(ivBase64);

    const decrypted = crypto.AES.decrypt(encryptedText, key, {
      iv: iv,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7
    });

    const decryptedText = decrypted.toString(crypto.enc.Utf8);

    return decryptedText;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");

      //* res.data contain : [ {}, {}, {} ]
      //* where each object have: _id, fullname, email, password, createdAt and updatedAt
      //* elcluding the data of sender

      set({ users: res.data });
    } catch (error) {
      toast.error(`Error fetching users: ${error.response?.data?.message || error.message}`);
    } finally {
      set({ isUserLoading: false });
    }
  },

  //* decrypting when we retrive data from backend
  getMessages: async (userId) => {
    set({ isUserLoading: true });
    try {
      //todo: dcrypt here
      const res = await axiosInstance.get(`/messages/${userId}`);

      // res.data contain : { senderId, reserverId, text, img }

      //* decrypting
      const decrypteMessage = res.data.map((msg) => ({
        ...msg,
        text: decrypt_message(msg.text)
      }));

      set({ messages: decrypteMessage });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      // todo: encrypt here
      const encryptedText = encrypt_message(messageData.text)

      messageData.text = encryptedText;

      console.log("encrypted message from sendMessage action :", encryptedText);
      

      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      console.log("response from backend: ", res.data);
      

      set({ message: [...messages, res.data] });
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error(`Error sending message: ${error.response?.data?.message || error.message}`);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket; 
    // console.log("socket from useChatStore : ", socket);

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return; // to prevent form all user send message
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (userSelectedFromSidebar) => {
    set({ selectedUser: userSelectedFromSidebar });
  }
}));
