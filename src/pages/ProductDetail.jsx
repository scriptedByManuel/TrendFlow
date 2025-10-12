// Import necessary dependencies and icons
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductList from '../components/ProductList'
import useSupabaseFetch from '../hooks/useSupabaseFetch';
import { ChevronLeft, Handbag, Heart, Minus, Plus } from 'lucide-react';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import useWishList from '../hooks/useWishList';

const ProductDetail = () => {
  // Get product ID from URL parameters
  const { id } = useParams();

  // Fetch single product from Supabase using a custom hook
  const { data: product, loading, error } = useSupabaseFetch('products', {
    filter: { column: "id", operator: "eq", value: id },
    single: true
  });

  // Parse product sizes into an array
  const sizes = product?.size ? product.size.split(',') : [];

  // Component state
  const [selectedSize, setSelectedSize] = useState('S'); // selected size
  const [quantity, setQuantity] = useState(1); // product quantity
  const [isOpen, setIsOpen] = useState(false); // accordion toggle state

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  }

  const handlePlus = () => {
    setQuantity(quantity + 1);
  }

  const { addToCart } = useCart();
  const { user } = useAuth();
  const { addToWishList, getWishList } = useWishList();
  const [inWishList, setInWishList] = useState(false)

  useEffect(() => {
    const fetchWishList = async () => {
      const list = await getWishList(user.id)
      const exists = list.some((item) => item.product.id === product.id)
      setInWishList(exists)
    }
    fetchWishList()
  }, [user?.id, product.id])


  // Handle "Add to Wishlist" button click
  const handleAddToWishList = async () => {
    if (inWishList) return; // prevent adding again

    const wishListItem = {
      created_at: new Date(),
      user_id: user.id,
      product
    };

    await addToWishList(wishListItem);
    setInWishList(true);
  };



  const handleAddToCart = async (e) => {
    e.preventDefault();
    const cart = {
      created_at: new Date(),
      user_id: user.id,
      product,
      size: selectedSize,
      quantity: quantity,
      unit_price: product.discount_price ? product.discount_price : product.price
    }
    await addToCart(cart);
  }

  // Set default selected size when product loads
  useEffect(() => {
    if (sizes.includes('S')) {
      setSelectedSize('S');
    } else if (sizes.length > 0) {
      setSelectedSize(sizes[0].trim());
    }
  }, [product]);

  return (
    <section className='w-full py-[40px] flex flex-col gap-[120px]'>

      {/* =========================
          PRODUCT DETAIL SECTION
      ========================== */}
      <div className='flex items-start gap-[64px]'>

        {/* Product Image */}
        <div className='w-[507px] h-[577px] bg-[#E6E6E6] rounded-lg overflow-hidden'>
          <img className='w-full h-full object-cover' src={product.image_url} alt={product.name} />
        </div>

        {/* Product Information */}
        <div className='flex-1 flex flex-col gap-[27px] min-h-[577px]'>

          {/* === Product Name & Price === */}
          <div className='flex flex-col gap-[8px]'>
            <div className='flex items-center gap-[12px]'>
              <h1 className="text-2xl font-poppins font-semibold text-primary leading-[100%]">{product.name}</h1>
              {/* "New" Tag */}
              {product.is_latest && (
                <div className="min-w-[65px] h-[24px] rounded flex items-center justify-center bg-primary px-[12px]">
                  <p className='text-sm font-montserrat text-[#FAFAFA] leading-[20px]'>New</p>
                </div>
              )}
            </div>

            {/* Product Price (with discount if available) */}
            <div className='flex items-center gap-[12px]'>
              <p className={`text-base font-montserrat font-medium text-secondary leading-[140%] ${product.discount_price ? 'line-through' : ''}`}>
                {product.price}
              </p>
              {product.discount_price && (
                <p className='font-montserrat text-base text-[#27272A] font-semibold leading-[140%]'>
                  {product.discount_price}
                </p>
              )}
            </div>
          </div>

          {/* === Product Color === */}
          <div className='flex flex-col gap-[12px]'>
            <h1 className='font-montserrat text-primary text-base leading-[140%]'>Color</h1>
            {/* Show “Default” if no color data */}
            {!product.color && (
              <div className='rounded-md w-[100px] py-1 h-[32px] flex items-center justify-center bg-secondary'>
                <span className='font-montserrat text-sm text-[#FAFAFA]'>Default</span>
              </div>
            )}
          </div>

          {/* === Product Size === */}
          <div className='flex flex-col gap-[12px]'>
            <h1 className='font-montserrat text-primary text-base leading-[140%]'>Size</h1>
            <div className='flex items-center gap-[20px] flex-wrap'>
              {sizes.map((s, index) => {
                const trimmed = s.trim();
                const isSelected = trimmed === selectedSize;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(trimmed)}
                    className={`w-[40px] h-[40px] cursor-pointer flex items-center justify-center rounded font-montserrat text-base leading-[140%] transition-all duration-200
                      ${isSelected
                        ? 'bg-primary text-[#FAFAFA]'
                        : 'bg-transparent border border-secondary text-primary hover:bg-primary hover:text-[#FAFAFA]'
                      }`}
                  >
                    {trimmed}
                  </button>
                );
              })}
            </div>
          </div>

          {/* === Product Quantity Selector === */}
          <div className='flex flex-col gap-[12px]'>
            <h1 className='font-montserrat text-primary text-base leading-[140%]'>Quantity</h1>
            <div className='flex items-center gap-[8px]'>
              <button onClick={handleMinus} className='cursor-pointer active:scale-95 w-[32px] h-[32px] flex items-center justify-center border border-[#E4E4E7] rounded'>
                <Minus size={20} strokeWidth={1.5} />
              </button>
              <p className='w-[32px] text-primary font-montserrat text-center text-base leading-[140%]'>
                {quantity}
              </p>
              <button onClick={handlePlus} className='cursor-pointer active:scale-95 w-[32px] h-[32px] flex items-center justify-center border border-[#E4E4E7] rounded'>
                <Plus size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* === Product Description Accordion === */}
          <div className='px-[8px]'>
            <div className='py-[12px] border-b border-[#E4E4E4]'>
              {/* Accordion Header */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='w-full cursor-pointer flex items-center justify-between'
              >
                <p className='font-montserrat text-primary font-medium text-base leading-[28px]'>
                  Product Description
                </p>
                {/* Rotating Chevron Icon */}
                <ChevronLeft
                  className={`text-[#A1A1AA] transform transition-transform duration-300 ${isOpen ? 'rotate-[-90deg]' : 'rotate-0'
                    }`}
                  strokeWidth={1.5}
                />
              </button>

              {/* Accordion Body (expandable with smooth animation) */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
              >
                <p className='text-secondary font-montserrat text-sm leading-[22px]'>
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* === Wishlist Button === */}
          <div
            onClick={handleAddToWishList}
            className="flex items-center gap-[12px] py-[14px] cursor-pointer select-none"
          >
            <Heart
              className={`transition-all duration-200 ${inWishList ? 'text-red-500 fill-red-500' : 'text-secondary'}`}
              strokeWidth={1.5}
            />
            <p className='font-montserrat text-primary text-base leading-[140%]'>
              {inWishList ? 'Added to wishlist' : 'Add to wishlist'}
            </p>
          </div>


          {/* === Add to Cart Button === */}
          <button onClick={handleAddToCart} className="w-full cursor-pointer h-[48px] px-[24px] bg-primary flex items-center justify-center gap-[8px] text-[#FAFAFA] py-2 rounded-lg active:bg-gray-800 active:scale-95 transition-all duration-200">
            <Handbag size={20} />
            <p className='font-montserrat font-medium text-base leading-[24px]'>Add to cart</p>
          </button>

        </div>
      </div>

      {/* =========================
          SUGGESTED PRODUCTS SECTION
      ========================== */}
      <div>
        <div className='flex flex-col gap-[8px] w-1/2 mb-[40px]'>
          <h1 className='text-2xl text-primary font-poppins font-bold uppercase'>
            You might also like
          </h1>
          <p className='text-base text-secondary font-montserrat font-normal'>
            More styles picked just for you—explore and find your next favorite!
          </p>
        </div>

        {/* Recommended product list */}
        <ProductList
          skeletonCount={4}
          table='products'
          options={{
            random: true,
            limit: 4,
          }}
        />
      </div>
    </section>
  );
}

export default ProductDetail;
