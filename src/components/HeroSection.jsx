import React from 'react';
import heroImage from '../assets/images/hero-image.png';

const HeroSection = () => {
    return (
        <section className="relative">
            {/* Hero Image */}
            <div>
                <img src={heroImage} alt="Hero Section" />
            </div>

            {/* Text Overlay */}
            <div className="flex flex-col gap-5 absolute left-4 sm:left-[40px] bottom-4 sm:bottom-[40px] max-w-[90%] sm:max-w-[665px]">
                <h1 className="font-poppins text-3xl sm:text-[48px] md:text-[68px] text-[#FAFAFA] font-extrabold leading-tight">
                    Own your look Own your moment
                </h1>
                <p className="font-montserrat text-base sm:text-xl text-[#FAFAFA]">
                    Step into outfits that bring comfort, confidence, and a sense of belonging.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
