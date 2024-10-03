/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.module.css";

interface SuccessResponse {
  data: any;
  message: string;
  success: boolean;
}

interface ErrorResponse extends SuccessResponse {
  error_code: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface RegisterRequest {
  name?: string;
  email?: string;
  password?: string;
}

interface RegisterResponse {
  data: {
    user: User;
  };
  message: string;
  success: boolean;
}

interface LoginRequest {
  email?: string;
  password?: string;
}

interface LoginResponse {
  data: {
    accessToken: string;
    user: User;
  };
  message: string;
  success: boolean;
}

interface LoginWithGoogleRequest {
  name: string;
  email: string;
}
interface Stat {
  value: number;
  label: string;
  isDecimal?: boolean;
}
interface StatCardProps {
  value: number;
  label: string;
  isDecimal?: boolean;
}
interface Tutor {
  subject: string;
  count: number;
  icon: React.ReactNode;
}

interface SidebarProps {
  profileData: {
    profileImage: string;
    options: { name: string; key: string }[];
    profileName: string;
    profileRole: string;
  };
  onSelect: (key: string) => void;
  selectedOption: string;
}

interface CreateSubjectRequest {
  name?: string;
  description?: string;
}

interface CreateSubjectResponse {
  data: {
    _id: string;
    name: string;
    description: string;
  };
  message: string;
  success: boolean;
}

interface GetAllSubjectsResponseData {
  _id: string;
  name: string;
  description: string;
}

interface GetAllSubjectsResponse {
  data: Array<GetAllSubjectsResponseData>;
  message: string;
  success: true;
}

interface GetAllSubjectsResponseData {
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

interface GetAllCoursesResponse {
  data: GetAllSubjectsResponseData[];
  message: string;
  success: boolean;
}

interface GetAllTutorsResponse {
  data: GetUserDetails[];
  message: string;
  success: boolean;
}

interface CreateCourseRequest {
  name?: string;
  description?: string;
  price?: number;
  startDate?: Date;
  endDate?: Date;
  subject?: string;
}

interface CreateCourseResponseData {
  _id: string;
  name: string;
  description: string;
  price: number;
  teacher: string;
  startDate: Date;
  endDate: Date;
  isFinished: boolean;
  isApproved: boolean;
}

interface CreateCourseResponse {
  data: CreateCourseResponseData;
  message: string;
  success: true;
}

interface ApproveCourseResponse {
  data: {
    _id: string;
    name: string;
    description: string;
    price: number;
    isFinished: boolean;
    startDate: Date;
    endDate: Date;
    isApproved: boolean;
  };
  message: string;
  success: boolean;
}
interface GetUserDetails {
  data: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    bio: string;
    profilePicture?: string;
    };
  message: string;
  success: boolean;
  }

interface GetCourseByIdResponse {
  data: {
    _id: string;
    name: string;
    description: string;
    price: number;
    isFinished: boolean;
    startDate: Date;
    endDate: Date;
    isApproved: true;
    teacher: {
      _id: string;
      name: string;
      bio: string;
      phoneNumber: string;
    };
    updatedAt: Date;
  };
  message: string;
  success: boolean;
}
interface UserUpdatePayload {
  id: string;
  data: {
    name?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    bio?: string;
  };
}
interface UserUpdateResponse {
  message: string;
  success: boolean;
}

interface CreateClassrequest {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  course: string;
}
interface GetTeacherClassDetails {
  _id: string;
  name: string;
  course:{
    name: string;
  }
  description: string;
  startTime: string;
  endTime: string;
  classDate: Date;
}
interface GetClassDetails {
  data: GetTeacherClassDetails[];
  message: string;
  success: boolean;
}

interface RegisterTutorRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  bio: string;
}

interface StripeRequest {
  name: string;
  price: number;
  description: string;
}
