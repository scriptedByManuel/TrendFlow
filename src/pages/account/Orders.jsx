import React, { useEffect, useState } from 'react'
import useOrder from '../../hooks/useOrder'
import useAuth from '../../hooks/useAuth'

const Orders = () => {
  const { user } = useAuth()
  const { getOrderItem } = useOrder()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!user?.id) return
    const fetchOrders = async () => {
      const data = await getOrderItem(user.id)
      setOrders(data || [])
    }
    fetchOrders()
  }, [user?.id])

  return (
    <div className="w-full border border-[#E4E4E4] flex flex-col gap-5 rounded-lg py-[32px] px-[20px]">
      <div className="pb-[12px] border-b border-[#E4E4E7]">
        <p className="font-montserrat font-semibold text-primary text-sm leading-[16px]">
          Order History
        </p>
      </div>

      {/* No Orders */}
      {!orders.length && (
        <div className="flex flex-col items-center justify-center mt-[12px]">
          <p className="text-secondary font-montserrat text-sm text-center">
            No Orders Yet
          </p>
        </div>
      )}

      {/* Orders List */}
      {orders.length > 0 && (
        <div className="flex flex-col gap-4 mt-[12px] max-h-[260px] overflow-y-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-[#E4E4E4] rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-all"
            >
              <div>
                <p className="font-montserrat text-sm text-primary font-semibold">
                  {order.order_number}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <p className="font-montserrat text-sm text-primary font-medium">
                {order.total?.toLocaleString()} MMK
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
