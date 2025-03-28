
// "use client";
// // import Image from "next/image";

// import TechStack from "@/components/TechStack";
// import { BackgroundBeams } from "@/components/ui/background-beams";
// import { ColourfulText } from "@/components/ui/colourful-text";
// import { JSX } from "react";

// export default function Home(): JSX.Element {
//   return (
//     <>
//       <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-white dark:bg-black">
//         {/* Light: bg-white, Dark: bg-black */}
//         <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-black dark:text-white relative z-2 font-sans">
//           {/* Light: text-black, Dark: text-white */}
//           The best <ColourfulText text="Auth System" /> <br /> Next Auth
//         </h1>
//         <BackgroundBeams />
//       </div>
//       <TechStack />
//     </>
//   );
// }


"use client";
import Link from "next/link"; // Added Link import
import TechStack from "@/components/TechStack";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ColourfulText } from "@/components/ui/colourful-text";
import { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-white dark:bg-black">
        {/* Light: bg-white, Dark: bg-black */}
        <h1 className="text-2xl md:text-3xl lg:text-7xl font-bold text-center text-black dark:text-white relative z-10 font-sans">
          {/* Light: text-black, Dark: text-white */}
          The Best <ColourfulText text="Auth System" /> <br /> Next Auth
        </h1>
        {/* Red Login Button */}
        <Link
          href="/login"
          className="mt-6 text-xl inline-block px-6 py-3  text-red font-semibold rounded-lg shadow-md  transition-colors duration-300 relative z-10"
        >
          <ColourfulText text={"LOGIN......"}/>
        </Link>
        <BackgroundBeams />
      </div>
      <TechStack />
    </>
  );
}