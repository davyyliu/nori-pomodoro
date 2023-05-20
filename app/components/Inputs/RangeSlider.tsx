"use client";

import Slider from "@mui/material/Slider";
import { useCallback, useState } from "react";
import { styled } from "@mui/material/styles";

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

interface RangeSliderProps {
  title: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  title,
  value,
  onChange,
  step,
  min,
  max,
}) => {
  // const [value, setValue] = useState(0);
  const changeWidth = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      onChange(parseInt(e.target.value));
    },
    [value, onChange]
  );

  return (
    <p
      className="
    flex
    flex-row
    items-stretch
    justify-between
    w-5/6"
    >
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label={title}
        defaultValue={0}
        min={min}
        max={max}
        step={step}
        onChange={changeWidth}
      />
      <div className=" flex-row text-l font-semibold text-neutral-600 text-end">
        {value} {title}
      </div>
    </p>
  );
};

export default RangeSlider;
