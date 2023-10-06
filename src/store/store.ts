import { create } from "zustand";

type AppState = {
  cartItemsCount: number;
  setCartItemsCount : (count:number) => void;
  increment: () => void;
  decrement: () => void;
};

const useStore = create<AppState>((set) => ({
  cartItemsCount: 0,
  setCartItemsCount: (count) => set(() => ({ cartItemsCount: count})),
  increment: () => set((state) => ({ cartItemsCount: state.cartItemsCount + 1 })),
  decrement: () => set((state) => ({ cartItemsCount: state.cartItemsCount - 1 })),
}));

export default useStore;
