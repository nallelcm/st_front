import { Typography, Box, TextField, Button, Alert, Link } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProviderContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { registerUser } from "../API";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  spaceTraderToken: string;
}
interface FormTextFieldProps {
  name: keyof FormData;
  label: string;
  type?: string;
  formData: FormData;
  formError: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  type = "text",
  formData,
  formError,
  handleChange,
}) => {
  return (
    <TextField
      name={name}
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      margin="normal"
      value={formData[name]}
      error={formError[name] !== ""}
      helperText={formError[name]}
      onChange={handleChange}
    />
  );
};

const FormComponent: React.FC = () => {
  const formDataDefaults: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    spaceTraderToken: "",
  };
  const [errorMessage, setErrorMessage] = useState<String>();
  const [formError, setFormError] = useState<FormData>(formDataDefaults);
  const [formData, setFormData] = useState<FormData>(formDataDefaults);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (registerSuccess) {
      navigate("/login");
    }
  }, [registerSuccess]);
  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      repeatPassword,
      spaceTraderToken,
    } = formData;

    const trimmedFormData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
      repeatPassword: repeatPassword.trim(),
      spaceTraderToken: spaceTraderToken.trim(),
    };

    const errors: FormData = formDataDefaults;
    var hasErrors = false;
    if (!trimmedFormData.firstName) {
      errors.firstName = "First name is required";
      hasErrors = true;
    }
    if (!trimmedFormData.lastName) {
      errors.lastName = "Last name is required";
      hasErrors = true;
    }
    if (!trimmedFormData.email) {
      errors.email = "Email is required";
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(trimmedFormData.email)) {
      errors.email = "Invalid email address";
      hasErrors = true;
    }
    if (!trimmedFormData.username) {
      errors.username = "Username is required";
      hasErrors = true;
    }
    if (!trimmedFormData.password) {
      errors.password = "Password is required";
      hasErrors = true;
    }
    if (!trimmedFormData.repeatPassword) {
      errors.repeatPassword = "Repeat password is required";
      hasErrors = true;
    }
    if (trimmedFormData.password !== trimmedFormData.repeatPassword) {
      errors.repeatPassword = "Passwords do not match";
      hasErrors = true;
    }
    if (!trimmedFormData.spaceTraderToken) {
      errors.spaceTraderToken = "SpaceTrader token is required";
      hasErrors = true;
    }

    setFormError(errors);
    setFormData(trimmedFormData);
    return !hasErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const validForm = validateForm();
    if (!validForm) {
      setErrorMessage("Please fill out all fields.");
      return;
    }
    const { firstName, lastName, email, username, password, spaceTraderToken } =
      formData;
    try {
      registerUser(
        firstName,
        lastName,
        email,
        username,
        password,
        spaceTraderToken
      ).then((response) => {
        if (response.success) {
          setRegisterSuccess(true);
        } else {
          if (response.error.user) {
            const errors: FormData = formError;
            if (response.error.user.firstName) {
              errors.firstName = response.error.user.firstName;
            }
            if (response.error.user.lastName) {
              errors.lastName = response.error.user.lastName;
            }
            if (response.error.user.email) {
              errors.email = response.error.user.email;
            }
            if (response.error.user.username) {
              errors.username = response.error.user.username;
            }
            if (response.error.user.password) {
              errors.password = response.error.user.password;
            }
            setFormError(errors);
          }
          setErrorMessage("An error occurred during registration.");
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "An error occurred.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };
  const formFields = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "email", label: "Email" },
    { name: "username", label: "Username" },
    { name: "password", label: "Password", type: "password" },
    { name: "repeatPassword", label: "Repeat Password", type: "password" },
    { name: "spaceTraderToken", label: "SpaceTrader Token" },
  ];
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 4,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Register
      </Typography>

      {formFields.map((field) => (
        <FormTextField
          key={field.name}
          name={field.name as keyof FormData}
          label={field.label}
          type={field.type}
          formData={formData}
          formError={formError}
          handleChange={handleChange}
        />
      ))}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Register
      </Button>

      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link component={RouterLink} to="/login" color="primary">
          Login here
        </Link>
      </Typography>
    </Box>
  );
};
const RegisterForm: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return <>{token ? <></> : <FormComponent />}</>;
};

export default RegisterForm;
