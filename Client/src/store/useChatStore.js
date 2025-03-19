import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

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
  getMessages: async (userId) => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);

      //* res.data contain : { senderId, reserverId, text, img }

      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);

      set({ message: [...messages, res.data] });
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error(`Error sending message: ${error.response?.data?.message || error.message}`);
    }
  },
  //todo: fix it
  setSelectedUser: (selectedUser) => {
    console.log(selectedUser);
    set({ selectedUser });
  }
}));
