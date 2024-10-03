import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import useWindowResize from "../../hooks/useWindowResize";
import logo1 from "../../assets/Images/logo1.jpg";
import logo2 from "../../assets/Images/logo2.png";

const BrandLogo = () => {
  const width = useWindowResize().width;
  const isMobile = width < 800;
  const isTab = width < 1160 && width > 768;

  const logos = [
    { src: logo1 },
    { src: logo2 },
    { src: logo1 },
    { src: logo2 },
    { src: logo1 },
    { src: logo2 },
  ];

  return (
    <Swiper
      modules={[Navigation]}
      className="bg-gradient-to-b from-[#171a26] via-[#bfc5d4] to-[#171a26]"
      spaceBetween={50}
      loop={true}
      centeredSlides={isMobile ? true : false}
      slidesPerView={isTab ? 3 : isMobile ? 2 : 4}
      allowSlideNext={true}
      allowSlidePrev={true}
      slidesPerGroup={1}
      navigation
      style={{
        paddingRight: isMobile ? "0px" : "40px",
        paddingLeft: isMobile ? "-40px" : "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper: any) => console.log(swiper)}
    >
      {logos.map((logo, index) => (
        <SwiperSlide
          key={index}
          className={`flex justify-center items-center my-16`}
          style={{ display: "flex" }}
        >
          <img src={logo.src} alt="logo" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BrandLogo;
