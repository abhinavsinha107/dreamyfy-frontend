import useWindowResize from "../../hooks/useWindowResize";
import styles from "./index.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import Mental1 from "../../assets/Images/mental1.jpg";
import Mental2 from "../../assets/Images/mental2.jpg";
import Mental3 from "../../assets/Images/mental3.jpg";
import Mental4 from "../../assets/Images/mental4.jpg";
import Mental5 from "../../assets/Images/mental5.jpg";

const HealthSection = () => {
  const width = useWindowResize().width;
  const isMobile = width < 768;

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2>Mental Health</h2>
        <p className="text-lg italic">
          We are here to listen, support, and help you navigate your journey
          towards well-being
        </p>
        <p
          className={`rounded-full bg-white text-[#003366] p-3 text-lg flex items-center justify-around mt-6 ${styles.hoverBgTransition}`}
        >
          <span>Book a session</span>
          <FaArrowRightLong className="text-xl" />
        </p>
        {/*<p*/}
        {/*  className={`rounded-full bg-white text-[#003366] p-3 text-lg flex items-center justify-around mt-6 ${styles.hoverBgTransition}`}*/}
        {/*>*/}
        {/*  <span>Chat with Us</span>*/}
        {/*  <FaArrowRightLong className="text-xl" />*/}
        {/*</p>*/}
        {/*<p*/}
        {/*  className={`rounded-full bg-white text-[#003366] p-3 text-lg flex items-center justify-around mt-6 ${styles.hoverBgTransition}`}*/}
        {/*>*/}
        {/*  <span>Know about Us</span>*/}
        {/*  <FaArrowRightLong className="text-xl" />*/}
        {/*</p>*/}
      </div>
      {!isMobile && (
        <div className={styles.mainContent}>
          <div className="flex flex-col justify-around">
            <div
              className={`${styles.category1} h-full`}
              style={{ backgroundImage: `url(${Mental2})` }}
            >
              <span
                style={{ margin: "auto", marginBottom: 20, fontWeight: 500 }}
              >
                Meditation
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-around">
            <div
              className={styles.category}
              style={{ backgroundImage: `url(${Mental3})` }}
            >
              <span
                style={{ margin: "auto", marginBottom: 10, fontWeight: 500 }}
              >
                1 to 1 session
              </span>
            </div>
            <div
              className={styles.category}
              style={{ backgroundImage: `url(${Mental4})` }}
            >
              <span
                style={{ margin: "auto", marginBottom: 10, fontWeight: 500 }}
              >
                Emotion
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-around">
            <div
              className={styles.category}
              style={{ backgroundImage: `url(${Mental5})` }}
            >
              <span
                style={{ margin: "auto", marginBottom: 10, fontWeight: 500 }}
              >
                Health
              </span>
            </div>
            <div
              className={styles.category}
              style={{ backgroundImage: `url(${Mental1})` }}
            >
              <span
                style={{ margin: "auto", marginBottom: 10, fontWeight: 500 }}
              >
                Counselling
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthSection;
