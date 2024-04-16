import React from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthProviderContext";

const Profile: React.FC = () => {
  const { userData } = useAuth();
  const receivedUserData = userData;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h3" component="div" gutterBottom>
        User Profile
      </Typography>

      <Typography variant="body1" component="p">
        <strong>Name:</strong> {receivedUserData?.first_name}{" "}
        {receivedUserData?.last_name}
      </Typography>
      <Typography variant="body1" component="p">
        <strong>Email:</strong> {receivedUserData?.email}
      </Typography>
      <Typography variant="body1" component="p">
        <strong>Username:</strong> {receivedUserData?.username}
      </Typography>
      <Typography variant="body1" component="p">
        <strong>Space Trader Token:</strong>{" "}
        {receivedUserData?.spacetrader_code}
      </Typography>
    </Box>
  );
};

export default Profile;
