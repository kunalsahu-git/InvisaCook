import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { DealerApplication } from "@/components/sections/dealer-application";

export default function DealerApplicationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <DealerApplication />
      </main>
      <Footer />
    </div>
  );
}
