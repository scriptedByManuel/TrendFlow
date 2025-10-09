import React from 'react'
import logo from '../assets/images/TrendFlowLogo.png'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='w-full'>
            <div className='p-[80px] border-t border-[#D4D4D8]'>
                <div className='flex items-start justify-between'>
                    <div className='flex flex-col gap-[16px]'>
                        <img src={logo} alt="" width={37.13753128051758} height={31.396221160888672} />
                        <h1 className='text-2xl font-poppins text-primary font-bold uppercase'>trendflow</h1>
                    </div>
                    <div className='grid grid-cols-3 gap-[80px]'>
                        <div className='flex flex-col gap-[30px]'>
                            <h1 className='font-poppins text-primary font-semibold text-sm'>Terms & Conditions</h1>
                            <div className='flex flex-col gap-[5px] text-secondary text-sm font-montserrat leading-[24px]'>
                                <p>Returns & Refunds</p>
                                <p>Privacy Policy</p>
                                <p>Cookies Policy</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[30px]'>
                            <h1 className='font-poppins text-primary font-semibold text-sm'>Store</h1>
                            <div className='flex flex-col gap-[5px] text-secondary text-sm font-montserrat leading-[24px]'>
                                <Link to={'/about'}>About</Link>
                                <Link to={'/contact'}>Contact Us</Link>
                                <Link to={'/faq'}>FAQ</Link>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[30px]'>
                            <h1 className='font-poppins text-primary font-semibold text-sm uppercase'>Social</h1>
                            <div className='flex flex-col gap-[5px] text-secondary text-sm font-montserrat leading-[24px]'>
                                <a target='_blank' href='https://www.facebook.com/share/1N36xhfBhF/'>Facebook</a>
                                <a target='_blank' href='https://www.instagram.com/pixel_panda20?igsh=NGJmYW9rZmZubjY2'>Instagram</a>
                                <a target='_blank' href='https://x.com/Pixell_Panda?t=Rrpu3XjbZSWSX5FVTPCsbA&s=09'>X</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full bg-primary py-[16px]'>
                <p className='text-[#D4D4D8] font-montserrat text-sm leading-[24px] text-center'>Copy Right © 2024 MMS IT, All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer