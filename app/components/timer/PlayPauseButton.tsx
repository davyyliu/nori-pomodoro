"use client";

import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/outline";

interface PlayPauseButtonProps {
  onClick: () => void;
  clicked: boolean;
  props?: [];
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
  props,
  clicked,
  onClick,
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
          <PauseCircleIcon className="h-24 w-24 stroke-width-1.5 stroke-[#F0E6D4] fill-none" />
        </button>
      ) : (
        <button className="playbtn" {...props} onClick={onClick}>
          <PlayCircleIcon className="h-24 w-24 stroke-width-1.5 stroke-[#4E7563] fill-none" />
        </button>
      )}
    </div>
  );
};

export default PlayPauseButton;
