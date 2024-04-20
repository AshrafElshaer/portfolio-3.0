"use client";
import React from "react";
import { BiLogoReact } from "react-icons/bi";
import {
  SiExpress,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbBrandNextjs, TbBrandNodejs } from "react-icons/tb";

const techStack = [
  {
    name: "TypeScript",
    icon: <SiTypescript size={24} />,
  },
  {
    name: "Next.js",
    icon: <TbBrandNextjs size={30} />,
  },
  {
    name: "React Native",
    icon: <BiLogoReact size={30} />,
  },

  {
    name: "Redux",
    icon: <SiRedux size={24} />,
  },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss size={24} />,
  },
  {
    name: "Node.js",
    icon: <TbBrandNodejs size={24} />,
  },
  {
    name: "Express.js",
    icon: <SiExpress size={24} />,
  },
  {
    name: "Supabase",
    icon: <SiSupabase size={22} />,
  },
];

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function TeckStack({
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-8 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {techStack.map((item, idx) => (
          <li
            className=" relative  flex-shrink-0 flex items-center gap-2 hover:text-primary transition-colors duration-300 select-none"
            style={{
              background: "",
            }}
            key={item.name}
          >
            {item.icon}
            <span className=" text-lg font-semibold">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
