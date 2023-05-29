"use client";

import { SparklesIcon } from "@heroicons/react/24/outline";

interface MoveButtonProps {
  onClick: () => void;
  clicked: boolean;
  props?: [];
  height?: string;
  width?: string;
}

const MoveButton: React.FC<MoveButtonProps> = ({
  props,
  clicked,
  onClick,
  height,
  width,
}) => {
  return (
    <div
      className="
        relative
        transition
        cursor-pointer"
    >
      {clicked ? (
        <button className="playbtn" {...props} onClick={onClick}>
          <SparklesIcon
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
          <SparklesIcon
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

export default MoveButton;
