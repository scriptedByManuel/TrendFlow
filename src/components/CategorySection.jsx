import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CategoryList from './CategoryList'

const CategorySection = () => {
    
    return (
        <section className='px-[80px] mt-[80px]'>
            <div className='flex flex-col'>
                {/* Heading */}
                <div className='flex flex-col gap-[8px]'>
                    <h1 className='text-primary font-poppins font-bold text-2xl uppercase leading-[100%]'>Shop by Category</h1>
                    <p className='text-secondary font-montserrat text-base leading-[100%]'>Explore our collections and find the perfect pieces for every moment.</p>
                </div>
                {/* category lists */}
                <CategoryList quantity={4} />

                {/* Detail */}
                <div className='flex flex-col items-center mt-[30px] gap-[4px]'>
                    <p className='text-secondary font-montserrat text-sm leading-[24px]'>Explore Our Collection – Find Exactly What You’re Looking For</p>
                    <Link className='flex items-center gap-[8px] py-[15px]' to='/categories'>
                        <p className='text-primary font-montserrat text-base underline leading-[24px]'>View all categories</p>
                        <ArrowUpRight size={18} className='text-primary' />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CategorySection