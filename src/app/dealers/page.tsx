import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { DealerFinder } from "@/components/sections/dealer-finder";

export default function DealersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <DealerFinder />
      </main>
      <Footer />
    </div>
  );
}
