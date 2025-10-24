import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import * as React from "react";

export default function ContactPage() {
  return (
    <>
      <main className="container mx-auto max-w-screen px-4 py-12 sm:py-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Contact Us
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-3xl md:text-xl">
            We{"'"}re here to help. Whether you have a question about our
            services or need expert advice, feel free to reach out.
          </p>
        </header>

        <div className="mx-auto max-w-4xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="How can we help you today?"
                className="min-h-[150px]"
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Send Message
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
