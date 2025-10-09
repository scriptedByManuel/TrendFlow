import React from 'react'

const Faq = () => {
  return (
    <section className='w-full py-[40px]'>
      <div className='flex flex-col gap-[12px] w-1/2 mb-[40px]'>
        <h1 className='text-[28px] text-primary font-poppins font-bold uppercase'>Faq</h1>
        <p className='text-base text-justify text-secondary font-montserrat font-normal'>Got questions? We’ve got answers. <br /> Here’s everything you need to know about shopping with us.</p>
      </div>
      <div className='flex flex-col gap-[20px]'>
        <div className='flex items-center gap-[20px]'>
          <div className='w-1/2 flex flex-col gap-[12px] p-[20px] border border-[#E4E4E7] rounded'>
            <h1 className='text-primary font-poppins font-semibold text-base leading-[150%]'>How do I track my order?</h1>
            <p className='text-secondary font-montserrat text-sm leading-[150%]'>Once your order is shipped, you’ll receive an email with a tracking number to follow your package.</p>
          </div>
          <div className='w-1/2 flex flex-col gap-[12px] p-[20px] border border-[#E4E4E7] rounded'>
            <h1 className='text-primary font-poppins font-semibold text-base leading-[150%]'>Can I return or exchange an item?</h1>
            <p className='text-secondary font-montserrat text-sm leading-[150%]'>Yes! We offer easy returns and exchanges within 30 days of your purchase. Simply visit our returns page for more details.</p>
          </div>
        </div>
        <div className='flex items-center gap-[20px]'>
          <div className='w-1/2 flex flex-col gap-[12px] p-[20px] border border-[#E4E4E7] rounded'>
            <h1 className='text-primary font-poppins font-semibold text-base leading-[150%]'>How do I know my size?</h1>
            <p className='text-secondary font-montserrat text-sm leading-[150%]'>Check out our size guide for detailed measurements. If you’re still unsure, our customer service team is happy to help!</p>
          </div>
          <div className='w-1/2 flex flex-col gap-[12px] p-[20px] border border-[#E4E4E7] rounded'>
            <h1 className='text-primary font-poppins font-semibold text-base leading-[150%]'>How can I contact customer support?</h1>
            <p className='text-secondary font-montserrat text-sm leading-[150%]'>You can reach us via email at <span className='text-[#006FEE]'>support@trendflow.com</span> or by using the chat feature on our website. We’re here to help!</p>
          </div>
        </div>
        <div className='flex items-center gap-[20px]'>
          <div className='w-1/2 flex flex-col gap-[12px] p-[20px] border border-[#E4E4E7] rounded'>
            <h1 className='text-primary font-poppins font-semibold text-base leading-[150%]'>Can I cancel my order?</h1>
            <p className='text-secondary font-montserrat text-sm leading-[150%]'>Orders are processed quickly, but if you need to cancel, contact us as soon as possible, and we’ll try to help before it ships.</p>
          </div>
          <div className='w-1/2 flex flex-col gap-[12px] p-[20px] border border-[#E4E4E7] rounded'>
            <h1 className='text-primary font-poppins font-semibold text-base leading-[150%]'>Do you offer international shipping?</h1>
            <p className='text-secondary font-montserrat text-sm leading-[150%]'>Currently, we only ship within the country, but we're working on expanding to more locations soon!</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq