import React from "react";
import SocialConnect from "./social-connect";

export default function About() {
  return (
    <section className="w-full flex flex-col ">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-primary text-xl font-semibold">Ashraf Elshaer</h1>
          <span>Softwere Engineer</span>
        </div>
        <SocialConnect />
      </div>
      <span className="mt-8 leading-6">
        A fullstack devoloper passionate about crafting seamless user
        experiences and staying ahead in the ever-evolving tech landscape.
      </span>
      <span className="mt-2">
        Let&apos;s build innovative solutions together !
      </span>
     
    </section>
  );
}
