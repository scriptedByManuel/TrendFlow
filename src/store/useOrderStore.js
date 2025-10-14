import React from 'react'
import { create } from 'zustand'

const useOrderStore = create((set, get) => ({
    order: null,
    addOrder: (data) => set({ order: data }),
    clearOrder: () => set({order: null})
})
)

export default useOrderStore