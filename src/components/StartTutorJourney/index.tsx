import RoundButton from "../Button";
import { FaArrowRightLong } from "react-icons/fa6";
import useWindowResize from "../../hooks/useWindowResize";
import BecomeTutorMan from "../../assets/Images/BecomeTutorMan.jpg";
import { useNavigate } from "react-router-dom";

const StartTutorJourney = () => {
  const width = useWindowResize().width;
  const isMobile = width < 768;
  const navigate = useNavigate();

  return (
    <section className="py-20 sm:p-8 p-2 lg:px-32 sm:px-4 w-full sm:h-[500px] h-[500px] lg:h-[600px] bg-[#171a26]">
      <div className="w-full h-full flex border-2 rounded-lg p-2">
        {!isMobile && (
          <div className="w-1/2 flex justify-center items-center rounded-s-md bg-white">
            <img
              src={BecomeTutorMan}
              className="object-contain h-[420px] rounded-lg mx-auto"
              alt="tutorImg"
            />
          </div>
        )}
        <div className="lg:w-1/2 sm:w-full p-8 flex flex-col justify-evenly bg-white text-[#003366] rounded-e-md">
          <div className="lg:text-4xl sm:text-2xl xs:text-2xl">
            Become a Tutor.
          </div>
          <p className="lg:text-xl sm:text-sm text-xs text-[#003366]">
            Earn money by sharing your expert knowledge with students. Sign Up
            to start tutoring online with MyDreamFy.
          </p>
          <ul className="list-disc ml-8 lg:text-xl sm:text-sm text-xs">
            <li>Find new students</li>
            <li>Grow your business</li>
            <li>Get paid securely</li>
          </ul>
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
    </section>
  );
};

export default StartTutorJourney;
