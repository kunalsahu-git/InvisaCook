"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Cookie } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent has been given
    if (!localStorage.getItem('cookie_consent')) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
  };

  const handleDecline = () => {
    // You can handle decline logic here, e.g., disabling non-essential cookies
    localStorage.setItem('cookie_consent', 'false');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className={cn(
        "fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6",
        "transition-transform duration-500 ease-in-out",
        showBanner ? "translate-y-0" : "translate-y-full"
    )}>
      <Card className="max-w-4xl mx-auto shadow-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4">
                <Cookie className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                <div className="flex-grow">
                    <h3 className="font-semibold text-lg">We use cookies</h3>
                    <p className="text-muted-foreground text-sm">
                    Our website uses cookies to enhance your experience and analyze site traffic. By clicking "Accept", you agree to our use of cookies.
                    You can learn more by visiting our <Link href="/terms" className="underline hover:text-accent">terms and conditions</Link> page.
                    </p>
                </div>
            </div>
            <div className="flex gap-4 flex-shrink-0">
              <Button onClick={handleAccept}>Accept</Button>
              <Button variant="outline" onClick={handleDecline}>Decline</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
