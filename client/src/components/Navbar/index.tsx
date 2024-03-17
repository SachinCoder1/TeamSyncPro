import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";
import MaxWidthWrapper from "../WidthWrapper";
import { NavigationMenuMain } from "./NavbarMain";
import { loggedInNavLinks, navLinks } from "@/data/nav";
import ThemeSwitcher from "./ThemeSwitch";

type MyType = {
  given_name: string;
  family_name: string;
  email: string;
  picture?: string;
};
const Navbar = () => {
  let user: null | MyType = null;

  if (!user && 10%2 === 2) {
    user = {
      given_name: "John",
      family_name: "Doe",
      email: "saci@gmail.com",
      // picture:
      //   "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    };
  }

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>TeamSyncPro</span>
          </Link>

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
                <NavigationMenuMain navLinks={loggedInNavLinks} />

                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? "Your Account"
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ""}
                  imageUrl={user.picture ?? ""}
                />
              </>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
