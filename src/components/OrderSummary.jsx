import React from 'react'
import useCartStore from '../store/useCartStore'
import { Link, useLocation } from 'react-router-dom';

const OrderSummary = ({handleOrder}) => {
    const location = useLocation();
    const path = location.pathname;

    const buttonText = path === '/cart' ? 'Process to checkout' : 'Place order';
    const to = path === '/cart' ? '/cart/checkout' : '/cart/checkout/order-confirmation';

    const { carts } = useCartStore();
    const subtotal = carts.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
    const shipping = 3000
    const taxRate = 0.05 // 0.05% tax
    const tax = subtotal * taxRate
    const total = subtotal + shipping + tax

    return (
        <div className='flex-grow border border-[#E4E4E4] rounded-lg p-[20px] flex flex-col gap-[24px]'>
            <div className='font-poppins text-xl font-bold text-primary leading-[100%]'>Order summary</div>
            <div className='flex flex-col h-[319px]'>
                <div className='flex flex-col h-full justify-between'>
                    <div className='flex flex-col gap-[20px]'>
                        <div className='flex items-center justify-between font-montserrat text-primary text-base leading-[20px]'>
                            <p>Subtotal</p>
                            <p>{subtotal}</p>
                        </div>
                        <div className='flex items-center justify-between font-montserrat text-primary text-base leading-[20px]'>
                            <p>Shipping</p>
                            <p>{shipping}</p>
                        </div>
                        <div className='flex items-center justify-between font-montserrat text-primary text-base leading-[20px]'>
                            <p>Tax (5%)</p>
                            <p>{tax}</p>
                        </div>
                    </div>
                    <div className='py-[20px] border-t border-[#E4E4E7]'>
                        <div className='flex items-center justify-between font-montserrat text-primary font-semibold text-base leading-[20px]'>
                            <p>Total</p>
                            <p>{total}</p>
                        </div>
                    </div>
                </div>
                <Link to={to}>
                    <button onClick={path !== '/cart' ? handleOrder : null} className='bg-primary px-[16px] w-full h-[54px] rounded-lg active:bg-gray-800 active:scale-95 cursor-pointer transition-all duration-200 focus:outline-none'>
                        <p className='text-[#FAFAFA] font-montserrat font-semibold text-sm leading-[24px]'>{buttonText}</p>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default OrderSummary