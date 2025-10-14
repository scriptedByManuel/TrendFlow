import { Handbag } from 'lucide-react';
import React from 'react';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import useWishList from '../hooks/useWishList';

const WishListCard = ({ item, onRemove }) => {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const { removeFromWishList } = useWishList();

    // Add item to cart
    const handleAddToCart = async (e) => {
        e.preventDefault();
        const cart = {
            created_at: new Date(),
            user_id: user.id,
            product: item.product,
            size: 'S',
            quantity: 1,
            unit_price: item.product.discount_price ?? item.product.price,
        };

        await addToCart(cart);
    };

    // Remove item from wishlist
    const handleRemoveWishList = async () => {
        if (onRemove) onRemove(item.id);
        await removeFromWishList(item.id);
    };

    return (
        <div className="flex items-center justify-between py-[12px] border-b border-[#E4E4E7] last:border-0">
            {/* Product Info */}
            <div className="flex items-center gap-[32px] p-[12px]">
                <div className="w-[120px] h-[136px] bg-[#E6E6E6] rounded-lg overflow-hidden">
                    <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col justify-between h-[136px]">
                    {/* Name and Price */}
                    <div className="flex flex-col gap-[12px]">
                        <h1 className="text-base font-poppins font-semibold text-primary leading-[100%]">
                            {item.product.name}
                        </h1>
                        <div className="flex items-center gap-[12px]">
                            <p
                                className={`text-sm font-montserrat leading-[100%] ${
                                    item.product.discount_price
                                        ? 'line-through text-[#A1A1AA]'
                                        : 'text-primary'
                                }`}
                            >
                                {item.product.price} MMK
                            </p>
                            {item.product.discount_price && (
                                <p className="text-sm font-montserrat font-semibold text-primary leading-[100%]">
                                    {item.product.discount_price} MMK
                                </p>
                            )}
                        </div>

                        {/* Size & Color */}
                        <div className="flex items-center gap-[12px]">
                            <div className="flex gap-[8px] text-sm font-montserrat text-secondary leading-[100%]">
                                <p>Size:</p>
                                <p>S</p>
                            </div>
                            <div className="flex items-center gap-[8px] text-sm font-montserrat text-secondary leading-[100%]">
                                <p>Color:</p>
                                <p className="py-[4px] px-[8px] bg-[#D9D9D9] border border-[#A1A1AA] rounded-sm">
                                    Default
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Remove Button */}
                    <div
                        onClick={handleRemoveWishList}
                        className="cursor-pointer text-xs font-montserrat text-secondary leading-[100%] underline"
                    >
                        Remove
                    </div>
                </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex items-center justify-center p-[12px]">
                <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-[8px] px-[20px] py-2 bg-primary rounded-lg text-[#FAFAFA] cursor-pointer active:bg-gray-800 active:scale-95 transition-all duration-200"
                >
                    <Handbag size={20} />
                    <p className="text-xs font-montserrat font-medium leading-[24px]">
                        Add to cart
                    </p>
                </button>
            </div>
        </div>
    );
};

export default WishListCard;
