import VideoBanner from "../components/VideoBanner";
import TutorCarousel from "../components/TutorCarousel";
import TutorOnboarding from "../components/TutorOnboarding";
import StartTutorJourney from "../components/StartTutorJourney";
import TestimonialCarousel from "../components/TestimonialCarousel";
import Footer from "../components/Footer/Footer";
import AnimatedNumbers from "../components/AnimatedNumbers";
import TutorsGrid from "../components/TutorsGrid";
import useWindowResize from "../hooks/useWindowResize";
import HealthSection from "../components/HealthSection";
import JoinUs from "../components/JoinUs";
import DreamPass from "../components/DreamPass";
import BrandLogo from "../components/BrandLogo";
import BackgroundLogo from "../components/backgroundLogo";
import Header from "../components/Header";

const Homepage = () => {
  const width = useWindowResize().width;
  const isLaptop = width < 1020;
  return (
    <>
      <Header />
      <VideoBanner />
      {/* {!isLaptop && <AnimatedNumbers />} */}
      <TutorsGrid />
      <TutorCarousel />
      <TutorOnboarding />
      <HealthSection />
      <StartTutorJourney />
      <JoinUs />
      <BrandLogo />
      <DreamPass />
      {/* <TestimonialCarousel /> */}
      <BackgroundLogo />
      <Footer />
    </>
  );
};

export default Homepage;
