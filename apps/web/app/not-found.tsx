import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import * as React from "react";

const NotFoundIllustration = (props: React.SVGAttributes<SVGElement>) => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="0.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop
          offset="0%"
          style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }}
        />
        <stop
          offset="100%"
          style={{ stopColor: "hsl(var(--primary) / 0.3)", stopOpacity: 1 }}
        />
      </linearGradient>
    </defs>
    {/* Concentric, dashed circles for a 'searching' or 'lost signal' feel */}
    <circle
      cx="12"
      cy="12"
      r="10"
      strokeDasharray="4 4"
      className="animate-spin-slow"
    />
    <circle
      cx="12"
      cy="12"
      r="7"
      strokeDasharray="4 4"
      className="animate-spin-slow animation-delay-300"
    />
    <circle
      cx="12"
      cy="12"
      r="4"
      strokeDasharray="2 2"
      className="animate-spin-slow animation-delay-600"
    />

    {/* The '404' text, subtly integrated */}
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dy=".3em"
      fontSize="8"
      fontWeight="bold"
      fill="url(#grad1)"
    >
      404
    </text>
  </svg>
);

export default function NotFoundPage() {
  return (
    <>
      <main className="flex min-h-screen flex-grow items-center justify-center px-4 text-center">
        <div className="flex flex-col items-center">
          <NotFoundIllustration className="text-muted-foreground/50 mb-8" />
          <h1 className="text-primary text-4xl font-bold tracking-tighter sm:text-5xl">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mt-4 max-w-md">
            Oops! The page you're looking for seems to have gotten lost in the
            digital ether. Let's get you back on track.
          </p>
          <div className="mt-8">
            <Link href="/">
              <Button size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
