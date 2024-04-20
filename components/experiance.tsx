import React from "react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { buttonVariants } from "./ui/button";

const experiance = [
  {
    title: "Mobile Application Developer",
    company: "Team Mate Me",
    date: "Apr 2024 - Present",
    href: "https://www.teammateme.com",
  },
];

export default function Experiance() {
  return (
    <section>
      <h2 className="font-bold text-primary">Experiance</h2>

      <div className="mt-8 flex flex-col gap-2">
        {experiance.map((exp) => (
          <Link
            href={exp.href}
            key={exp.title}
            target="_blank"
            className={buttonVariants({
              variant: "ghost",
              className: "w-full flex items-center justify-between  gap-4",
            })}
          >
            <h3 className="text-primary">{exp.company}</h3>
            {/* <span>{exp.title}</span> */}

            <Separator className="flex-1" />

            <span>{exp.date}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
