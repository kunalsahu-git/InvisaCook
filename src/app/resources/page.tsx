
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ResourceLibrary } from "@/components/sections/resource-library";
import { MediaGallery } from "@/components/sections/media-gallery";

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ResourceLibrary />
        <MediaGallery isPage={true} />
      </main>
      <Footer />
    </div>
  );
}
