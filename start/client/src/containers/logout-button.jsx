import React from "react";
import styled from "react-emotion";
import { useApolloClient } from "@apollo/client";

import { menuItemClassName } from "../components/menu-item";
import { ReactComponent as ExitIcon } from "../assets/icons/exit.svg";

const LogoutButton = () => {
  const client = useApolloClient();

  return (
    <StyledButton
      onClick={() => {
        client.write({ data: { isLoggedIn: false } });
        localStorage.clear();
      }}
    >
      <ExitIcon />
      Logout
    </StyledButton>
  );
};

const StyledButton = styled("button")(menuItemClassName, {
  background: "none",
  border: "none",
  padding: 0,
});

export default LogoutButton;
