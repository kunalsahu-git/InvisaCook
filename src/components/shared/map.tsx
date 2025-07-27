import Image from "next/image";

export function Map() {
  return (
    <Image
      src="https://placehold.co/1200x900.png"
      alt="Map of dealer locations"
      width={1200}
      height={900}
      className="h-full w-full object-cover"
      data-ai-hint="world map"
    />
  );
}
