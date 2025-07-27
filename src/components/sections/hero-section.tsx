import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="home" className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-50"
          src="/videos/intro.mp4"
        >
            Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="container relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          The Future of Cooking is Invisible
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
          Invisible cooking technology for modern homes. Cook directly on your countertop for a seamless, minimalist kitchen aesthetic.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#tech">Learn How It Works</Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="border border-white text-white hover:bg-white/10 hover:text-white">
            <Link href="#dealers">Find a Dealer</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
