import Link from "next/link";

export const Logo = ({ isImage = true }: { isImage?: boolean }) => {
  return (
    <Link href="/" className="flex z-40 font-semibold">
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
