"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { X, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetDescription } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';


type CookiePreferences = {
    marketing: boolean;
    functional: boolean;
    analytics: boolean;
};

const CookieSettings = ({ open, onOpenChange, onSave }: { open: boolean, onOpenChange: (open: boolean) => void, onSave: (prefs: CookiePreferences) => void }) => {
    const isMobile = useIsMobile();
    const [preferences, setPreferences] = useState<CookiePreferences>({
        marketing: true,
        functional: true,
        analytics: true,
    });

    useEffect(() => {
        const savedPrefs = localStorage.getItem('cookie_preferences');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }
    }, []);

    const handleSave = () => {
        onSave(preferences);
        onOpenChange(false);
    };

    const content = (
        <>
             <SheetHeader className={cn(isMobile ? "" : "text-center")}>
                 <SheetTitle>Advanced Cookie Settings</SheetTitle>
                 <SheetDescription className={cn(isMobile ? "" : "hidden")}>
                    Manage your cookie preferences.
                 </SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-6">
                <div className="flex items-start justify-between">
                    <div>
                        <Label htmlFor="essential-cookies" className="font-semibold">Essential Cookies</Label>
                        <p className="text-sm text-muted-foreground mt-1">These cookies enable core functionality such as security, verification of identity and network management. These cookies can't be disabled.</p>
                    </div>
                    <Switch id="essential-cookies" checked disabled />
                </div>
                 <Separator />
                <div className="flex items-start justify-between">
                    <div>
                        <Label htmlFor="marketing-cookies" className="font-semibold">Enable Marketing Cookies</Label>
                        <p className="text-sm text-muted-foreground mt-1">These cookies are used to track advertising effectiveness to provide a more relevant service and deliver better ads to suit your interests.</p>
                    </div>
                     <Switch id="marketing-cookies" checked={preferences.marketing} onCheckedChange={(checked) => setPreferences(p => ({...p, marketing: checked}))} />
                </div>
                 <Separator />
                 <div className="flex items-start justify-between">
                    <div>
                        <Label htmlFor="functional-cookies" className="font-semibold">Enable Functional Cookies</Label>
                        <p className="text-sm text-muted-foreground mt-1">These cookies collect data to remember choices users make to improve and give a more personalised experience.</p>
                    </div>
                     <Switch id="functional-cookies" checked={preferences.functional} onCheckedChange={(checked) => setPreferences(p => ({...p, functional: checked}))} />
                </div>
                 <Separator />
                 <div className="flex items-start justify-between">
                    <div>
                        <Label htmlFor="analytics-cookies" className="font-semibold">Enable Analytics Cookies</Label>
                        <p className="text-sm text-muted-foreground mt-1">These cookies help us to understand how visitors interact with our website, discover errors and provide better overall analytics.</p>
                    </div>
                     <Switch id="analytics-cookies" checked={preferences.analytics} onCheckedChange={(checked) => setPreferences(p => ({...p, analytics: checked}))} />
                </div>
            </div>
            <SheetFooter>
                <Button onClick={handleSave} className="w-full">Save Preferences</Button>
            </SheetFooter>
        </>
    );

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent side="bottom" className='h-screen'>
                   {content}
                </SheetContent>
            </Sheet>
        )
    }

    return (
         <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                {content}
            </DialogContent>
        </Dialog>
    )
}


export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // Check if consent has been given
    if (!localStorage.getItem('cookie_consent')) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (consent: boolean, preferences?: CookiePreferences) => {
    localStorage.setItem('cookie_consent', consent.toString());
    if (consent && preferences) {
         localStorage.setItem('cookie_preferences', JSON.stringify(preferences));
    } else if (!consent) {
         localStorage.removeItem('cookie_preferences');
    }
    setShowBanner(false);
  };

  const handleAcceptAll = () => {
    handleConsent(true, { marketing: true, functional: true, analytics: true });
  }

  const handleDeclineAll = () => {
    handleConsent(false);
  }

  const handleSavePreferences = (preferences: CookiePreferences) => {
    handleConsent(true, preferences);
  }


  if (!showBanner) {
    return null;
  }

  return (
    <>
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
                <Button variant="link" className="text-primary-foreground underline" onClick={() => setIsSettingsOpen(true)}>Settings</Button>
                <Button variant="outline" className="bg-transparent border-primary-foreground/50 hover:bg-primary-foreground/10 hover:text-primary-foreground" onClick={handleDeclineAll}>Decline All</Button>
                <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" onClick={handleAcceptAll}>Accept</Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:bg-accent/20 hover:text-accent" onClick={handleDeclineAll}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CookieSettings open={isSettingsOpen} onOpenChange={setIsSettingsOpen} onSave={handleSavePreferences} />
    </>
  );
}
