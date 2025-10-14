import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Handbag } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import useCart from '../hooks/useCart'

/**
 * CartIcon Component
 * ------------------
 * Displays a shopping bag icon with a live count of items in the user's cart.
 * 
 * Features:
 * - Realtime updates using Supabase's subscription.
 * - Local fallback updates using a `cart:changed` custom event.
 * - Automatically fetches count when user logs in or when cart changes.
 */
const CartIcon = () => {
  const { user } = useAuth()
  const { getCartCount, subscribeToCartChanges, unsubscribeFromCartChanges } = useCart()

  const [cartCounts, setCartCounts] = useState(0)

  useEffect(() => {
    if (!user?.id) return

    let channel

    /** Fetch cart count from Supabase */
    const fetchCount = async () => {
      const count = await getCartCount(user.id)
      setCartCounts(count)
    }

    // Initial fetch
    fetchCount()

    // Subscribe to realtime Supabase cart changes
    channel = subscribeToCartChanges(user.id, async () => {
      await fetchCount() // refresh count on any change
    })

    // Fallback listener for local cart updates
    const onLocal = (e) => {
      try {
        if (e?.detail?.userId && e.detail.userId !== user.id) return
      } catch (_) {}
      fetchCount()
    }

    window.addEventListener('cart:changed', onLocal)

    // Cleanup on unmount
    return () => {
      unsubscribeFromCartChanges(channel)
      window.removeEventListener('cart:changed', onLocal)
    }
  }, [user?.id])

  return (
    <Link to="/cart" className="cursor-pointer relative">
      {/* Badge showing total cart items */}
      {cartCounts > 0 && (
        <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          {cartCounts}
        </div>
      )}

      {/* Cart Icon */}
      <Handbag size={20} />
    </Link>
  )
}

export default CartIcon
