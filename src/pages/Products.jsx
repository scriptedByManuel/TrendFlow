import React, { useState } from 'react'
import ProductList from '../components/ProductList';
import Pagination from '../components/ui/Pagination';


const Products = () => {
  const [meta, setMeta] = useState({ products: [], loading: false })
  const [page, setPage] = useState(1);
  const limit = 8;

  return (
    <section className='w-full py-[40px]'>
      <div className='flex flex-col gap-[12px] w-1/2 mb-[40px]'>
        <h1 className='text-[28px] text-primary font-poppins font-bold uppercase'>Shop the Collection</h1>
        <p className='text-base text-justify text-secondary font-montserrat font-normal'>Explore everything we’ve got—styles that match your vibe, your mood, and your life.</p>
      </div>

      <ProductList skeletonCount={8} table='products' onDataFetched = {(data) => setMeta(data)} options={{
        page,
        limit
      }} />

      {/* Pagination controls */}
      <Pagination meta={meta} limit={limit} page={page} setPage={setPage} />


    </section>
  )
}

export default Products