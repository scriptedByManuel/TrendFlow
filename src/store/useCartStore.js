import { create } from "zustand";

const useCartStore = create((set, get) => ({
    carts: [],

    // Add item to cart
    add: (item) =>
        set((state) => {
            // support passing an array of items or a single item
            const incoming = Array.isArray(item) ? item : [item]
            const merged = [...state.carts, ...incoming]
            const map = new Map()
            for (const it of merged) {
                if (!it || it.id == null) continue
                // keep the last occurrence (incoming overrides earlier)
                map.set(it.id, it)
            }
            return { carts: Array.from(map.values()) }
        }),

    // Remove item from cart
    removeCart: (removeId) =>
        set((state) => ({
            carts: state.carts.filter((cart) => cart.id !== removeId),
        })),

    // Increase quantity
    increase: (id) =>
        set((state) => ({
            carts: state.carts.map((cart) =>
                cart.id === id ? { ...cart, quantity: cart.quantity + 1 } : cart
            ),
        })),

    // Decrease quantity (never below 1)
    decrease: (id) =>
        set((state) => ({
            carts: state.carts.map((cart) =>
                cart.id === id
                    ? { ...cart, quantity: Math.max(1, cart.quantity - 1) }
                    : cart
            ),
        })),
    
    clearAllCarts: () => set({ carts: [] }),

}));

export default useCartStore;
