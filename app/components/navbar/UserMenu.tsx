"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Avatar from "../Avatar";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
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
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
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
            {currentUser ? (
              <>
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={toggleMenuLogIn} label="Login" />
                <MenuItem onClick={toggleMenuSignUp} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
