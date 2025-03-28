"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiRedux,
  SiMongodb,
  SiExpress,
  SiJsonwebtokens,
} from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { BackgroundBeams } from "./ui/background-beams";

interface TechItem {
  icon: React.ReactNode;
  name: string;
  desc: string;
}

const techItems: TechItem[] = [
  // Top row: Next.js, Tailwind CSS, Framer Motion, Redux
  {
    icon: <SiNextdotjs className="text-4xl md:text-5xl" />,
    name: "Next.js",
    desc: "React framework",
  },
  {
    icon: <SiTailwindcss className="text-4xl md:text-5xl" />,
    name: "Tailwind CSS",
    desc: "Utility-first CSS",
  },
  {
    icon: <SiFramer className="text-4xl md:text-5xl" />,
    name: "Framer Motion",
    desc: "Animation library",
  },
  {
    icon: <SiRedux className="text-4xl md:text-5xl" />,
    name: "Redux",
    desc: "State management",
  },
  // Bottom row: MongoDB, Express, Node.js, JWT
  {
    icon: <SiMongodb className="text-4xl md:text-5xl" />,
    name: "MongoDB",
    desc: "NoSQL database",
  },
  {
    icon: <SiExpress className="text-4xl md:text-5xl" />,
    name: "Express",
    desc: "Web framework",
  },
  {
    icon: <FaNodeJs className="text-4xl md:text-5xl" />,
    name: "Node.js",
    desc: "Backend runtime",
  },
  {
    icon: <SiJsonwebtokens className="text-4xl md:text-5xl" />,
    name: "JWT",
    desc: "Authentication",
  },
];

export default function TechStack() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    // Check if the component is mounted on the client
    if (typeof window === "undefined") return;

    // Function to update mode based on class or media query
    const updateMode = () => {
      const htmlElement = document.documentElement;
      const hasDarkClass = htmlElement.classList.contains("dark");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      // If "dark" class is manually set, use it; otherwise, fall back to system preference
      setIsDarkMode(hasDarkClass || (!htmlElement.classList.contains("light") && prefersDark));
    };

    // Initial check
    updateMode();

    // Listen for system color scheme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      updateMode();
    };
    mediaQuery.addEventListener("change", handleChange);

    // Listen for manual class changes (e.g., via a theme toggle)
    const observer = new MutationObserver(updateMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup listeners
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="tech"
      className="py-24 bg-white dark:bg-black text-black dark:text-white relative overflow-hidden min-h-screen"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-black z-0" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 dark:opacity-30 z-[1]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          key={`header-${isDarkMode ? "dark" : "light"}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-3xl font-bold text-black dark:text-white mb-4 mt-5">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-400">
              Powered By Modern Tech Stack
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-green-500 dark:to-green-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {techItems.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${isDarkMode ? "dark" : "light"}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="backdrop-blur-xl bg-gray-100 dark:bg-black/80 p-6 md:p-8 rounded-2xl group transition-all duration-500 flex flex-col items-center relative overflow-hidden"
              whileHover={{
                y: -5,
                boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.5)",
                backgroundColor: "rgba(229, 231, 235, 0.9)", // Note: Tailwind doesn't support dynamic dark: here, handled by CSS vars or class
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 dark:from-green-500/0 dark:via-green-500/0 dark:to-green-500/0 rounded-2xl blur opacity-0 group-hover:opacity-100 group-hover:via-blue-500/20 dark:group-hover:via-green-500/20 transition duration-1000" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="text-blue-500 dark:text-green-500 mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:text-blue-400 dark:group-hover:text-green-400">
                  {tech.icon}
                </div>
                <h3 className="font-semibold text-black dark:text-white text-lg mb-1">
                  {tech.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm text-center">
                  {tech.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <BackgroundBeams />
    </section>
  );
}