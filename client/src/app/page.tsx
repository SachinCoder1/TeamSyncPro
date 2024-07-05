import HomeInit from "@/components/home";
import { getServerAuth } from "@/lib/auth";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function MyHomePage() {
  const session = await getServerAuth();
  if (session) {
    return redirect(`/home`);
  }
  return (
    <main className="">
      <HomeInit />
    </main>
  );
}
