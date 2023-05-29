"use client";

import { BellAlertIcon, BellSlashIcon } from "@heroicons/react/24/outline";

interface SoundButtonProps {
  onClick: () => void;
  clicked: boolean;
  props?: [];
  height?: string;
  width?: string;
}

const SoundButton: React.FC<SoundButtonProps> = ({
  props,
  clicked,
  onClick,
  height,
  width,
}) => {
  return (
    <div
      className="
        hover:opacity-80
        relative
        transition
        cursor-pointer"
    >
      {clicked ? (
        <button className="playbtn" {...props} onClick={onClick}>
          <BellAlertIcon
            className={`
            xs:h-9
            xs:w-9
            sm:h-4
            sm:w-4
            md:h-4
            md:w-4
            lg:h-5
            lg:w-5
            xl:h-6
            xl:w-6
            2xl:h-8
            2xl:w-8
            stroke-width-2.5 stroke-[#ffff] fill-none
            drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
            z-50`}
          />
        </button>
      ) : (
        <button className="playbtn" {...props} onClick={onClick}>
          <BellSlashIcon
            className={`
            xs:h-9
            xs:w-9
            sm:h-4
            sm:w-4
            md:h-4
            md:w-4
            lg:h-5
            lg:w-5
            xl:h-6
            xl:w-6
            2xl:h-8
            2xl:w-8
          stroke-width-2.5 stroke-[#F0E6D4] fill-none opacity-80
          drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
          z-50`}
          />
        </button>
      )}
    </div>
  );
};

export default SoundButton;
