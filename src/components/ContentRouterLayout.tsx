import { Container } from "@mui/material";
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
import HomePage from "./authcomp/HomePage";
import Profile from "./authcomp/Profile";
import LoggedInPageLayout from "./layouts/LoggedInPageLayout";

import { useAuth } from "../contexts/AuthProviderContext";
import Fleet from "./authcomp/Fleet";

const routes = [
  { path: "/", element: <HomePage />, protected: true },
  { path: "/fleet", element: <Fleet />, protected: true },
  { path: "/login", element: <Login />, protected: false },
  { path: "/register", element: <RegisterForm />, protected: false },
  { path: "/profile", element: <Profile />, protected: true },
  { path: "*", element: <Navigate to="/" /> },
];

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

const ContentRouterLayout: React.FC = () => {
  const { token } = useAuth();
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute token={token} element={route.element} />
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default ContentRouterLayout;
