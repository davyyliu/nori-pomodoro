"use client";

import { useCallback, useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import useSettingsModal from "@/app/hooks/useSettingsModal";

interface SettingsButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  props?: [];
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ props, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);
  const settingsModal = useSettingsModal();

  function toggleSettings() {
    settingsModal.onOpen();
    console.log("123");
  }

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      // onClick={onClick}
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
