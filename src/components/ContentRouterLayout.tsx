import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Login from "./Login";
import RegisterForm from "./RegisterForm";
import HomePage from "./HomePage";
import LoggedInPageLayout from "./layouts/LoggedInPageLayout";

import { useAuth } from "../contexts/AuthProviderContext";

const ProtectedRoute = ({ element, token }: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  if (token) {
    return <LoggedInPageLayout>{element}</LoggedInPageLayout>;
  } else {
    return <></>;
  }
};
const TestPage = () => {
  return <Typography>hello</Typography>;
};
const ContentRouterLayout: React.FC = () => {
  const { token } = useAuth();
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute token={token} element={<HomePage />} />}
          />
          <Route
            path="/test"
            element={<ProtectedRoute token={token} element={<TestPage />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default ContentRouterLayout;
