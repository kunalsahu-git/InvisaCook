import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.528 8.004h-2.17V14.4s-1.88-1.72-4.352-1.72V9.37s2.44.09 4.351-1.637Z" />
    <path d="M12.528 8.004s.732-5.523 6.472-5.523v3.31s-3.95.2-3.95 4.053h3.95v3.21h-3.95s.31 4.72 4.35 4.72v3.31s-6.87-.23-6.87-7.483Z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <h3 className="text-lg font-semibold uppercase tracking-wider text-accent">InvisaCook</h3>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Invisible cooking technology for modern homes.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-3">
          <div>
            <h4 className="font-semibold text-primary-foreground/90">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="#registration" className="text-sm text-primary-foreground/80 hover:text-accent">Registration</Link></li>
              <li><Link href="#terms" className="text-sm text-primary-foreground/80 hover:text-accent">Terms & Warranties</Link></li>
              <li><Link href="/resources" className="text-sm text-primary-foreground/80 hover:text-accent">Downloads</Link></li>
              <li><Link href="#app" className="text-sm text-primary-foreground/80 hover:text-accent">Mobile App</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground/90">Contact Us</h4>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-primary-foreground/80">info@invisacook.com</li>
              <li className="text-sm text-primary-foreground/80">+1 386-263-8578</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground/90">Follow Us</h4>
            <div className="mt-4 flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:bg-accent/20 hover:text-accent" asChild>
                <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:bg-accent/20 hover:text-accent" asChild>
                <Link href="#" aria-label="YouTube"><Youtube className="h-5 w-5" /></Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:bg-accent/20 hover:text-accent" asChild>
                <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></Link>
              </Button>
               <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:bg-accent/20 hover:text-accent" asChild>
                <Link href="#" aria-label="TikTok"><TikTokIcon className="h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-4">
        <p className="text-center text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} InvisaCook Revolution. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
