/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthToken = () => {
  let token = "";
  try {
    token = localStorage.getItem("login_token");
  } catch (error) {
    console.log("token not found");
  }
  return token;
};

const UsersAPI = createApi({
  reducerPath: "users",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getUser: builder.query({
        providesTags: (result, error, arg) => {
          const tags = [{ type: "user" }];
          return tags;
        },
        query: () => "/auth-user/",
      }),
      login: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          if (result.access) {
            localStorage.setItem("login_token", result.access);
          }
          return [{ type: "user" }];
        },
        query: ({ credential }) => {
          return {
            url: `/login/`,
            body: {
              username: credential.username,
              password: credential.password,
            },
            method: "POST",
          };
        },
      }),
      addUser: builder.mutation({
        query: (formData) => {
          return {
            url: "/signup/",
            body: formData,
            method: "POST",
          };
        },
      }),
    };
  },
});

export const { useGetUserQuery, useLoginMutation, useAddUserMutation } =
  UsersAPI;
export { UsersAPI };
