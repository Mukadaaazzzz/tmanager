"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import RetroGrid from "@/components/magicui/retro-grid";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Type for API response
interface WaitlistResponse {
  message?: string;
  error?: string;
}

export default function IndexPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: WaitlistResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessage("Thanks for joining our waitlist!");
      setEmail("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto mt-20 grid items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="relative flex max-w-[980px] flex-col items-center gap-6">
        <div className={cn(
          "group z-10 rounded-full border border-gray-200 bg-gray-200 text-sm transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}>
          <AnimatedShinyText className="z-10 inline-flex items-center justify-center px-4 py-1 text-neutral-600 transition ease-out hover:text-black hover:duration-300 hover:dark:text-black">
            <span>🚀 TradingManager.online</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>
        <h1 className="z-10 text-center text-3xl font-bold leading-tight tracking-wider text-accent-foreground sm:text-3xl md:text-4xl lg:text-5xl">
          Master Your Mind, Maximize Your Trades
        </h1>
        <p className="z-10 max-w-[700px] text-center text-lg text-accent-foreground sm:text-xl">
          The first platform built to connect traders with expert coaches and psychologists for lasting success.
        </p>
      </div>
      <RetroGrid className="absolute inset-0 z-0 max-w-[1000]" />
      <div className="z-10 flex w-full justify-center">
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col items-center gap-4">
          <div className="flex w-full gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={buttonVariants({ variant: "default" })}
            >
              {isLoading ? "Joining..." : "Join Waitlist"}
            </button>
          </div>
          {message && (
            <p className={`text-sm ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}