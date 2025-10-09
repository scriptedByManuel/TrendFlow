import React, { useState } from 'react'
import { Handbag, Heart, Search, UserRound } from 'lucide-react'
import logo from '../assets/images/TrendFlowLogo.png'
import { Link } from 'react-router-dom'
import SearchModal from './SearchModal'


const NavBar = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <nav className='py-[40px] px-[80px]'>
                <div className='flex items-center justify-between'>
                    <ul>
                        <li>
                            <img src={logo} alt="" />
                        </li>
                    </ul>
                    <ul className='flex items-center font-montserrat uppercase text-sm font-medium gap-[40px] text-primary'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/products'}>Products</Link>
                        <Link to={'/about'}>About</Link>
                        <Link to={'/faq'}>Faq</Link>
                        <Link to={'/contact'}>Contact</Link>
                    </ul>
                    <ul className='flex items-center space-x-6 text-secondary'>
                        <li className='cursor-pointer' onClick={() => setOpen(true)}>
                            <Search size={20} />
                        </li>
                        <li className='cursor-pointer'>
                            <Heart size={20} />
                        </li>
                        <li className='cursor-pointer'>
                            <Handbag size={20} />
                        </li>
                        <li className='cursor-pointer'>
                            <UserRound size={20} />
                        </li>
                    </ul>
                </div>
            </nav>

            <SearchModal open={open} onClose={() => setOpen(false)} />
        </>
    )
}

export default NavBar