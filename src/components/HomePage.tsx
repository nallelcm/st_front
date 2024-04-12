import React from "react";
import { useAuth } from "../contexts/AuthProviderContext";
import { Button } from "@mui/material";

const HomePage: React.FC = () => {
  const { username, logout } = useAuth();
  return (
    <div>
      home <br /> hello <b>{username}</b>
      <hr />
      <Button onClick={logout}>logout</Button>
    </div>
  );
};

export default HomePage;
