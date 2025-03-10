import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  // initial states
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  // actions
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check"); //* this will give a containing user object set from middleware

      set({ authUser: res.data }); // this set user object to authUser
    } catch (error) {
      set({ authUser: null });
      console.error("Error in checkAuth ", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data); //* this will send data to server to create user and return containing user object set from middleware
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in signup ", error);
    } finally {
      set({ isSigningUp: false });
    }
  }
}));
