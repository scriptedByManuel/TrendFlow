import React from 'react'
import supabase from '../supabase/supabaseClient'
import { toast } from 'sonner';

const useOrder = () => {

    const getOrderItem = async (userId) => {
        try {
            const { data, error } = await supabase.from('orders').select('*').eq('user_id', userId);
            if (error) throw error;
            return data;
        } catch (error) {
            toast.error('Failed to get order item' || error.message)
            throw error
        }
    }

    const placeOrder = async (orderItem) => {
        try {
            const { data, error } = await supabase.from('orders').insert([orderItem]).single();
            if (error) throw error;
            toast.success('Place Order Successfully!')
            return data
        } catch (error) {
            toast.error('Failed to place order' || error.message)
            throw error
        }
    }


    return {getOrderItem, placeOrder}
}

export default useOrder