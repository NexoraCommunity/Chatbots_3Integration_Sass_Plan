import { create } from "zustand";

interface SidebarState {
  isShrunk: boolean;
  toggleShrunk: () => void;
  setShrunk: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isShrunk: false,
  toggleShrunk: () => set((state) => ({ isShrunk: !state.isShrunk })),
  setShrunk: (value: boolean) => set({ isShrunk: value }),
}));
