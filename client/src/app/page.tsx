import HomeInit from "@/components/home";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session && session?.user.workspace) {
    return redirect(`/home/${session.user.workspace}`);
  }
  return (
    <main className="">
      <HomeInit />
    </main>
  );
}
