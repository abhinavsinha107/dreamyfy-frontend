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
      className="text-gray-600 body-font bg-slate-100 py-16 px-4"
      ref={sectionRef}
    >
      <div className="container mx-auto ">
        <motion.p
          className="text-gray-900 font-semibold text-3xl md:text-4xl pb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
          transition={{ duration: 0.6 }}
        >
          How MyDreamFy works ?
        </motion.p>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-wrap -m-4">
          <motion.div
            className="lg:p-4 sm:p-4 p-2 lg:w-1/3 w-full max-h-[600px]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="h-full bg-white rounded-2xl hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 overflow-hidden">
              <div className="md:px-[30px] px-[20px] py-[20px]">
                <div className="flex gap-3 items-center mb-4">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400">
                    <TbHexagonNumber1Filled className="text-4xl text-cyan-300" />
                  </h2>
                  <h1 className="title-font text-xl font-medium text-gray-900">
                    Find a Tutor
                  </h1>
                </div>

                <p className="leading-relaxed mb-6 text-sm">
                  We will connect you to a tutor who will motivate, challenge
                  and inspire you.
                </p>

                <div className="relative w-full flex flex-col gap-3">
                  <div className="shadow-lg flex gap-3 items-center p-4 bg-white border border-gray-100 rounded-md w-full">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <img
                        // width={isMobile ? 40 : 80}
                        className="object-cover rounded-full w-full h-full"
                        src={WomenTutor}
                        alt="tutor"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex justify-between items-center">
                        <p className="flex items-center justify-between font-semibold text-sm">
                          Venice Holland
                        </p>
                        <p className="flex items-center text-xs text-gray-400">
                          Javascript
                        </p>
                      </div>
                      <p className="flex items-center text-sm">
                        Speaks English & Polish
                      </p>
                    </div>
                  </div>
                  <div className="shadow-lg flex gap-3 items-center p-4 border bg-white border-gray-100 rounded-md w-full">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <img
                        // width={isMobile ? 40 : 80}
                        className="object-cover rounded-full w-full h-full"
                        src={ManTutor2}
                        alt="tutor"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex justify-between items-center">
                        <p className="flex items-center justify-between font-semibold text-sm">
                          Venice Holland
                        </p>
                        <p className="flex items-center text-xs text-gray-400">
                          Mathematics
                        </p>
                      </div>
                      <p className="flex items-center text-sm">
                        Speaks English & German
                      </p>
                    </div>
                  </div>
                  <div className="shadow-lg flex gap-3 items-center p-4 border bg-white border-gray-100 rounded-md w-full">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <img
                        // width={isMobile ? 40 : 80}
                        className="object-cover rounded-full w-full h-full"
                        src={WomenTutor}
                        alt="tutor"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex justify-between items-center">
                        <p className="flex items-center justify-between font-semibold text-sm">
                          Venice Holland
                        </p>
                        <p className="flex items-center text-xs text-gray-400">
                          Physics
                        </p>
                      </div>
                      <p className="flex items-center text-sm">
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
            <div className="h-full bg-white rounded-2xl hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 overflow-hidden">
              <div className="md:px-[30px] px-[20px] py-[20px]">
                <div className="flex gap-3 items-center mb-4">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400">
                    <TbHexagonNumber2Filled className="text-4xl text-yellow-300" />
                  </h2>
                  <h1 className="title-font text-xl font-medium text-gray-900">
                    Start learning
                  </h1>
                </div>
                <p className="leading-relaxed mb-6 text-sm">
                  Your tutor will guide the way through your first lesson and
                  help you guide your next step.
                </p>

                <div className="relative w-full max-h-[400px]">
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
            <div className="h-full bg-white rounded-2xl hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 overflow-hidden">
              <div className="md:px-[30px] px-[20px] py-[20px]">
                <div className="flex gap-3 items-center mb-4">

                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400">
                    <TbHexagonNumber3Filled className="text-4xl text-blue-300" />
                  </h2>
                  <h1 className="title-font text-xl font-medium text-gray-900">
                    Speak. Read. Write. Repeat.
                  </h1>
                </div>

                <p className="leading-relaxed mb-6 text-sm">
                  Choose how many lessons you want to take each week and get
                  ready to reach your goals.
                </p>

                <div className="relative w-full max-h-[400px] ">
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
