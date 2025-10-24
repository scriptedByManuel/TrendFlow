import { Link } from "react-router-dom"
import useOrderStore from "../store/useOrderStore"

const OrderConfirmation = () => {
  const { order } = useOrderStore()

  if (!order) {
    return (
      <div className="w-full py-[40px] flex justify-center">
        <p className="text-secondary font-montserrat">No order found</p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-6 sm:py-[40px]">
      <div className="w-full max-w-[543px] flex flex-col gap-8 sm:gap-[32px] border border-[#E4E4E4] rounded-xl p-4 sm:p-[20px]">
        {/* Header with order number */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <h1 className="font-poppins font-bold text-2xl text-primary leading-[100%] uppercase">Order Confirmed!</h1>
            <div className="bg-primary px-[12px] py-[8px] rounded-lg">
              <p className="font-montserrat font-semibold text-sm text-[#FAFAFA] leading-[20px]">{order.order_number}</p>
            </div>
          </div>

          {/* Thank you message */}
          <p className="font-montserrat text-sm text-secondary leading-[100%]">
            Thank you for your purchase. We're processing your order now!
          </p>
        </div>

        <div className="flex flex-col gap-[20px]">
          {/* Order items */}
          <div className="flex flex-col gap-[20px] max-h-[280px] overflow-y-auto">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-[16px] pb-[20px] border-b border-[#E4E4E7] last:border-b-0">
                {/* Product image */}
                <div className="w-[96px] h-[96px] bg-[#F4F4F5] rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={item.product.image_url || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product details */}
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <h3 className="font-poppins font-semibold text-lg text-primary leading-[150%]">{item.product.name}</h3>
                    <p className="font-montserrat font-semibold text-base text-primary">
                      {item.unit_price * item.quantity} MMK
                    </p>
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <div className="flex items-center gap-[12px]">
                      <p className="font-montserrat text-sm text-secondary">
                        Size: <span className="text-primary">{item.size}</span>
                      </p>
                      <p className="font-montserrat text-sm text-secondary flex items-center gap-[6px]">
                        Color: Default
                      </p>
                    </div>
                    <p className="font-montserrat text-sm text-secondary">
                      Qty: <span className="text-primary">{item.quantity}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="flex flex-col gap-[16px] pt-[12px] border-t border-[#E4E4E7]">
            <div className="flex items-center justify-between">
              <p className="font-montserrat text-base text-primary">Subtotal</p>
              <p className="font-montserrat text-base text-primary">{order.subtotal.toLocaleString()} MMK</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-montserrat text-base text-primary">Shipping</p>
              <p className="font-montserrat text-base text-primary">{order.shipping.toLocaleString()} MMK</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-montserrat text-base text-primary">Tax</p>
              <p className="font-montserrat text-base text-primary">{order.tax.toLocaleString()} MMK</p>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between pt-[20px] border-t border-[#E4E4E7]">
            <p className="font-montserrat font-semibold text-lg text-primary">Total</p>
            <p className="font-montserrat font-semibold text-lg text-primary">{order.total.toLocaleString()} MMK</p>
          </div>
        </div>

        {/* Back to home button */}
        <Link className="self-center" to="/">
          <button className=" px-[24px] h-[54px] cursor-pointer border border-[#E4E4E7] rounded-lg font-montserrat font-semibold text-sm leading-[24px] text-primary hover:bg-[#F4F4F5] active:scale-95 transition-all duration-200">
            Back to home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation
