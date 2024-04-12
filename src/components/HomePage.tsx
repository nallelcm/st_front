import React from "react";
import { useAuth } from "../contexts/AuthProviderContext";
import { Box, Button, Typography } from "@mui/material";

const HomePage: React.FC = () => {
  const { username, logout } = useAuth();
  return (
    <Box>
      <Typography>
        home <br /> hello <b>{username}</b>
      </Typography>
      <hr />
      <Button onClick={logout}>logout</Button>
    </Box>
  );
};

export default HomePage;
