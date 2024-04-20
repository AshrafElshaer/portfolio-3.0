import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { VscGithubAlt } from "react-icons/vsc";
import { BsTwitterX } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";
import { Popover, PopoverTrigger } from "./ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const socialLinks = [
  {
    name: "Github",
    icon: <VscGithubAlt size={20} />,
    url: "https://github.com/AshrafElshaer",
  },
  {
    name: "Twitter",
    icon: <BsTwitterX size={18} />,
    url: "https://twitter.com/AshrafElshaer98",
  },
  {
    name: "Email",
    icon: <HiOutlineMail size={20} />,
    url: "mailto:ashrafelshaer98@icloud.com",
  },
];

export default function SocialConnect() {
  return (
    <div className="flex gap-2">
      <TooltipProvider>
        {socialLinks.map((link) => (
          <Tooltip key={link.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={link.url}
                target="_blank"
                className={buttonVariants({
                  size: "icon",
                  variant: "outline",
                })}
              >
                {link.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent sideOffset={8}>
              <span className="text-primary">{link.name}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
