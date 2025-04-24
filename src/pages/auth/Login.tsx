import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input } from "@heroui/react";
import { useAuth } from "../../contexts/AuthContext";
import { FirebaseError } from "firebase/app";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

// Define login form schema with Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoginError(null);
      await login(data.email, data.password);
      showSuccessToast("Logged in successfully!");
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      let errorMsg = "An unexpected error occurred";
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            errorMsg = "Invalid email or password";
            break;
          case "auth/user-not-found":
            errorMsg = "No account found with this email";
            break;
          case "auth/wrong-password":
            errorMsg = "Incorrect password";
            break;
          default:
            errorMsg = "An error occurred during login";
        }
      }
      setLoginError(errorMsg);
      showErrorToast(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-dark-background">
      <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign in to your account
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          login cred: jairao9817@gmail.com
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          password: jairao
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                errorMessage={errors.password?.message}
                endContent={
                  <Button
                    variant="light"
                    onPress={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                }
              />
            )}
          />
          <Button
            type="submit"
            color="primary"
            variant="solid"
            fullWidth
            isLoading={isSubmitting}
            className="font-medium"
          >
            Sign In
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
