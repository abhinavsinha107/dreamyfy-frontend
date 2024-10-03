import FeaturedTutorCard from "../FeaturedTutorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import useWindowResize from "../../hooks/useWindowResize";
import ManTutor1 from "../../assets/Images/ManTutor1.jpg";
import ManTutor2 from "../../assets/Images/ManTutor2.jpg";
import WomenTutor from "../../assets/Images/WomenTutor.jpg";
import {useEffect} from "react";
import {useGetAllSubjectsQuery, useGetTutorsDetailsQuery} from "../../services/api.ts";

const TutorCarousel = () => {
  const width = useWindowResize().width;
  const isMobile = width < 600;
  const isTab = width < 769 && width >= 600;
  const isLaptop = width < 1200 && width >= 769;
    const { data: tutorsResponse} = useGetTutorsDetailsQuery();


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
    <Swiper
      modules={[Navigation]}
      spaceBetween={isMobile ? 10 : isTab ? 15 : 20}
      loop={true}
      slidesPerView={isLaptop ? 3 : isTab ? 2 : isMobile ? 1 : 4}
      centeredSlides={isMobile}
      slidesPerGroup={isMobile ? 1 : 2}
      style={{
        paddingRight: isMobile ? "20px" : "40px",
        paddingLeft: isMobile ? "20px" : "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(242 247 255)",
      }}
      navigation
      onSlideChange={() => console.log("slide change")}
    >
      {tutorsResponse && tutorsResponse.data.map((tutor, index) => (
          <div>
        <SwiperSlide key={index} className="flex justify-center items-center">
            <FeaturedTutorCard src={tutor} />
        </SwiperSlide>
          </div>
      ))}
    </Swiper>
  );
};

export default TutorCarousel;
