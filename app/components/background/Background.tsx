"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import MoveButton from "./MoveButton";

const Background = () => {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);
  const [isMoving, setIsMoving] = useState(true);
  const [hasSound, setHasSound] = useState(true);

  const update = (cursorPosition: number) => {
    const parallax_el = document.querySelectorAll<HTMLElement>(".parallax");

    parallax_el.forEach((el) => {
      let speedx = 0;
      let speedy = 0;
      if (isMoving) {
        speedx = Number(el.dataset.speedx);
        speedy = Number(el.dataset.speedy);
      }

      el.style.transform = `
      translateX(calc(-50% + ${-xValue * 0}px))
      translateY(calc(-50% + ${yValue * speedy}px))
      `;
    });
  };

  const handleMovement = () => {
    setIsMoving(!isMoving);
  };

  function mutePage(): void {
    const audioContext: AudioContext = new AudioContext();
    const gainNode: GainNode = audioContext.createGain();
    gainNode.gain.value = 0; // Set the gain value to 0 to mute the audio

    const audioElements: NodeListOf<HTMLAudioElement> =
      document.querySelectorAll("audio");

    // Connect the gain node to each audio element
    audioElements.forEach((audioElement: HTMLAudioElement) => {
      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
    });
  }

  const handleSound = () => {
    setHasSound(!hasSound);
    mutePage();
  };

  useEffect(() => {
    const handleResize = () => {
      setMaxHeight(
        window.innerWidth >= 725
          ? window.innerWidth * 0.6
          : window.innerWidth * 6
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      setXValue(e.clientX - window.innerWidth / 2);
      setYValue(e.clientY - window.innerHeight / 2);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    update(0); // Call the update function once to initialize the parallax effect
  }, [xValue, yValue]); // Rerun the effect whenever xValue or yValue changes

  return (
    <main
      style={{ maxHeight: `${maxHeight}px` }}
      className="
            xs:max-h-full
            xs:max-w-screen
            xs:items-center
            sm:max-h-full
            md:max-h-full
            lg:max-h-full
            xl:max-h-full
            "
    >
      <div
        className="
        grid
        absolute
        top-0
        right-11
        h-12
        w-12
        p-2
        grid-cols-1
        gap-x-9
        xs:top-0
        xs:right-40
        sm:top-0
        sm:right-20
        md:top-0
        md:right-2
        lg:top-0
        lg:right-3
        xl:top-0
        xl:right-9
        2xl:top-0
        2xl:right-7
      "
      >
        <div>
          <MoveButton
            onClick={handleMovement}
            clicked={isMoving}
            height="h-8"
            width="w-8"
          />
        </div>
      </div>
      <Image
        alt="template"
        height={1200}
        width={1920}
        className="parallax backdrop"
        data-speedy="0.31"
        // data-speedx="0.3"
        data-speedz="0"
        data-distance="-200"
        src="/images/Backdrop v2.png"
      />
      <Image
        alt="template"
        height={593}
        width={1920}
        className="bshadow"
        src="/images/Black shadow.png"
        data-distance="850"
      />
      <Image
        alt="template"
        height={621}
        width={991}
        className="parallax r-big-ridge"
        data-speedx="0.1"
        data-speedy="0.28"
        data-speedz="0"
        src="/images/Right Big Ridge.png"
        data-distance="1100"
      />
      <Image
        alt="template"
        height={621}
        width={991}
        className="parallax r-small-ridge"
        data-speedx="0.0"
        data-speedy="0.15"
        data-speedz="0.0"
        src="/images/Right Small Ridge.png"
        data-distance="1700"
      />
      <Image
        alt="template"
        height={621}
        width={991}
        className="parallax r-branch"
        data-speedy="0.28"
        src="/images/Right Branch.png"
      />
      <Image
        alt="template"
        height={621}
        width={991}
        className="parallax l-branch"
        data-speedy="0.25"
        data-speedz="0.0"
        src="/images/Left Branch.png"
        data-distance="3100"
      />
      <Image
        alt="template"
        height={621}
        width={991}
        className="parallax l-small-ridge"
        data-speedx="0.0"
        data-speedy="0.24"
        data-speedz="0.0"
        src="/images/Left Small Ridge.png"
        data-distance="2100"
      />
      <Image
        alt="template"
        height={621}
        width={991}
        className="sun-rays"
        src="/images/Sun Rays.png"
        data-distance="2400"
      />
      <Image
        alt="template"
        height={621}
        width={991}
        className="parallax r-small-bush"
        data-speedx="0.09"
        data-speedy="0.22"
        data-speedz="0.0"
        src="/images/Right Small Bush.png"
        data-distance="2500"
      />
      <Image
        alt="template"
        height={621}
        width={991}
        className="parallax l-big-ridge"
        data-speedx="0.08"
        data-speedy="0.21"
        data-speedz="0.0"
        src="/images/Left Big Ridge.png"
        data-distance="2800"
      />
      <Image
        alt="template"
        height={621}
        width={991}
        className="parallax m-ridge"
        data-speedx="0.06"
        data-speedy="0.16"
        data-speedz="0.0"
        src="/images/Mid Ridge.png"
        data-distance="3400"
      />
      <Image
        alt="template"
        height={621}
        width={991}
        className="parallax small-bush"
        data-speedx="0.045"
        data-speedy="0.14"
        data-speedz="0.0"
        src="/images/Small Bush.png"
        data-distance="3700"
      />
      <Image
        alt="template"
        height={621}
        width={991}
        className="parallax big-bush"
        data-speedx="0.0005"
        data-speedy="0.1"
        data-speedz="0.0"
        src="/images/Big Bush.png"
        data-distance="4000"
      />
      <Image
        alt="template"
        height={621}
        width={991}
        className="parallax fog"
        data-speedx="0.0"
        data-speedy="0.0"
        data-speedz="0"
        src="/images/Fog v2.png"
        data-distance="4300"
      />
    </main>
  );
};

export default Background;
