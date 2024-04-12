import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "../contexts/AuthProviderContext";
import RegisterForm from "./RegisterForm";
import HomePage from "./HomePage";
import { validateToken } from "../API";

const ProtectedRoute = ({ element, token }: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Running useEffect in ProtectedRoute, token:", token);
    if (!token) {
      navigate("/login");
    }
    console.log("element", element);
  }, [token]);
  if (token) {
    return <div>hello {element}</div>;
  } else {
    return <></>;
  }
};
const ContentRouterLayout: React.FC = () => {
  const { token } = useAuth();
  useEffect(() => {
    validateToken().then((valid) => {
      console.log("valid", valid);
      if (!valid) {
        console.log("invalid token");
      }
    });
  }, []);
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute token={token} element={<HomePage />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="*"
            element={<ProtectedRoute element={<div>not found</div>} />}
          />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default ContentRouterLayout;
