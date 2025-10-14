import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="relative flex flex-col gap-[16px] w-[265px] rounded-lg animate-pulse">
      {/* Wishlist Heart Icon */}
      <div className="absolute top-3 right-3 flex items-center justify-center w-[30px] h-[30px] p-[8px] border border-secondary rounded-full bg-gray-200"></div>

      {/* Product Image */}
      <div className="w-full h-[320px] rounded-lg bg-gray-200"></div>

      {/* Product Info & Add-to-Cart Skeleton */}
      <div className="flex flex-col gap-[24px]">
        {/* Product Info */}
        <div className="flex flex-col gap-[8px]">
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>

        {/* Add to Cart Button */}
        <div className="w-full h-[48px] rounded-lg bg-gray-200"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
