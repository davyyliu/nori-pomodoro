"use client";

import Container from "@/app/Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-pink-300 bg-opacity-20 z-10 shadow-sm">
      <div className="border-b border-black shadow-lg">
        <Container>
          <div
            className="
                flex
                flex-row
                items-center
                justify-between
                gap-3
                md:gap-0
                overflow:hidden
                "
          >
            <Logo />
            <UserMenu currentUser={currentUser} />
          </div>{" "}
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
