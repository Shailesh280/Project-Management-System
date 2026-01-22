import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { loginUser, registerUser } from "./auth.api";
import { useAuthContext } from "./AuthContext";

export const useLogin = () => {
  const { login } = useAuthContext();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.token);
      message.success("Login successful");
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Login failed"
      );
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      message.success("Registration successful");
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Registration failed"
      );
    },
  });
};
