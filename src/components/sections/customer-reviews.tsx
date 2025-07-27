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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Star, StarHalf } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reviewFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  rating: z.coerce.number().min(1).max(5),
  title: z.string().min(5, "Title must be at least 5 characters."),
  comment: z.string().min(10, "Comment must be at least 10 characters."),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const reviews = [
    {
        name: "Sarah L.",
        rating: 5,
        title: "Absolutely Revolutionary!",
        comment: "I was skeptical at first, but the InvisaCook is a game-changer. My kitchen feels so much bigger and cleaner. It heats up incredibly fast and is surprisingly easy to use. Worth every penny!",
        date: "2 weeks ago",
        avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
        name: "Mark T.",
        rating: 4.5,
        title: "Impressive Tech, Slight Learning Curve",
        comment: "The technology is incredible. It's amazing to cook directly on the counter. There was a small learning curve with the controls and finding the exact spot for the pans, but once you get it, it's fantastic. The InvisaMat is a must-have.",
        date: "1 month ago",
        avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
        name: "Jessica B.",
        rating: 5,
        title: "The centerpiece of my new kitchen",
        comment: "We designed our entire kitchen renovation around the InvisaCook. It's the ultimate minimalist look. Performance is top-notch, and it's a huge talking point when we have guests over. Highly recommend!",
        date: "3 months ago",
        avatar: "https://i.pravatar.cc/150?img=3"
    }
]

const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="h-5 w-5 fill-current" />)}
            {halfStar && <StarHalf key="half" className="h-5 w-5 fill-current" />}
            {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />)}
        </div>
    )
}

export function CustomerReviews() {
  const { toast } = useToast();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: "",
      rating: 5,
      title: "",
      comment: "",
    },
  });

  async function onSubmit(data: ReviewFormValues) {
    console.log(data);
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback! Your review has been submitted for approval.",
    });
    form.reset();
  }

  return (
    <section id="reviews" className="w-full py-12 md:py-24 border-t">
      <div className="container mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Customer Reviews</h2>
          <div className="space-y-8">
            {reviews.map((review, index) => (
                <Card key={index} className="bg-transparent shadow-none border-0">
                    <CardHeader className="p-0">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={review.avatar} alt={review.name} />
                                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-base">{review.name}</CardTitle>
                                <CardDescription>{review.date}</CardDescription>
                            </div>
                            <div className="ml-auto">
                                <StarRating rating={review.rating} />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                        <h3 className="font-semibold">{review.title}</h3>
                        <p className="text-muted-foreground mt-2">{review.comment}</p>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>
        
        <div className="flex items-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
              <CardDescription>Share your experience with this product.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Review Title</FormLabel>
                          <FormControl><Input placeholder="e.g., Amazing product!" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <Input type="number" min="1" max="5" step="0.5" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Your Review</FormLabel>
                            <FormControl><Textarea placeholder="Tell us what you think..." {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Submit Review</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
