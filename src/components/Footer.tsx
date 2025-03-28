
"use client";
import { motion } from "framer-motion";
import React from "react";
import { FaGithub, FaTwitter, FaDiscord, FaLinkedin } from "react-icons/fa";
import { BackgroundBeams } from "./ui/background-beams";

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  { icon: <FaGithub />, label: "GitHub", href: "https://github.com" },
  { icon: <FaTwitter />, label: "X", href: "https://twitter.com" },
  { icon: <FaDiscord />, label: "Discord", href: "https://discord.com" },
  { icon: <FaLinkedin />, label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-black text-black dark:text-white py-16 overflow-hidden">
      {/* Background elements - toggle between white and black */}
      <div className="absolute inset-0 bg-gradient-to-t from-white to-gray-100 dark:from-black dark:to-black opacity-80 z-0" /> {/* Light: white to gray-100, Dark: black to black */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-400 dark:via-zinc-700 to-transparent" /> {/* Light: via-zinc-400, Dark: via-zinc-700 */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="mb-8 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-400"> {/* Light: black to zinc-600, Dark: white to zinc-400 */}
                NEXT Auth
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-md"> {/* Light: zinc-600, Dark: zinc-400 */}
              Secure, modern authentication system built with cutting-edge web
              technologies
            </p>
          </motion.div>

          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative flex flex-col items-center"
                aria-label={item.label}
              >
                <span className="w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-gray-100 dark:bg-black/80 text-blue-500 dark:text-green-500 group-hover:text-blue-400 dark:group-hover:text-green-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"> {/* Light: bg-gray-100 text-blue-500 hover:text-blue-400, Dark: bg-black/80 text-green-500 hover:text-green-400 */}
                  {item.icon}
                </span>
                <span className="absolute -bottom-6 text-xs text-zinc-600/0 dark:text-zinc-400/0 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-all duration-300"> {/* Light: zinc-600/0 to zinc-600, Dark: zinc-400/0 to zinc-400 */}
                  {item.label}
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-12 pt-8 text-center" /* No border-t in either mode */
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-zinc-600 dark:text-zinc-400 text-sm"> {/* Light: zinc-600, Dark: zinc-400 */}
            © {new Date().getFullYear()} NEXT Auth System. All rights reserved developed by pasindu wickramasuriya.
          </p>
        </motion.div>
      </div>
      <BackgroundBeams />
    </footer>
  );
}