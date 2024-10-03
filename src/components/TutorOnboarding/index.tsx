import {
  TbHexagonNumber1Filled,
  TbHexagonNumber2Filled,
  TbHexagonNumber3Filled,
} from "react-icons/tb";
import useWindowResize from "../../hooks/useWindowResize";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import WomenTutor from "../../assets/Images/WomenTutor.jpg";
import ManTutor2 from "../../assets/Images/ManTutor2.jpg";
import StudentOnCall from "../../assets/Images/studentOnCall.jpg";
import LearnAndRepeat from "../../assets/Images/LearnAndRepeat.jpg";

const TutorOnboarding = () => {
  const width = useWindowResize().width;
  const isMobile = width < 470;

  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      className="text-gray-600 body-font bg-[#171a26] px-[40px]"
      ref={sectionRef}
    >
      <motion.p
        className="text-white text-4xl lg:p-6 sm:p-2 p-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
        transition={{ duration: 0.6 }}
      >
        How MyDreamFy works ?
      </motion.p>
      <div className="container px-5 py-6 mx-auto">
        <div className="flex flex-wrap -m-4">
          <motion.div
            className="lg:p-4 sm:p-4 p-2 lg:w-1/3 w-full max-h-[600px]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="h-full border-2 bg-white border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <div className="px-[30px] py-[20px]">
                <div>
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    <TbHexagonNumber1Filled className="text-4xl text-cyan-300" />
                  </h2>
                  <h1 className="title-font text-3xl font-bold text-gray-900 mb-3">
                    Find a Tutor
                  </h1>
                </div>

                <p className="leading-relaxed mb-3">
                  We will connect you to a tutor who will motivate, challenge
                  and inspire you.
                </p>

                <div className="relative w-full h-[400px]">
                  <div className="absolute top-8 z-20 flex p-4 bg-white border border-gray-300 rounded-md w-[82%]">
                    <img
                      width={isMobile ? 40 : 80}
                      className="object-contain "
                      src={WomenTutor}
                      alt="tutor"
                    />
                    <div className="flex flex-col justify-around sm:h-[120px] h-[80px] p-1 w-full">
                      <p className="flex items-center justify-between h-1/3 px-2 sm:text-sm text-xs">
                        Venice Holland
                      </p>
                      <p className="flex items-center h-1/3 px-2 sm:text-sm text-xs">
                        Javascript
                      </p>
                      <p className="flex items-center h-1/3 px-2 sm:text-sm text-xs">
                        Speaks English & Polish
                      </p>
                    </div>
                  </div>
                  <div className="flex absolute z-10 top-32 left-8 p-4 border bg-white border-gray-300 rounded-md w-[84%]">
                    <img
                      width={isMobile ? 40 : 80}
                      className="object-contain "
                      src={ManTutor2}
                      alt="tutor"
                    />
                    <div className="flex flex-col justify-around sm:h-[120px] h-[80px] p-1 w-full">
                      <p className="flex items-center justify-between h-1/3 px-2 sm:text-sm text-xs">
                        Venice Holland
                      </p>
                      <p className="flex items-center h-1/3 px-2 sm:text-sm text-xs">
                        Mathematics
                      </p>
                      <p className="flex items-center h-1/3 px-2 sm:text-sm text-xs">
                        Speaks English & German
                      </p>
                    </div>
                  </div>
                  <div className="flex absolute top-56 left-16 p-4 border bg-white border-gray-300 rounded-md w-[86%]">
                    <img
                      width={isMobile ? 40 : 80}
                      className="object-contain"
                      src={WomenTutor}
                      alt="tutor"
                    />
                    <div className="flex flex-col justify-around sm:h-[120px] h-[80px] p-1 w-full">
                      <p className="flex items-center justify-between h-1/3 px-2 sm:text-sm text-xs">
                        Venice Holland
                      </p>
                      <p className="flex items-center h-1/3 px-2 sm:text-sm text-xs">
                        Physics
                      </p>
                      <p className="flex items-center h-1/3 px-2 sm:text-sm text-xs">
                        Speaks English & French
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="lg:p-4 sm:p-4 p-2 lg:w-1/3 w-full"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="h-full border-2 bg-white border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <div className="px-[30px] py-[20px]">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  <TbHexagonNumber2Filled className="text-4xl text-yellow-300" />
                </h2>
                <h1 className="title-font text-3xl font-bold text-gray-900 mb-3">
                  Start learning
                </h1>
                <p className="leading-relaxed mb-3">
                  Your tutor will guide the way through your first lesson and
                  help you guide your next step.
                </p>

                <div className="relative w-full max-h-[400px] p-4 border rounded-md border-gray-300 lg:pt-12 sm:pt-4">
                  <motion.img
                    src={StudentOnCall}
                    className="object-cover rounded-md"
                    alt="student on call"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="lg:p-4 sm:p-4 p-2 lg:w-1/3 w-full"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="h-full border-2 bg-white border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <div className="px-[30px] py-[20px]">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  <TbHexagonNumber3Filled className="text-4xl text-blue-300" />
                </h2>
                <h1 className="title-font text-3xl font-bold text-gray-900 mb-3">
                  Speak. Read. Write. Repeat.
                </h1>
                <p className="leading-relaxed mb-3">
                  Choose how many lessons you want to take each week and get
                  ready to reach your goals.
                </p>

                <div className="relative w-full max-h-[400px] p-4 border rounded-md border-gray-300 lg:pt-12 sm:pt-4">
                  <motion.img
                    src={LearnAndRepeat}
                    className="object-cover rounded-md"
                    alt="student on call"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TutorOnboarding;
