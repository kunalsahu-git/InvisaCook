import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const AppStoreIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 20.94c1.5 0 2.75 1.06 4 0c1.25-1.06 2.5-2.25 4-2.25c1.5 0 2.75 1.06 4 0c1.25-1.06 2.5-2.25 4-2.25c1.5 0 2.75 1.06 4 0c1.25-1.06 2.5-2.25 4-2.25c1.5 0 2.75 1.06 4 0c1.25-1.06 2.5-2.25 4-2.25V3.5c-1.5 0-2.75-1.06-4 0c-1.25 1.06-2.5 2.25-4 2.25c-1.5 0-2.75-1.06-4 0c-1.25 1.06-2.5 2.25-4 2.25c-1.5 0-2.75-1.06-4 0c-1.25 1.06-2.5 2.25-4 2.25S.5 4.56.5 3.5v17.44Z"/><path d="M12 20.94c1.5 0 2.75 1.06 4 0c1.25-1.06 2.5-2.25 4-2.25c1.5 0 2.75 1.06 4 0c1.25-1.06 2.5-2.25 4-2.25c1.5 0 2.75 1.06 4 0c1.25-1.06 2.5-2.25 4-2.25c1.5 0 2.75 1.06 4 0c1.25-1.06 2.5-2.25 4-2.25v-1.25"/></svg>
  );
  
const PlayStoreIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2.5 7.5L2.5 16.5L11.5 21.5L11.5 12.5L2.5 7.5Z"/><path d="M21.5 7.5L12.5 12.5L12.5 21.5L21.5 16.5L21.5 7.5Z"/><path d="M12 2.5L2.5 7.5L12 12.5L21.5 7.5L12 2.5Z"/></svg>
);


export default function MobileAppPage() {
  const features = [
    "Remote control of your burners",
    "Set cooking timers and alerts",
    "Access exclusive recipes",
    "Register your products",
    "Direct access to support"
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <section className="w-full py-12 md:py-24">
            <div className="container mx-auto max-w-5xl px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-center lg:text-left">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                            Control Your Kitchen from Anywhere
                        </h1>
                        <p className="max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground md:text-xl">
                            The InvisaCook app gives you full command over your cooking experience. Adjust temperatures, set timers, and explore recipes with a simple tap.
                        </p>
                        <ul className="space-y-3 inline-block text-left">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle className="h-6 w-6 text-accent" />
                                    <span className="text-lg">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                            <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                                <AppStoreIcon className="mr-3 h-6 w-6" />
                                <div>
                                    <p className="text-xs">Download on the</p>
                                    <p className="text-xl font-semibold">App Store</p>
                                </div>
                            </Button>
                            <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                                <PlayStoreIcon className="mr-3 h-6 w-6" />
                                <div>
                                    <p className="text-xs">GET IT ON</p>
                                    <p className="text-xl font-semibold">Google Play</p>
                                </div>
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Image 
                            src="https://placehold.co/400x800.png"
                            alt="Mobile app screenshot"
                            width={400}
                            height={800}
                            className="rounded-3xl shadow-2xl"
                            data-ai-hint="mobile app"
                        />
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
