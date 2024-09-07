"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icon/Icons";
import { signIn } from "next-auth/react";
import { signInUser } from "@/app/actions/auth";

export function GuestLoginButton() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleGuestLogin = async () => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      username: process.env.NEXT_PUBLIC_GUEST_LOGIN_EMAIL,
      password: process.env.NEXT_PUBLIC_GUEST_LOGIN_PASSWORD,
      redirect: false,
    });
    setIsLoading(false);

    if (res?.ok) {
      signInUser(null);
    } else if (res?.error) {
      setError("Unable to sign in as guest. Please try again.");
    }
  };

  return (
    <>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button
        className="w-full my-4"
        type="button"
        variant={"outline"}
        disabled={isLoading}
        onClick={handleGuestLogin}
      >
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Sign In as Guest (No login required)
      </Button>
    </>
  );
}
