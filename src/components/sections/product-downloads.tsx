
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Product } from "@/lib/products";

export function ProductDownloads({ documents }: { documents: Product['documents'] }) {
    if (!documents || documents.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-12 md:py-24 border-t bg-secondary/50">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
                 <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Manuals & Guides</h2>
                    <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                        Access detailed documentation for your product.
                    </p>
                </div>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {documents.map((doc) => (
                         <Card key={doc.id} className="text-center flex flex-col">
                            <CardContent className="p-6 flex flex-col items-center gap-4 flex-grow">
                                <FileText className="h-16 w-16 text-accent" />
                                <h3 className="font-semibold text-lg">{doc.title}</h3>
                                <p className="text-sm text-muted-foreground flex-grow">{doc.description}</p>
                                <Button variant="outline" size="sm" asChild className="mt-auto w-full">
                                    <Link href="#">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download ({doc.language})
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
