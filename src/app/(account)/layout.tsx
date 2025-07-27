
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Package, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const accountNav = [
    { name: 'My Orders', href: '/account/orders', icon: Package },
    { name: 'My Profile', href: '/account/profile', icon: User },
]

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50 py-12 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
           <div className="grid md:grid-cols-4 gap-8">
               <aside className="md:col-span-1">
                   <Card className="p-4">
                        <nav className="flex flex-col gap-2">
                           {accountNav.map(item => (
                                <Button asChild key={item.name} variant="ghost" className="justify-start">
                                    <Link href={item.href}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.name}
                                    </Link>
                                </Button>
                           ))}
                            <Button variant="ghost" className="justify-start text-destructive hover:text-destructive">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>
                        </nav>
                   </Card>
               </aside>
               <div className="md:col-span-3">
                    {children}
               </div>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
