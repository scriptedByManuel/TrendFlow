import { Minus, Plus } from 'lucide-react'
import React from 'react'
import useCartStore from '../store/useCartStore'
import useCart from '../hooks/useCart'

const CartCard = ({ item }) => {

    const { removeCart, increase, decrease } = useCartStore();
    const { deleteCart, updateCart } = useCart()

    const handleRemove = async () => {
        await deleteCart(item.id)
        removeCart(item.id)
    }

    const handleIncrease = async () => {
        await updateCart(item.id, { quantity: item.quantity + 1 })
        increase(item.id)
    }

    const handleDecrease = async () => {
        await updateCart(item.id, { quantity: item.quantity - 1 })
        decrease(item.id)
    }

    return (
        <div className='py-3 last:border-0 border-b border-[#E4E4E7] flex flex-col sm:flex-row'>
            <div className='p-3 w-full sm:w-[402px] flex items-center gap-4 sm:gap-[32px]'>
                <div className='w-[120px] h-[136px] bg-[#E6E6E6] rounded-lg overflow-hidden flex-shrink-0'>
                    <img className='w-full h-full object-cover' src={item.product.image_url} alt={item.product.name} />
                </div>
                <div className='flex flex-col justify-between h-[136px]'>
                    <div className='flex flex-col gap-[12px]'>
                        <div className='flex flex-col gap-[12px]'>
                            <h1 className='font-poppins text-base text-primary font-semibold leading-[100%]'>{item.product.name}</h1>

                        </div>
                        <div className='flex flex-col gap-[20px]'>
                            <div className='flex items-center gap-[12px]'>
                                <div className='flex gap-[8px] font-montserrat text-sm text-secondary leading-[100%]'>
                                    <p>Size:</p>
                                    <p>{item.size}</p>
                                </div>
                                <div className='flex items-center gap-[8px] font-montserrat text-sm text-secondary leading-[100%]'>
                                    <p>Color:</p>
                                    <p className='py-[4px] px-[8px] bg-[#D9D9D9] border border-[#A1A1AA] rounded-sm'>Default</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-[16px]'>
                                <button className='cursor-pointer' disabled={item.quantity === 1} onClick={handleDecrease}>
                                    <Minus className={item.quantity === 1 ? 'text-[#D4D4D8]' : 'text-[#27272A]'} strokeWidth={1.5} size={16} />
                                </button>
                                <p className='font-montserrat text-sm text-primary leading-[100%]'>{item.quantity}</p>
                                <button className='cursor-pointer' onClick={handleIncrease}>
                                    <Plus className='text-[#27272A]' strokeWidth={1.5} size={16} />
                                </button>
                            </div>
                        </div>

                    </div>
                    <div onClick={handleRemove} className='cursor-pointer font-montserrat text-xs text-secondary leading-[100%] underline'>
                        <p>Remove</p>
                    </div>
                </div>
            </div>


            < div className="w-full sm:w-[114px] flex flex-col items-center gap-1 py-3" >
                <p
                    className={`text-sm font-montserrat font-semibold leading-[20px] ${item.product.discount_price ? 'line-through text-secondary' : 'text-primary'
                        }`}
                >
                    {item.product.price} MMK
                </p>

                {/* Show discounted price if available */}
                {
                    item.product.discount_price && (
                        <p className="font-montserrat text-sm text-primary font-semibold leading-[100%]">
                            {item.product.discount_price} MMK
                        </p>
                    )
                }
            </div >
            <div className='w-full sm:w-[140px] flex justify-end py-3 pr-3'>
                <p className='font-montserrat text-primary font-semibold text-sm leading-[20px]'>{item.unit_price * item.quantity} MMK</p>
            </div>
        </div>
    )
}

export default CartCard

