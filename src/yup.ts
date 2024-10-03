import * as yup from "yup";

const parseDateString = (value: string): Date | null => {
  const parsedDate = Date.parse(value);
  return isNaN(parsedDate) ? null : new Date(parsedDate);
};

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const createSubjectSchema = yup.object().shape({
  name: yup
    .string()
    .required("Course name is required")
    .min(3, "Course name must be at least 3 characters long")
    .max(60, "Course name cannot be longer than 100 characters"),
  description: yup
    .string()
    .required("Course description is required")
    .min(10, "Course description must be at least 10 characters long")
    .max(500, "Course description cannot be longer than 500 characters"),
});

export const createCourseSchema = yup.object().shape({
  name: yup
    .string()
    .required("Course name is required.")
    .min(3, "Course name must be at least 3 characters long."),
  description: yup.string().required("Course description is required."),
  price: yup
    .number()
    .required("Course price is required.")
    .min(0, "Course price must be at least 0."),
  startDate: yup
    .date()
    .required("Start Date is required.")
    .typeError("Start Date must be a valid date."), // Ensures the date is in valid format
  endDate: yup
    .date()
    .required("End Date is required.")
    .typeError("End Date must be a valid date.")
    .min(
      yup.ref("startDate"),
      "End Date must be later than or equal to the Start Date."
    ),

  subject: yup
    .string()
    .required("Subject is required.")
    .matches(/^[0-9a-fA-F]{24}$/, "Subject must be a valid MongoId."),
});

export const userUpdateSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .notOneOf([""], "Name cannot be empty"), // Ensures it’s not an empty string
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  phoneNumber: yup
    .string()
    .optional()
    .matches(/^\+?[0-9]{7,15}$/, "Phone number must be valid")
    .min(10, "Phone number must be at least 10 characters long")
    .max(14, "Phone number must be at most 14 characters long"),
  dateOfBirth: yup
    .date()
    .optional()
    .typeError("Date of Birth must be a valid date"),
  bio: yup
    .string()
    .optional()
    .max(100, "Bio must be at most 100 characters long"),
});
export const createClassSchema = yup.object().shape({
  name: yup
    .string()
    .required("Class name is required.")
    .min(3, "Class name must be at least 3 characters long."),
  description: yup.string().required("Class description is required."),
  startTime: yup
    .string()
    .required("Start time is required")
    .test(
      "is-future",
      "Start time must be in the future",
      function (value) {
        const parsedStartTime = parseDateString(value);
        if (!parsedStartTime) return false; // Invalid date
        return parsedStartTime > new Date(); // Ensure it's in the future
      }
    ),
  endTime: yup
    .string()
    .required("End time is required")
    .test(
      "is-after-startTime",
      "End time must be later than start time",
      function (value) {
        const parsedEndTime = parseDateString(value);
        const parsedStartTime = parseDateString(this.parent.startTime); // Access startTime
        if (!parsedEndTime || !parsedStartTime) return false; // Invalid date
        return parsedEndTime > parsedStartTime; // Ensure endTime is after startTime
      }
    ),
});
