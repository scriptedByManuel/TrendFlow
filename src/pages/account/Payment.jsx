import React from 'react'

const Payment = () => {
  return (
    <div className="w-full border border-[#E4E4E4] flex flex-col gap-5 rounded-lg py-8 px-5">
      <h1 className="font-montserrat text-sm text-primary font-semibold leading-[16px]">
        Payment
      </h1>
      <div className='w-[150px] h-[45px] flex items-center justify-center border border-[#A1A1AA] py-[4px] px-[16px] rounded-lg shadow'>
        <p className='font-montserrat font-medium text-secondary text-sm leading-[20px]'>Cash on delivery</p>
      </div>
    </div>
  )
}

export default Payment