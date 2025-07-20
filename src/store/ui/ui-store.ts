import { create } from 'zustand';

interface State {
  isSideMenuOpen: boolean;
  isLoading: boolean;
  message: string | null

  openSideMenu: () => void;
  closeSideMenu: () => void;
  showLoading: (isLoading: boolean, message?: string | null) => void
}

export const useUiStore = create<State>()((set) => ({
  isSideMenuOpen: false,
  isLoading: false,
  message: null,

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
  showLoading: (isLoading, message = null) => set({ isLoading, message })
}));
