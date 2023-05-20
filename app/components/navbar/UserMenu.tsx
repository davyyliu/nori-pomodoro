"use client";

import Container from "@/app/Container";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const registalModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  function toggleMenuSignUp() {
    registalModal.onOpen();
    toggleOpen();
  }

  function toggleMenuLogIn() {
    loginModal.onOpen();
    toggleOpen();
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="
        p-4
        md:py-1
        md:px-2
        border-[1.5px]
        border-black
        flex
        flex-row
        items-center
        gap-3
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition"
        >
          <AiOutlineMenu color="black" />
        </div>
      </div>

      {isOpen && (
        <div
          className="
        absolute
        rounded-xl
        shadow-md
        w-[40vw]
        md:w-32
        bg-white
        overflow-hidden
        right-0
        top-12
        text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={toggleMenuLogIn} label="Login" />
              <MenuItem onClick={toggleMenuSignUp} label="Sign Up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
