"use client";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

interface SettingsButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  props?: [];
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ props, onClick }) => {
  return (
    <div
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer"
    >
      <button className="playbtn" {...props} onClick={onClick}>
        <AdjustmentsHorizontalIcon
          className="
            xs:h-6
            xs:w-6
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

export default SettingsButton;
