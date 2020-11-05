import {
  ApolloClient,
  ApolloProvider,
  gql,
  HttpLink,
  useQuery,
} from "@apollo/client";
import { cache } from "./cache";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import Login from "./pages/login";
import injectStyles from "./styles";
import { resolvers, typeDefs } from "./resolvers";

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "http://localhost:4000/",
    headers: {
      authorization: localStorage.getItem("token") || "",
    },
  }),
  typeDefs,
  resolvers,
});

const IS_USER_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const IsLoggedIn = () => {
  const { data, loading, error } = useQuery(IS_USER_LOGGED_IN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;

  return data.isLoggedIn ? <Pages /> : <Login />;
};

injectStyles();

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <IsLoggedIn /> */}
    <Pages />
  </ApolloProvider>,
  document.getElementById("root")
);
