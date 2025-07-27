
import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Product } from "@/lib/products";

export function ProductDownloads({ documents }: { documents: Product['documents'] }) {
    if (!documents || documents.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-secondary/50">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
                 <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Manuals & Guides</h2>
                    <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                        Access detailed documentation for your product.
                    </p>
                </div>
                <div className="mt-12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {documents.map((doc) => (
                         <Card key={doc.id}>
                            <CardHeader>
                            <CardTitle className="text-xl">{doc.title}</CardTitle>
                            <CardDescription>{doc.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                                {doc.type} / {doc.language}
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="#">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Link>
                            </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
