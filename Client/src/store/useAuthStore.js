import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import axios from "axios";
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:5001";

//! Remember Zustand set value to state just like we use useState hook in react
export const useAuthStore = create((set, get) => ({
  // initial states
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  socket: null,

  // actions
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      // console.log("CheckAuth response: ", res);
      set({ authUser: res.data }); // this set user object to authUser

      get().connectSocket();
    } catch (error) {
      console.error("Error in checkAuth:", error.response?.data?.message || error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      // const res = await axiosInstance.post("/auth/signup", data); //* this will send data to server to create user and //* this will return a user object set from middleware
      console.log("data sent to server", data);

      const res = await axios.post("http://localhost:5001/api/auth/signup", data);
      console.log("res", res);

      set({ authUser: res.data });
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(`Error creating account: ${error.response?.data?.message || error.message}`);
      console.error("Error in signup:", error.response?.data?.message || error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged In Successfully");
    } catch (error) {
      toast.error(`Error logging in: ${error.response?.data?.message || error.message}`);
      console.error("Error in login:", error.response?.data?.message || error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      //console.log("FormData being sent to backend:", Object.fromEntries(data.entries()));

      const res = await axiosInstance.put("/auth/update-profile", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      set({ authUser: res.data });
      window.location.reload();
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(`Error updating profile: ${error.response?.data?.message || error.message}`);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(SERVER_URL, {
      query: {
        userId: authUser._id
      }
    });
    socket.connect();
    set({ socket: socket });
    socket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    })
  },
  disconnectSocket: () => {
    if (get().socket.connected) get().socket.disconnect();
  }
}));
