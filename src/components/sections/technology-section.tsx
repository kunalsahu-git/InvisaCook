import Image from "next/image";
import { Zap, ShieldCheck, Layers, Award } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Enhanced Safety",
        description: "The countertop remains cool to the touch as heat is generated directly in the cookware. Auto-shutoff features prevent overheating."
    },
    {
        icon: Zap,
        title: "Unmatched Efficiency",
        description: "Induction is faster and more energy-efficient than gas or electric cooktops, using up to 90% of energy for cooking."
    },
    {
        icon: Layers,
        title: "Seamless Integration",
        description: "Installed beneath 12mm thick porcelain or granite, InvisaCook becomes a completely integrated part of your kitchen design."
    },
    {
        icon: Award,
        title: "Premium Materials",
        description: "Works with durable and beautiful countertops, preserving your kitchen's luxury aesthetic without compromise."
    }
]

export function TechnologySection() {
  return (
    <section id="tech" className="w-full py-12 md:py-24 bg-secondary/50">
      <div className="container mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">The Magic of Invisibility</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our cutting-edge induction technology operates through your countertop, creating a versatile surface for prepping, cooking, and serving. It's the ultimate fusion of form and function.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                  <div key={feature.title} className="flex flex-col gap-2">
                      <feature.icon className="h-8 w-8 text-accent" />
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
              ))}
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center space-y-4 rounded-xl p-4">
          <video
            autoPlay
            loop
            muted
            controls
            playsInline
            width={600}
            height={400}
            className="w-full h-full object-cover brightness-50"
            data-ai-hint="technology diagram"
            src="/videos/intro.mp4"
          ></video>
           <div className="text-center">
            <h3 className="font-semibold">Cross-Section View</h3>
             <p className="text-sm text-muted-foreground">1. Cookware  2. Countertop  3. InvisaCook Unit</p>
           </div>
        </div>
      </div>
    </section>
  );
}
