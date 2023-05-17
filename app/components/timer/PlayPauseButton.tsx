"use client";

import { useCallback, useState } from "react";
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/outline";

interface PlayPauseButtonProps {
  onClick: () => void;
  props?: [];
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
  props,
  onClick,
}) => {
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
      {isClicked ? (
        <button className="playbtn" {...props}>
          <PauseCircleIcon className="h-20 w-20 stroke-width-1.5 stroke-white fill-none" />
        </button>
      ) : (
        <button className="playbtn" {...props}>
          <PlayCircleIcon className="h-20 w-20 stroke-width-1.5 stroke-white fill-none" />
        </button>
      )}
    </div>
  );
};

export default PlayPauseButton;

//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke-width="1.5"
//             className="w-20 h-20"
//             stroke="white"
