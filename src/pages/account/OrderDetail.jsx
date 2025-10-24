import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import supabase from '../../supabase/supabaseClient'
import { toast } from 'sonner'
import useOrder from '../../hooks/useOrder'

const OrderDetail = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(false)
    const { getOrderDetail } = useOrder()

    useEffect(() => {
        if (!id) return
        setLoading(true)
        const fetchOrderItem = async () => {
            const data = await getOrderDetail(id)
            setOrder(data)
            setLoading(false)
        }
        fetchOrderItem()
    }, [id])

    if (loading) return <div className='w-full py-[40px] font-montserrat text-secondary flex justify-center'>Loading...</div>
    if (!order) return <div className='w-full py-[40px] flex justify-center'><p className='text-secondary'>Order not found</p></div>

    return (

        <div className='w-full max-w-[543px] flex flex-col gap-8 sm:gap-[32px] border border-[#E4E4E4] rounded-xl p-4 sm:p-[20px] mx-0 sm:ml-[20px]'>
            {/* Header with order number */}
            <div className='flex flex-col gap-[12px]'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-poppins font-bold text-2xl text-primary leading-[100%] uppercase'>Order Detail</h1>
                    <div className='bg-primary px-[12px] py-[8px] rounded-lg'>
                        <p className='font-montserrat font-semibold text-sm text-[#FAFAFA] leading-[20px]'>{order.order_number}</p>
                    </div>
                </div>

                <p className='font-montserrat text-sm text-secondary leading-[100%]'>
                    Order placed on: {new Date(order.created_at).toLocaleString()}
                </p>
            </div>

            <div className='flex flex-col gap-[20px]'>
                {/* Order items */}
                <div className='flex flex-col gap-[20px] max-h-[280px] overflow-y-auto'>
                    {(order.items || []).map((item) => (
                        <div key={item.id} className='flex gap-[16px] pb-[20px] border-b border-[#E4E4E7] last:border-b-0'>
                            <div className='w-[96px] h-[96px] bg-[#F4F4F5] rounded-lg flex items-center justify-center overflow-hidden'>
                                <img
                                    src={item.product?.image_url || '/placeholder.svg'}
                                    alt={item.product?.name}
                                    className='w-full h-full object-cover'
                                />
                            </div>

                            <div className='flex-grow flex flex-col justify-between'>
                                <div className='flex items-start justify-between'>
                                    <h3 className='font-poppins font-semibold text-lg text-primary leading-[150%]'>{item.product?.name}</h3>
                                    <p className='font-montserrat font-semibold text-base text-primary'>
                                        {((item.unit_price || item.product?.price || 0) * (item.quantity || 1)).toLocaleString()} MMK
                                    </p>
                                </div>

                                <div className='flex flex-col gap-[8px]'>
                                    <div className='flex items-center gap-[12px]'>
                                        <p className='font-montserrat text-sm text-secondary'>
                                            Size: <span className='text-primary'>{item.size}</span>
                                        </p>
                                        <p className='font-montserrat text-sm text-secondary flex items-center gap-[6px]'>
                                            Color: Default
                                        </p>
                                    </div>
                                    <p className='font-montserrat text-sm text-secondary'>
                                        Qty: <span className='text-primary'>{item.quantity}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex flex-col gap-[16px] pt-[12px] border-t border-[#E4E4E7]'>
                    <div className='flex items-center justify-between'>
                        <p className='font-montserrat text-base text-primary'>Subtotal</p>
                        <p className='font-montserrat text-base text-primary'>{(order.subtotal || 0).toLocaleString()} MMK</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='font-montserrat text-base text-primary'>Shipping</p>
                        <p className='font-montserrat text-base text-primary'>{(order.shipping || 0).toLocaleString()} MMK</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='font-montserrat text-base text-primary'>Tax</p>
                        <p className='font-montserrat text-base text-primary'>{(order.tax || 0).toLocaleString()} MMK</p>
                    </div>
                </div>

                <div className='flex items-center justify-between pt-[20px] border-t border-[#E4E4E7]'>
                    <p className='font-montserrat font-semibold text-lg text-primary'>Total</p>
                    <p className='font-montserrat font-semibold text-lg text-primary'>{(order.total || 0).toLocaleString()} MMK</p>
                </div>
            </div>

            <Link className='self-center' to='/my-account/orders'>
                <button className=' px-[24px] h-[54px] cursor-pointer border border-[#E4E4E7] rounded-lg font-montserrat font-semibold text-sm leading-[24px] text-primary hover:bg-[#F4F4F5] active:scale-95 transition-all duration-200'>
                    Back to orders
                </button>
            </Link>
        </div>
    )
}

export default OrderDetail
