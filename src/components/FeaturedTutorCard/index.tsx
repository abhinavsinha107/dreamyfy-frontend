  import { FaStar } from "react-icons/fa";
  import RoundButton from "../Button";
  import ManTutor1 from "../../assets/Images/ManTutor1.jpg"

  interface Props {
    src: any;
  }

  const FeaturedTutorCard = ({ src }: Props) => {
    return (
      <div className=" px-2 py-6 flex ">
        <div className="p-4 max-w-[350px]">
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img
              className="w-full object-fill object-center"
              src={src.profilePicture || ManTutor1}
              alt="blog"
            />
            <div className="p-3 bg-white">
              {/* <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                Java
              </h2> */}
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                {src.name}
              </h1>
              <div className="flex items-center justify-between flex-wrap ">
                <span className="text-black leading-none text-sm">
                  {src.phoneNumber}
                </span>
                <span className="text-black mr-1 inline-flex items-between leading-none text-sm py-1">
                  {/*<FaStar className="text-yellow-400" />5 (123 votes)*/}
                  {src.email}
                </span>
              </div>
              <RoundButton title="Visit Profile" style={{ marginTop: "20px" }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default FeaturedTutorCard;
