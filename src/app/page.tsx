"use client";

import { useState } from "react";
import SiteChrome from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/SiteChrome";
import { OffCanvasNav } from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/OffCanvasNav";
import Hero from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/Hero";
import BestsellersCarousel from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/BestsellersCarousel";
import CategoryGrid from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/CategoryGrid";
import PromoStorySlider from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/PromoStorySlider";
import {
  RefillsBanner,
  MembershipPerks,
} from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/RefillsAndMembership";
import FeedbackStrip from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/FeedbackStrip";
import {
  SiteFooter,
  FloatingActions,
} from "@/components/sites/vn-loccitane-com-1c965340/root-8a5edab2/FooterAndFloating";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <SiteChrome onMenuClick={() => setMenuOpen(true)} />
      <OffCanvasNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <BestsellersCarousel />
        <CategoryGrid />
        <PromoStorySlider />
        <RefillsBanner />
        <MembershipPerks />
        <FeedbackStrip />
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  );
}
