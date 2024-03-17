"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icon/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { LoginFormDataSchema } from "@/lib/zod-validation/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUser } from "@/app/actions/user";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = {
  email: string;
  password: string;
};

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginFormDataSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const re = await signIn("credentials", { username: data.email, password: data.password });
    console.log("re......................................................: ", re);
    // if (tryLogin?.error) {
    //   alert(tryLogin.error);
    // }
    // reset();
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
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
            <Input
              disabled={isLoading}
              id="password"
              type="password"
              placeholder="******"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors?.password.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
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
