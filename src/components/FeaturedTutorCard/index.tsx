import { FaStar } from "react-icons/fa";
import RoundButton from "../Button";
import ManTutor1 from "../../assets/Images/ManTutor1.jpg"
import { useNavigate } from "react-router-dom";

interface Props {
  src: any;
}

const FeaturedTutorCard = ({ src }: Props) => {
  const navigate = useNavigate()
  return (
    <div className="px-3">
      <div className="w-full my-10">
        <div className="h-full rounded-2xl overflow-hidden">
          <div className="w-full  bg-slate-200">
            <img
              className="w-full object-cover object-top h-[406px]"
              src={src.profilePicture || ManTutor1}
              alt="blog"
            />
          </div>
          <div className="p-4  flex flex-col  mx-4 -mt-16">
            {/* <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                Java
              </h2> */}
            <div className="flex items-center justify-between flex-col rounded-3xl shadow-xl bg-white p-4">
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                {src.name}
              </h1>
              <span className="text-black leading-none text-sm">
                {src.phoneNumber}
              </span>
              <span className="text-black mt-1 inline-flex items-between leading-none text-sm py-1">
                {/*<FaStar className="text-yellow-400" />5 (123 votes)*/}
                {src.email}
              </span>
              <RoundButton onClick={() => navigate(`/tutor/${src._id}`)} title="Visit Profile" style={{ marginTop: "20px", backgroundColor: '#161e2f', color: '#fff' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTutorCard;
