import React, { useState } from 'react'
import supabase from '../../supabase/supabaseClient';
import { toast } from 'sonner';

const Security = () => {

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: form.newPassword,
      });

      if (error) throw error;
      toast.success("Password updated successfully");
      setForm({ newPassword: "", confirmPassword: "" });
  
    } catch (error) {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="w-full border border-[#E4E4E4] flex flex-col gap-[20px] rounded-lg py-[32px] px-[20px]">
      <div className='flex flex-col'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
          <div className='pb-[8px]'>
            <h1 className="font-montserrat text-sm text-primary font-semibold leading-[16px]">Password</h1>
          </div>

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm leading-[150%] h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200"
            required
            minLength={6}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm leading-[150%] h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200"
            required
            minLength={6}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary mt-[12px] cursor-pointer self-end px-[20px] w-[170px] h-[48px] rounded-lg text-[#FAFAFA] font-montserrat font-semibold text-sm leading-[20px] active:bg-gray-800 active:scale-95 transition-all duration-200 disabled:opacity-70"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
        
      </div>
    </div>
  )
}

export default Security