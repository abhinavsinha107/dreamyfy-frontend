import pass1 from "../../assets/Images/pass1.jpg";
import pass2 from "../../assets/Images/pass2.jpg";
import pass3 from "../../assets/Images/pass3.jpg";

const DreamPass = () => {
  return (
    <div className="bg-[#171a26] relative py-20 px-5">
      <div className="text-center font-bold text-white w-full max-w-[60vw] md:text-6xl sm:text-4xl text-2xl mx-auto mb-10">
        One membership for all your learning needs
      </div>
      <div className="flex flex-col sm:flex-row w-full h-[500px] sm:h-[400px] justify-between items-center gap-5">
        <img
          className="rounded-lg sm:h-[300px] h-[200px] w-full sm:w-auto object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
          src={pass1}
          alt="Dream Pass Image 1"
        />
        <img
          className="rounded-lg sm:h-[300px] h-[200px] w-full sm:w-auto object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out sm:mt-auto"
          src={pass2}
          alt="Dream Pass Image 2"
        />
        <img
          className="rounded-lg sm:h-[300px] h-[200px] w-full sm:w-auto object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
          src={pass3}
          alt="Dream Pass Image 3"
        />
      </div>
    </div>
  );
};

export default DreamPass;
