import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50 py-12 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl">Terms & Warranties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Terms of Service</h2>
                <p>Welcome to InvisaCook! These terms and conditions outline the rules and regulations for the use of our website and purchase of our products. By accessing this website we assume you accept these terms and conditions. Do not continue to use InvisaCook if you do not agree to take all of the terms and conditions stated on this page.</p>
                <p className="mt-4">...</p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Product Warranty</h2>
                <p>All InvisaCook products are covered by a limited warranty. The warranty period and coverage details vary by product. Please refer to the documentation that came with your product for specific warranty information.</p>
                <p className="mt-4">Our warranty covers defects in materials and workmanship under normal use. It does not cover damage caused by accident, misuse, abuse, neglect, unauthorized modification, or commercial use.</p>
                <p className="mt-4">...</p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
