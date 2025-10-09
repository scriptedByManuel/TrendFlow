import React, { useEffect } from 'react'
import useSupabaseFetch from '../hooks/useSupabaseFetch'
import ProductCard from './ProductCard'
import ProductSkeleton from './ProductSkeleton'

const ProductList = ({ table, options, onDataFetched, skeletonCount }) => {

    const { data: products, loading, error } = useSupabaseFetch(table, options)


    useEffect(() => {
        if (onDataFetched) {
            onDataFetched({ products, loading, error })
        }
    }, [products, loading, error])
    
  return (
      <div className="mt-[24px] grid grid-cols-4 gap-[20px]">
          {loading
              ? // Skeletons while loading
              Array.from({ length: skeletonCount}).map((_, index) => (
                  <ProductSkeleton key={index} />
              ))
              : // Product cards once loaded
              products.map((product) => (
                  <ProductCard key={product.id} product={product} />
              ))}
      </div>
  )
}

export default ProductList