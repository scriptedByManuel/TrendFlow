import React from 'react'

const ProductSkeleton = () => {
  return (
      <div className="flex flex-col gap-[16px] w-[265px] rounded-lg animate-pulse">
          {/* Wishlist Heart Icon */}
          <div className="absolute flex items-center justify-center w-[30px] h-[30px] p-[8px] border border-secondary rounded-full top-3 right-3 bg-gray-200"></div>

          {/* Product Image */}
          <div className="w-full bg-gray-200 h-[320px] rounded-lg"></div>

          <div className="flex flex-col gap-[24px]">
              {/* Product Info */}
              <div className="flex flex-col gap-[8px]">
                  <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>

              {/* Add to Cart Button */}
              <div className="w-full h-[48px] bg-gray-200 rounded-lg"></div>
          </div>
      </div>
  )
}

export default ProductSkeleton