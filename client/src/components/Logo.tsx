import { getServerAuth } from "@/lib/auth";
import Link from "next/link";

export const Logo = async ({ isImage = true }: { isImage?: boolean }) => {
  const session = await getServerAuth();
  return (
    <Link href={!session ? "/" : "/home"} className="flex z-40 font-semibold">
      {isImage && (
        <img
          src="/logo.webp"
          alt="TeamSyncPro"
          width={30}
          height={30}
          className="rounded-full"
        />
      )}

      <span className="dark:text-white text-black">TeamSyncPro.</span>
    </Link>
  );
};
