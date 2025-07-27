"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent has been given
    if (!localStorage.getItem('cookie_consent')) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (consent: boolean) => {
    localStorage.setItem('cookie_consent', consent.toString());
    setShowBanner(false);
  };


  if (!showBanner) {
    return null;
  }

  return (
    <div className={cn(
        "fixed bottom-0 left-0 right-0 z-[100] p-4",
        "transition-transform duration-500 ease-in-out",
        showBanner ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="container mx-auto max-w-7xl">
        <div className="bg-primary text-primary-foreground rounded-lg p-4 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-grow text-sm">
                <p>
                We use cookies on our website to see how you interact with it. By accepting, you agree to our use of such cookies. Entering your email on this website may subject it to Invisacook marketing unless otherwise stated. <Link href="/terms" className="underline hover:text-accent font-semibold">Privacy Policy</Link>
                </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="link" className="text-primary-foreground underline" onClick={() => { /* TODO: Implement settings modal */ }}>Settings</Button>
                <Button variant="outline" className="bg-transparent border-primary-foreground/50 hover:bg-primary-foreground/10 hover:text-primary-foreground" onClick={() => handleConsent(false)}>Decline All</Button>
                <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" onClick={() => handleConsent(true)}>Accept</Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:bg-accent/20 hover:text-accent" onClick={() => handleConsent(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
