"use client";
import { useState, useEffect, JSX } from "react";
import { useRouter } from "next/navigation";
import { ColourfulText } from "@/components/ui/colourful-text";
import TechStack from "@/components/TechStack";
import { BackgroundBeams } from "@/components/ui/background-beams";

interface User {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export default function DashboardPage(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok && data.user) {
          setUser(data.user);
        } else {
          setError(data.message || "Authentication failed");
          router.push("/login");
        }
      } catch (err) {
        setError("Failed to fetch user data");
        console.error("Fetch error:", err);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
    // Dependency array is empty to run only once on mount
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
        <p className="text-red-500 dark:text-red-400 text-lg md:text-xl">
          {error || "No user data available"}
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="container mx-auto px-4 py-12 md:py-20 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            Dashboard
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-2xl lg:text-3xl font-medium">
            Welcome to your dashboard Hello
            <br />
            <ColourfulText text={user.fullName} />
             <br />
            Thank You !
          </p>
        </div>
        <BackgroundBeams />
      </section>
      <TechStack />
    </>
  );
}