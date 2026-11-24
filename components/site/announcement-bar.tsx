import { site } from "@/lib/site";
import { focusRing, gutter } from "@/lib/styles";

export function AnnouncementBar() {
  return (
    <div className="bg-latte text-espresso">
      <div className={`${gutter} flex h-[46px] items-center justify-between gap-6 text-sm`}>
        <p className="flex items-center gap-2.5">
          <span aria-hidden className="size-2.5 rounded-full bg-coffee" />
          Mở cửa hôm nay {site.hours}
        </p>
        <p className="hidden items-center gap-3 md:flex">
          <span>Giao cà phê hạt toàn quốc</span>
          <span aria-hidden className="h-[0.9em] w-px bg-espresso/30" />
          <span>{site.address}</span>
          <span aria-hidden className="h-[0.9em] w-px bg-espresso/30" />
          <a href={`tel:${site.phone}`} className={`transition-opacity hover:opacity-60 ${focusRing}`}>
            {site.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
