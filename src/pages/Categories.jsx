import { Car } from 'lucide-react'
import React from 'react'
import CategoryList from '../components/CategoryList'

const Categories = () => {
    return (
        <section className='w-full py-[40px]'>
            <div className='flex flex-col gap-[12px]'>
                <h1 className='text-primary font-poppins text-2xl font-bold leading-[100%]'>All Categories</h1>
                <p className='text-primary font-montserrat text-base leading-[100%]'>Relaxed fits for everyday wear.</p>
            </div>
            <CategoryList quantity={5} />
      </section>
  )
}

export default Categories