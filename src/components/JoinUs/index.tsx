import RoundButton from "../Button";
import styles from "./index.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

const JoinUs = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.container}`}>
      <h1 className="sm:text-4xl text-3xl my-2">Join the DreamFy family</h1>
      <div className={`${styles.cards} flex-col lg:flex-row`}>
        <div
          className={`${styles.card} ${styles.careers} sm:w-[45%] sm:mb-0 mb-2 w-[95%] m-auto h-[300px]`}
        >
          <h2 className="text-2xl">Careers at DreamFy</h2>
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
          className={`${styles.card} ${styles.franchise} sm:w-[45%] sm:mb-0 mb-2 w-[95%] m-auto h-[300px]`}
        >
          <h2 className={` ${styles.dream} text-3xl`}>
            DreamFy franchise opportunities
          </h2>
          <p className="text-xl">
            Partner with the largest tutoring brand in World
          </p>
          {/*<p className={`${styles.learnMore}`}>LEARN MORE</p>*/}
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
