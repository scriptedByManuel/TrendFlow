import React, { useEffect, useState } from 'react'
import supabase from '../supabase/supabaseClient'
import { Link } from 'react-router-dom'

const CategoryList = ({quantity}) => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const getCategories = async () => {
        setLoading(true)
        const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: true }).limit(quantity)
        if (error) {
            console.error('Error fetching categories:', error)
            setLoading(false)
            return;
        }
        setCategories(data)
        setLoading(false)
    }

    useEffect(() => {
        getCategories();
    }, [])
    return (
        <div className="mt-[24px] grid grid-cols-4 gap-[20px]">
            {loading
                ?
                Array.from({ length: quantity }).map((_, i) => (
                    <div
                        key={i}
                        className="w-[265px] h-[200px] rounded-md bg-gray-200 animate-pulse relative overflow-hidden flex items-end p-[20px]"
                    >
                        {/* Text skeleton */}
                        <div className="absolute bottom-[20px] left-[20px] w-[100px] h-[20px] bg-gray-300 rounded"></div>

                        {/* Image skeleton shape */}
                        <div className="absolute right-[-60%] bottom-0 top-[15%] w-[310px] h-[310px] bg-gray-300 rounded-full opacity-70"></div>
                    </div>
                ))
                :
                categories?.map((category) => (
                    <Link
                        to={`/categories/${category.title}`}
                        key={category.id}
                        className="cursor-pointer p-[20px] relative w-[265px] h-[200px] rounded-md bg-[#E6E6E6] overflow-hidden flex items-end transition-transform hover:-translate-y-1 hover:shadow-md"
                    >
                        <p className="font-inter text-[#3F3F46] font-medium text-xl leading-[100%] z-10">
                            {category.title}
                        </p>

                        {/* Image Wrapper */}
                        <div className="absolute right-[-62%] bottom-0 top-[15%] w-[330px] h-[330px] flex items-end justify-center overflow-hidden">
                            <img
                                src={category.image}
                                alt={category.title}
                                className="object-cover w-full h-full select-none pointer-events-none"
                            />
                        </div>
                    </Link>
                ))}
        </div>
    )
}

export default CategoryList