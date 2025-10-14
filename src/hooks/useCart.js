import React from 'react'
import supabase from '../supabase/supabaseClient'
import { toast } from 'sonner'

const useCart = () => {

    // Delete all carts after place order
    const deleteAllCarts = async (userId) => {
        try {
            const { data, error } = await supabase.from('carts').delete().eq('user_id', userId)
            if (error) throw error
            setTimeout(() => {
                toast.success('Clear all carts!')
            }, 1500);
            // dispatch local event so UI can update immediately
            try {
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('cart:changed', { detail: { userId, action: 'clear' } }))
                }
            } catch (e) {
                console.warn('Could not dispatch cart changed event', e)
            }
            return data
        } catch (error) {
            toast.error('Failed to clear all carts')
        }
    }

    // Get all carts for a specific user
    const getCarts = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('carts')
                .select('*')
                .eq('user_id', userId)
            if (error) throw error
            return data || []
        } catch (error) {
            toast.error(error.message || 'Failed to fetch cart')
        }
    }

    // Add to Cart (prevents duplicates)
    const addToCart = async (cart) => {
        try {
            // check if item already exists in cart
            const { data: existing, error: checkError } = await supabase
                .from('carts')
                .select('*')
                .eq('user_id', cart.user_id)
                .eq('size', cart.size)
                .contains('product', { id: cart.product.id })
                .single()

            if (checkError && checkError.code !== 'PGRST116') throw checkError // ignore "no rows" error

            if (existing) {
                toast.warning('This product is already in your cart.')
                return existing
            }

            // if not exist, insert new cart item
            const { data, error } = await supabase
                .from('carts')
                .insert([cart])
                .select()
            if (error) throw error

            toast.success('Added to your cart successfully!')
            try {
                const inserted = Array.isArray(data) ? data[0] : data
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('cart:changed', { detail: { userId: inserted?.user_id, action: 'insert', item: inserted } }))
                }
            } catch (e) {
                console.warn('Could not dispatch cart changed event', e)
            }
            return data
        } catch (error) {
            toast.error(error.message || 'Failed to add to cart')
        }
    }

    // Update a cart item
    const updateCart = async (cartId, updateData) => {
        try {
            const { data, error } = await supabase
                .from('carts')
                .update(updateData)
                .eq('id', cartId)
            if (error) throw error
            toast.success('Cart updated successfully!')
            return data
        } catch (error) {
            toast.error(error.message || 'Failed to update cart')
        }
    }

    // Delete a cart item
    const deleteCart = async (cartId) => {
        try {
            const { data, error } = await supabase
                .from('carts')
                .delete()
                .eq('id', cartId)
            if (error) throw error
            toast.success('Cart deleted successfully!')
            try {
                const deleted = Array.isArray(data) ? data[0] : data
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('cart:changed', { detail: { userId: deleted?.user_id, action: 'delete', item: deleted } }))
                }
            } catch (e) {
                console.warn('Could not dispatch cart changed event', e)
            }
            return data
        } catch (error) {
            toast.error(error.message || 'Failed to delete cart')
        }
    }

    // Get Cart Count for specific user
    const getCartCount = async (userId) => {
        try {
            const { count, error } = await supabase
                .from('carts')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId)
            if (error) throw error
            return count || 0
        } catch (error) {
            console.error(error)
            return 0
        }
    }

    // Realtime Subscription
    const subscribeToCartChanges = (userId, callback) => {
        if (!userId) return

        const channel = supabase
            .channel(`cart-changes-${userId}`)
            .on(
                'postgres_changes',
                {
                    event: '*', // listen to INSERT, UPDATE, DELETE
                    schema: 'public',
                    table: 'carts',
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    callback(payload)
                }
            )
            .subscribe()

        return channel
    }

    // Unsubscribe helper
    const unsubscribeFromCartChanges = (channel) => {
        if (channel) {
            supabase.removeChannel(channel)
        }
    }

    return { deleteAllCarts, addToCart, getCarts, updateCart, deleteCart, getCartCount, subscribeToCartChanges, unsubscribeFromCartChanges }
}

export default useCart
