import React from 'react';
import useWindowResize from "../../hooks/useWindowResize";
import videoUrl from '../../assets/Images/background.jpg';

const InnerVideobanner = ({ bannerTitle }) => {
    const width = useWindowResize().width;

    return (
        <div className="relative h-32 md:h-80">
            <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={videoUrl}
                alt="Background"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
            <div className="relative z-5 flex flex-col items-center justify-center md:justify-end  md:pb-10 h-full text-center text-white">
                <h5 className="sm:text-4xl text-2xl font-bold mb-4">
                    {bannerTitle}
                </h5>
            </div>
        </div>
    );
};

export default InnerVideobanner;
