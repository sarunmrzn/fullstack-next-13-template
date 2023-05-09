"use client";

import { Spinner, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            first_name: e.currentTarget.first_name.value,
            last_name: e.currentTarget.last_name.value,
            role: "ADMIN",
          }),
        }).then(async (res) => {
          setLoading(false);
          if (res.status === 200) {
            toast({
              title: "Account created!",
              description: "Redirecting to login...",
              status: "success",
            });
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          } else {
            toast({
              title: "Failed to create account",
              description: await res.text(),
              status: "error",
            });
          }
        });
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="first_name"
          className="block text-xs text-gray-600 uppercase"
        >
          First Name
        </label>
        <input
          id="first_name"
          name="first_name"
          placeholder="Jon"
          autoComplete="first_name"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="last_name"
          className="block text-xs text-gray-600 uppercase"
        >
          Last Name
        </label>
        <input
          id="last_name"
          name="last_name"
          placeholder="Doe"
          autoComplete="last_name"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email@email.com"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? <Spinner /> : <p>{"Sign Up"}</p>}
      </button>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-gray-800">
          Sign in
        </Link>{" "}
        instead.
      </p>
    </form>
  );
}
