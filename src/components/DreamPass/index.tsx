import pass1 from "../../assets/Images/pass1.jpg";
import pass2 from "../../assets/Images/pass2.jpg";
import pass3 from "../../assets/Images/pass3.jpg";

const DreamPass = () => {
  return (
    <div className="container mx-auto relative py-16 px-4">
      <div className="text-center font-bold text-black w-full md:text-4xl sm:text-4xl text-2xl mx-auto mb-10">
        One membership for all your learning needs
      </div>
      <div className="flex gap-5">
        <div className="flex">
          <img
            className="aspect-square object-cover"
            src={pass1}
            alt="Dream Pass Image 1"
          />
        </div>
        <div className="flex">
          <img
            className="aspect-square object-cover"
            src={pass2}
            alt="Dream Pass Image 2"
          />
        </div>
        <div className="flex">
          <img
            className="aspect-square object-cover"
            src={pass3}
            alt="Dream Pass Image 3"
          />
        </div>
      </div>
    </div>
  );
};

export default DreamPass;
