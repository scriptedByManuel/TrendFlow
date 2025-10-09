import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import ProductList from './ProductList'

const LatestStyleSection = () => {
  return (
    <section className='px-[80px] my-[80px]'>
      <div className='flex flex-col'>
        {/* Heading */}
        <div className='flex flex-col gap-[8px]'>
          <h1 className='text-primary font-poppins font-bold text-2xl uppercase leading-[100%]'>Explore Our Latest Styles</h1>
          <p className='text-secondary font-montserrat text-base leading-[100%]'>Find clothes that match your vibe and make every day better.</p>
        </div>
        {/* Product lists */}
        <ProductList skeletonCount={4} table='products' options={{
          filter: { column: "is_latest", operator: "eq", value: true },
          limit: 4
        }} />

        {/* Detail */}
        <div className='flex flex-col mt-[30px] items-center gap-[4px]'>
          <p className='text-secondary font-montserrat text-sm leading-[24px]'>Discover all our styles and find the look that’s made for you!</p>
          <Link className='flex items-center gap-[8px] py-[15px]' to='/products'>
            <p className='text-primary font-montserrat text-base underline leading-[24px]'>View all products</p>
            <ArrowUpRight size={18} className='text-primary' />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LatestStyleSection