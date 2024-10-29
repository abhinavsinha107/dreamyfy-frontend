import useWindowResize from "../../hooks/useWindowResize";
import styles from "./index.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import Mental1 from "../../assets/Images/mental1.jpg";
import Mental2 from "../../assets/Images/mental2.jpg";
import Mental3 from "../../assets/Images/mental3.jpg";
import Mental4 from "../../assets/Images/mental4.jpg";
import Mental5 from "../../assets/Images/mental5.jpg";
import { useNavigate } from "react-router-dom";

const HealthSection = () => {
  const navigate = useNavigate();
  const width = useWindowResize().width;
  const isMobile = width < 768;
  const handleBookSession = () => {
    navigate("/book-a-session");
  }
  const handleChatWithUs = () => {
    navigate("/chat-with-us");
  }

  return (
    <div className="container mx-auto py-16"
    // className={styles.container} 
    >
      <div className="flex gap-10 md:flex-row flex-col">
        <div className="md:w-4/12 w-full p-5"
        // className={styles.sidebar}
        >
          <h2 className="text-2xl font-bold">Mental Health</h2>
          <p className="text-base">
            We are here to listen, support, and help you navigate your journey
            towards well-being
          </p>
          <button
            className={`rounded-full bg-white text-[#003366] hover:text-white gap-3 hover:bg-[#161E2F] p-3 px-5 w-full text-lg flex items-center justify-between mt-6 transition-all duration-500 border border-[#003366] `}
            style={{ cursor: 'pointer' }}
            onClick={handleBookSession}
          >
            <span>Book a session</span>
            <FaArrowRightLong className="text-xl" />
          </button>
          <button
            className={`rounded-full hover:bg-white hover:text-[#003366] text-white gap-3 bg-[#161E2F] p-3 px-5 w-full text-lg flex items-center justify-between mt-6 transition-all duration-500 border border-[#003366] `}
            style={{ cursor: 'pointer' }}
            onClick={handleChatWithUs}
          >
            <span>Chat with Us</span>
            <FaArrowRightLong className="text-xl" />
          </button>
          {/*<p*/}
          {/*  className={`rounded-full bg-white text-[#003366] p-3 text-lg flex items-center justify-around mt-6 ${styles.hoverBgTransition}`}*/}
          {/*>*/}
          {/*  <span>Know about Us</span>*/}
          {/*  <FaArrowRightLong className="text-xl" />*/}
          {/*</p>*/}
        </div>
        {!isMobile && (
          <div className="grid grid-cols-3 gap-5 w-full md:w-8/12"
          // className={styles.mainContent}
          >
            <div className="flex flex-col justify-between">
              <div
                className={`${styles.category1} h-full`}
                style={{ backgroundImage: `url(${Mental2})` }}
              >
                <p className="rounded-full bg-[#161e2f] text-sm px-3 py-1"
                >
                  Meditation
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div
                className={styles.category}
                style={{ backgroundImage: `url(${Mental3})` }}
              >
                <p className="rounded-full bg-[#161e2f] text-sm px-3 py-1"
                >
                  1 to 1 session
                </p>
              </div>
              <div
                className={styles.category}
                style={{ backgroundImage: `url(${Mental4})` }}
              >
                <p className="rounded-full bg-[#161e2f] text-sm px-3 py-1"
                >
                  Emotion
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div
                className={styles.category}
                style={{ backgroundImage: `url(${Mental5})` }}
              >
                <p className="rounded-full bg-[#161e2f] text-sm px-3 py-1"
                >
                  Health
                </p>
              </div>
              <div
                className={styles.category}
                style={{ backgroundImage: `url(${Mental1})` }}
              >
                <p className="rounded-full bg-[#161e2f] text-sm px-3 py-1"
                >
                  Counselling
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default HealthSection;
