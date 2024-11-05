import { SetStateAction } from "react";
import styles from "./index.module.css";
import { IoMdClose } from "react-icons/io";
import { FaUsers } from "react-icons/fa"; // For "Become a Tutor"
import { IoShareSocial } from "react-icons/io5"; // For "Invest in Us"
import { BiSolidLogIn } from "react-icons/bi"; // For "Login"
import { AiOutlineSchedule } from "react-icons/ai"; // For "Book a Session"
import { BsChat } from "react-icons/bs"; // For "Chat with Us"
import { useNavigate } from "react-router-dom";

interface Props {
  isBarClicked: boolean;
  setIsBarClicked: React.Dispatch<SetStateAction<boolean>>;
}

const MobileSidebar = ({ isBarClicked, setIsBarClicked }: Props) => {
  const navigate = useNavigate();

  const navigateToLoginPage = () => {
    setIsBarClicked(false);
    navigate("/login");
  };

  const navigateToBecomeTutorPage = () => {
    setIsBarClicked(false);
    navigate("/become-a-tutor");
  };

  const navigateToInvestPage = () => {
    setIsBarClicked(false);
    navigate("/join-us-form");
  };

  const navigateToBookSessionPage = () => {
    setIsBarClicked(false);
    navigate("/book-a-session"); 
  };

  const navigateToChatPage = () => {
    setIsBarClicked(false);
    navigate("/chat-with-us"); 
  };

  return (
    <div
      className={`${styles.mobileSidebar} ${
        isBarClicked ? styles.slideIn : styles.slideOut
      }`}
    >
      <button
        className={styles.closeBtn}
        onClick={() => setIsBarClicked(false)}
      >
        <IoMdClose />
      </button>
      <ul className="flex flex-col justify-center text-xl text-black">
        <li
          onClick={navigateToLoginPage}
          className="m-1 rounded-md border border-black h-[60px] flex items-center px-2 cursor-pointer hover:bg-gray-200"
        >
          <BiSolidLogIn className="mr-3 text-2xl" />
          <p>Login</p>
        </li>
        <li
          onClick={navigateToBecomeTutorPage}
          className="m-1 rounded-md border border-black h-[60px] flex items-center px-2 cursor-pointer hover:bg-gray-200"
        >
          <FaUsers className="mr-3 text-2xl" />
          <p>Become a Tutor</p>
        </li>
        <li
          onClick={navigateToInvestPage}
          className="m-1 rounded-md border border-black h-[60px] flex items-center px-2 cursor-pointer hover:bg-gray-200"
        >
          <IoShareSocial className="mr-3 text-2xl" />
          <p>Invest in Us</p>
        </li>
        <li
          onClick={navigateToBookSessionPage}
          className="m-1 rounded-md border border-black h-[60px] flex items-center px-2 cursor-pointer hover:bg-gray-200"
        >
          <AiOutlineSchedule className="mr-3 text-2xl" />
          <p>Book a Session</p>
        </li>
        <li
          onClick={navigateToChatPage}
          className="m-1 rounded-md border border-black h-[60px] flex items-center px-2 cursor-pointer hover:bg-gray-200"
        >
          <BsChat className="mr-3 text-2xl" />
          <p>Chat with Us</p>
        </li>
      </ul>
    </div>
  );
};

export default MobileSidebar;
