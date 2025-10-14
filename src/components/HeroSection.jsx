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
            <div className="flex flex-col gap-[20px] absolute left-[80px] bottom-[40px]">
                <h1 className="font-poppins text-[68px] text-[#FAFAFA] font-extrabold w-[665px] leading-tight">
                    Own your look Own your moment
                </h1>
                <p className="font-montserrat text-xl text-[#FAFAFA]">
                    Step into outfits that bring comfort, confidence, and a sense of belonging.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
