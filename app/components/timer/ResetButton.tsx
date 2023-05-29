"use client";

import { useState } from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

interface ResetButtonProps {
  onClick: () => void;
  props?: [];
}

const ResetButton: React.FC<ResetButtonProps> = ({ props, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      onClick={handleClick}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer"
    >
      <button className="playbtn" {...props} onClick={onClick}>
        <ArrowUturnLeftIcon
          className="
            xs:h-10
            xs:w-10
            sm:h-2
            sm:w-2
            md:h-4
            md:w-4
            lg:h-6
            lg:w-6
            xl:h-8
            xl:w-8
            2xl:h-12
            2xl:w-12
        stroke-width-1.5 
        stroke-[#F0E6D4] 
        fill-none"
        />
      </button>
    </div>
  );
};

export default ResetButton;
