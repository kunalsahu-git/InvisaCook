
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
import Image from "next/image"

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormValues) {
    console.log(data);
    // Here you would typically handle the login logic, e.g., call an API
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
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                    <Link href="/forgot-password" passHref>
                      <span className="hover:underline cursor-pointer">Forgot your password?</span>
                    </Link>
                </div>
                 <div className="text-center text-sm">
                  Don't have an account?{' '}
                  <Link href="/register" passHref>
                    <span className="font-semibold text-accent hover:underline cursor-pointer">Sign up</span>
                  </Link>
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
