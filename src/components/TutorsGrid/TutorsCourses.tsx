import React from "react";
import { useParams } from "react-router-dom";
import { useGetSubjectCoursesQuery } from "../../services/api";

interface CourseCardProps {
    title: string;
    duration: string;
    level: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, duration, level }) => {
    return (
        <div className="bg-white border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-600">Duration: {duration}</p>
            <p className="text-gray-600">Level: {level}</p>
        </div>
    );
};

const TutorsCourses: React.FC = () => {
    const { subject, id } = useParams<{ subject: string, id: string }>(); // Extract both subject and id from the URL
        const subjectKey = {'id':id.replace(/-/g, ' ')} // Assuming you just need to clean up the subject
    const { data: subjectCourses } = useGetSubjectCoursesQuery(subjectKey);

    return (
        <div className="py-10 px-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">{subject} Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {subjectCourses && Array.isArray(subjectCourses) ? (
                    subjectCourses.map((course, index) => (
                        <CourseCard
                            key={index}
                            title={course.name} // Assuming course has a 'name' field
                            duration={course.description} // Assuming course has a 'description' field
                            level={course.level || "Unknown"} // Replace with a field or default value
                        />
                    ))
                ) : (
                    <p>No courses available for this subject</p>
                )}
            </div>
        </div>
    );
};

export default TutorsCourses;
