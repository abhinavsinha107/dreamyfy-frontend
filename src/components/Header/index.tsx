import {
  IoShareSocial,
} from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import styles from "./index.module.css";
import useWindowResize from "../../hooks/useWindowResize";
import { useEffect, useState } from "react";
import MobileSidebar from "../MobileSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { resetToken } from "../../redux/reducer/authReducer";
import { resetUser } from "../../redux/reducer/userReducer";
import { notifySuccess } from "../../toast";
import { useFetchMainLogoQuery } from "../../services/api";
import mydreamfylogo from '../../assets/mydreamfy.png';

const Header = () => {
  const width = useWindowResize().width;
  const isMobile = width < 768;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();
  const isHomePage: boolean = location.pathname === "/";

  const [isBarClicked, setIsBarClicked] = useState(false);
  const [bgColor, setBgColor] = useState("bg-[#003366] bg-opacity-50");
  const { data: currentMainLogo } = useFetchMainLogoQuery();

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
      } else {
        setBgColor("bg-[#161E2F] bg-opacity-50");
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
          className={`${styles.header} fixed
            } h-[100px] flex items-center ${bgColor} backdrop-blur-lg`}
        // className={`${styles.header} ${!isHomePage ? "fixed" : "sticky"
        //   } h-[100px] flex items-center ${bgColor} backdrop-blur-lg`}
        >
          <div className="container mx-auto"
          // className={styles.container}
          >
            <div className="row flex items-center justify-between">
              <div onClick={navigateToHomePage}
              // className={styles.logo}
              >
                {/* <img src={currentMainLogo?.data?.logo}></img> */}
                <img src={mydreamfylogo} className="w-full max-w-60 cursor-pointer" />
                {/* <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white"
                className={styles.logoText}
                >MyDreamFy</span> */}
              </div>
              <div
              // className={styles.actions}
              >
                {/*<div className={styles.referFriend}>*/}
                {/*  <IoShareSocial className={styles.referFriendIcon} />*/}
                {/*  <span className={styles.referFriendText}>Refer a friend</span>*/}
                {/*</div>*/}
                {!user && (
                  <button
                    onClick={navigateToLoginPage}
                    className="text-black bg-[#D8B74E] hover:bg-white hover:text-black transition-all duration-500 border-white font-semibold py-2 px-10 rounded-full text-base sm:text-lg md:text-xl lg:text-2xl"
                  // className={styles.referFriend}
                  >
                    <span className={styles.loginBtn}>Login</span>
                  </button>
                )}
                {user && (
                  <button onClick={handleLogout} className={styles.referFriend}>
                    <span
                    // className={styles.loginBtn}
                    >Logout</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
      )}
      {isMobile && (
        <header className={`${styles.header} h-[70px] w-full flex justify-between items-center bg-[#161E2F]`}>
          <div className='flex justify-between w-full items-center px-3'>
            {/* <p onClick={navigateToHomePage} className={styles.logo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className={styles.logo}
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className={styles.logoText}>MyDreamFy</span>
            </p> */}
            <img src={mydreamfylogo} className="w-full max-w-52 mt-1 cursor-pointer" />
            <div
              onClick={() => setIsBarClicked(!isBarClicked)}
              className="p-2 border border-white rounded-md text-white text-xl"
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
