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
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { MapPin, Search } from "lucide-react";

const dealerFormSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  materials: z.string().min(10, { message: "Please describe the materials you handle." }),
});

type DealerFormValues = z.infer<typeof dealerFormSchema>;

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
    // In a real app, you would send this data to your backend.
    console.log(data);
    toast({
      title: "Application Submitted",
      description: "Thank you for your interest! We will review your application and get back to you soon.",
    });
    form.reset();
  }

  return (
    <section id="dealers" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find a Dealer</h2>
            <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              Locate authorized InvisaCook dealers and showrooms near you.
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Enter your city, state, or zip code" className="pl-10" />
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-xl">
             <Image 
                src="https://placehold.co/800x600.png"
                alt="Map of dealer locations"
                width={800}
                height={600}
                className="h-full w-full object-cover"
                data-ai-hint="world map"
             />
          </div>
        </div>
        
        <div className="flex items-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Become a Dealer</CardTitle>
              <CardDescription>Join our network of authorized dealers. Fill out the form below to apply.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Company Inc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="contact@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="materials"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Materials Handled</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Porcelain, Granite, Marble..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" variant="outline">Apply Now</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
