import RoundButton from "../Button";
import styles from "./index.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const JoinUs = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-16 px-4"
    // className={`${styles.container}`}
    >
      <h1 className="text-gray-900 font-semibold  text-3xl md:text-4xl pb-12 text-center">Join the DreamFy family</h1>
      <div className={`${styles.cardsRemove} flex w-full flex-col justify-center gap-5 lg:flex-row`}>
        <div
          className={`${styles.cardRemove} ${styles.careersRemove} sm:mb-0 mb-2 hidden w-full m-auto h-[300px]`}
        >
          <h2 className={` ${styles.dream} text-3xl`}>Careers at DreamFy</h2>
          <div
            className={`${styles.images} flex-col w-[100%] sm:w-[70%] mx-auto`}
          >
            {/*<RoundButton*/}
            {/*  title="Marketing with Us"*/}
            {/*  icon={<FaArrowRightLong />}*/}
            {/*  style={{ marginTop: "20px" }}*/}
            {/*/>*/}
            <RoundButton
              title="Invest in Us"
              icon={<FaArrowRightLong />}
              style={{ marginTop: "20px" }}
              onClick={() => navigate("/join-us-form")}
            />
            {/* <RoundButton title="Visit Profile" icon={<FaArrowRightLong/>} style={{marginTop:"20px"}} /> */}
          </div>
          {/*<p className={`${styles.learnMore}`}>LEARN MORE</p>*/}
        </div>
        <div
          className={`${styles.cardRemove} ${styles.franchiseRemove} text-center w-full max-w-lg mx-auto`}
        >
          <h2 className={` ${styles.dream} md:text-3xl text-2xl mb-3`}>
            DreamFy franchise opportunities
          </h2>
          <p className="sm:text-xl text-sm">
            Partner with the largest tutoring brand in World
          </p>
          <div className="mt-8">
            <RoundButton
              title="Invest in Us"
              icon={<FaArrowRightLong />}
              onClick={() => navigate("/join-us-form")}
            />
          </div>
          {/*<p className={`${styles.learnMore}`}>LEARN MORE</p>*/}
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
