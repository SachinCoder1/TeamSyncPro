"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icon/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  FirstTimeSignupSchema,
  LoginFormDataSchema,
} from "@/lib/zod-validation/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUser, signUpUser } from "@/app/actions/user";
import { signIn } from "next-auth/react";
import { PasswordInput } from "../ui/password-input";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(FirstTimeSignupSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    const res = await signUpUser(data);
    if (res.message === "CONFLICT") {
      setError("root", {
        message: "Email already exists! Please Login or use another email.",
      });
    }

    if (res.status == 400) {
      setError("root", {
        message:
          "Invalid form data! Please check your filled data and try again.",
      });
    }

    if (res.message == "SERVER_ERROR") {
      setError("root", {
        message: "Server error! Please try again later or contact us",
      });
    }

    if (res.message == "CREATED") {
      reset();
      const res = await signIn("credentials", {
        username: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.ok) {
        reset();
        signInUser(sessionStorage.getItem("invitationToken"));
      }
      if (res?.error) {
        console.log("error: ", res.error);
        setError("root", {
          message: "Invalid email or password. Please try again.",
        });
      }
    }

    setIsLoading(false);
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {errors.root && (
        <p className="text-red-500 text-sm">{errors?.root.message}</p>
      )}
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              disabled={isLoading}
              id="name"
              type="name"
              placeholder="m@example.com"
              {...register("name")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors?.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled={isLoading}
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors?.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              disabled={isLoading}
              id="password"
              placeholder="******"
              autoComplete="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors?.password.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <PasswordInput
              disabled={isLoading}
              id="confirmPassword"
              placeholder="******"
              autoComplete="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors?.confirmPassword.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign up with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
