/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BACKEND_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Subject", "Course", "User", "Class"],
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: `auth/register`,
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: `auth/login`,
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    loginWithGoogle: builder.mutation<LoginResponse, LoginWithGoogleRequest>({
      query: (body) => ({
        url: `auth/google`,
        method: "POST",
        body,
      }),
    }),
    createSubject: builder.mutation<
      CreateSubjectResponse,
      CreateSubjectRequest
    >({
      query: (body) => ({
        url: `subjects`,
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["Subject"],
    }),
    getAllSubjects: builder.query<GetAllSubjectsResponse, void>({
      query: () => ({
        url: `subjects`,
        method: "GET",
      }),
      providesTags: ["Subject"],
    }),
    getAllCourses: builder.query<GetAllCoursesResponse, void>({
      query: () => ({
        url: `courses`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation<CreateCourseResponse, CreateCourseRequest>({
      query: (body) => ({
        url: `courses`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    approveCourse: builder.mutation<ApproveCourseResponse, string>({
      query: (courseId) => ({
        url: `courses/${courseId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Course"],
    }),
    getUserDetails: builder.query<GetUserDetails, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getTutorsDetails: builder.query<GetAllTutorsResponse, string>({
      query: () => ({
        url: `users/tutors`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUserDetails: builder.mutation<UserUpdateResponse, UserUpdatePayload>({
      query: ({ data, id }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    createClass: builder.mutation<UserUpdateResponse, CreateClassrequest>({
      query: (body) => ({
        url: `classes`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Class"],
    }),
    uploadFile: builder.mutation<UserUpdateResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `upload`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["User"],
    }),
    getClassDetails: builder.query<GetClassDetails, void>({
      query: () => ({
        url: `classes/teacher`,
        method: "GET",
      }),
      providesTags: ["Class"],
    }),
    getCourseById: builder.query<GetCourseByIdResponse, string>({
      query: (courseId) => ({
        url: `courses/${courseId}`,
        method: "GET",
      }),
    }),
    registerTecher: builder.mutation<RegisterResponse, RegisterTutorRequest>({
      query: (body) => ({
        url: `auth/register-tutor`,
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    stripeCheckout: builder.mutation<any, StripeRequest>({
      query: (body) => ({
        url: `payments`,
        method: "POST",
        body
      }),
    }),
    createConnectedAccount: builder.mutation<any, StripeRequest>({
      query: (body) => ({
        url: `payments/onBoard`,
        method: "POST",
        body
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLoginWithGoogleMutation,
  useCreateSubjectMutation,
  useGetAllSubjectsQuery,
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useApproveCourseMutation,
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useCreateClassMutation,
  useUploadFileMutation,
  useGetClassDetailsQuery,
  useGetCourseByIdQuery,
  useRegisterTecherMutation,
  useStripeCheckoutMutation,
  useCreateConnectedAccountMutation,
  useGetTutorsDetailsQuery
} = api;
