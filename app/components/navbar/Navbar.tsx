"use client";

import Container from "@/app/Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-pink-300 bg-opacity-20 z-10 shadow-sm">
      <div className="border-b border-black shadow-md">
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
            <UserMenu />
          </div>{" "}
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
