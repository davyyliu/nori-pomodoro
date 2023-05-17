"use client";

import { useCallback, useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

interface SettingsButtonProps {
  onClick: () => void;
  props?: [];
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ props, onClick }) => {
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
        <AdjustmentsHorizontalIcon className="h-12 w-12 stroke-width-1.5 stroke-[#F0E6D4] fill-none" />
      </button>
    </div>
  );
};

export default SettingsButton;
