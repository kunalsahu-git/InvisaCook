
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ResourceLibrary } from "@/components/sections/resource-library";
import { VideoLibrary } from "@/components/sections/video-library";

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ResourceLibrary />
        <VideoLibrary />
      </main>
      <Footer />
    </div>
  );
}
