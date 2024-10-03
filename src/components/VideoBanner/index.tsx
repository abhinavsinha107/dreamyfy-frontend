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
        <h5 className="text-4xl font-bold mb-4">
          Unlock Your Imagination: Discover, Learn, and Explore
        </h5>
        <p className="text-lg">
          From timeless classics to cutting-edge discoveries, there is something
          for every reader curiosity.
        </p>
      </div>
    </div>
  );
};

export default VideoBanner;
