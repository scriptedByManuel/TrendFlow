import React, { useEffect, useState } from 'react'
import useCart from '../hooks/useCart'
import useAuth from '../hooks/useAuth'
import { Handbag } from 'lucide-react'
import { Link } from 'react-router-dom'

const CartIcon = () => {
    const { user } = useAuth()
    const [cartCounts, setCartCounts] = useState(0)
    const { getCartCount, subscribeToCartChanges, unsubscribeFromCartChanges } = useCart()


    useEffect(() => {
        if (!user?.id) return

        let channel

        const fetchCount = async () => {
            const count = await getCartCount(user.id)
            setCartCounts(count)
        }

        fetchCount()

        // Subscribe to realtime changes
        channel = subscribeToCartChanges(user.id, async () => {
            await fetchCount() // refresh count on any change
        })

        // cleanup
        return () => {
            unsubscribeFromCartChanges(channel)
        }
    }, [user?.id])
    return (
        <Link to={'/cart'} className='cursor-pointer relative'>
            {cartCounts > 0 && (
                <div className='absolute -top-2 -right-2 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'>{cartCounts}</div>
            )}
            <Handbag size={20} />
        </Link>
    )
}

export default CartIcon