"use client";
import { useState, useEffect, JSX } from "react";
import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { ModeToggle } from "./mode-toggle";
import { useRouter, usePathname } from "next/navigation"; // Added usePathname

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ fullName: string } | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // Added to detect route changes

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to fetch user data based on token
  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user); // Set user data if authenticated
          } else {
            localStorage.removeItem("token"); // Clear invalid token
            setUser(null);
          }
        })
        .catch(() => {
          localStorage.removeItem("token"); // Clear token on error
          setUser(null);
        });
    } else {
      setUser(null); // No token, ensure user is null
    }
  };

  // Check authentication on mount, route change, and auth events
  useEffect(() => {
    fetchUserData(); // Initial fetch on mount

    const handleAuthChange = () => {
      fetchUserData(); // Fetch on auth change (login/logout)
    };
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, [pathname]); // Re-run when pathname changes (e.g., after login redirect)

  // Toggle menu function
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close menu function
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Handle link click
  const handleLinkClick = () => {
    closeMenu();
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    closeMenu();
    router.push("/login");
    window.dispatchEvent(new Event("authChange")); // Notify other components
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 dark:bg-background/80 backdrop-blur-md shadow-md"
          : "bg-transparent dark:bg-transparent backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
          >
            Next Auth
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-red-500 dark:hover:text-red-400 font-medium text-sm transition-colors duration-300"
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-foreground hover:text-red-500 dark:hover:text-red-400 font-medium text-sm transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="text-foreground hover:text-red-500 dark:hover:text-red-400 font-medium text-sm transition-colors duration-300"
                >
                  {user.fullName} {/* Profile button shows user’s name */}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-foreground hover:text-red-500 dark:hover:text-red-400 font-medium text-sm transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-foreground hover:text-red-500 dark:hover:text-red-400 font-medium text-sm transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary hover:bg-red-500 dark:hover:bg-red-400 text-primary-foreground font-medium py-2 px-6 rounded-full transition-all duration-300"
                >
                  Register
                </Link>
              </>
            )}
            <ModeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-foreground focus:outline-none p-2 menu-button"
            aria-label="Toggle menu"
          >
            {isOpen ? <IconX className="w-6 h-6" /> : <IconMenu2 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 dark:bg-background/95 backdrop-blur-md mobile-menu">
          <div className="px-4 py-4 space-y-1">
            <Link
              href="/"
              className="block py-3 px-2 text-foreground hover:bg-red-500/20 dark:hover:bg-red-400/20 rounded-md transition-colors duration-300"
              onClick={handleLinkClick}
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-3 px-2 text-foreground hover:bg-red-500/20 dark:hover:bg-red-400/20 rounded-md transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block py-3 px-2 text-foreground hover:bg-red-500/20 dark:hover:bg-red-400/20 rounded-md transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  {user.fullName} {/* Profile button shows user’s name */}
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-3 px-2 text-foreground hover:bg-red-500/20 dark:hover:bg-red-400/20 rounded-md transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-3 px-2 text-foreground hover:bg-red-500/20 dark:hover:bg-red-400/20 rounded-md transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block py-3 px-2 text-foreground hover:bg-red-500/20 dark:hover:bg-red-400/20 rounded-md transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  Register
                </Link>
                <Link
                  href="/register"
                  className="w-full bg-primary hover:bg-red-500 dark:hover:bg-red-400 text-primary-foreground font-medium py-3 px-6 rounded-full transition-all duration-300 text-center"
                  onClick={handleLinkClick}
                >
                  Register
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      )}
    </header>
  );
}