"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

type Resource = {
  id: number;
  title: string;
  description: string;
  category: "All" | "Burners" | "Cookware" | "Accessories";
  language: "All" | "English" | "Spanish" | "French";
  type: "Manual" | "Spec Sheet" | "Guide";
};

const resources: Resource[] = [
  { id: 1, title: "InvisaCook 4-Burner Installation Manual", description: "Complete guide to installing the 4-burner model.", category: "Burners", language: "English", type: "Manual" },
  { id: 2, title: "InvisaCookware Care Guide", description: "How to maintain your cookware for a lifetime of use.", category: "Cookware", language: "English", type: "Guide" },
  { id: 3, title: "InvisaCharge Spec Sheet", description: "Technical specifications for the InvisaCharge unit.", category: "Accessories", language: "English", type: "Spec Sheet" },
  { id: 4, title: "Manual de Instalación (2 Quemadores)", description: "Guía de instalación para el modelo de 2 quemadores.", category: "Burners", language: "Spanish", type: "Manual" },
  { id: 5, title: "InvisaRail Technical Drawing", description: "Detailed dimensions and specs for the InvisaRail.", category: "Accessories", language: "English", type: "Spec Sheet" },
  { id: 6, title: "Guide d'installation de la table de cuisson", description: "Instructions complètes pour tous les modèles.", category: "Burners", language: "French", type: "Guide" },
];

export function ResourceLibrary() {
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState("All");

  const filteredResources = resources.filter(resource => 
    (category === "All" || resource.category === category) &&
    (language === "All" || resource.language === language)
  );

  return (
    <section id="resources" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Resource Library</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Access installation guides, manuals, and spec sheets for all our products.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Tabs value={category} onValueChange={setCategory} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="All">All Products</TabsTrigger>
              <TabsTrigger value="Burners">Burners</TabsTrigger>
              <TabsTrigger value="Cookware">Cookware</TabsTrigger>
              <TabsTrigger value="Accessories">Accessories</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Languages</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Español</SelectItem>
              <SelectItem value="French">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {resource.type} / {resource.language}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No resources found for the selected filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
