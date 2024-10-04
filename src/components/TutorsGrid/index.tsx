import { FaLanguage, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {useGetAllCoursesQuery, useGetAllSubjectsQuery} from "../../services/api.ts";
export const tutors = [
  {
    subject: "C tutors",
    count: 22858,
    icon: <FaLanguage className="text-3xl text-blue-500" />,
  },
  {
    subject: "C++ tutors",
    count: 7817,
    icon: <FaLanguage className="text-3xl text-yellow-500" />,
  },
  {
    subject: "Java tutors",
    count: 2709,
    icon: <FaLanguage className="text-3xl text-red-500" />,
  },
  {
    subject: "HTML tutors",
    count: 1199,
    icon: <FaLanguage className="text-3xl text-green-500" />,
  },
  {
    subject: "CSS tutors",
    count: 1784,
    icon: <FaLanguage className="text-3xl text-purple-500" />,
  },
  {
    subject: "Javascript tutors",
    count: 3888,
    icon: <FaLanguage className="text-3xl text-orange-500" />,
  },
  {
    subject: "NodeJS tutors",
    count: 2615,
    icon: <FaLanguage className="text-3xl text-pink-500" />,
  },
  {
    subject: "ExpressJS tutors",
    count: 1909,
    icon: <FaLanguage className="text-3xl text-teal-500" />,
  },
  {
    subject: "MongoDb tutors",
    count: 1131,
    icon: <FaLanguage className="text-3xl text-indigo-500" />,
  },
];



interface TutorCardProps {
  subject: string;
  id: string
    // count: number;
    // icon: React.ReactNode;
}

const TutorCard: React.FC<TutorCardProps> = ({ subject, id}) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleCardClick = (sub_name,id) => {
    navigate(`/subject/${sub_name}/${id}`);
  };

  return (
      <div
          className="flex bg-white items-center p-4 m-1 border rounded-lg duration-900 transform hover:-translate-y-2 cursor-pointer"
          style={{ backgroundColor: "rgb(255 255 255)" }} // Inline style for background color
          onClick={() =>handleCardClick(subject,id)} // Click handler to navigate to new page
      >
        {/*<div className="w-10 h-12 mr-4 flex items-center justify-center">*/}
        {/*  {icon}*/}
        {/*</div>*/}
        <div>
          <div className="font-bold text-xl font-roboto-condensed">{subject}</div>
          {/*<div className="text-gray-500">{count.toLocaleString()} teachers</div>*/}
        </div>
        <div className="ml-auto">
          <FaArrowRight className="w-6 h-6 text-gray-500" />
        </div>
      </div>
  );
};

const TutorsGrid: React.FC = () => {
  const navigate = useNavigate();
  const { data: subjects } = useGetAllSubjectsQuery();
  return (
      <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 py-12 px-10"
          style={{ backgroundColor: "rgb(246 246 250)" }} // Inline style for grid background color
      >
        {subjects?.data?.map((subject, index) => (
            <TutorCard
                key={index}
                subject={subject.name}
                id = {subject._id}
                // count={tutor.count}
                // icon={tutor.icon}
            />
        ))}
      </div>
  );
};

export default TutorsGrid;
