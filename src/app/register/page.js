"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  async function handelFormSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setEmail("");
    setPassword("");
    setCreatingUser(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-5">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User Created.
          <br />
          Now yon can go to{" "}
          <Link className="underline text-primary" href={"/login"}>
            Login &raquo;{" "}
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error occured. <br /> Email must be use before . Enter a new email
        </div>
      )}
      <form onSubmit={handelFormSubmit} className="block max-w-xs mx-auto">
        <input
          type="email"
          placeholder="Email"
          value={email}
          disabled={creatingUser}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={creatingUser}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-center text-gray-600">
          OR <br /> Login with provider
        </div>
        <button
          type="button"
          className="flex gap-4 justify-center "
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image src={"/google.png"} width={24} height={20} alt="google" />
          Login with Google
        </button>
      </form>
    </section>
  );
}
