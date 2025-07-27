"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, CookingPot, ShoppingCart } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { href: "/#products", label: "Products" },
    { href: "/#tech", label: "How It Works" },
    { href: "/resources", label: "Resources" },
    { href: "/dealers", label: "Dealers" },
    { href: "/media", label: "Media" },
    { href: "/#support", label: "Support" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold" aria-label="InvisaCook Home">
          <CookingPot className="h-6 w-6 text-accent" />
          <span className="font-headline text-xl font-semibold">InvisaCook</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition-colors hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button className="hidden sm:inline-flex" variant="outline">Contact Sales</Button>
          <Button asChild variant="ghost" size="icon">
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">View Cart</span>
            </Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setIsOpen(false)}>
                  <CookingPot className="h-6 w-6 text-accent" />
                  <span className="font-headline text-xl font-semibold">InvisaCook</span>
                </Link>
                <nav className="grid gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="py-2 text-lg font-medium transition-colors hover:text-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                 <Button variant="outline">Contact Sales</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
