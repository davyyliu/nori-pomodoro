"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Imnori"
      className="hidden md:block cursor-pointer"
      height="120"
      width="120"
      src="/images/Logo-transp.png"
    />
  );
};

export default Logo;
