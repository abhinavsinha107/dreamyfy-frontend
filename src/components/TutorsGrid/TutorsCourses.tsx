import React from "react";
import { useParams } from "react-router-dom";

const courses = {
    "c tutors courses": [
        { title: "Introduction to C Programming", duration: "10 hours", level: "Beginner" },
        { title: "Advanced C Programming", duration: "15 hours", level: "Intermediate" },
        { title: "C for Embedded Systems", duration: "12 hours", level: "Advanced" },
        { title: "C Programming for Beginners", duration: "8 hours", level: "Beginner" },
        { title: "C Memory Management", duration: "7 hours", level: "Intermediate" },
    ],
    "C++ tutors": [
        { title: "C++ for Beginners", duration: "12 hours", level: "Beginner" },
        { title: "Object-Oriented C++", duration: "20 hours", level: "Intermediate" },
        { title: "C++ for Game Development", duration: "18 hours", level: "Advanced" },
        { title: "C++ Data Structures", duration: "15 hours", level: "Intermediate" },
        { title: "Multithreading in C++", duration: "10 hours", level: "Advanced" },
    ],
    // Add similar course details for other subjects...
};

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
    const { subject } = useParams<{ subject: string }>(); // Get the subject from the URL
    const subjectKey = subject.replace(/-/g, ' ') + " courses"; // Replace dashes with spaces to match the keys
    console.log(subjectKey)
    const subjectCourses = courses[subjectKey]; // Dynamically get courses for the subject

    // If no courses are found, return a message
    if (!subjectCourses) {
        return <p>No courses available for {subjectKey}</p>;
    }

    return (
        <div className="py-10 px-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">{subjectKey} Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {subjectCourses.map((course, index) => (
                    <CourseCard
                        key={index}
                        title={course.title}
                        duration={course.duration}
                        level={course.level}
                    />
                ))}
            </div>
        </div>
    );
};

export default TutorsCourses;
