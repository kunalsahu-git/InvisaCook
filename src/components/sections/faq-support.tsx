
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
    question: "Why choose Invisacook?",
    answer: "At Invisacook, we are passionate about creating a platform to inform about our technology and showcase the dealers that sell our products. Our main focus is on induction cooking, which is the most efficient and safe way to cook. We believe that our technology can revolutionize the way people cook, and we are committed to making it accessible to everyone. Our products are sold by international dealers located around the globe. Specializing in invisible induction cooking technology, aiming to revolutionize the way people cook. Our team of experts has been working diligently to develop a range of innovative and high-quality cooking technology tailored for Invisacook. We are committed to providing our customers with the most advanced and efficient induction cooking solutions."
  },
  {
    question: "How do you know where the burners are?",
    answer: "Our system is designed with a noise locator, or a device that emits a beeping sound that starts when you turn on your unit and audibly designates the burner you want to use. The beeping will stop when your pan connects with the cooktop surface. However, there are other options you can work out with your dealer to locate the burners. For example, you may have them etch a spot for each burner, or simply ask them to place a sticker there until you have a feeling for where the burner is located."
  },
  {
    question: "What materials can I use with Invisacook?",
    answer: "We recommend large format porcelain material that is 12mm to 20mm thick from numerous brand manufactures, which you will find listed on our website. Granite may also be used, milled to 2cm in the area of the cooktop, but the Natural Stone Disclosure form must be read and understood. The Natural Stone Disclosure form is available in the download section and must be signed, as the use of granite is at your own risk."
  },
  {
    question: "Do I need to have special cookware?",
    answer: "There are many induction quality pots and pans on the market, however, the most compatible pans for the Invisacook are a full clad stainless-steel type of pan, mostly known as Tri-Ply or 5Ply Cookware. Invisacook has its own cookware line too, which is 5Ply, Hex Non-Stick, with risers on them. The InvisaMat is not needed when using our Invisacookware. Non-Compatible: Aluminum, all-copper, or glass cookware will not work unless they have a layer on the bottom with magnetic properties. Many manufacturers have started adding a magnetic layer to the bottom of those types of pots and pans; however, it can be very thin and will take longer to heat up than a high-quality induction pan, or it may redirect the residual heat back to the countertop, which may be catastrophic for your new countertop. NOTE: Cast Iron pans are inductive, however, they do get extremely hot due to the content of metals within them, and reflect large amounts of heat, which over time will not be good for your countertop. Cast Iron is not recommended on most if not all induction units, as they lower the life span of glass units and are very hard to control the heat levels."
  },
  {
    question: "Is there anything special I need to do with my induction cookware for it to be used on my countertop?",
    answer: "Nothing needs to be done to your cookware, but we provide you an InvisaMat for each burner for the following reasons: 1. Prevent pans from hitting your countertop and making loud noises. 2. Helps prevent any possible scratches and thermal shock. 3. Keeps the metal from your pan from touching your countertop, while helping the countertop stay cooler longer."
  },
  {
    question: "Can I order this product directly and install it myself?",
    answer: "No. The product needs to be installed by a certified dealer. It is not a plug-and-play type of unit. If there is not a certified dealer in your area, our corporate team will work with you and your fabricator."
  },
  {
    question: "Do the units have special electrical requirements?",
    answer: "Yes, 220v twist lock receptacle is needed for the 1-2-3-4 burner unit and 110v receptacle for the 1- and 2-burner units. 5 Burners will need to be Hardwired. All units are to be plugged in but can be hardwired, if required in your county or country."
  },
  {
    question: "Is there any special cleaning that needs to be done to the countertop where the unit is?",
    answer: "Only the proper care recommended by the stone fabricator and countertop manufacturer is needed."
  },
  {
    question: "Can the unit be used wirelessly?",
    answer: "Yes. With the Invisacook App, you can wirelessly use the cooktop from a remote location. Click here to access the video on how to install the Invisacook app and connect it to your unit."
  },
  {
    question: "Why is it that when I have one burner at full power and I turn on another burner, my first burner lowers its number?",
    answer: "This is the result of the burners’ power sharing. With multiple burners on one side, the unit will automatically attempt to work as efficiently as possible with a total combination of 14. (Example P-4, or 9-5) That being said, there is no need to worry — your burners are still receiving adequate levels of power in order to maintain efficient cooking temperatures. For example, when frying food, you will only need Level 7 to be used, and both burners can be at 7 and 7 which equals 14."
  },
  {
    question: "Does the countertop surface get hot when you are cooking?",
    answer: "Yes. The surface will get warmer and warmer over time as you cook, eventually becoming hot to the touch. NOTE: A Natural or Matte finish will feel cooler to the touch than a polished finish. For your standard short cooking time, the surface will not get that hot. However, once you have surpassed about 10 minutes’ worth of cooking time, the surface will be HOT, and you should exercise caution around the area in use. The unit controller will also initiate the H symbol to let you know the surface may be hot. Please keep in mind that Induction is a very quick heating process, so when frying foods, you only need a Level 6 or 7 on your controller. The Power Boost is only to be used when Boiling water. Remember never cook with an Empty Cooking Vessel."
  },
  {
    question: "How fast does it boil water?",
    answer: "This is the aged old question, which will depend on many things like how much water and what cookware is being used. At Power Boost (P) on the 21cm coils you will get 2,000 watts of power, and using an Induction Pot and Lid, you will boil water in under 4 minutes. Power Boost is to only be used when boiling water. You can see Boil Times in the Download Document Section of the website."
  }
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
    <section id="support" className="w-full py-12 md:py-24 bg-secondary/50">
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
