import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserDetailsQuery } from "../../services/api";
import Header from "../Header";
import Footer from "../Footer/Footer";
import ManTutor1 from "../../assets/Images/ManTutor1.jpg"

// Define Course and Teacher interfaces
interface Course {
  _id: string;
  name: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  isApproved: boolean;
}

interface Teacher {
  _id: string;
  name: string;
  bio: string;
  profilePicture: string;
  courses: Course[];
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <div style={styles.courseCard}>
    <h3 style={styles.courseTitle}>{course.name}</h3>
    <p style={styles.courseDescription}>{course.description}</p>
    <p style={styles.coursePrice}>Price: ₹{course.price}</p>
    <p style={styles.courseDate}>
      Start: {new Date(course.startDate).toLocaleDateString()} - End:{" "}
      {new Date(course.endDate).toLocaleDateString()}
    </p>
  </div>
);

const VisitProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: teacher } = useGetUserDetailsQuery(id);

  return (
    <>
      <Header />
      <div className="container mx-auto my-5">
        {teacher ? (
          <>
            <div className="w-full mx-auto flex flex-col md:flex-row bg-slate-100 p-5 rounded-xl">
              {/* Profile Picture Section */}
              <div className="flex justify-center md:justify-start w-full md:w-4/12">
                <img
                  src={teacher.data.user.profilePicture || ManTutor1}
                  alt="Christopher"
                  className="w-full max-w-sm rounded-xl h-full object-cover object-top"
                />
              </div>
              {/* Profile Details Section */}
              <div className='w-full md:w-4/12 p-5'>
                {/* Name and Tags */}
                <h2 className="text-4xl font-medium text-[#161E2F] flex items-center">
                  {teacher.data.user.name}
                </h2>
                <p style={styles.profileBio}>{teacher.data.user.bio}</p>
                {teacher.data.user.email && (
                  <p style={styles.profileEmail}>
                    Email: {teacher.data.user.email}
                  </p>
                )}
                {teacher.data.user.phoneNumber && (
                  <p style={styles.profilePhone}>
                    Phone: {teacher.data.user.phoneNumber}
                  </p>
                )}
                {/* <div className="mt-2 flex space-x-2">
                  <span className="text-sm font-medium bg-white text-green-700 px-2 py-1 rounded">Science</span>
                  <span className="text-sm font-medium bg-white text-green-700 px-2 py-1 rounded">Biology</span>
                  <span className="text-sm font-medium text-gray-700 px-2 py-1 rounded">+12 more</span>
                </div> */}

                {/* Rating and Stats */}
                <div className="mt-4 space-y-2 text-gray-600 text-sm">
                  <p className='flex items-center gap-3 text-base'><span className='w-8 h-8 flex justify-center items-center rounded-md bg-slate-200'>⭐</span> 5.0 (<a href="#" className="text-blue-500">31 reviews</a>)</p>
                  <p className='flex items-center gap-3 text-base'><span className='w-8 h-8 flex justify-center items-center rounded-md bg-slate-200'>✔️</span> Background check</p>
                  {/* <p className='flex items-center gap-3 text-base'><span className='w-8 h-8 flex justify-center items-center rounded-md bg-slate-200'>📚</span> 900+ hours taught</p>
                  <p className='flex items-center gap-3 text-base'><span className='w-8 h-8 flex justify-center items-center rounded-md bg-slate-200'>🔄</span> 62 repeat students</p>
                  <p className='flex items-center gap-3 text-base'><span className='w-8 h-8 flex justify-center items-center rounded-md bg-slate-200'>⏱</span> Replies in 18 minutes</p> */}
                  <p className='flex items-center gap-3 text-base'><span className='w-8 h-8 flex justify-center items-center rounded-md bg-slate-200'>🏅</span> Qualified teacher</p >
                  {/* <p><a href="#" className="text-blue-500">Offers free video chat</a></p> */}
                </div >
              </div >
              {/* Pricing and Availability */}
              < div className="w-full md:w-4/12 bg-white p-6 rounded-xl" >
                {/* <div className="flex justify-between items-center">
                  <div className="text-4xl font-medium text-[#161E2F]">£77 <span className="text-lg font-medium">per hour</span></div>
                  <div className="mt-2 flex items-center text-gray-700">
                    <span className="text-sm font-medium bg-green-100 text-green-700 px-2 py-1 rounded">⭐ 5.0</span>
                  </div>
                </div> */}

                <div className="mt-4">
                  <h3 className="text-gray-800 font-semibold text-xl">Online Lessons</h3>
                  <p className="text-base">{teacher.data.user.name} is available for regular online lessons on:</p>
                  <div className="flex gap-5 w-full">
                    {/* <div className="grid grid-cols-1 grid-rows-4 gap-3 text-center mt-2">
                      <div className="text-sm font-semibold text-gray-500"></div>
                      <div className="text-sm font-semibold text-gray-500">Morning</div>
                      <div className="text-sm font-semibold text-gray-500">Afternoon</div>
                      <div className="text-sm font-semibold text-gray-500">Evening</div>
                    </div> */}
                    <div className="grid grid-cols-7 gap-3 text-center mt-2 w-full">
                      {/* <div className="text-sm font-semibold text-gray-500">Mon</div>
                      <div className="text-sm font-semibold text-gray-500">Tue</div>
                      <div className="text-sm font-semibold text-gray-500">Wed</div>
                      <div className="text-sm font-semibold text-gray-500">Thu</div>
                      <div className="text-sm font-semibold text-gray-500">Fri</div>
                      <div className="text-sm font-semibold text-gray-500">Sat</div>
                      <div className="text-sm font-semibold text-gray-500">Sun</div> */}

                      {/* Availability dots */}
                      {/* {[true, false, true, true, false, false, true].map((available, idx) => (
                        <div key={idx} className={`h-4 w-4 rounded-full mx-auto ${available ? 'bg-[#161E2F]' : 'bg-green-200'}`} />
                      ))}
                      {[true, true, false, true, true, false, true].map((available, idx) => (
                        <div key={idx} className={`h-4 w-4 rounded-full mx-auto ${available ? 'bg-[#161E2F]' : 'bg-green-200'}`} />
                      ))}
                      {[true, false, true, false, true, false, true].map((available, idx) => (
                        <div key={idx} className={`h-4 w-4 rounded-full mx-auto ${available ? 'bg-[#161E2F]' : 'bg-green-200'}`} />
                      ))} */}
                    </div>
                  </div>
                </div>
              </div >
            </div >
            <div style={styles.coursesSection}>
              <h2 style={styles.coursesTitle}>
                Courses by {teacher.data.user.name}
              </h2>
              <div style={styles.coursesGrid}>
                {teacher.data.user.courses && teacher.data.user.courses.length > 0 ? (
                  teacher.data.user.courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))
                ) : (
                  <p>No courses available.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div style={styles.noTeacher}>No teacher found.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default VisitProfile;

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Roboto', sans-serif",
    color: "#333",
  },
  profileSection: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "50px",
  },
  profileCard: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "80%",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginRight: "30px",
  },
  profileDetails: {
    textAlign: "left",
  },
  profileName: {
    margin: "0 0 10px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  profileBio: {
    margin: "0 0 10px",
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#7f8c8d",
  },
  profileEmail: {
    margin: "0 0 5px",
    fontSize: "14px",
    color: "#34495e",
  },
  profilePhone: {
    fontSize: "14px",
    color: "#34495e",
  },
  coursesSection: {
    marginTop: "40px",
  },
  coursesTitle: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "40px",
    color: "#34495e",
  },
  coursesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },
  courseCard: {
    padding: "20px",
    borderRadius: "15px",
    background: "#ecf0f1",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  },
  courseTitle: {
    margin: "0 0 10px",
    fontSize: "22px",
    fontWeight: "600",
    color: "#2980b9",
  },
  courseDescription: {
    margin: "0 0 10px",
    fontSize: "14px",
    color: "#7f8c8d",
  },
  coursePrice: {
    margin: "0 0 10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#27ae60",
  },
  courseDate: {
    margin: "0 0 10px",
    fontSize: "12px",
    color: "#7f8c8d",
  },
  approved: {
    color: "#2ecc71",
    fontSize: "14px",
    fontWeight: "bold",
  },
  pending: {
    color: "#e74c3c",
    fontSize: "14px",
    fontWeight: "bold",
  },
  noTeacher: {
    textAlign: "center",
    padding: "50px 0",
    fontSize: "24px",
    color: "#e74c3c",
  },
};
