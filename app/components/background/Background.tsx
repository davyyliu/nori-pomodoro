"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useState } from "react";

const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0;
let yValue = 0;

function update(cursorPosition) {
  parallax_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;

    el.style.transform = `
    translateX(calc(-50% + ${-xValue * 0}px))
    translateY(calc(-50% + ${yValue * speedy}px))
    `;
  });
}

update(1);

window.addEventListener("mousemove", (e) => {
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  update(e.clientX);
});

const Background = () => {
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setMaxHeight(
        window.innerWidth >= 725
          ? window.innerWidth * 0.6
          : window.innerWidth * 1.6
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main style={{ maxHeight: `${maxHeight}px` }}>
      <div className="vignette"></div>
      <Image
        alt="template"
        height={1200}
        width={1920}
        className="parallax backdrop"
        data-speedy="0.31"
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
        className=" pomodoro"
        data-speedy="0.3"
        data-speedz="0"
        src="/images/Pomodoro.png"
        data-distance="1400"
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
