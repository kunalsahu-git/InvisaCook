
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
import { Separator } from "@/components/ui/separator"

const profileFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

const passwordFormSchema = z.object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function ProfilePage() {
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
    },
  });

   const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    console.log("Profile update:", data);
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    console.log("Password change:", data);
  }

  return (
    <div className="space-y-8">
        <Card>
            <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your name and email address.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <FormField control={profileForm.control} name="name" render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={profileForm.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <Button type="submit">Save Changes</Button>
                </form>
            </Form>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Choose a new password for your account.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <FormField control={passwordForm.control} name="currentPassword" render={({ field }) => ( <FormItem><FormLabel>Current Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={passwordForm.control} name="newPassword" render={({ field }) => ( <FormItem><FormLabel>New Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <Button type="submit">Update Password</Button>
                </form>
            </Form>
            </CardContent>
        </Card>
    </div>
  );
}
