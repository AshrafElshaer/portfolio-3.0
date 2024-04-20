import About from "@/components/about";
import Experiance from "@/components/experiance";
import Projects from "@/components/projects";
import Qoute from "@/components/qoute";
import TechStack from "@/components/tech-stack";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-16  mt-20 mb-10   mx-auto max-w-2xl w-full px-4">
      <About />
      <TechStack />
      <Experiance />
      <Projects />
      <Qoute />
    </main>
  );
}
