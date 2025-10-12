import { Handbag } from 'lucide-react'
import React from 'react'
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import useWishList from '../hooks/useWishList';

const WishListCard = ({ item }) => {

    const { user } = useAuth();
    const { addToCart } = useCart();
    const { removeFromWishList } = useWishList();

    const handleAddToCart = async (e) => {
        const cart = {
            created_at: new Date(),
            user_id: user.id,
            product: item.product,
            size: 'S',
            quantity: 1,
            unit_price: item.product.discount_price ? item.product.discount_price : item.product.price
        };

        await addToCart(cart)
    }

    const handleRemoveWishList = async () => {
        await removeFromWishList(item.id)
    }
    
    return (
        <div className='py-[12px] last:border-0 border-b border-[#E4E4E7] flex items-center justify-between'>
            <div className='p-[12px] flex items-center gap-[32px]'>
                <div className='w-[120px] h-[136px] bg-[#E6E6E6] rounded-lg overflow-hidden'>
                    <img className='w-full h-full object-cover' src={item.product.image_url} alt={item.product.name} />
                </div>
                <div className='flex flex-col justify-between h-[136px]'>
                    <div className='flex flex-col gap-[12px]'>
                        <div className='flex flex-col gap-[12px]'>
                            <h1 className='font-poppins text-base text-primary font-semibold leading-[100%]'>{item.product.name}</h1>
                            <div className="flex items-center gap-[12px]">
                                <p
                                    className={`text-sm font-montserrat leading-[100%] ${item.product.discount_price ? 'line-through text-[#A1A1AA]' : 'text-primary'
                                        }`}
                                >
                                    {item.product.price} MMK
                                </p>

                                {/* Show discounted price if available */}
                                {item.product.discount_price && (
                                    <p className="font-montserrat text-sm text-primary font-semibold leading-[100%]">
                                        {item.product.discount_price} MMK
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='flex items-center gap-[20px]'>
                            <div className='flex gap-[8px] font-montserrat text-sm text-secondary leading-[100%]'>
                                <p>Size:</p>
                                <p>S</p>
                            </div>
                            <div className='flex items-center gap-[8px] font-montserrat text-sm text-secondary leading-[100%]'>
                                <p>Color:</p>
                                <p className='py-[4px] px-[8px] bg-[#D9D9D9] border border-[#A1A1AA] rounded-sm'>Default</p>
                            </div>
                        </div>
                    </div>
                    <div onClick={handleRemoveWishList} className='cursor-pointer font-montserrat text-xs text-secondary leading-[100%] underline'>
                        <p>Remove</p>
                    </div>
                </div>
            </div>
            <div className='p-[12px] flex items-center justify-center'>
                <button onClick={handleAddToCart} className="cursor-pointer px-[20px] bg-primary flex items-center justify-center gap-[8px] text-[#FAFAFA] py-2 rounded-lg active:bg-gray-800 active:scale-95 transition-all duration-200">
                    <Handbag size={20} />
                    <p className="font-montserrat font-medium text-xs leading-[24px]">
                        Add to cart
                    </p>
                </button>
        </div>
        </div>
    )
}

export default WishListCard