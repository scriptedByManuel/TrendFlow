import React from 'react'
import { Handbag, Heart, Search, UserRound } from 'lucide-react'
import logo from '../assets/images/TrendFlowLogo.png'
import { Link } from 'react-router-dom'


const NavBar = () => {
    return (
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
                    <li>
                        <Search size={20} />
                    </li>
                    <li>
                        <Heart size={20} />
                    </li>
                    <li>
                        <Handbag size={20} />
                    </li>
                    <li>
                        <UserRound size={20} />
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar