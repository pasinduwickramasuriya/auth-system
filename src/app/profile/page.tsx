
// "use client";
// import { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";

// // Define the User type based on the API response
// interface User {
//   fullName: string;
//   phoneNumber: string;
//   email: string;
// }

// // BackgroundGradient component
// const BackgroundGradient = ({
//   children,
//   className,
//   containerClassName,
//   animate = true,
// }: {
//   children?: React.ReactNode;
//   className?: string;
//   containerClassName?: string;
//   animate?: boolean;
// }) => {
//   const variants = {
//     initial: {
//       backgroundPosition: "0 50%",
//     },
//     animate: {
//       backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
//     },
//   };
//   return (
//     <div className={cn("relative p-[4px] group", containerClassName)}>
//       <motion.div
//         variants={animate ? variants : undefined}
//         initial={animate ? "initial" : undefined}
//         animate={animate ? "animate" : undefined}
//         transition={
//           animate
//             ? {
//                 duration: 5,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }
//             : undefined
//         }
//         style={{
//           backgroundSize: animate ? "400% 400%" : undefined,
//         }}
//         className={cn(
//           "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
//           "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
//         )}
//       />
//       <motion.div
//         variants={animate ? variants : undefined}
//         initial={animate ? "initial" : undefined}
//         animate={animate ? "animate" : undefined}
//         transition={
//           animate
//             ? {
//                 duration: 5,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }
//             : undefined
//         }
//         style={{
//           backgroundSize: animate ? "400% 400%" : undefined,
//         }}
//         className={cn(
//           "absolute inset-0 rounded-3xl z-[1] will-change-transform",
//           "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
//         )}
//       />
//       <div className={cn("relative z-10", className)}>{children}</div>
//     </div>
//   );
// };

// export default function ProfilePage(): React.ReactNode {
//   const [user, setUser] = useState<User | null>(null);
//   const [error, setError] = useState<string>("");
//   const [isFetching, setIsFetching] = useState(false);
//   const router = useRouter();

//   const fetchProfile = useCallback(async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     if (isFetching) return; // Prevent multiple fetches
//     setIsFetching(true);

//     try {
//       const res = await fetch("/api/user/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setUser(data.user);
//       } else if (res.status === 401) {
//         localStorage.removeItem("token");
//         setError(data.message || "Token expired");
//         router.push("/login");
//       } else {
//         setError(data.message || "Failed to fetch profile");
//         router.push("/login");
//       }
//     } catch (err) {
//       setError("Failed to fetch profile");
//       console.error(err);
//       router.push("/login");
//     } finally {
//       setIsFetching(false);
//     }
//   }, [router, isFetching]); // Dependencies: router and isFetching

//   useEffect(() => {
//     fetchProfile();
//   }, [fetchProfile]); // Include fetchProfile as dependency

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     setError("");
//     router.push("/login");
//     router.refresh();
//   };

//   if (!user && !error) return <p className="text-white">Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   // Type narrowing: user is guaranteed to be non-null here
//   if (!user) return null;

//   return (
//     <BackgroundGradient
//       containerClassName="w-full max-w-md mx-auto mt-10"
//       className="p-6 rounded-3xl text-white"
//     >
//       <h1 className="text-2xl font-bold mb-4">Profile</h1>
//       <p className="mb-2">
//         <span className="font-semibold">Full Name:</span> {user.fullName}
//       </p>
//       <p className="mb-2">
//         <span className="font-semibold">Phone Number:</span> {user.phoneNumber}
//       </p>
//       <p className="mb-4">
//         <span className="font-semibold">Email:</span> {user.email}
//       </p>
//       <button
//         onClick={handleLogout}
//         className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
//       >
//         Logout
//       </button>
//     </BackgroundGradient>
//   );
// }



"use client";
import { useState, useEffect, useCallback, JSX } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BackgroundBeams } from "@/components/ui/background-beams";

// Define the User type based on the API response
interface User {
  fullName: string;
  phoneNumber: string;
  email: string;
}

// BackgroundGradient component
const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};

export default function ProfilePage(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
      } else if (res.status === 401) {
        localStorage.removeItem("token");
        setError(data.message || "Token expired");
        router.push("/login");
      } else {
        setError(data.message || "Failed to fetch profile");
        router.push("/login");
      }
    } catch (err) {
      setError("Failed to fetch profile");
      console.error(err);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setError("");
    router.push("/login");
    router.refresh();
  };

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // After isLoading and error checks, user is guaranteed to be non-null, but TypeScript needs assertion
  return (<>
    <BackgroundGradient
      containerClassName="w-full max-w-md mx-auto mt-10"
      className="p-6 rounded-3xl text-white"
    >
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="mb-2">
        <span className="font-semibold">Full Name:</span> {user!.fullName}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Phone Number:</span> {user!.phoneNumber}
      </p>
      <p className="mb-4">
        <span className="font-semibold">Email:</span> {user!.email}
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
      >
        Logout
      </button>
    </BackgroundGradient>
    <BackgroundBeams />
    </>);
}