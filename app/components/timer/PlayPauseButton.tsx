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
            xs:h-12
            xs:w-12
            sm:h-4
            sm:w-4
            md:h-8
            md:w-8
            lg:h-12
            lg:w-12
            xl:h-16
            xl:w-16
            2xl:h-24
            2xl:w-24
            stroke-width-1.5 
            stroke-[#F0E6D4] 
            fill-none`}
          />
        </button>
      ) : (
        <button className="playbtn" {...props} onClick={onClick}>
          <PlayCircleIcon
            className={`
            xs:h-12
            xs:w-12
            sm:h-4
            sm:w-4
            md:h-8
            md:w-8
            lg:h-12
            lg:w-12
            xl:h-16
            xl:w-16
            2xl:h-24
            2xl:w-24
          stroke-width-1.5 
          stroke-[#4E7563] 
          fill-none`}
          />
        </button>
      )}
    </div>
  );
};

export default PlayPauseButton;
