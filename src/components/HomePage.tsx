import React from "react";
import { useAuth } from "../contexts/AuthProviderContext";
import { Box, Typography } from "@mui/material";

const HomePage: React.FC = () => {
  const { userData } = useAuth();
  return (
    <Box>
      <Typography>
        home <br /> hello <b>{userData?.first_name}</b>
      </Typography>
    </Box>
  );
};

export default HomePage;
