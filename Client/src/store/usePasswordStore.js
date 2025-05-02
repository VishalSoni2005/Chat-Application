import { create } from "zustand";

export const usePasswordStore = create((set) => ({
  email: "",
  providedEmail: (email) => set({ email: email }),
}));