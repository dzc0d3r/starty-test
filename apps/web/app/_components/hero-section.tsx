import { getBlurDataURL } from "@/lib/image-blur";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";
import * as React from "react";

const ChatBubbleIcon = (props: React.SVGAttributes<SVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HeroSection = async ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const imageUrl =
    "https://portail-scpi.fr/wp-content/uploads/2025/08/portail-scpi-hero-v2-1536x1025.webp";
  const blurDataURL = await getBlurDataURL(imageUrl);

  return (
    <section className={cn("mt-1 py-2", className)} {...props}>
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Text Content & CTAs */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Invest in the<span className="text-teal-700"> Best SCPI</span>{" "}
              Simple and <span className="text-teal-700">No Extra Cost</span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-[600px] md:text-xl lg:mx-0">
              High returns, no management, personalized advice: make your
              investment a success with Starty-SCPI
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg" className="h-11 px-8 text-sm">
                Book A Meeting
              </Button>
              <Button size="lg" variant="outline" className="h-11 px-8 text-sm">
                Try For Free
              </Button>
            </div>
          </div>

          {/* Right Column: Image & Floating Cards */}
          <div className="relative flex items-center justify-center">
            {/* The main container for the image, providing a clipping mask */}
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl lg:max-w-none">
              <Image
                src={imageUrl}
                alt="Couple planning their investment"
                width={600}
                height={600}
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="aspect-square w-full object-cover"
              />
              {/* Floating Card: Trustpilot */}
              <Card className="animate-fade-in absolute top-4 right-4">
                <CardContent className="p-3">
                  <p className="text-lg font-bold">4,9/5</p>
                  <p className="text-muted-foreground text-xs">★ Trustpilot</p>
                </CardContent>
              </Card>

              {/* Floating Card: Accompaniment */}
              <Card className="animate-fade-in bg-background/80 absolute bottom-4 left-4 backdrop-blur-sm">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="bg-primary/10 text-primary rounded-full p-3">
                    <ChatBubbleIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Accompagnement</p>
                    <p className="text-muted-foreground text-sm">Gratuit</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
