import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import supabase from "../../supabase/supabaseClient";

const PersonalInfo = () => {
  const { user, updateUser } = useAuth();

  // Safely extract user data
  const email = user?.email || "";
  const name = user?.user_metadata?.name || "";
  const phone = user?.user_metadata?.phone || "";

  const [form, setForm] = useState({ name, phone });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // Keep form synced with user data
  useEffect(() => {
    if (!isEdit) {
      setForm({ name, phone });
    }
  }, [name, phone, isEdit]);

  // Save updates to Supabase
  const handleSave = async () => {
    try {
      setLoading(true);

      // Update auth user metadata via Supabase
      await updateUser({
        name: form.name,
        phone: form.phone,
      });

      setIsEdit(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full border border-[#E4E4E4] flex flex-col gap-[20px] rounded-lg py-[32px] px-[20px]">
      {/* EMAIL */}
      <div className="pb-[12px] border-b border-[#E4E4E7]">
        <div className="pb-[8px]">
          <h1 className="font-montserrat text-sm text-primary font-semibold leading-[16px]">
            Email
          </h1>
        </div>
        <div className="py-[5px]">
          <p className="font-montserrat text-sm text-secondary leading-[150%]">
            {email}
          </p>
        </div>
      </div>

      {/* NAME */}
      <div className="pb-[12px] border-b border-[#E4E4E7]">
        <div className="pb-[8px]">
          <h1 className="font-montserrat text-sm text-primary font-semibold leading-[16px]">
            Name
          </h1>
        </div>
        <div className="py-[5px] flex flex-col gap-[12px]">
          {isEdit ? (
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm leading-[150%] h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200"
            />
          ) : (
            <p className="font-montserrat text-sm text-secondary leading-[150%]">
              {form.name || ""}
            </p>
          )}
        </div>
      </div>

      {/* PHONE */}
      <div className="pb-[12px]">
        <div className="pb-[8px]">
          <h1 className="font-montserrat text-sm text-primary font-semibold leading-[16px]">
            Phone Number
          </h1>
        </div>
        <div className="py-[5px] flex flex-col gap-[12px]">
          {isEdit ? (
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm leading-[150%] h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200"
            />
          ) : (
            <p className="font-montserrat text-sm text-secondary leading-[150%]">
              {form.phone || ""}
            </p>
          )}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-4 mt-[8px]">
        {isEdit ? (
          <>
            <button
              onClick={() => setIsEdit(false)}
              disabled={loading}
              className="px-4 py-2 rounded-md border text-sm font-montserrat"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 rounded-md bg-primary text-white text-sm font-montserrat disabled:opacity-70"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="underline text-sm font-montserrat text-secondary"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
