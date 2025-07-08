import React from "react";
import Link from "next/link";
import { BookOpenIcon, CreditCardIcon, GraduationCap, Zap } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-black/30 backdrop-blur-md border-b border-purple-900">
      <Link
        href={"/"}
        className="text-xl font-extrabold text-white flex items-center gap-2"
      >
        Edvora <GraduationCap className="size-6 text-purple-400" />
      </Link>

      <div className="items-center space-x-1 flex sm:space-x-4">
        <Link
          href={"/courses"}
          className="flex items-center gap-1 px-3 py-2 rounded-md text-purple-300 hover:text-white hover:bg-purple-700/30 transition-colors"
        >
          <BookOpenIcon className="size-4" />
          <span className="hidden sm:inline">Courses</span>
        </Link>

        <Link
          href={"/pro"}
          className="flex items-center gap-1 px-3 py-2 rounded-md text-purple-300 hover:text-white hover:bg-purple-700/30 transition-colors"
        >
          <Zap className="size-4" />
          <span className="hidden sm:inline">Pro</span>
        </Link>

        <UserButton />

        <SignedIn>
          <Link href={"/billing"}>
            <Button
              variant={"outline"}
              size={"sm"}
              className="flex items-center bg-black gap-2 border-purple-500 text-purple-200 hover:bg-purple-700/20 hover:text-white"
            >
              <CreditCardIcon className="size-4" />
              <span className="hidden sm:inline">Billing</span>
            </Button>
          </Link>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <Button
              variant={"outline"}
              size={"sm"}
              className="border-purple-500 text-purple-200 hover:bg-purple-700/20 hover:text-white"
            >
              Login
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedOut>
          <SignUpButton mode="modal">
            <Button
              size={"sm"}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
