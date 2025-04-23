import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input } from "@heroui/react";
import { useAuth } from "../../hooks/useAuth";
import { FirebaseError } from "firebase/app";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

// Define signup form schema with Zod
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setSignupError(null);
      await signup(data.email, data.password);
      showSuccessToast("Account created successfully!");
      navigate("/dashboard"); // Redirect to dashboard after successful signup
    } catch (error) {
      let errorMsg = "An unexpected error occurred";
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMsg = "Email is already registered";
            break;
          case "auth/invalid-email":
            errorMsg = "Invalid email address";
            break;
          case "auth/operation-not-allowed":
            errorMsg = "Sign up is currently disabled";
            break;
          case "auth/weak-password":
            errorMsg = "Password is too weak";
            break;
          default:
            errorMsg = "An error occurred during sign up";
        }
      }
      setSignupError(errorMsg);
      showErrorToast(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-dark-background">
      <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                type="text"
                label="Name"
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                label="Email"
                type="email"
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
            Sign Up
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
