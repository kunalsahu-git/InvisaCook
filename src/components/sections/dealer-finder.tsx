"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { MapPin, Search, Mail, Phone, Link as LinkIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

const dealerFormSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  materials: z.string().min(10, { message: "Please describe the materials you handle." }),
});

type DealerFormValues = z.infer<typeof dealerFormSchema>;

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
  const { toast } = useToast();

  const form = useForm<DealerFormValues>({
    resolver: zodResolver(dealerFormSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      materials: "",
    },
  });

  async function onSubmit(data: DealerFormValues) {
    console.log(data);
    toast({
      title: "Application Submitted",
      description: "Thank you for your interest! We will review your application and get back to you soon.",
    });
    form.reset();
  }

  return (
    <>
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
             <Image 
                src="https://placehold.co/1200x900.png"
                alt="Map of dealer locations"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
                data-ai-hint="world map"
             />
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

    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50 border-t">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-3xl font-bold tracking-tight">Become a Dealer</h2>
                    <p className="text-muted-foreground text-lg">
                        Interested in joining our network of authorized dealers? Fill out the application form to get started.
                    </p>
                    <p className="text-muted-foreground">
                        We partner with premium countertop fabricators and kitchen showrooms who share our passion for innovation and design excellence.
                    </p>
                </div>
                 <Card className="w-full">
                    <CardHeader>
                    <CardTitle>Dealer Application</CardTitle>
                    <CardDescription>Join our network. Fill out the form below to apply.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="companyName" render={({ field }) => ( <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="Your Company Inc." {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField control={form.control} name="contactName" render={({ field }) => ( <FormItem><FormLabel>Contact Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="contact@company.com" {...field} /></FormControl><FormMessage /></FormItem> )} />
                        <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl><FormMessage /></FormItem> )} />
                        
                        <Button type="submit" className="w-full" variant="outline">Apply Now</Button>
                        </form>
                    </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
    </>
  );
}
