import axios, { AxiosError } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";

const AuthBaseURL = "http://duck-django.slothnet.lan/api/";
export const AuthAPI = axios.create({
  baseURL: AuthBaseURL,
});
export const SpaceTraderAPI = axios.create({
  baseURL: "https://api.spacetraders.io/v2/",
});
interface LoginResponse {
  access: string;
  refresh: string;
}
export const validateToken = async (): Promise<string | null> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
      const newToken = await refreshAuthToken();
      return newToken;
    }
    const response = await AuthAPI.post(AuthBaseURL + "token/verify/", {
      token,
    });
    if (response.status !== 200) {
      return response.data.access;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const loginUser = async (
  username: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await axios.post<LoginResponse>(AuthBaseURL + "token/", {
      username,
      password,
    }); // used axios instead of AuthAPI because we don't want to intercept this request
    const { access, refresh } = response.data;
    localStorage.setItem("token", access);
    localStorage.setItem("refreshToken", refresh);
    return { success: true };
  } catch (error) {
    const apiError = error as AxiosError<{ detail: string }>;
    var errorMessage = "Network Error";
    if (apiError.response) {
      errorMessage = apiError.response.data.detail;
    }
    return { success: false, error: errorMessage };
  }
};
export const refreshAuthToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      const response = await axios.post(AuthBaseURL + "token/refresh/", {
        refresh: refreshToken,
      });
      const newToken = response.data.access;
      localStorage.setItem("token", newToken);
      return newToken;
    } catch (error) {
      // The refresh failed, remove the tokens from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return null;
    }
  } else {
    // There's no refresh token, return null
    return null;
  }
};
export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string,
  spaceTraderToken: string
) => {
  try {
    const response = await AuthAPI.post(AuthBaseURL + "register/", {
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
        repeat_password: password,
      },
      spacetrader_code: spaceTraderToken,
    });
    if (response.status === 201) {
      return { success: true };
    }

    if (response.status === 400) {
      return { success: false, error: response.data.user };
    }
    return { success: false, error: "An error occurred during registration." };
  } catch (error) {
    const apiError = error as AxiosError<string>;
    var errorMessage = "Network Error";
    if (apiError.response) {
      errorMessage = apiError.response.data;
    }
    return { success: false, error: errorMessage };
  }
};
AuthAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
AuthAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const newToken = await refreshAuthToken();
    if (newToken) {
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return AuthAPI(originalRequest);
    } else {
      return Promise.reject(error);
    }
  }
);

export interface UserJWT extends JwtPayload {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  spacetrader_code: string;
}
export const getUserData = (): UserJWT | undefined => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode<UserJWT>(token);
    return decodedToken;
  }
  return undefined;
};

SpaceTraderAPI.interceptors.request.use(
  (config) => {
    const token = getUserData()?.spacetrader_code;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
