import { NotFoundContent } from "@/components/site/not-found-content";
import { SiteShell } from "@/components/site/site-shell";

/** Unmatched URLs render outside the (site) group, so wrap them in the shell here. */
export default function GlobalNotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
