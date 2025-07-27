import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { MediaGallery } from "@/components/sections/media-gallery";
import { InstagramFeed } from "@/components/sections/instagram-feed";

export default function MediaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <MediaGallery isPage={true} />
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
}
