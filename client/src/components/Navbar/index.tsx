import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";
import MaxWidthWrapper from "../WidthWrapper";
import { NavigationMenuMain } from "./NavbarMain";
import { loggedInNavLinks, navLinks } from "@/data/nav";
import ThemeSwitcher from "./ThemeSwitch";
import SignInButton from "../SignInButton";
import { Logo } from "../Logo";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import CreateOptions from "./CreateOptions";
import { getWorkspace } from "@/app/actions/workspace";
import CommandSearchMenu from "./CommandSearchMenu";
import { getServerAuth } from "@/lib/auth";

type MyType = {
  name: string;
  email: string;
  picture?: string;
};
const Navbar = async () => {
  const session = await getServerAuth();
  const user = session?.user as MyType | undefined;
  const workspace = await getWorkspace();
  // let user: null | MyType = null;

  // if (!user && 10 % 2 === 2) {
  //   user = {
  //     given_name: "John",
  //     family_name: "Doe",
  //     email: "saci@gmail.com",
  //     // picture:
  //     //   "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  //   };
  // }

  return (
    <nav className="sticky h-14 px-8 inset-x-0 top-0 z-30 w-full border-b border-gray-200 backdrop-blur-lg transition-all">
      {/* <MaxWidthWrapper> */}
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Logo />
          {
            user && 
          <CommandSearchMenu workspaceId={workspace.workspace?._id as string} projects={workspace.workspace?.projects} />
          }

          <MobileNav isAuth={!!user} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <NavigationMenuMain navLinks={navLinks} />
                <Link
                  href={"/"}
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
              <CreateOptions workspaceId={workspace.workspace?._id} workspaceName={workspace.workspace?.name} />
                <NavigationMenuMain navLinks={loggedInNavLinks} />

                <UserAccountNav
                  name={
                    !user.name
                      ? "Your Account"
                      : user.name
                  }
                  email={user.email ?? ""}
                  imageUrl={user.picture ?? ""}
                />
              </>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      {/* </MaxWidthWrapper> */}
    </nav>
  );
};

export default Navbar;
