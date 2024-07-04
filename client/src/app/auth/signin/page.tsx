import { Icons } from "@/components/Icon/Icons";
import { Logo } from "@/components/Logo";
import { SigninForm } from "@/components/forms/SigninForm";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { cn, getQueryParam } from "@/lib/utils";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signin to TeamSyncPro to Login your account",
};

type Props = {
  searchParams: {
    callbackUrl?: string;
  }
}
const LoginPage = async ({searchParams}: Props) => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  const invitationToken = getQueryParam(searchParams?.callbackUrl as string, "invitation_token")
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

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              login with email
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <SigninForm invitationToken={invitationToken} />

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
