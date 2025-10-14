import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useCart from '../hooks/useCart';
import CartCard from '../components/CartCard';
import useCartStore from '../store/useCartStore';
import OrderSummary from '../components/OrderSummary';

const Cart = () => {
    const { user } = useAuth();
    const { carts, add } = useCartStore()
    const [loading, setLoading] = useState(true);

    const { getCarts } = useCart();

    useEffect(() => {
        if (!user?.id) return;
        const fetchCarts = async () => {
            setLoading(true);
            const data = await getCarts(user.id);
            add(data)
            setLoading(false);
        }
        fetchCarts();
    }, [user?.id]);

    return (
        <section className='w-full py-[40px]'>
            <div className='flex flex-col gap-[12px] w-1/2 mb-[40px]'>
                <h1 className='text-[28px] text-primary font-poppins font-bold uppercase'>
                    Your Cart
                </h1>
                <p className='text-base text-justify text-secondary font-montserrat font-normal'>
                    Double-check your favorites and get ready to shine!
                </p>
            </div>

            <div className='flex gap-[40px]'>
                <div className='w-[680px] flex flex-col border border-[#E4E4E4] rounded-lg px-[12px]'>
                    <div className='border-b border-[#E4E7E4] p-[12px] flex items-center justify-between'>
                        <div className='w-[379px]'>
                            <p className='font-poppins text-xs font-semibold leading-[20px] text-secondary uppercase'>
                                product
                            </p>
                        </div>
                        <div className='w-[113px] flex justify-end'>
                            <p className='font-poppins text-xs font-semibold leading-[20px] text-secondary uppercase'>
                                price
                            </p>
                        </div>
                        <div className='w-[140px] flex justify-end'>
                            <p className='font-poppins text-xs font-semibold leading-[20px] text-secondary uppercase'>
                                total
                            </p>
                        </div>
                    </div>
                    <div className='overflow-y-auto max-h-[400px]'>
                        {loading ? (
                            <p className='text-center text-secondary font-montserrat font-normal py-6'>
                                Loading cart...
                            </p>
                        ) : carts.length > 0 ? (
                            carts.map((item) => (
                                <CartCard key={item.id} item={item} />
                            ))
                        ) : (
                            <p className='text-center text-secondary font-montserrat font-normal py-6'>
                                Your cart is empty.
                            </p>
                        )}
                    </div>
                </div>

                {carts.length !== 0 && !loading && <OrderSummary />}
            </div>
        </section>
    )
}

export default Cart