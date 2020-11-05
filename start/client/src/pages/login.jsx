import React from "react";
import { gql, useMutation } from "@apollo/client";

import { LoginForm, Loading } from "../components";

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

const Login = () => {
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem("token", login.token);
      localStorage.setItem("userId", login.id);
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>An error occurred logging in : {error.message}</p>;

  return <LoginForm login={login} />;
};

export default Login;
