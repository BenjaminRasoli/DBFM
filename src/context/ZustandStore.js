import { create } from "zustand";

export const useToggle = create((set) => ({
  toggle: false,
  setToggle: () => set((state) => ({ toggle: !state.toggle })),
}));
