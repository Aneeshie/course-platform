import React from "react";
import Link from "next/link";
import { BookOpenIcon, CreditCardIcon, GraduationCap, Zap } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-transparent backdrop-blur-sm border-b border-white/10">
      <Link
        href={"/"}
        className="text-xl font-extrabold text-white flex item-center gap-2"
      >
        Edvora <GraduationCap className="size-6" />
      </Link>

      <div className="items-center space-x-1 flex sm:space-x-4">
        <Link
          href={"/courses"}
          className="flex items-center gap-1 px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
        >
          <BookOpenIcon className="size-4" />
          <span className="hidden sm:inline ">Courses</span>
        </Link>

        <Link
          href={"/pro"}
          className="flex items-center gap-1 px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
        >
          <Zap className="size-4" />
          <span className="hidden sm:inline ">Pro</span>
        </Link>

        <UserButton />

        <SignedIn>
          <Link href={"/billing"}>
            <Button
              variant={"outline"}
              size={"sm"}
              className="flex items-center gap-2"
            >
              <CreditCardIcon className="size-4" />
              <span className="hidden sm:inline">Billing</span>
            </Button>
          </Link>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <Button variant={"outline"} size={"sm"}>
              Login
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedOut>
          <SignUpButton mode="modal">
            <Button size={"sm"}>Sign Up</Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
