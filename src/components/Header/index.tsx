import { IoShareSocial } from "react-icons/io5";
import { FaBars, FaUsers } from "react-icons/fa";
import { AiOutlineSchedule, AiOutlineUser } from "react-icons/ai"; // Import AiOutlineUser
import styles from "./index.module.css";
import useWindowResize from "../../hooks/useWindowResize";
import { useEffect, useState } from "react";
import MobileSidebar from "../MobileSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { resetToken } from "../../redux/reducer/authReducer";
import { resetUser } from "../../redux/reducer/userReducer";
import { notifySuccess } from "../../toast";
import { useFetchMainLogoQuery, useGetSearchCoursesQuery } from "../../services/api";
import mydreamfylogo from '../../assets/mydreamfy.png';

const Header = () => {
  const width = useWindowResize().width;
  const isMobile = width < 768;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isBarClicked, setIsBarClicked] = useState(false);
  // const [bgColor, setBgColor] = useState("bg-[#161e2f] bg-opacity-100");
  const [bgColor, setBgColor] = useState("bg-[#fff] ");
  const { data: currentMainLogo } = useFetchMainLogoQuery();
  const {data: searchResult} = useGetSearchCoursesQuery('')
  const navigateToLoginPage = () => {
    navigate("/login");
  };

  const navigateToHomePage = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(resetToken());
    dispatch(resetUser());
    navigate("/login");
    notifySuccess("Logged out successfully");
  };

  const user = useAppSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setBgColor("bg-[#161E2F]");
        // setBgColor("bg-[#fff]")
      } else {
        // setBgColor("bg-[#161E2F] bg-opacity-50");
        setBgColor("bg-[#fff] ")
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {!isMobile && (
        <header
          className={`${styles.header} fixed h-[75px] flex items-center justify-center ${bgColor} backdrop-blur-lg px-8 w-full max-w-8xl`}
        >
          <div className="container mx-auto">
            <div className="row flex items-center justify-between">
              <div onClick={navigateToHomePage}
              // className={styles.logo}
              >
                <img src={currentMainLogo?.data?.logo || mydreamfylogo} className="w-full max-w-60 cursor-pointer" />
                {/* <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white"
                className={styles.logoText}
                >MyDreamFy</span> */}
              </div>
              <div className="flex items-center gap-4 justify-center">
                <button
                  onClick={() => navigate("/book-a-session")}
                  className="flex items-center px-4 py-2 bg-[#fff] text-black rounded-full hover:bg-white hover:text-black transition"
                >
                  <AiOutlineSchedule className="mr-2 text-2xl" /> 
                  Book a session
                </button>
                <button
                  onClick={() => navigate("/become-a-tutor")}
                  className="flex items-center px-4 py-2 bg-[#fff] text-black rounded-full hover:bg-white hover:text-black transition"
                >
                  <FaUsers className="mr-2 text-2xl" />
                  Become a tutor
                </button>

                <button
                  onClick={() => navigate("/join-us-form")}
                  className="flex items-center px-4 py-2 bg-[#fff] text-black rounded-full hover:bg-white hover:text-black transition"
                >
                  <IoShareSocial className="mr-2 text-2xl" />
                  Invest in us
                </button>
              </div>
              <div>
                {!user ? (
                  <button
                    onClick={navigateToLoginPage}
                    className="flex items-center bg-[#ffd700] text-black hover:bg-white hover:text-black transition-all duration-500 border-white font-semibold py-2 px-10 rounded-full text-base sm:text-lg md:text-xl lg:text-2xl"
                  >
                    <AiOutlineUser className="mr-2 text-2xl" /> {/* Add icon here */}
                    Login
                  </button>
                ) : (
                  <button onClick={handleLogout} className="text-black">
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
      )}
      {isMobile && (
        <header
          className={`${styles.header} h-[70px] w-full flex justify-between items-center bg-[#161E2F]`}
        >
          <div className="flex justify-between w-full items-center px-3">
            <img
              src={mydreamfylogo}
              className="w-full max-w-52 mt-1 cursor-pointer"
            />
            <div
              onClick={() => setIsBarClicked(!isBarClicked)}
              className="p-2 border border-white rounded-md text-white text-2xl" // Increased size
            >
              <FaBars />
            </div>
          </div>
        </header>
      )}
      {isBarClicked && (
        <MobileSidebar
          isBarClicked={isBarClicked}
          setIsBarClicked={setIsBarClicked}
        />
      )}
    </>
  );
};

export default Header;
