import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import WardrobeGapsSection from "../components/WardrobeGapsSection";
import AICuratedSection from "../components/AICuratedSection";
import ProductCatalogGrid from "../components/ProductCatalogGrid";
import FloatingAIStylist from "../components/FloatingAIStylist";
import StyleQuizModal from "../components/StyleQuizModal";
import { useStyleHub, getProductImage } from "../context/StyleHubContext";

export default function HomePage() {
  const {
    customer,
    currentPersona,
    browsingHistory,
    offers,
    addToCart,
    isQuizOpen,
    setIsQuizOpen
  } = useStyleHub();

  const [activeGapSolution, setActiveGapSolution] = useState(null);
  const [bundleAdded, setBundleAdded] = useState(false);

  const handleSelectGapSolution = (gap) => {
    setActiveGapSolution(gap);
  };

  const handleClearGapSolution = () => {
    setActiveGapSolution(null);
  };

  const handleAddBundleToBag = () => {
    // Adds the 3-piece curated bundle
    addToCart({
      product_id: "BUNDLE-LOOK-04",
      name: "The Coastal Terrace Linen Ensemble (3-Pieces)",
      price: 4999,
      image_url: "https://lh3.googleusercontent.com/aida/AEtjO1W6mbxkMzq2Zy8x7hD9O_sQ0c0bfvHSmJRWuh-YRD5ReR6LSpv2ahNxPkUANpumAE-wnz66sU_MPq4hY3b3JAcP6DAUKA_O0oGqY3vPJGUDFDauNSXOw3Oqv0GgaVlVeDMBgIrRpAQ-qCaXbVEbLQSa1p_VuEM2hYkGYIQnEWQkVNyk-5AxRGO5dkLB-zFfoqIk9oQntuKmon5SCAmh7t5WWelMXkHn0GTm6eJzoI2juCIOEZB7m15QF7km"
    });
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 3000);
  };

  return (
    <div className="w-full bg-[#FBF9F6] min-h-screen text-slate-800">
      {/* 1. Hero Section & Persona Diagnostics */}
      <HeroSection />

      {/* 2. Brand Value Props Strip */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-12 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center text-[#930044]">
              <span className="material-symbols-outlined text-[24px]">local_shipping</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Free Express Delivery</h4>
              <p className="text-[11px] text-slate-500">On all orders above ₹499</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center text-[#930044]">
              <span className="material-symbols-outlined text-[24px]">assignment_return</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">7-Day Easy Returns</h4>
              <p className="text-[11px] text-slate-500">Doorstep pickup & exchange</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center text-[#930044]">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">100% Authentic</h4>
              <p className="text-[11px] text-slate-500">Curated designer pieces</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-pink-50 flex items-center justify-center text-[#930044]">
              <span className="material-symbols-outlined text-[24px]">psychology</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">AI Stylist Calibrated</h4>
              <p className="text-[11px] text-slate-500">Tuned to your size & palette</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WARDROBE GAP ANALYSIS SECTION */}
      <WardrobeGapsSection onSelectGapSolution={handleSelectGapSolution} />

      {/* 4. AI AGENT CURATED RECOMMENDATIONS (Gemini Agent) */}
      <AICuratedSection />

      {/* 5. BROWSING HISTORY CONTEXT AFFINITY ("Because You Viewed") */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-12 py-8">
        <div className="p-6 md:p-8 rounded-3xl bg-[#F5F2ED] border border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#BE185D] text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[20px]">history</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#930044] font-bold">
                  Browsing Context Affinity
                </span>
                <h3 className="font-editorial text-2xl font-bold text-slate-900">
                  Because You Browsed: Coastal Linen & Relaxed Silhouettes
                </h3>
              </div>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {browsingHistory.length} events logged in session
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: "B-01",
                name: "Resort Slub Cotton Overshirt",
                price: 2199,
                original: 3699,
                discount: "40% OFF",
                match: "96% MATCH",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDixg-TU_DfWC_1zJWUWKy-u6rqhOrgQ5h2f5W5bx5M589kthcegHtf_ey7_hfUwFozlS0YYKaB__LfcJM7aSUeIq0YJy4UQBggZFC-kRvgBUsnfx5FtN5ubBGh8B4rxSj7sbXenIDF9FXxL5PWw1XpKC1cJTvG9fDFo65v6-AFpDEUWwXJ-eK9CZQCexXVtK3u8GPAOrVTs3CIREf-kUlskP4SHFimJhSvHVDjpRFqkp-t3Odqo2AmiQ"
              },
              {
                id: "B-02",
                name: "Dense Drape Supima Crewneck (Pack of 2)",
                price: 1499,
                original: 2199,
                discount: "30% OFF",
                match: "98% MATCH",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZqipr9MjrYolMssRuJhgdsUfIrhmdek2Vz2b5FencQAzFUg_3RwMDbNcaAn_1fcUBM4tmcf90Zh5fI_IiZ2jtRj_RlmGfTULJQSPY-vX-dYHTwbu4hXyX4Igxg5vefTopaW-MXb-L3ehzedf9CNxGl5-B5tQlweugrQQIxR4_FeQryymYHCmIdLj6yHvYcRnKMEcJQmAVQ_uA9XZvuEA-CnSasJBMhDhw3nitKQi3IIvZP6KqUh4sMQ"
              },
              {
                id: "B-03",
                name: "Vintage Tortoise Polarized Sunglasses",
                price: 1899,
                original: 3799,
                discount: "50% OFF",
                match: "92% MATCH",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdJPyiRxefRL2SDtjoczdyh3gpUKCr1ZNfXc-sC4CDBtDN7JE5RDjZmUE-QXle0v2FHLbbCcc2ZJUbMxv9a0Ynv2uB93-7lzS5Gl0g6ldNtAZ04WwbkFsRofzf0O-WrGCjA7fbMBlt7ZcQ2oGrRw14n8-ONz3KnIL1KT1SpydcQcCXkucZlw-CXlkCoN9ik6E54sBgM8UkwkskNgy1oFdiXJSbeRS5lMpXllfsP_GSXIABcSFRfDHfsg"
              },
              {
                id: "B-04",
                name: "Woven Braided Italian Leather Belt",
                price: 1299,
                original: 1749,
                discount: "25% OFF",
                match: "91% MATCH",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6GeKLUCLsuFBfAPCAWv1LVbv8VGq0ksPKe0wOPYItrSwtEAwo_fW743IHuhRPg6pC0VC0GW0nGdjICGDXWZDblgvRqFbQ7OcZEw9Evn1P2VTtoypwOOY5JqV2EfacOxJib8jtlCmpihNS2GpZfk84keurfBB6WxlUAi945g2ETROPrSGgfessl5z0kog_Dik7dYh7VM53l8DFmJgCs4E6liqS8DV9tzyUI62TnRO2RZ8-Hn0hk7NvSw"
              }
            ].map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/5] rounded-xl overflow-hidden relative bg-stone-100 mb-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/90 font-bold text-[10px] text-slate-800 shadow-xs">
                      {item.match}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-bold text-slate-900">₹{item.price.toLocaleString("en-IN")}</span>
                    <span className="text-xs line-through text-slate-400">₹{item.original.toLocaleString("en-IN")}</span>
                    <span className="text-[10px] font-bold text-[#930044]">{item.discount}</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart({ product_id: item.id, name: item.name, price: item.price, image_url: item.img })}
                  className="w-full mt-3 py-2 rounded-xl bg-stone-100 hover:bg-[#930044] hover:text-white text-slate-700 text-xs font-bold transition-colors"
                >
                  Quick Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPLETE YOUR LOOK / OUTFIT BUILDER */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-12 py-8" id="complete-look">
        <div className="rounded-3xl bg-white p-6 md:p-10 border border-stone-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual composite */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4] relative bg-stone-100">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1W6mbxkMzq2Zy8x7hD9O_sQ0c0bfvHSmJRWuh-YRD5ReR6LSpv2ahNxPkUANpumAE-wnz66sU_MPq4hY3b3JAcP6DAUKA_O0oGqY3vPJGUDFDauNSXOw3Oqv0GgaVlVeDMBgIrRpAQ-qCaXbVEbLQSa1p_VuEM2hYkGYIQnEWQkVNyk-5AxRGO5dkLB-zFfoqIk9oQntuKmon5SCAmh7t5WWelMXkHn0GTm6eJzoI2juCIOEZB7m15QF7km"
                  alt="Ensemble Composite"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#930044] shadow-xs">
                  ★ 98% Compatibility Score
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#930044] text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 text-xs font-bold">
                <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                <span>StyleHub Look #04</span>
              </div>
            </div>

            {/* Bundle details */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#930044]">
                  Interactive Outfit Builder
                </span>
                <h3 className="font-editorial text-3xl font-bold text-slate-900 mt-1">
                  The Sun-Drenched Terrace Ensemble
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Synthesized by AI combining linen textures and tailored pleats calibrated to {customer?.name}'s exact measurements (Size M / Waist 32).
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FBF9F6] border border-stone-200">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#00703c]">check_circle</span>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Resort Black Slub Overshirt</h5>
                      <p className="text-[11px] text-slate-500">Size M • Breathable Cotton Slub</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">₹2,199</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FBF9F6] border border-stone-200">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#00703c]">check_circle</span>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Chalk White Supima Crewneck</h5>
                      <p className="text-[11px] text-slate-500">Size M • 220 GSM Dense Drape</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">₹799</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FBF9F6] border border-stone-200">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#00703c]">check_circle</span>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Warm Sand Pleated Chinos</h5>
                      <p className="text-[11px] text-slate-500">Waist 32 • Relaxed Tailored Hem</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">₹2,899</span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-500">Combined Value:</span>
                    <span className="line-through text-xs text-slate-400">₹5,897</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#930044]">Bundle Price: ₹4,999</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#00703c] text-[10px] font-bold">
                      Save ₹898 (15% AI Bundle)
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddBundleToBag}
                  className={`px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                    bundleAdded
                      ? "bg-[#00703c] text-white"
                      : "bg-[#930044] hover:bg-[#b81d5b] text-white hover:scale-[1.02]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {bundleAdded ? "check" : "shopping_bag"}
                  </span>
                  <span>{bundleAdded ? "Added All 3 to Bag!" : "Add Entire Look to Bag"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PERSONALIZED DEALS & ACTIVE OFFERS */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-12 py-8">
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-[#930044] to-[#BE185D] text-white shadow-xl relative overflow-hidden mb-6">
          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[15px]">stars</span>
              VIP Access for {customer?.name || "Rahul"}
            </span>
            <h3 className="font-editorial text-3xl md:text-4xl font-bold">
              Extra 20% Off All Tailored Fits & Linens
            </h3>
            <p className="text-xs md:text-sm text-pink-100 leading-relaxed">
              Use code <code className="px-2 py-0.5 rounded bg-white text-[#930044] font-mono font-bold">STYLEMEN20</code> at checkout. Automatically applies to all algorithmically matching garments in your cart.
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            <span className="material-symbols-outlined text-[240px]">local_mall</span>
          </div>
        </div>

        {/* Live Offers List from Backend tools.check_offer */}
        {offers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offers.map((offer, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#930044] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">local_offer</span>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-[#930044] block">
                    {offer.code || "ACTIVE PROMO"}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900 truncate">
                    {offer.title || offer.description || "Seasonal Discount"}
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    {offer.detail || "Applied on qualifying items in your closet"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 8. COMPLETE PRODUCT CATALOG & TARGETED GAP SOLUTIONS */}
      <ProductCatalogGrid
        activeGapSolution={activeGapSolution}
        onClearGapSolution={handleClearGapSolution}
      />

      {/* 9. Floating Assistant & Quiz Modal */}
      <FloatingAIStylist />
      {isQuizOpen && <StyleQuizModal onClose={() => setIsQuizOpen(false)} />}
    </div>
  );
}
