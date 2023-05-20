"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/time")}
      alt="Imnori"
      className="hidden md:block cursor-pointer"
      height="120"
      width="120"
      src="/images/Logo-transp-3.png"
    />
  );
};

export default Logo;
