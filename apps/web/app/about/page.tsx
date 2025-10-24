import { Separator } from "@workspace/ui/components/separator";
import Image from "next/image";
import * as React from "react";

export default function AboutPage() {
  return (
    <>
      <main className="container mx-auto max-w-screen px-7 py-12 sm:py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            About Starty SCPI
          </h1>
          <p className="text-muted-foreground mt-4 max-w-4xl md:text-xl">
            Democratizing real estate investment through technology,
            transparency, and trust.
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert mx-auto max-w-none">
          <p>
            Welcome to Starty SCPI, your premier partner in navigating the world
            of real estate investment funds (SCPIs). We were founded on a simple
            yet powerful premise: to make institutional-grade real estate
            investment accessible, understandable, and profitable for everyone,
            regardless of their financial background.
          </p>

          <div className="relative my-8 aspect-video overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500"
              alt="A modern office building representing investment"
              fill
              className="object-cover"
            />
          </div>

          <h2>Our Mission</h2>
          <p>
            Our mission is to empower you with the tools, knowledge, and
            opportunities to build long-term wealth through real estate. We
            believe that by leveraging technology, we can break down the
            traditional barriers of high costs, complexity, and exclusivity that
            have long defined property investment. We are committed to providing
            a platform that is not only powerful but also transparent and
            user-friendly.
          </p>

          <Separator className="my-8" />

          <h2>Why Choose Us?</h2>
          <ul>
            <li>
              <strong>Curated Selection:</strong> We meticulously vet and
              partner with the most reputable management companies to offer you
              a curated selection of high-performing SCPIs.
            </li>
            <li>
              <strong>Expert Guidance:</strong> Our team of financial experts is
              dedicated to providing personalized advice and support, helping
              you build a portfolio that aligns with your financial goals.
            </li>
            <li>
              <strong>Complete Transparency:</strong> We believe in clear,
              upfront information. With Starty SCPI, you get detailed insights
              into every fund, with no hidden fees or complex jargon.
            </li>
            <li>
              <strong>Technology-Driven:</strong> Our platform simplifies the
              entire investment process, from discovery and simulation to
              subscription and portfolio management, all from the comfort of
              your home.
            </li>
          </ul>

          <p>
            Join us on our journey to redefine real estate investment. Your
            future starts here.
          </p>
        </div>
      </main>
    </>
  );
}
