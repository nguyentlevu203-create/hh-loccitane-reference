"use client";

import { useState } from "react";
import SiteChrome from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/SiteChrome";
import { OffCanvasNav } from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/OffCanvasNav";
import {
  SiteFooter,
  FloatingActions,
} from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/FooterAndFloating";
import FeedbackStrip from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/FeedbackStrip";
import { MobileBottomNav } from "@/components/sites/vn-loccitane-com-1c965340/shared/MobileBottomNav";
import type { PageRecord } from "@/data/pages/types";
import { StandardBody } from "./StandardBody";
import { EditorialBody } from "./EditorialBody";
import { StoreLocator } from "./StoreLocator";
import { ContactForm } from "./ContactForm";

/**
 * Shared interactive shell for every /pages/[slug] content page — one composition for all four
 * real templates (see docs/research/phase-7-content/PAGE_TEMPLATE_MATRIX.md), matching the same
 * "no page gets its own implementation" pattern as CollectionPage.tsx.
 */
export function ContentPage({ page }: { page: PageRecord }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <SiteChrome onMenuClick={() => setMenuOpen(true)} forceScrolled />
      <OffCanvasNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="mx-auto max-w-[1000px] px-4 pt-[104px] pb-16 lg:px-10">
        <nav className="mb-4 text-[13px] text-foreground" aria-label="Breadcrumb">
          {page.breadcrumb.map((crumb) => (
            <span key={crumb.href}>
              <a href={crumb.href} className="hover:underline">
                {crumb.label}
              </a>
              <span className="mx-1.5">/</span>
            </span>
          ))}
          <span>{page.title}</span>
        </nav>

        {page.template === "standard" && <StandardBody page={page} />}
        {page.template === "editorial" && <EditorialBody page={page} />}
        {page.template === "store-locator" && <StoreLocator page={page} />}
        {page.template === "contact-form" && <ContactForm page={page} />}
      </main>

      <FeedbackStrip />
      <SiteFooter />
      <FloatingActions />
      <MobileBottomNav />
    </>
  );
}
