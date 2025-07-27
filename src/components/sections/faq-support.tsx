"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const supportFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  registerProduct: z.boolean().default(false).optional(),
  serialNumber: z.string().optional(),
}).refine(data => {
    if (data.registerProduct && !data.serialNumber) {
        return false;
    }
    return true;
}, {
    message: "Serial number is required for product registration.",
    path: ["serialNumber"],
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

const faqs = [
  {
    question: "What types of countertop materials are compatible with InvisaCook?",
    answer: "InvisaCook is designed to work seamlessly with porcelain and granite countertops. We recommend specific thicknesses and densities for optimal performance and safety. Please consult our installation guide for detailed material specifications."
  },
  {
    question: "Do I need special cookware for InvisaCook?",
    answer: "Yes, you need induction-compatible cookware. We highly recommend our InvisaCookware sets, which are specifically designed with a 5-ply construction and riser system to optimize heat transfer and protect your countertop."
  },
  {
    question: "How is InvisaCook installed?",
    answer: "InvisaCook is installed underneath your countertop by a certified professional. The unit is mounted using our InvisaRail system, making it completely invisible from the top. We provide detailed installation manuals and video tutorials in our Resource Library."
  },
  {
    question: "Is cooking directly on the countertop safe?",
    answer: "Absolutely. The induction technology only heats the cookware, not the countertop itself. While the area under the pot will get warm from heat transfer, it cools down quickly. Our InvisaMat adds an extra layer of protection and heat diffusion."
  },
];

export function FaqSupport() {
  const { toast } = useToast();
  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      registerProduct: false,
      serialNumber: "",
    },
  });

  function onSubmit(data: SupportFormValues) {
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });
    form.reset();
  }

  const isRegistering = form.watch("registerProduct");

  return (
    <section id="support" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">FAQs & Support</h2>
          <p className="text-muted-foreground">
            Find answers to common questions and get in touch with our support team.
          </p>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex items-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl><Input placeholder="Support Inquiry" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl><Textarea placeholder="Your message..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registerProduct"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                         <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Register a new product</FormLabel>
                          <FormDescription>
                            Check this box to include product registration with your inquiry.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  {isRegistering && (
                    <FormField
                      control={form.control}
                      name="serialNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Serial Number</FormLabel>
                          <FormControl><Input placeholder="Enter product serial number" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
