

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, CookingPot, ShoppingCart, PanelLeft, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";

function AdminHeaderActions() {
    const { toggleSidebar } = useSidebar();
    return (
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="sm:hidden">
            <PanelLeft className="h-6 w-6" />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/all-products", label: "Products" },
    { href: "/#tech", label: "How It Works" },
    { href: "/resources", label: "Resources" },
    { href: "/dealers", label: "Dealers" },
    { href: "/media", label: "Media" },
    { href: "/#support", label: "Support" },
  ];

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isAdminRoute && "sm:bg-transparent sm:border-0 sm:backdrop-blur-none"
    )}>
      <div className={cn("container mx-auto flex h-16 max-w-7xl items-center justify-between px-4", !isAdminRoute && "md:px-6")}>
        <div className="flex items-center gap-2">
            {isAdminRoute && <AdminHeaderActions />}
            <Link href="/" className="flex items-center gap-2 font-bold" aria-label="InvisaCook Home">
            <CookingPot className="h-6 w-6 text-accent" />
            <span className="font-headline text-xl font-semibold">InvisaCook</span>
            </Link>
        </div>

        {!isAdminRoute && (
             <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
             {navItems.map((item) => {
               const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href) && item.href !== "/";
               return (
                 <Link 
                   key={item.label} 
                   href={item.href} 
                   className={cn(
                     "transition-colors hover:text-accent",
                     isActive ? "text-accent font-semibold" : ""
                   )}
                 >
                   {item.label}
                 </Link>
               )
             })}
           </nav>
        )}

        <div className="flex items-center gap-2">
          {!isAdminRoute && (
             <Button asChild variant="ghost" size="icon">
                <Link href="/account/profile">
                  <User className="h-6 w-6" />
                  <span className="sr-only">My Account</span>
                </Link>
            </Button>
          )}
          <Button asChild variant="ghost" size="icon">
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">View Cart</span>
            </Link>
          </Button>
          {!isAdminRoute && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    <SheetDescription className="sr-only">Main navigation links for the InvisaCook website.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-6">
                    <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setIsOpen(false)}>
                    <CookingPot className="h-6 w-6 text-accent" />
                    <span className="font-headline text-xl font-semibold">InvisaCook</span>
                    </Link>
                    <nav className="grid gap-4">
                    {navItems.map((item) => {
                        const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href) && item.href !== "/";
                        return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                            "py-2 text-lg font-medium transition-colors hover:text-accent",
                            isActive ? "text-accent font-semibold" : ""
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.label}
                        </Link>
                        )
                    })}
                    </nav>
                    <Button asChild variant="outline">
                        <Link href="/account/profile" onClick={() => setIsOpen(false)}>My Account</Link>
                    </Button>
                </div>
                </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
