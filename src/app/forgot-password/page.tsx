
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordFormValues) {
    console.log(data);
    // Here you would handle the password reset logic
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-secondary/50 py-12">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <Link href="/" className="flex justify-center items-center gap-2 font-bold mb-4" aria-label="InvisaCook Home">
                <Image src="https://placehold.co/140x35.png" alt="InvisaCook Logo" width={140} height={35} data-ai-hint="company logo" />
            </Link>
            <CardTitle>Forgot Password?</CardTitle>
            <CardDescription>No problem. Enter your email to receive a reset link.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Send Reset Link
                </Button>
                <div className="text-center">
                   <Button asChild variant="link">
                        <Link href="/login">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Login
                        </Link>
                    </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
