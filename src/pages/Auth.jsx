import React, { useEffect, useState } from 'react'
import authImage from '../assets/images/auth-photo.png'
import logo from '../assets/images/TrendFlowLogo.png'
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';


const AuthPage = () => {


    const [mode, setMode] = useState('signUp'); // 'signIn' or 'signUp'
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, } = useForm();
    const { signUp, signIn } = useAuth();

    useEffect(() => {
        reset(); // reset all fields whenever mode changes
    }, [mode, reset]);


    const onSubmit = async (formdata) => {
        const { name, phone, email, password } = formdata;
        setLoading(true);

        try {
            if (mode === 'signUp') {
                await signUp(email, password, name, phone);
            } else {
                await signIn(email, password);
            }
            reset()
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen p-4 sm:p-[20px]'>
            <div className='flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-[80px]'>
                <div className='w-full lg:w-[645px] h-[320px] sm:h-[832px] overflow-hidden rounded-lg'>
                    <img className='w-full h-full object-cover' src={authImage} alt="Auth Image" />
                </div>
                <div className='w-full lg:w-[455px] flex flex-col gap-8 sm:gap-[40px] items-center p-4 sm:p-[20px]'>
                    <div>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className='flex flex-col gap-[32px] w-full'>
                        <div className='flex flex-col gap-[8px]'>
                            <h1 className='font-poppins text-primary text-xl text-center font-bold leading-[100%]'>{mode === 'signUp' ? 'Create Your account' : 'Welcome Back!'} </h1>
                            <p className='font-montserrat text-secondary text-sm text-center leading-[150%]'> {mode === 'signUp' ? 'Create an account to start shopping, track your orders, and get the latest updates.' : 'Sign in to access your account, check your orders, and find your next favorite look.'}</p>
                        </div>
                        <div className='flex flex-col gap-[24px]'>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[24px]'>
                                <div className='flex flex-col gap-[12px]'>
                                    {mode === 'signUp' && (
                                        <>
                                            {/* Name */}
                                            <div className="flex flex-col gap-1">
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    className="w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200"
                                                    {...register('name', {
                                                        required: 'Name is required',
                                                        minLength: { value: 2, message: 'Name must be at least 2 characters' },
                                                    })}
                                                />
                                                {errors.name && <p className="text-red-500 text-xs font-montserrat">{errors.name.message}</p>}
                                            </div>

                                            {/* Phone Number */}
                                            <div className="flex flex-col gap-1">
                                                <input
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    className="w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200"
                                                    {...register('phone', {
                                                        required: 'Phone number is required',
                                                        pattern: {
                                                            value: /^[0-9+\-\s()]*$/,
                                                            message: 'Enter a valid phone number',
                                                        },
                                                    })}
                                                />
                                                {errors.phone && <p className="text-red-500 text-xs font-montserrat">{errors.phone.message}</p>}
                                            </div>
                                        </>
                                    )}


                                    <div className="flex flex-col gap-1">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: 'Enter a valid email address',
                                                },
                                            })}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs font-montserrat">{errors.email.message}</p>}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="w-full py-[12px] px-[16px] outline-none border border-[#E4E4E7] rounded-lg text-secondary font-montserrat text-sm h-[45px] focus:border-gray-500 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 transition-all duration-200"
                                            {...register('password', {
                                                required: 'Password is required',
                                                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                            })}
                                        />
                                        {errors.password && (
                                            <p className="text-red-500 text-xs font-montserrat">{errors.password.message}</p>
                                        )}
                                    </div>

                                    {mode === 'signUp' && (
                                        <div className="flex items-start gap-[8px]">
                                            <input
                                                id="terms"
                                                type="checkbox"
                                                className="mt-[2px] border-2 border-[#E4E4E7] rounded-sm"
                                                {...register('terms', {
                                                    required: 'You must accept the Terms & Conditions',
                                                })}
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="font-montserrat text-sm text-secondary leading-[20px]"
                                            >
                                                I accept the Terms & Conditions and Privacy Policy
                                            </label>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-primary px-[16px] w-full h-[54px] rounded-lg active:bg-gray-800 active:scale-95 transition-all duration-200 disabled:opacity-70"
                                >
                                    <p className="text-[#FAFAFA] font-montserrat font-semibold text-sm leading-[20%]">
                                        {loading
                                            ? 'Please wait...'
                                            : mode === 'signUp'
                                                ? 'Sign Up'
                                                : 'Sign In'}
                                    </p>
                                </button>
                            </form>


                            {/* Switch mode */}
                            <div className='flex items-center justify-center gap-[8px]'>
                                <p className='font-montserrat text-sm text-secondary leading-[20px]'>{mode === 'signUp' ? 'Already have an account?' : 'Don’t have an account?'}</p>
                                {mode === 'signUp' ? (
                                    <p onClick={() => setMode('signIn')} className='cursor-pointer font-montserrat text-sm text-primary font-semibold underline leading-[20px]'>Sign in</p>

                                ) : (
                                    <p onClick={() => setMode('signUp')} className='cursor-pointer font-montserrat text-sm text-primary font-semibold underline leading-[20px]'>Sign up</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage