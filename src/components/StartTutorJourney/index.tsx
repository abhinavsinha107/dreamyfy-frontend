import RoundButton from "../Button";
import { FaArrowRightLong } from "react-icons/fa6";
import useWindowResize from "../../hooks/useWindowResize";
import BecomeTutorMan from "../../assets/Images/BecomeTutorMan.png";
import { useNavigate } from "react-router-dom";

const StartTutorJourney = () => {
  const width = useWindowResize().width;
  const isMobile = width < 768;
  const navigate = useNavigate();

  return (
    <section className="md:py-16 py-8 sm:p-8 px-4 p-2 sm:px-4 w-full sm:h-[500px]  lg:h-[600px] bg-[#171a26]">
      <div className="container mx-auto h-full flex rounded-lg md:p-2">
        {!isMobile && (
          <div className="w-5/12 flex justify-center items-center rounded-s-md bg-white bg-opacity-5">
            <img
              src={BecomeTutorMan}
              className="object-contain h-[420px] rounded-lg mx-auto"
              alt="tutorImg"
            />
          </div>
        )}
        <div className="lg:w-7/12 sm:w-full  md:p-8 flex flex-col justify-center gap-y-6 md:gap-y-0 md:justify-evenly md:bg-opacity-5 md:bg-white rounded-e-md">
          <div className="lg:text-4xl md:text-3xl text-2xl text-white">
            Become a Tutor.
          </div>
          <p className="lg:text-xl sm:text-sm text-xs text-white">
            Earn money by sharing your expert knowledge with students. Sign Up
            to start tutoring online with MyDreamFy.
          </p>
          <ul className="list-disc ml-0 pl-5 lg:text-xl sm:text-sm text-xs text-white">
            <li>Find new students</li>
            <li>Grow your business</li>
            <li>Get paid securely</li>
          </ul>
          <div className="w-full max-w-52">
            <RoundButton
              title="Become a tutor"
              style={{
                height: `${isMobile ? "40px" : ""}`,
                fontSize: `${isMobile ? "14px" : ""}`,
              }}
              icon={<FaArrowRightLong />}
              onClick={() => navigate("/become-a-tutor")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartTutorJourney;
