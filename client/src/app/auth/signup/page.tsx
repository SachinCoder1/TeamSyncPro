import { Icons } from "@/components/Icon/Icons";
import { Logo } from "@/components/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="container relative hidden min-h-[calc(100vh-56px)] flex-col items-center justify-center md:flex lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex w-full !max-h-[60%] max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div className="hidden bg-cover lg:block lg:w-1/2">
          <img className="h-full" src="/login.svg" />
        </div>

        <div className="w-full flex justify-center flex-col px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <Logo />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>

          <Button variant="outline" type="button" className="w-full mt-4">
            <Icons.google className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or login with email
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          

          <div className="grid gap-2 mt-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2 mt-4">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              type="password"
              placeholder="*******"
            />
          </div>

          <div className="mt-6">
            <Button className="w-full">Sign in</Button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <Link
              href={"/auth/signup"}
              className={cn(buttonVariants({ variant: "link" }), "text-xs")}
            >
              OR SIGN UP
            </Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
