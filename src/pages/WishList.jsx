import React, { useEffect, useState } from 'react'
import useWishList from '../hooks/useWishList'
import useAuth from '../hooks/useAuth'
import WishListCard from '../components/WishListCard'

const WishList = () => {
    const { user } = useAuth()
    const { getWishList, subscribeToWishListChanges } = useWishList()
    const [wishListItems, setWishListItems] = useState([])

    // Fetch wishlist when user logs in
    useEffect(() => {
        if (!user?.id) return
        const fetchWishlist = async () => {
            const items = await getWishList(user.id)
            setWishListItems(items)
        }
        fetchWishlist()
    }, [user?.id])

    // Subscribe to realtime wishlist changes
    useEffect(() => {
        if (!user?.id) return

        const cleanup = subscribeToWishListChanges(user.id, async () => {
            const updated = await getWishList(user.id)
            setWishListItems(updated)
        })

        // Properly cleanup (since subscribeToWishListChanges returns a cleanup function)
        return cleanup
    }, [user?.id])

    return (
        <section className="w-full py-[40px]">
            <div className="flex flex-col gap-[12px] w-1/2 mb-[40px]">
                <h1 className="text-[28px] text-primary font-poppins font-bold uppercase">
                    Your Wishlist
                </h1>
                <p className="text-base text-justify text-secondary font-montserrat font-normal">
                    Your saved favorites are here, waiting for their moment.
                </p>
            </div>

            <div className="w-[680px] flex flex-col border border-[#E4E4E4] rounded-lg px-[12px]">
                <div className="border-b border-[#E4E4E7] p-[12px]">
                    <p className="font-poppins text-xs font-semibold leading-[20px] text-secondary uppercase">
                        product
                    </p>
                </div>

                <div className="overflow-y-auto max-h-[400px]">
                    {wishListItems.length > 0 ? (
                        wishListItems.map((item) => (
                            <WishListCard key={item.id} item={item} onRemove={(id) =>
                                setWishListItems((prev) => prev.filter((i) => i.id !== id))
                            } />
                        ))
                    ) : (
                        <p className="text-secondary font-montserrat text-sm text-center py-6">
                            Your wishlist is empty.
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default WishList
