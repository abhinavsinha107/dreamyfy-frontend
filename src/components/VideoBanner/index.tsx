import React, { useEffect, useState, useRef } from "react";
import useWindowResize from "../../hooks/useWindowResize";
import bannerVideo from "../../assets/Video/banner1.mp4";
import bannerVideoMobile from "../../assets/Video/mobileBanner.mp4";
import video1 from "../../assets/Video/1.mp4";
import video2 from "../../assets/Video/2.mp4";
import video3 from "../../assets/Video/3.mp4";
import { useGetSearchCoursesQuery } from "../../services/api";

const VideoBanner = () => {
  const width = useWindowResize().width;
  const isMobile = width < 768;
  const videoUrl = isMobile ? bannerVideoMobile : bannerVideo;

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: searchData } = useGetSearchCoursesQuery(searchQuery);
  const searchRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.search.value);
    setIsDropdownOpen(true);
  };

  return (
    <div className="relative h-screen bg-gradient-to-r from-orange-400 via-orange-300 to-red-600">
      <main className="flex items-center justify-center min-h-screen">
        <div className="flex items-center text-center px-8 w-full max-w-8xl pt-20 sm:pt-2 pb-2">
          <section className="mb-10 mx-8 text-left">
            <h1 className="lg:text-[40px] text-2xl text-center md:text-4xl font-bold text-white mb-8">
              Unlock Your Imagination Discover, Learn, and Explore Endless Possibilities
            </h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} ref={searchRef} className="relative mb-6 max-w-lg mx-auto">
              <div className="relative w-full flex items-center">
                <input
                  name="search"
                  className="flex-grow rounded-full w-full pl-4 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-lg"
                  placeholder="Ex: Coach sportif, nutritionniste..."
                  type="text"
                  onFocus={() => setIsDropdownOpen(true)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-orange-600 transition duration-200"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>

              {/* Dropdown List */}
              {isDropdownOpen && searchData?.data?.courses?.length > 0 && (
                <div className="absolute top-full mt-2 w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="divide-y divide-gray-200">
                    {searchData.data.courses.map((course) => (
                      <li
                        key={course._id}
                        className="p-4 hover:bg-gray-100 cursor-pointer flex items-start space-x-4"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <img
                          src={course.teacher.profilePicture}
                          alt={course.teacher.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{course.name}</h3>
                          <p className="text-gray-500 text-sm">{course.description}</p>
                          <div className="text-gray-700 flex items-center justify-between mt-1">
                            <p className="text-blue-500 text-sm font-semibold">{course.price} INR</p>
                            <p className="text-sm font-medium">Teacher: {course.teacher.name}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>

            {/* Supporting Text */}
            <p className="text-white mb-4 text-xl text-center max-w-lg mx-auto">
              From timeless classics to groundbreaking discoveries, explore endless knowledge.
            </p>
            <hr className="max-w-lg mx-auto" />
          </section>

          {/* Video Previews */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <video autoPlay loop muted className="rounded mb-2 mx-auto" width="300">
                <source src={video1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <video autoPlay loop muted className="rounded mb-2 mx-auto" width="300">
                <source src={video2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <video autoPlay loop muted className="rounded mb-2 mx-auto" width="300">
                <source src={video3} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoBanner;
