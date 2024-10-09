import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserDetailsQuery } from "../../services/api";

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
    <div style={styles.container}>
      {teacher ? (
        <>
          <div style={styles.profileSection}>
            <div style={styles.profileCard}>
              <img
                src={teacher.data.user.profilePicture}
                alt="Teacher Avatar"
                style={styles.profileImage}
              />
              <div style={styles.profileDetails}>
                <h1 style={styles.profileName}>{teacher.data.user.name}</h1>
                {teacher.data.user.bio && (
                  <p style={styles.profileBio}>{teacher.data.user.bio}</p>
                )}
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
              </div>
            </div>
          </div>
  
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
