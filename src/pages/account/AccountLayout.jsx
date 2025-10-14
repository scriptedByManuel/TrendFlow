import { CreditCard, Handbag, LogOut, MapPin, Shield, UserRound } from 'lucide-react';
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const AccountLayout = () => {

  const { signOut } = useAuth();

  const navLinks = [
    { to: "personal-information", icon: <UserRound strokeWidth={1.5} size={18} />, label: "Personal information" },
    { to: "security", icon: <Shield strokeWidth={1.5} size={18} />, label: "Security" },
    { to: "orders", icon: <Handbag strokeWidth={1.5} size={18} />, label: "Orders" },
    { to: "address", icon: <MapPin strokeWidth={1.5} size={18} />, label: "Address" },
    { to: "payment", icon: <CreditCard strokeWidth={1.5} size={18} />, label: "Payment" },
  ];

  return (
    <section className='w-full py-[40px]'>
      <div className='flex flex-col gap-[12px] w-1/2 mb-[40px]'>
        <h1 className='text-[28px] text-primary font-poppins font-bold uppercase'>My account</h1>
        <p className='text-base text-justify text-secondary font-montserrat font-normal'>Manage Your Personal Details and Orders.</p>
      </div>
      <div className='flex gap-[40px]'>
        <div className='w-[300px] h-[394px] items-start border border-[#E4E4E4] rounded-lg flex flex-col gap-[8px] py-[32px] px-[20px]'>
          <div className='flex flex-col self-start gap-[8px] pb-[20px] border-b border-[#E4E4E7]'>
            {navLinks.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-[8px] px-[16px] py-[12px] rounded-lg transition-all ${isActive
                    ? "bg-[#F4F4F5] text-primary font-semibold"
                    : "text-secondary font-medium hover:bg-[#F4F4F5]"
                  }`
                }
              >
                {icon}
                <p className='font-montserrat text-sm leading-[150%]'>{label}</p>
              </NavLink>
            ))}
          </div>
          <div className='flex items-center gap-[12px] py-[12px] px-[16px] font-montserrat text-secondary text-sm font-medium leading-[150%] cursor-pointer hover:bg-[#F4F4F5] rounded-lg' onClick={signOut}>
            <LogOut strokeWidth={1.5} size={18} />
            <p>Logout</p>
          </div>
        </div>
        <div className='flex-grow '>
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default AccountLayout