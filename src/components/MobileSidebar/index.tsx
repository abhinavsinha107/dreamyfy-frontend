import { SetStateAction } from "react";
import styles from "./index.module.css";
import { IoMdClose } from "react-icons/io";
import { FaBook, FaBell } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdPerson4 } from "react-icons/md";
import { BiSolidLogIn } from "react-icons/bi";
import { IoPerson, IoShareSocial, IoChatboxEllipses } from "react-icons/io5";
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
        <li className="m-1 rounded-md border border-black h-[60px] flex items-center px-2 cursor-pointer hover:bg-gray-200">
          <FaBook className="mr-3 text-2xl" />
          <p>My Lesson</p>
        </li>
        <li className="m-1 rounded-md border border-black h-[60px] flex items-center px-2 cursor-pointer hover:bg-gray-200">
          <MdPerson4 className="mr-3 text-2xl" />
          <p>Find Tutors</p>
        </li>
        <li className="m-1 rounded-md border border-black h-[60px] flex items-center px-2 cursor-pointer hover:bg-gray-200">
          <HiMiniUserGroup className="mr-3 text-2xl" />
          <p>Group Classes</p>
        </li>
        <li className="m-1 rounded-md border border-black h-[60px] flex items-center px-2 cursor-pointer hover:bg-gray-200">
          <IoShareSocial className="mr-3 text-2xl" />
          <p>Refer a friend</p>
        </li>
        <li className="m-1 rounded-md border border-black h-[60px] flex items-center px-2 cursor-pointer hover:bg-gray-200">
          <IoChatboxEllipses className="mr-3 text-2xl" />
          <p>Chat</p>
        </li>
        <li className="m-1 rounded-md border border-black h-[60px] flex items-center px-2 cursor-pointer hover:bg-gray-200">
          <FaBell className="mr-3 text-2xl" />
          <p>Notifications</p>
        </li>
        <li className="m-1 rounded-md border border-black h-[60px] flex items-center px-2 cursor-pointer hover:bg-gray-200">
          <IoPerson className="mr-3 text-2xl" />
          <p>My Profile</p>
        </li>
      </ul>
    </div>
  );
};

export default MobileSidebar;
