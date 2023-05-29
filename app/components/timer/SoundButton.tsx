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
            ${height ? `${height}` : "h-24"} 
            ${width ? `${width}` : "w-24"} 
            stroke-width-2.5 stroke-[#ffff] fill-none
            drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
            z-50`}
          />
        </button>
      ) : (
        <button className="playbtn" {...props} onClick={onClick}>
          <BellSlashIcon
            className={`
            ${height ? `${height}` : "h-24"} 
            ${width ? `${width}` : "w-24"} 
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
