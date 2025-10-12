import React from 'react'
import { toast } from 'sonner'
import supabase from '../supabase/supabaseClient'

const useWishList = () => {

    // Get wishlist for specific user
    const getWishList = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('wishlists')
                .select('*')
                .eq('user_id', userId)
            if (error) throw error
            return data || []
        } catch (error) {
            toast.error('Failed to fetch wishlist.')
            throw error
        }
    }

    // Add item to wishlist (no duplicates)
    const addToWishList = async (wishListItem) => {
        try {
            // Check if the product already exists for that user
            const { data: existing, error: checkError } = await supabase
                .from('wishlists')
                .select('*')
                .eq('user_id', wishListItem.user_id)
                .contains('product', { id: wishListItem.product.id })
                .maybeSingle()

            if (checkError && checkError.code !== 'PGRST116') throw checkError
            if (existing) {
                toast.warning('This product is already in your wishlist.')
                return existing
            }

            const { data, error } = await supabase
                .from('wishlists')
                .insert([wishListItem])
                .select()
            if (error) throw error
            toast.success('Added to your wishlist successfully!')
            // notify UI listeners that wishlist changed (fallback if realtime is delayed/missing)
            try {
                const inserted = Array.isArray(data) ? data[0] : data
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('wishlist:changed', { detail: { userId: inserted?.user_id, action: 'insert', item: inserted } }))
                }
            } catch (e) {
                console.warn('Could not dispatch wishlist change event', e)
            }
            return data
        } catch (error) {
            toast.error('Failed to add to wishlist.')
            throw error
        }
    }

    // Remove item from wishlist
    const removeFromWishList = async (wishListItemId) => {
        try {
            const { data, error } = await supabase
                .from('wishlists')
                .delete()
                .eq('id', wishListItemId)
                .select()
            if (error) throw error
            toast.success('Removed from your wishlist successfully!')
            // notify UI listeners that wishlist changed (fallback if realtime is delayed/missing)
            try {
                const deleted = Array.isArray(data) ? data[0] : data
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('wishlist:changed', { detail: { userId: deleted?.user_id, action: 'delete', item: deleted } }))
                }
            } catch (e) {
                console.warn('Could not dispatch wishlist change event', e)
            }
            return data
        } catch (error) {
            toast.error('Failed to remove from wishlist.')
            throw error
        }
    }

    // Get count of wishlist items for a specific user
    const getWishListCount = async (userId) => {
        try {
            const { count, error } = await supabase
                .from('wishlists')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId)
            if (error) throw error
            return count || 0
        } catch (error) {
            console.error(error)
            return 0
        }
    }

    // Subscribe to realtime wishlist changes for a specific user
    // Returns a cleanup function that unsubscribes the realtime listener.
    const subscribeToWishListChanges = (userId, callback) => {
        if (!userId) return () => { }

        const channel = supabase
            .channel(`wishlist-changes-${userId}`)
            .on(
                'postgres_changes',
                {
                    event: '*', // INSERT, UPDATE, DELETE
                    schema: 'public',
                    table: 'wishlists',
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    // forward payload to caller
                    try {
                        callback(payload)
                    } catch (e) {
                        console.error('wishlist change callback error', e)
                    }
                }
            )
            .subscribe()

        // return an unsubscribe function for easy cleanup in components
        return () => {
            try {
                // preferred API to remove a channel
                supabase.removeChannel(channel)
            } catch (err) {
                // fallback if removeChannel isn't available; try channel.unsubscribe()
                if (channel && typeof channel.unsubscribe === 'function') {
                    try {
                        channel.unsubscribe()
                    } catch (e) {
                        console.warn('Failed to unsubscribe channel', e)
                    }
                }
            }
        }
    }

    // Unsubscribe from wishlist changes
    // Accepts either the channel object or the cleanup function returned by subscribeToWishListChanges
    const unsubscribeFromWishListChanges = (maybeCleanup) => {
        if (!maybeCleanup) return
        if (typeof maybeCleanup === 'function') {
            try {
                maybeCleanup()
            } catch (err) {
                console.error('Error running wishlist cleanup function', err)
            }
            return
        }

        try {
            supabase.removeChannel(maybeCleanup)
        } catch (err) {
            if (maybeCleanup && typeof maybeCleanup.unsubscribe === 'function') {
                try {
                    maybeCleanup.unsubscribe()
                } catch (e) {
                    console.warn('Failed to unsubscribe channel', e)
                }
            }
        }
    }

    return {
        getWishList,
        addToWishList,
        removeFromWishList,
        getWishListCount,
        subscribeToWishListChanges,
        unsubscribeFromWishListChanges,
    }
}

export default useWishList
