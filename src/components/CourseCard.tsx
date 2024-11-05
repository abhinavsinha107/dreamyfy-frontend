import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  _id: string;
  name: string;
  description: string;
  teacher: {
    _id: string;
    name: string;
    profilePicture?: string;
  };
  startDate: Date;
  endDate: Date;
  isApproved: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  _id,
  name,
  teacher,
  description,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      className="h-full !shadow-none hover:!shadow-xl shadow-slate-500 cursor-pointer !transition-all !duration-500 hover:-translate-y-2"
      onClick={() => navigate(`/Student/subjects/${_id}`)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          alt="Instructor"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          image="https://img.freepik.com/free-vector/teacher-standing-near-blackboard-holding-stick-isolated-flat-vector-illustration-cartoon-woman-character-near-chalkboard-pointing-alphabet_74855-8600.jpg"
        />
      </Box>
      <CardContent>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
          sx={{
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {description.toUpperCase()}
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {teacher.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
