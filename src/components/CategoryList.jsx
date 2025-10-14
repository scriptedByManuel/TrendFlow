import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase/supabaseClient'

/**
 * CategoryList Component
 * ----------------------
 * Fetches and displays a list of product categories from Supabase.
 * Supports dynamic quantity limit and loading skeletons for better UX.
 *
 * Props:
 * - quantity (number): limits how many categories to display.
 */
const CategoryList = ({ quantity }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  /**
   * Fetch categories from Supabase
   * Sorted by creation time (ascending).
   */
  const getCategories = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(quantity)

      if (error) throw error
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategories()
  }, [quantity])

  return (
    <div className="mt-[24px] grid grid-cols-4 gap-[20px]">
      {/* Loading skeleton placeholders */}
      {loading ? (
        Array.from({ length: quantity }).map((_, i) => (
          <div
            key={i}
            className="w-[265px] h-[200px] rounded-md bg-gray-200 animate-pulse relative overflow-hidden flex items-end p-[20px]"
          >
            {/* Text skeleton */}
            <div className="absolute bottom-[20px] left-[20px] w-[100px] h-[20px] bg-gray-300 rounded" />

            {/* Circular image placeholder */}
            <div className="absolute right-[-60%] bottom-0 top-[15%] w-[310px] h-[310px] bg-gray-300 rounded-full opacity-70" />
          </div>
        ))
      ) : (
        // Category cards
        categories?.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.title}`}
            className="cursor-pointer p-[20px] relative w-[265px] h-[200px] rounded-md bg-[#E6E6E6] overflow-hidden flex items-end transition-transform hover:-translate-y-1 hover:shadow-md"
          >
            {/* Category title */}
            <p className="font-inter text-[#3F3F46] font-medium text-xl leading-[100%] z-10">
              {category.title}
            </p>

            {/* Image overlay */}
            <div className="absolute right-[-62%] bottom-0 top-[15%] w-[330px] h-[330px] flex items-end justify-center overflow-hidden">
              <img
                src={category.image}
                alt={category.title}
                className="object-cover w-full h-full select-none pointer-events-none"
              />
            </div>
          </Link>
        ))
      )}
    </div>
  )
}

export default CategoryList
