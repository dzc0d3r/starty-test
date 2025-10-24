import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Logo } from "../navbar";

export const Footer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const linkSections = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "/" },
        { label: "All SCPIs", href: "/scpis" },
        { label: "Companies", href: "/companies" },
        { label: "About Us", href: "/about" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  const socialLinks = [
    { label: "Twitter", href: "#", icon: <Twitter className="h-5 w-5" /> },
    { label: "LinkedIn", href: "#", icon: <Linkedin className="h-5 w-5" /> },
    { label: "Facebook", href: "#", icon: <Facebook className="h-5 w-5" /> },
  ];

  return (
    <footer className={cn("bg-background border-t", className)} {...props}>
      <div className="container mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
        {/* Top section with columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Branding & Description Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-primary flex items-center space-x-2">
              <div className="text-3xl">
                <Logo />
              </div>
              <span className="text-xl font-bold">Starty SCPI</span>
            </Link>
            <p className="text-muted-foreground mt-4 max-w-xs text-sm">
              Your trusted partner for simplified and transparent real estate
              investment.
            </p>
          </div>

          {/* Link Columns */}
          {linkSections.map((section) => (
            <div key={section.title}>
              <p className="text-foreground font-semibold">{section.title}</p>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div>
            <p className="text-foreground font-semibold">Stay Updated</p>
            <p className="text-muted-foreground mt-4 text-sm">
              Subscribe to our newsletter for the latest market insights and
              opportunities.
            </p>
            <form className="mt-4 flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" className="h-9" />
              <Button type="submit" size="sm" className="h-9 px-4">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom section with copyright and social links */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t pt-8 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Starty SCPI. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">{social.label}</span>
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
