import React, { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import useWishList from '../hooks/useWishList'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'


const WishlistIcon = () => {
    const { user } = useAuth()
    const { getWishListCount, subscribeToWishListChanges, unsubscribeFromWishListChanges } = useWishList()
    const [wishCount, setWishCount] = useState(0)

    useEffect(() => {
        if (!user?.id) return;

        // Initial fetch
        const fetchCount = async () => {
            try {
                const count = await getWishListCount(user.id);
                setWishCount(count);
            } catch (err) {
                console.error('Failed to fetch wishlist count', err);
            }
        };

        fetchCount();

        // Subscribe to realtime changes
        const unsubscribeRealtime = subscribeToWishListChanges(user.id, (change) => {
            fetchCount();
        });

        // Listen for local fallback events (dispatched after add/remove)
        const onLocalChange = (e) => {
            // only react to events for this user
            try {
                if (e?.detail?.userId && e.detail.userId !== user.id) return
            } catch (err) {
                // ignore
            }
            fetchCount()
        }
        window.addEventListener('wishlist:changed', onLocalChange)

        return () => {
            // unsubscribeRealtime may be a function (cleanup) or a channel object
            if (unsubscribeRealtime) {
                try {
                    if (typeof unsubscribeRealtime === 'function') unsubscribeRealtime()
                    else unsubscribeFromWishListChanges(unsubscribeRealtime)
                } catch (e) {
                    console.warn('Error unsubscribing realtime wishlist', e)
                }
            }
            window.removeEventListener('wishlist:changed', onLocalChange)
        };
    }, [user?.id]);


    return (
        <Link to={'/wishlist'} className="relative cursor-pointer">
            {wishCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {wishCount}
                </div>
            )}

            <Heart size={20} />
        </Link>
    )
}

export default WishlistIcon
