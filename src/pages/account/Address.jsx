import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";

const Address = () => {
  const { user, updateUser } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load user addresses from Supabase user metadata
  useEffect(() => {
    if (user) {
      const savedAddresses = user?.user_metadata?.addresses || [];
      setAddresses(savedAddresses);
    }
  }, [user]);

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
    <div className="w-full border border-[#E4E4E4] flex flex-col gap-5 rounded-lg py-8 px-5">
      <h1 className="font-montserrat text-sm text-primary font-semibold leading-[16px]">
        Address
      </h1>

      {/* Address List */}
      <div className="flex flex-col gap-4">
        {addresses.length > 0 ? (
          addresses.map((addr, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border border-[#E4E4E7] rounded-lg px-4 py-3 justify-between"
            >
              <p className="font-montserrat text-sm text-secondary leading-[150%] flex-grow">
                {addr}
              </p>
              <div className="flex items-center gap-3">
                <button
                  disabled={isEditing}
                  onClick={() => startEditing(index)}
                  className="text-[#006FEE] cursor-pointer font-montserrat text-sm border-l border-[#E4E4E7] pl-3"
                >
                  Edit
                </button>
                <Trash2
                  size={18}
                  className="text-secondary cursor-pointer hover:text-red-500 transition"
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
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

      {/* Edit/Add Form */}
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
  );
};

export default Address;
