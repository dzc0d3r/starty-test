"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@workspace/ui/components/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 324 323"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="88.1023"
        y="144.792"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 88.1023 144.792)"
        fill="currentColor"
      />
      <rect
        x="85.3459"
        y="244.537"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 85.3459 244.537)"
        fill="currentColor"
      />
    </svg>
  );
};

// Hamburger icon component
const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

// Search icon component
const SearchIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

// X icon component
const XIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// Types
export interface NavbarNavLink {
  href: string;
  label: string;
  active?: boolean;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: NavbarNavLink[];
  signInText?: string;
  signInHref?: string;
  ctaText?: string;
  ctaHref?: string;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

// Default navigation links
const defaultNavigationLinks: NavbarNavLink[] = [
  { href: "/", label: "Home", active: true },
  { href: "/companies", label: "Companies" },
  { href: "/scpis", label: "SCPIs" },
  { href: "/about", label: "About" },
];

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = "/",
      navigationLinks = defaultNavigationLinks,
      signInText = "Sign In",
      signInHref = "/signin",
      ctaText = "Get Started",
      ctaHref = "/signup",
      searchPlaceholder = "Search...",
      onSignInClick,
      onCtaClick,
      onSearch,
      ...props
    },
    ref,
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef<HTMLElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768); // 768px is md breakpoint
        }
      };

      checkWidth();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    // Focus search input when opened
    useEffect(() => {
      if (isSearchOpen && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isSearchOpen]);

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onSearch && searchQuery.trim()) {
        onSearch(searchQuery.trim());
      }
      // Close search on mobile after submission
      if (isMobile) {
        setIsSearchOpen(false);
      }
    };

    const handleSearchToggle = () => {
      setIsSearchOpen(!isSearchOpen);
      setSearchQuery("");
    };

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    return (
      <header
        ref={combinedRef}
        className={cn(
          "bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b px-4 backdrop-blur md:px-6",
          className,
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group hover:bg-accent hover:text-accent-foreground h-9 w-9"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-48 p-2">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-1">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          <Link
                            href={link.href}
                            className={cn(
                              "hover:bg-accent hover:text-accent-foreground flex w-full items-center rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors",
                              link.active
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground/80",
                            )}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <Link
                href={logoHref}
                className={cn(
                  "text-primary hover:text-primary/90 flex items-center space-x-2 transition-colors",
                  isMobile && isSearchOpen && "hidden",
                )}
              >
                <div className="text-2xl">{logo}</div>
                <span className="hidden text-xl font-bold sm:inline-block">
                  Starty SCPI
                </span>
              </Link>
              {/* Navigation menu */}
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <Link
                          href={link.href}
                          className={cn(
                            "group hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium no-underline transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                            link.active
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground/80 hover:text-foreground",
                          )}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>

          {/* Search Input - Desktop */}
          {!isMobile && (
            <div className="mx-8 max-w-md flex-1">
              <form onSubmit={handleSearchSubmit} className="relative">
                <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-full pr-4 pl-10"
                />
              </form>
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Toggle */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "hover:bg-accent hover:text-accent-foreground h-9 w-9 transition-all",
                  isSearchOpen && "bg-accent text-accent-foreground",
                )}
                onClick={handleSearchToggle}
              >
                {isSearchOpen ? <XIcon /> : <SearchIcon />}
              </Button>
            )}

            {/* Mobile Search Input */}
            {isMobile && isSearchOpen && (
              <div className="absolute top-1/2 right-4 left-4 z-50 -translate-y-1/2 transform">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-background h-9 w-full border-2 pr-4 pl-10 shadow-lg"
                    onBlur={() => {
                      // Close search when clicking outside, but only if input is empty
                      if (!searchQuery.trim()) {
                        setTimeout(() => setIsSearchOpen(false), 150);
                      }
                    }}
                  />
                </form>
              </div>
            )}

            {/* Auth Buttons - Hidden when search is open on mobile */}
            {(!isMobile || !isSearchOpen) && (
              <>
                <Link href={signInHref}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-accent hover:text-accent-foreground text-sm font-medium"
                    onClick={onSignInClick}
                  >
                    {signInText}
                  </Button>
                </Link>
                <Link href={ctaHref}>
                  <Button
                    size="sm"
                    className="h-9 rounded-md px-4 text-sm font-medium shadow-sm"
                    onClick={onCtaClick}
                  >
                    {ctaText}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    );
  },
);

Navbar.displayName = "Navbar";

export { Logo, HamburgerIcon, SearchIcon, XIcon };
