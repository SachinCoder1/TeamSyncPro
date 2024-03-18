import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LoginLayout() {
  return (
    <div className="relative z-10 flex min-h-screen w-full items-start justify-center overflow-hidden md:items-center">
      <div className="relative z-10 flex h-screen w-full flex-col-reverse bg-white drop-shadow-2xl md:h-[75vh] md:w-11/12 md:flex-row lg:w-2/3">
        <div className="flex flex-col gap-4 mx-auto h-full w-full items-center justify-center lg:w-2/3">
          <h1 className="mb-2 text-6xl text-black text-center lg:mb-4">
            Forgot password
          </h1>
          <p className="text-center">Please Enter email to continue</p>
          <Input
            className="w-full"
            placeholder="Enter your email"
            name="email"
          />
          <Link href="/auth/signin">Remember Password? Login</Link>
          <Button size="lg">Send password reset email</Button>
        </div>
      </div>
    </div>
  );
}
