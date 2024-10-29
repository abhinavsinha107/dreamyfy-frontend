import useWindowResize from "../../hooks/useWindowResize";
import bannerVideo from "../../assets/Video/banner1.mp4";
import bannerVideoMobile from "../../assets/Video/mobileBanner.mp4";

const VideoBanner = () => {
  const width = useWindowResize().width;
  const isMobile = width < 768;

  const videoUrl = isMobile ? bannerVideoMobile : bannerVideo;
  const videoKey = videoUrl;

  return (
    <div className="relative h-screen">
      <video
        key={videoKey}
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      <div className="relative z-5 flex flex-col items-center justify-center h-full text-center text-white">
        <h5 className="sm:text-4xl text-2xl font-bold mb-4">
          Unlock Your Imagination <br /> Discover, Learn, and Explore
        </h5>
        <p className="sm:text-lg text-base font-light">
          From timeless classics to cutting-edge discoveries, there is something
          for every reader curiosity.
        </p>

        <div className="absolute z-5 bottom-5 left-0 right-0">
          <div className="flex gap-4 justify-center w-full">
            <div>
              <iframe width="150" style={{ aspectRatio: 16 / 9 }} src="https://www.youtube.com/embed/9xwazD5SyVg" title="Dummy Video For YouTube API Test" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div>
              <iframe width="150" style={{ aspectRatio: 16 / 9 }} src="https://www.youtube.com/embed/9xwazD5SyVg" title="Dummy Video For YouTube API Test" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div>
              <iframe width="150" style={{ aspectRatio: 16 / 9 }} src="https://www.youtube.com/embed/9xwazD5SyVg" title="Dummy Video For YouTube API Test" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default VideoBanner;
