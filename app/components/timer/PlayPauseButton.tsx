"use client";

import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/outline";

interface PlayPauseButtonProps {
  onClick: () => void;
  clicked: boolean;
  props?: [];
  height?: string;
  width?: string;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
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
        hover:opacity-80
        transition
        cursor-pointer"
    >
      {clicked ? (
        <button className="playbtn" {...props} onClick={onClick}>
          <PauseCircleIcon
            className={`
            ${height ? `${height}` : "h-24"} 
            ${width ? `${width}` : "w-24"} 
            stroke-width-1.5 stroke-[#F0E6D4] fill-none
            z-50`}
          />
        </button>
      ) : (
        <button className="playbtn" {...props} onClick={onClick}>
          <PlayCircleIcon
            className={`
            ${height ? `${height}` : "h-24"} 
            ${width ? `${width}` : "w-24"} 
          stroke-width-1.5 stroke-[#4E7563] fill-none
          z-50`}
          />
        </button>
      )}
    </div>
  );
};

export default PlayPauseButton;
