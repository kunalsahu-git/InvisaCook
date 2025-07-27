
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Mail, Phone, Link as LinkIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Map } from "../shared/map";
import { Button } from "../ui/button";

const dealers = [
    {
        name: "INVISACOOK HEADQUARTERS",
        email: "info@invisacook.com",
        address: "2323 N State St #96, Palm Coast, FL 32137, USA",
        phone: "386-263-8578",
        website: "https://www.invisacook.com"
    },
    {
        name: "PRISTINE MARBLE AND GRANITE",
        email: "info@pristinemarble.com",
        address: "5466 Regio PI, Atascadero, CA 93422, USA",
        phone: "(805) 466-9222",
        website: "https://www.pristinemarble.com"
    },
    {
        name: "MUNDANO JOHNSON - SHOWROOM",
        email: "info@johnsoncanning.com.ar",
        address: "Mariano Castex 1332, B1804BRS Canning, Provincia de Buenos Aires, Argentina",
        phone: "54(11) 3003-4435",
        website: "https://johnsoncanning.com.ar/"
    },
    {
        name: "BELLA STONE DESIGNS",
        email: "aburch@bellastonedesigns.com",
        address: "4024 S Brook St, Louisville, KY 40214, USA",
        phone: "(502)780-1042",
        website: "https://bellastonedesigns.com"
    },
     {
        name: "DOMUM JOHNSON - SHOWROOM",
        email: "info@domum.com.ar",
        address: "Av. Pres. Figueroa Alcorta 3375, C1425CKG CABA, Argentina",
        phone: "+54 11 4809-8900",
        website: "https://www.domum.com.ar/"
    }
]

export function DealerFinder() {

  return (
    <section id="dealers" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find a Dealer</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
              Locate authorized InvisaCook dealers and showrooms near you to experience the future of cooking firsthand.
            </p>
          </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg">
             <Map />
          </div>

          <div className="lg:col-span-2">
            <Card className="h-full">
                <CardHeader className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search by Location" className="pl-10" />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[calc(theme(height.96)_-_theme(spacing.4))]">
                       <ul className="divide-y">
                           {dealers.map((dealer, index) => (
                               <li key={index} className="p-4 hover:bg-secondary/50">
                                   <h3 className="font-semibold text-primary">{dealer.name}</h3>
                                   <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                                       <p className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent"/><span>{dealer.address}</span></p>
                                       <p className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-accent"/>{dealer.email}</p>
                                       <p className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-accent"/>{dealer.phone}</p>
                                       <p className="flex items-center gap-3"><LinkIcon className="h-4 w-4 shrink-0 text-accent"/><Link href={dealer.website} target="_blank" className="hover:text-accent transition-colors">{dealer.website}</Link></p>
                                   </div>
                               </li>
                           ))}
                       </ul>
                    </ScrollArea>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
