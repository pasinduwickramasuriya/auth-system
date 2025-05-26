"use client";

import { useState, useEffect } from "react";

interface User {
  _id: string;
  email: string;
  // Changed: Replaced [key: string]: any with specific optional fields or a Record type
  // Using Record<string, string | number | boolean> to allow dynamic fields with specific value types
  // Adjust the value types (string | number | boolean) based on your MongoDB user schema
  [key: string]: string | number | boolean | undefined;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Assume token is stored in localStorage (adjust as needed)
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to view users");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

        setUsers(data.users);
        // Changed: Replaced err: any with err: unknown for safer error handling
        // 'unknown' requires type checking before accessing properties, unlike 'any'
      } catch (err: unknown) {
        // Added: Type guard to safely access err.message
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          All Users
        </h1>
        {users.length === 0 ? (
          <p className="text-center text-gray-400">No users found.</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user._id}
                className="bg-black-800 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-white">
                    {user.email}
                  </p>
                  {Object.entries(user).map(([key, value]) =>
                    key !== "_id" && key !== "email" && value !== undefined ? (
                      <p key={key} className="text-gray-500">
                        {key}: {value.toString()}
                      </p>
                    ) : null
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
