import React, { useState } from 'react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Message:', formData);
    toast.success('Message sent!')
    setFormData({
      name: '',
      phone: '',
      message: ''
    })
  };

  return (
    <section className='w-full py-[40px]'>
      <div className='flex flex-col gap-[12px] w-1/2 mb-[40px]'>
        <h1 className='text-[28px] text-primary font-poppins font-bold uppercase'>Get in Touch with Us</h1>
        <p className='text-base text-justify text-secondary font-montserrat font-normal'>
          Have a question or need help? We’re here for you!
        </p>
      </div>

      <div className='flex items-stretch gap-[40px]'>
        {/* Contact info */}
        <div className='w-1/2 rounded border border-[#E4E4E7] p-[32px] flex flex-col gap-[40px]'>
          <div className='border-b border-[#E4E4E7] pb-[20px] flex flex-col gap-[12px]'>
            <div className='flex flex-col gap-[2px]'>
              <h1 className='text-primary text-base font-poppins font-semibold leading-[150%]'>Chat with us</h1>
              <p className='text-secondary text-sm font-montserrat leading-[150%]'>Connect with us for personalized support.</p>
            </div>
            <p className='text-[#006FEE] text-base font-montserrat leading-[20px]'>support@trendflow.com</p>
          </div>

          <div className='border-b border-[#E4E4E7] pb-[20px] flex flex-col gap-[12px]'>
            <div className='flex flex-col gap-[2px]'>
              <h1 className='text-primary text-base font-poppins font-semibold leading-[150%]'>Call us</h1>
              <p className='text-secondary text-sm font-montserrat leading-[150%]'>Need Help? Call Us Now!</p>
            </div>
            <p className='text-[#006FEE] text-base font-montserrat leading-[20px] underline'>+95 945 6789 120</p>
          </div>

          <div className='pb-[20px] flex flex-col gap-[12px]'>
            <div className='flex flex-col gap-[2px]'>
              <h1 className='text-primary text-base font-poppins font-semibold leading-[150%]'>Visit us</h1>
              <p className='text-secondary text-sm font-montserrat leading-[150%]'>We're Waiting to Welcome You!</p>
            </div>
            <p className='text-[#006FEE] text-base font-montserrat leading-[20px] w-[355px]'>
              789 Prestige Towers, Suite 405, Downtown District, Central City, 12345
            </p>
          </div>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className='w-1/2 flex flex-col gap-[32px]'>
          <input
            type="text"
            name="name"
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            className='w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200'
          />

          <input
            type="text"
            name="phone"
            placeholder='Phone Number'
            value={formData.phone}
            onChange={handleChange}
            className='w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200'
          />

          <textarea
            name="message"
            placeholder='Message'
            value={formData.message}
            onChange={handleChange}
            className='w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm h-[249px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200'
          ></textarea>

          <button
            type='submit'
            className='bg-primary px-[16px] h-[54px] rounded-lg active:bg-gray-800 active:scale-95 cursor-pointer transition-all duration-200 focus:outline-none'
          >
            <p className='text-[#FAFAFA] font-montserrat font-semibold text-sm leading-[20%]'>Send Message</p>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
