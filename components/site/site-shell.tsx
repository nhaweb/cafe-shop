import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { AnnouncementBar } from "./announcement-bar";
import { CartSheet } from "./cart-sheet";
import { SiteFooter } from "./site-footer";

/**
 * Shell for every public page: announcement bar, footer, the cart drawer and toasts.
 * Each page renders its own <SiteNav> (overlaid on the hero on Home, solid elsewhere).
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <AnnouncementBar /> */}
      {children}
      <SiteFooter />
      <CartSheet />
      <Toaster theme="light" position="bottom-center" />
    </>
  );
}
