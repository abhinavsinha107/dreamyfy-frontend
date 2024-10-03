import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import StudentTestimonialCard from "../StudentTestimonialCard";
import useWindowResize from "../../hooks/useWindowResize";
import ManTutor1 from "../../assets/Images/ManTutor1.jpg";
import ManTutor2 from "../../assets/Images/ManTutor2.jpg";
import WomenTutor from "../../assets/Images/WomenTutor.jpg";

const TestimonialCarousel = () => {
  const width = useWindowResize().width;
  const isMobile = width < 800;
  const isTab = width < 1160 && width > 768;

  const tutors = [
    { src: ManTutor1 },
    { src: ManTutor2 },
    { src: WomenTutor },
    { src: ManTutor1 },
    { src: ManTutor2 },
    { src: WomenTutor },
    { src: ManTutor1 },
    { src: ManTutor2 },
    { src: WomenTutor },
  ];

  return (
    <div
      className="py-16 px-4 text-white bg-[#171a26]"
    >
     <p className="lg:text-3xl sm:text-lg md:text-xl mb-6 font-bold leading-6 text-center">
        Thousands of Parents, Students and Teachers have rated us 5/5.
      </p>
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        loop={true}
        centeredSlides={isMobile ? true : false}
        slidesPerView={isTab ? 2 : isMobile ? 1 : 3}
        allowSlideNext={true}
        allowSlidePrev={true}
        slidesPerGroup={1}
        navigation
        style={{
          paddingRight: isMobile ? '0px' : '40px',
          paddingLeft: isMobile ? '-40px' : '40px',
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper: any) => console.log(swiper)}
      >
        {tutors.map((tutor, index) => (
          <SwiperSlide
            key={index}
            className={`flex justify-center items-center`}
            style={{ display: "flex" }}
          >
            <StudentTestimonialCard src={tutor.src} isMobile={isMobile} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialCarousel;
