import useWindowResize from "../../hooks/useWindowResize";
import bannerVideo from "../../assets/Video/banner1.mp4";
import bannerVideoMobile from "../../assets/Video/mobileBanner.mp4";
import video1 from '../../assets/Video/1.mp4';
import video2 from '../../assets/Video/2.mp4';
import video3 from '../../assets/Video/3.mp4';
import React, { useEffect } from 'react';
const VideoBanner = () => {
  const width = useWindowResize().width;
  const isMobile = width < 768;

  const videoUrl = isMobile ? bannerVideoMobile : bannerVideo;
  const videoKey = videoUrl;

  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link); 
    };
  }, []);

  return (
    
    <div className="relative h-screen bg-gradient-to-r from-orange-400 via-orange-300 to-red-600">
         <div className="absolute bottom-0 left-0 w-48 h-48">
    <div className="w-full h-full bg-orange-300 rounded-" style={{ clipPath: 'circle(90% at 0% 90%)' }}></div>
    
  </div>
  <div className="absolute top-18 right-0 w-32 h-32">
 
  <div className="w-full h-full bg-orange-600 rounded-full" style={{ clipPath: 'circle(50% at 50% 50%)' }}></div>
</div>
  
   <main className="flex items-center justify-center min-h-screen">
      <div className="flex items-center text-center px-8 w-full max-w-8xl pt-20 sm:pt-2 pb-2">
        <section className="mb-10 mx-8 text-left">
          <h1  className="lg:text-[40px] text-2xl text-center md:text-4xl md:text-left lg:text-left font-bold text-white mb-8">
            Unlock Your Imagination  
  
             Discover, Learn, and Explore Endless Possibilities
          </h1>

          <div className="flex items-center mb-6">
            <div className="relative w-full max-w-lg">
              <input
                className="flex-grow rounded-full w-full pl-4 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-gray-300 transition duration-200"
                placeholder="Ex: Coach sportif, nutritionniste..."
                type="text"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <p className="text-white mb-4 ">
          From timeless classics to groundbreaking discoveries, explore endless knowledge.
          </p>
          <hr className="max-w-lg" />
          <p className="text-center text-white max-w-lg">
          Outstanding &   - <span className="text-green-500">★★★★★</span>   - Amazing Experience!
</p>
        </section>
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="rounded shadow-lg mb-2">
              <video autoPlay loop muted className="rounded mb-2 mx-auto" width="300">
              <source src={video1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="bg-white text- rounded shadow-lg p-2">
              <p className="font-bold">Marie Dupont</p>
              <p className="text-gray-500">Coach sportif</p>
              {/* <p className="text-blue-500"></p> */}
            </div>
          </div>

          <div>
            <div className="bg-white text- rounded shadow-lg p-2">
              <p className="font-bold">Sophie Martin</p>
              <p className="text-gray-500">Nutritionniste</p>
              {/* <p className="text-blue-500"></p> */}
            </div>
            <div className="rounded shadow-lg mt-2">
              <video autoPlay loop muted className="rounded mb-2 mx-auto" width="300">
              <source src={video2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div>
            <div className="rounded shadow-lg mb-2">
              <video autoPlay loop muted className="rounded mb-2 mx-auto" width="300">
              <source src={video3} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="bg-white text- rounded shadow-lg p-2">
              <p className="font-bold">Clara Bernard</p>
              <p className="text-gray-500">Psychologue</p>
              {/* <p className="text-blue-500"></p> */}
            </div>
          </div>
        </div>
      </div>
    </main>


    </div>
  );
};

export default VideoBanner;
