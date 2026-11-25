"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Photo } from "@/lib/content";

/** Swipeable photo strip (shadcn Carousel / Embla). Peeks the next photo so it reads as scrollable. */
export function SpaceCarousel({ photos, tone = "light" }: { photos: Photo[]; tone?: "light" | "dark" }) {
  const navVariant = tone === "dark" ? "outline-light" : "outline";
  return (
    <Carousel opts={{ align: "start", loop: false }} className="w-full">
      <CarouselContent className="-ml-1">
        {photos.map((p) => (
          <CarouselItem key={p.alt} className="basis-[82%] pl-1 md:basis-[34%]">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden bg-espresso/10 md:aspect-[4/3]">
                <Image src={p.img} alt={p.alt} fill sizes="(min-width: 768px) 34vw, 82vw" placeholder="blur" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-sm opacity-70">{p.caption}</figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-6 flex justify-end gap-2">
        <CarouselPrevious variant={navVariant} size="icon" className="static translate-none" />
        <CarouselNext variant={navVariant} size="icon" className="static translate-none" />
      </div>
    </Carousel>
  );
}
