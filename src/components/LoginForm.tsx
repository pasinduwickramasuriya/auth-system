// "use client";
// import { JSX, useState } from 'react';
// import { useRouter } from 'next/navigation';
// // import { Label } from "@/components/ui/label"; // Adjust path if needed
// import { Input } from "@/components/ui/input"; // Adjust path if needed
// import { cn } from "@/lib/utils"; // Adjust path if needed
// import { Label } from '@radix-ui/react-label';

// export default function LoginForm(): JSX.Element {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');

//     const res = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     const data: { message: string; token?: string } = await res.json();
//     if (res.ok) {
//       localStorage.setItem('token', data.token!);
//       router.push('/dashboard');
//       router.refresh();
//     } else {
//       setError(data.message);
//     }
//   };

//   return (
//     <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-transparent">
//       <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
//         Login to Your Account
//       </h2>
//       <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
//         Enter your email and password to access your dashboard
//       </p>

//       <form className="my-8" onSubmit={handleSubmit}>
//         <LabelInputContainer className="mb-4">
//           <Label htmlFor="email">Email Address</Label>
//           <Input
//             id="email"
//             placeholder="you@example.com"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </LabelInputContainer>
//         <LabelInputContainer className="mb-8">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             placeholder="••••••••"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </LabelInputContainer>

//         {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

//         <button
//           className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
//           type="submit"
//         >
//           Login →
//           <BottomGradient />
//         </button>

//         {/* Divider and Social Login Buttons */}
//         <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        
//       </form>
//     </div>
//   );
// }

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
//       <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
//     </>
//   );
// };

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={cn("flex w-full flex-col space-y-2", className)}>
//       {children}
//     </div>
//   );
// };


"use client";
import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Added for the registration link
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";

export default function LoginForm(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data: { message: string; token?: string } = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token!);
      router.push("/dashboard");
      router.refresh();
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-transparent">
      <h2 className="text-xl font-bold text-foreground">
        {/* Changed to text-foreground for theme consistency */}
        Login to Your Account
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {/* Changed to text-muted-foreground for theme consistency */}
        Enter your email and password to access your dashboard
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </LabelInputContainer>

        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
        {/* Changed text-red-500 to text-destructive for theme consistency */}

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 dark:bg-primary dark:hover:bg-primary/90"
          /* Simplified button styles using bg-primary and hover:bg-primary/90 */
          type="submit"
        >
          Login →
          <BottomGradient />
        </button>

        {/* Divider */}
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-muted to-transparent dark:via-muted" />
        {/* Changed via-neutral-300 to via-muted for light mode, via-neutral-700 to via-muted for dark mode */}

        {/* Added Registration Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Not registered yet?{" "}
            <Link
              href="/register"
              className="text-primary hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};