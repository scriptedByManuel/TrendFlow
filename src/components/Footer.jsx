import React from 'react'
import logo from '../assets/images/TrendFlowLogo.png'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='w-full'>
            <div className='p-6 sm:p-[80px] border-t border-[#D4D4D8]'>
                <div className='flex flex-col sm:flex-row items-start sm:justify-between gap-6'>
                    <div className='flex flex-col gap-4'>
                        <img src={logo} alt="" className='w-10 h-auto' />
                        <h1 className='text-2xl font-poppins text-primary font-bold uppercase'>trendflow</h1>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-[80px] w-full'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='font-poppins text-primary font-semibold text-sm'>Terms & Conditions</h1>
                            <div className='flex flex-col gap-2 text-secondary text-sm font-montserrat leading-[24px]'>
                                <p>Returns & Refunds</p>
                                <p>Privacy Policy</p>
                                <p>Cookies Policy</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h1 className='font-poppins text-primary font-semibold text-sm'>Store</h1>
                            <div className='flex flex-col gap-2 text-secondary text-sm font-montserrat leading-[24px]'>
                                <Link to={'/about'}>About</Link>
                                <Link to={'/contact'}>Contact Us</Link>
                                <Link to={'/faq'}>FAQ</Link>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h1 className='font-poppins text-primary font-semibold text-sm uppercase'>Social</h1>
                            <div className='flex flex-col gap-2 text-secondary text-sm font-montserrat leading-[24px]'>
                                <a target='_blank' href='https://www.facebook.com/share/1N36xhfBhF/'>Facebook</a>
                                <a target='_blank' href='https://www.instagram.com/pixel_panda20?igsh=NGJmYW9rZmZubjY2'>Instagram</a>
                                <a target='_blank' href='https://x.com/Pixell_Panda?t=Rrpu3XjbZSWSX5FVTPCsbA&s=09'>X</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full bg-primary py-4'>
                <p className='text-[#D4D4D8] font-montserrat text-sm leading-[24px] text-center'>Copy Right © 2024 MMS IT, All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer