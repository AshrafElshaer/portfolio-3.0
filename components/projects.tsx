import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const projects = [
  {
    name: "Fx Reseach",
    description: "Forex Trading Research Platform",
    href: "https://fxresearch.app/",
    previewImg: "/fxresearch.png",
  },
  {
    name: "Invoice Xpress",
    description: "Invoicing Software",
    href: "https://curious-meringue-78ffd1.netlify.app/",
    previewImg: "/invoice.png",
  },
];

export default function Projects() {
  return (
    <section>
      <h2 className="font-bold text-primary">Projects</h2>
      <div className="mt-8 flex flex-col gap-2">
        {projects.map((project) => (
          <HoverCard key={project.name} openDelay={0} closeDelay={0}>
            <HoverCardTrigger>
              <Link
                href={project.href}
                target="_blank"
                className={buttonVariants({
                  variant: "ghost",
                  className: "w-full flex items-center justify-between  gap-4",
                })}
              >
                <h3 className="text-primary">{project.name}</h3>

                <Separator className="flex-1" />

                <span>{project.description}</span>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent
              side="top"
              sideOffset={24}
              className="p-0 border-0"
            >
              <img
                src={project.previewImg}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </section>
  );
}
