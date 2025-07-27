
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const dealerFormSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
});

type DealerFormValues = z.infer<typeof dealerFormSchema>;

export function DealerApplication() {
  const { toast } = useToast();

  const form = useForm<DealerFormValues>({
    resolver: zodResolver(dealerFormSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
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
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
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
                        
                        <Button type="submit" className="w-full">Apply Now</Button>
                        </form>
                    </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
  );
}
