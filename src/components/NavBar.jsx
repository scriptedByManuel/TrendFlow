import React, { useState } from 'react'
import { Search, UserRound } from 'lucide-react'
import logo from '../assets/images/TrendFlowLogo.png'
import { Link } from 'react-router-dom'
import SearchModal from './SearchModal'
import WishlistIcon from './WishListIcon'
import CartIcon from './CartIcon'


const NavBar = () => {
    const [open, setOpen] = useState(false)


    return (
        <>
            <nav className='py-6 px-4 sm:py-[40px] sm:px-[80px]'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <img src={logo} alt="" className='h-8 sm:h-auto' />
                    </div>

                    {/* Desktop nav links: hide on small screens */}
                    <ul className='hidden md:flex items-center font-montserrat uppercase text-sm font-medium gap-6 md:gap-[40px] text-primary'>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/products'}>Products</Link>
                        <Link to={'/about'}>About</Link>
                        <Link to={'/faq'}>Faq</Link>
                        <Link to={'/contact'}>Contact</Link>
                    </ul>

                    {/* Right side icons */}
                    <ul className='flex items-center space-x-4 sm:space-x-6 text-secondary'>
                        <li className='cursor-pointer' onClick={() => setOpen(true)}>
                            <Search size={20} />
                        </li>
                        <WishlistIcon />
                        <CartIcon />
                        <Link to={'/my-account/personal-information'} className='cursor-pointer'>
                            <UserRound size={20} />
                        </Link>
                    </ul>
                </div>
            </nav>

            <SearchModal open={open} onClose={() => setOpen(false)} />
        </>
    )
}

export default NavBar