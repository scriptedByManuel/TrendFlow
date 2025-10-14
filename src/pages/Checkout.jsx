import React, { useEffect, useState } from 'react'
import OrderSummary from '../components/OrderSummary'
import useAuth from '../hooks/useAuth';
import { Plus, Trash2 } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useOrder from '../hooks/useOrder';
import useCart from '../hooks/useCart';
import useOrderStore from '../store/useOrderStore';
import { toast } from 'sonner';

const Checkout = () => {

  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [selectedAddress, setSelectedAddress] = useState(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [birthday, setBirthday] = useState('')
  const [payment, setPayment] = useState('')
  const [additionalDetail, setAdditionalDetail] = useState('')
  const { carts, add, clearAllCarts } = useCartStore()
  const { getCarts, deleteAllCarts } = useCart()
  const { placeOrder } = useOrder()
  const { addOrder } = useOrderStore()
  
  const subtotal = carts.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
  const shipping = 3000
  const taxRate = 0.05 // 0.05% tax
  const tax = subtotal * taxRate
  const total = subtotal + shipping + tax

  // Generates a random 5-digit order number prefixed with "#"
  const generateOrderNumber = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000); // ensures 5 digits
    return `#${randomNum}`;
  };

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


  const orderData = {
    user_id: user?.id,
    order_number: generateOrderNumber(),
    items: carts,
    subtotal,
    shipping,
    tax,
    total,
    user_info: {
      name,
      phoneNumber,
      email,
      address: addresses[selectedAddress]
    },
    payment,
    additional_detail: additionalDetail,
  }

  const handleOrder = async () => {
    addOrder(orderData)
    await placeOrder(orderData)
    await deleteAllCarts(user.id)
    clearAllCarts()
  }

  useEffect(() => {
    if (user) {
      const savedAddresses = user?.user_metadata?.addresses || [];
      setAddresses(savedAddresses);
    }
  }, [user])

  const handleAddAddress = async () => {
    if (!currentAddress.trim()) {
      toast.error("Address cannot be empty");
      return;
    }

    const updatedAddresses = [...addresses, currentAddress.trim()];
    await saveAddresses(updatedAddresses);
    setIsEditing(false);
    setCurrentAddress("");
  };

  const handleEditAddress = async (index) => {
    if (!currentAddress.trim()) {
      toast.error("Address cannot be empty");
      return;
    }

    const updatedAddresses = addresses.map((addr, i) =>
      i === index ? currentAddress.trim() : addr
    );
    await saveAddresses(updatedAddresses);
    setIsEditing(false);
    setCurrentAddress("");
    setEditIndex(null);
  };

  const handleDelete = async (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    await saveAddresses(updatedAddresses);
  };

  const saveAddresses = async (updatedAddresses) => {
    await updateUser({ addresses: updatedAddresses });
    setAddresses(updatedAddresses);
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setCurrentAddress(addresses[index]);
    setIsEditing(true);
  };

  const startAdding = () => {
    setEditIndex(null);
    setCurrentAddress("");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentAddress("");
    setEditIndex(null);
  };

  return (
    <section className='w-full py-[40px]'>
      <div className='flex flex-col gap-[12px] w-1/2 mb-[40px]'>
        <h1 className='text-[28px] text-primary font-poppins font-bold uppercase'>
          Checkout
        </h1>
        <p className='text-base text-justify text-secondary font-montserrat font-normal'>
          Almost there! complete your order.
        </p>
      </div>

      <div className='flex gap-[40px] w-full'>
        <div className='w-[680px] flex flex-col gap-[40px] border border-[#E4E4E4] rounded-xl p-[24px]'>

          {/* Shipping address */}
          <div className='flex flex-col gap-[20px] border-b border-[#E4E4E7] pb-[40px]'>
            <h1 className='font-poppins font-semibold text-primary text-lg leading-[150%]'>Shipping Address</h1>
            <div className="w-[542px] flex flex-col gap-4">
              {addresses.length > 0 ? (
                addresses.map((addr, index) => (
                  <label
                    key={index}
                    className={`flex items-center gap-4 border rounded-lg px-4 py-3 justify-between cursor-pointer transition ${selectedAddress === index
                      ? "border-[#006FEE] bg-[#F0F7FF]"
                      : "border-[#E4E4E7]"
                      }`}
                    onClick={() => setSelectedAddress(index)}
                  >
                    <div className="flex items-center gap-3 flex-grow">
                      <input
                        type="radio"
                        name="selectedAddress"
                        checked={selectedAddress === index}
                        onChange={() => setSelectedAddress(index)}
                        className="text-[#006FEE] focus:ring-[#006FEE] cursor-pointer"
                      />
                      <p className="font-montserrat text-sm text-secondary leading-[150%] flex-grow">
                        {addr}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        disabled={isEditing}
                        onClick={(e) => {
                          e.stopPropagation(); // prevent radio click conflict
                          startEditing(index);
                        }}
                        className="text-[#006FEE] cursor-pointer font-montserrat text-sm border-l border-[#E4E4E7] pl-3 hover:underline"
                      >
                        Edit
                      </button>
                      <Trash2
                        size={18}
                        className="text-secondary cursor-pointer hover:text-red-500 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(index);
                        }}
                      />
                    </div>
                  </label>
                ))
              ) : (
                <p className="text-sm font-montserrat text-secondary">No addresses added yet.</p>
              )}


              {/* Add New Address */}
              <button
                onClick={startAdding}
                className="flex items-center gap-2 text-[#006FEE] cursor-pointer "
              >
                <Plus size={18} />
                <span className="font-montserrat text-sm leading-[150%]">
                  Add new address
                </span>
              </button>
            </div>
            {isEditing && (
              <div className="flex flex-col gap-3 mt-4 border-t border-[#E4E4E7] pt-4">
                <textarea
                  rows={3}
                  value={currentAddress}
                  onChange={(e) => setCurrentAddress(e.target.value)}
                  placeholder="Enter full address"
                  className="border border-[#E4E4E7] rounded-lg p-3 text-sm outline-none text-secondary font-montserrat  focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 cursor-pointer border border-[#E4E4E7] rounded-lg font-montserrat text-sm text-secondary flex items-center gap-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      editIndex !== null ? handleEditAddress(editIndex) : handleAddAddress()
                    }
                    className="px-4 py-2 cursor-pointer bg-primary font-montserrat text-[#FAFAFA] rounded-lg text-sm hover:bg-gray-800"
                  >
                    {editIndex !== null ? "Update Address" : "Add Address"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Personal information */}
          <div className='flex flex-col gap-[20px] border-b border-[#E4E4E7] pb-[40px]'>
            <h1 className='font-poppins font-semibold text-primary text-lg leading-[150%]'>Personal Information</h1>
            <div className='grid grid-cols-2 gap-[24px]'>
              <div>
                <h1 className='font-montserrat font-medium text-primary text-sm leading-[16px] mb-[10px]'>Name</h1>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200"
                />
              </div>
              <div>
                <h1 className='font-montserrat font-medium text-primary text-sm leading-[16px] mb-[10px]'>Email</h1>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200"
                />
              </div>
              <div>
                <h1 className='font-montserrat font-medium text-primary text-sm leading-[16px] mb-[10px]'>Phone Number</h1>
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type='number'
                  placeholder="+95"
                  className="w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200"
                />
              </div>
              <div>
                <h1 className='font-montserrat font-medium text-primary text-sm leading-[16px] mb-[10px]'>Date of birth</h1>
                <input
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  type="date"
                  className="w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className='flex flex-col gap-[20px] border-b border-[#E4E4E7] pb-[40px]'>
            <h1 className='font-poppins font-semibold text-primary text-lg leading-[150%]'>Payment Method</h1>
            <label className='w-[179px] h-[45px] cursor-pointer py-[4px] px-[16px] border border-primary rounded-lg shadow flex items-center gap-[8px]'>
              <input type="radio" onChange={(e) => setPayment('COD')} />
              <p className='font-montserrat font-medium text-sm text-primary leading-[20px]'>Cash on delivery</p>
            </label>
          </div>

          {/* Additional detail */}
          <div className='flex flex-col gap-[20px]'>
            <h1 className='font-poppins font-semibold text-primary text-lg leading-[150%]'>Additional Details</h1>
            <textarea value={additionalDetail} onChange={(e) => setAdditionalDetail(e.target.value)} className='w-full h-[150px] p-[16px] border border-[#E4E4E7] rounded-lg outline-none  text-secondary font-montserrat text-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200' name="additional-detail" id="additional-detail"></textarea>
          </div>
        </div>
        <OrderSummary handleOrder={handleOrder} />
      </div>

    </section>
  )
}

export default Checkout