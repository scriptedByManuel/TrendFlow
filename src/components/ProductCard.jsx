// Import required dependencies and icons
import { Handbag, Heart } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const ProductCard = ({ product }) => {
    const location = useLocation();
    const { pathname } = location;
    const pathSegments = pathname.split("/").filter(Boolean);

    const productLink = pathname.includes("categories")
        ? `/categories/${pathSegments[1]}/${product.id}`
        : `/products/${product.id}`;


    return (
        // Link to the product detail page
        <Link
            to={productLink}
            // to={`/products/${[product.id]}`}
            className="flex flex-col gap-[16px] cursor-pointer relative w-[265px] rounded-lg"
        >
            {/* =========================
          Wishlist Heart Icon
      ========================== */}
            <div className="absolute flex items-center justify-center w-[30px] h-[30px] p-[8px] border border-secondary rounded-full top-3 right-3">
                <Heart strokeWidth={1.5} stroke="#27272A" size={14} />
            </div>

            {/* =========================
          Product Image
      ========================== */}
            <div className="w-full bg-[#E6E6E6] h-[320px] overflow-hidden rounded-lg">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* =========================
          Product Info & Add-to-Cart
      ========================== */}
            <div className="flex flex-col gap-[24px]">

                {/* Product Details (Name, Tag, and Price) */}
                <div className="flex flex-col gap-[8px] min-h-[60px]">

                    {/* Product Name + "New" Badge */}
                    <div className="flex items-center gap-[12px]">
                        <h1 className="text-lg font-poppins font-semibold text-primary leading-[100%]">
                            {product.name}
                        </h1>

                        {/* Display "New" tag if product.is_latest is true */}
                        {product.is_latest && (
                            <div className="min-w-[65px] h-[28px] rounded flex items-center justify-center bg-primary px-[12px]">
                                <p className="text-sm font-montserrat text-[#FAFAFA] leading-[20px]">
                                    New
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Product Price (with discount handling) */}
                    <div className="flex items-center gap-[12px]">
                        <p
                            className={`text-base font-montserrat text-secondary leading-[140%] ${product.discount_price ? 'line-through' : ''
                                }`}
                        >
                            {product.price}
                        </p>

                        {/* Show discounted price if available */}
                        {product.discount_price && (
                            <p className="font-montserrat text-base text-[#27272A] font-semibold leading-[140%]">
                                {product.discount_price}
                            </p>
                        )}
                    </div>
                </div>

                {/* =========================
            Add to Cart Button
        ========================== */}
                <button className="w-full cursor-pointer h-[48px] px-[24px] bg-primary flex items-center justify-center gap-[8px] text-[#FAFAFA] py-2 rounded-lg active:bg-gray-800 active:scale-95 transition-all duration-200">
                    <Handbag size={20} />
                    <p className="font-montserrat font-medium text-sm leading-[24px]">
                        Add to cart
                    </p>
                </button>
            </div>
        </Link>
    )
}

export default ProductCard
