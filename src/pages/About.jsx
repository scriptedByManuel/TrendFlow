import React from 'react'
import aboutImg from '../assets/images/about-image.png'

const About = () => {
  return (
    <section className='w-full py-[40px]'>
      <div className='flex flex-col gap-[12px] w-1/2 mb-[40px]'>
        <h1 className='text-[28px] text-primary font-poppins font-bold uppercase'>About TrendFlow</h1>
        <p className='text-base text-justify text-secondary font-montserrat font-normal'>At TrendFlow, we make shopping personal. We combine expert styling with smart technology to bring you clothes that fit your vibe, save you time, and help you feel your best—every day.</p>
      </div>
      <div className='w-full'>
        <img src={aboutImg} alt="" />
      </div>
    </section>
  )
}

export default About