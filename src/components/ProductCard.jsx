// Import required dependencies and icons
import { Handbag, Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import useWishList from '../hooks/useWishList';

const ProductCard = ({ product }) => {
    const location = useLocation();
    const { pathname } = location;
    const pathSegments = pathname.split("/").filter(Boolean);

    const productLink = pathname.includes("categories")
        ? `/categories/${pathSegments[1]}/${product.id}`
        : `/products/${product.id}`;

    const { user } = useAuth();
    const { addToCart } = useCart();
    const { addToWishList, getWishList } = useWishList();


    const [inWishList, setInWishList] = useState(false)

    useEffect(() => {
        if (!user?.id) return;
        const fetchWishList = async () => {
            const list = await getWishList(user.id)
            const exists = list.some((item) => item.product.id === product.id)
            setInWishList(exists)
        }
        fetchWishList()
    }, [user?.id, product.id])

    const handleAddToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation();
        const cart = {
            created_at: new Date(),
            user_id: user.id,
            product,
            size: 'S',
            quantity: 1,
            unit_price: product.discount_price ? product.discount_price : product.price
        };

        await addToCart(cart)
    }


    const handleWishList = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const wishListItem = {
            created_at: new Date(),
            user_id: user.id,
            product
        }
        await addToWishList(wishListItem)
        setInWishList(true)
    }
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
            <div
                onClick={handleWishList}
                className="absolute flex items-center justify-center w-[30px] h-[30px] p-[8px] border border-secondary rounded-full top-3 right-3"
            >
                <Heart
                    strokeWidth={1.5}
                    stroke={inWishList ? "#e63946" : "#27272A"}
                    fill={inWishList ? "#e63946" : "none"}
                    size={14}
                />
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
                            {product.price} MMK
                        </p>

                        {/* Show discounted price if available */}
                        {product.discount_price && (
                            <p className="font-montserrat text-base text-[#27272A] font-semibold leading-[140%]">
                                {product.discount_price} MMK
                            </p>
                        )}
                    </div>
                </div>

                {/* =========================
            Add to Cart Button
        ========================== */}
                <button onClick={handleAddToCart} className="w-full cursor-pointer h-[48px] px-[24px] bg-primary flex items-center justify-center gap-[8px] text-[#FAFAFA] py-2 rounded-lg active:bg-gray-800 active:scale-95 transition-all duration-200">
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
