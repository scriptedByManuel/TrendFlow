import { useEffect, useState } from 'react'
import supabase from '../supabase/supabaseClient'
import { toast } from 'sonner'

const useAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signUp = async (email, password, name) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { name },
                },
            })
            if (error) throw error

            toast.success('Account created! Check your email to verify your account.')
            return data
        } catch (error) {
            toast.error(error.message || 'Failed to sign up.')
            throw error
        }
    }

    const signIn = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) throw error

            toast.success(`Welcome back, ${data?.user?.user_metadata?.name || ''}!`)
            return data
        } catch (error) {
            toast.error(error.message || 'Invalid credentials.')
            throw error
        }
    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error

            toast.success('You have logged out')
            setUser(null)
        } catch (error) {
            toast.error(error.message || 'Error signing out.')
        }
    }

    useEffect(() => {
        const loadUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        loadUser()

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null)
        })

        return () => listener.subscription.unsubscribe()
    }, [])

    return { user, loading, signUp, signIn, signOut }
}

export default useAuth
