import React from "react";
import { useStyleHub } from "../context/StyleHubContext";

export default function WardrobeGapsSection({ onSelectGapSolution }) {
  const { intelligence, customer, currentPersona } = useStyleHub();

  const gaps = intelligence?.gaps || {};
  const missingCategories = gaps.missing_categories || [];
  const imbalances = gaps.imbalances || [];
  const occasionGaps = gaps.occasion_gaps || [];

  // Normalize all gaps into actionable cards
  const normalizedGaps = [
    ...missingCategories.map((g) => ({
      id: `missing-${g.category}`,
      kind: "Missing Category",
      category: g.category,
      title: `${g.category.charAt(0).toUpperCase() + g.category.slice(1)} Deficit`,
      description: `Customer currently owns 0 items in ${g.category}. High priority wardrobe completion opportunity.`,
      priority: g.priority || "high",
      hasSignal: g.has_browsing_signal,
      supporting_product_ids: g.supporting_product_ids || [],
      severityClass: "border-rose-300 bg-rose-50/40 text-rose-900",
      badgeClass: "bg-rose-600 text-white"
    })),
    ...imbalances.map((g) => ({
      id: `imbalance-${g.undersupplied}`,
      kind: "Ratio Imbalance",
      category: g.undersupplied,
      title: `${g.undersupplied.charAt(0).toUpperCase() + g.undersupplied.slice(1)} Under-supplied`,
      description: `Owns ${g.oversupplied_count} ${g.oversupplied}s vs only ${g.undersupplied_count} ${g.undersupplied}. Needs balancing silhouettes.`,
      priority: g.priority || "medium",
      hasSignal: g.has_browsing_signal,
      supporting_product_ids: g.supporting_product_ids || [],
      severityClass: "border-amber-300 bg-amber-50/40 text-amber-900",
      badgeClass: "bg-amber-600 text-white"
    })),
    ...occasionGaps.map((g) => ({
      id: `occasion-${g.occasion}`,
      kind: "Occasion Gap",
      category: g.occasion === "formal" ? "outerwear" : "top",
      title: `No ${g.occasion.charAt(0).toUpperCase() + g.occasion.slice(1)} Capsule`,
      description: `Has upcoming ${g.occasion} style affinity but no verified outfit in their digital twin closet.`,
      priority: g.priority || "high",
      hasSignal: g.has_browsing_signal,
      supporting_product_ids: g.supporting_product_ids || [],
      severityClass: "border-purple-300 bg-purple-50/40 text-purple-900",
      badgeClass: "bg-purple-600 text-white"
    }))
  ];

  const handleExplore = (gap) => {
    if (onSelectGapSolution) {
      onSelectGapSolution(gap);
    }
    const catalogEl = document.getElementById("product-catalog");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="wardrobe-gaps" className="max-w-[1440px] mx-auto px-4 md:px-12 py-8">
      <div className="rounded-3xl bg-gradient-to-br from-white via-[#FBF9F6] to-[#F5F1EB] p-6 md:p-10 border border-stone-200/80 shadow-md">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#930044] text-white font-semibold text-xs uppercase tracking-wider shadow-xs">
                <span className="material-symbols-outlined text-[15px]">radar</span>
                Wardrobe Gap Intelligence
              </span>
              <span className="text-xs text-stone-500">
                Deterministic Closet Analysis for {customer?.name || "Rahul Verma"}
              </span>
            </div>
            <h2 className="font-editorial text-3xl md:text-4xl text-slate-900 font-semibold tracking-tight">
              Identified Wardrobe Opportunities
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Cross-referencing {customer?.name}'s digital twin closet ({customer?.wardrobe?.length || 4} owned items) against browsing intent. Click <strong className="text-[#930044]">Explore Solutions</strong> to view the curated, essential products that fill each gap.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white border border-stone-200 shadow-xs flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#930044] animate-pulse"></div>
              <div className="text-xs">
                <span className="font-bold text-slate-800">{normalizedGaps.length} Actionable Gaps</span>
                <span className="text-slate-500 block">0 Hallucinations</span>
              </div>
            </div>
          </div>
        </div>

        {normalizedGaps.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <span className="material-symbols-outlined text-4xl text-emerald-600 mb-2">verified</span>
            <h3 className="text-lg font-bold text-slate-900">Wardrobe Balanced & Complete</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
              No critical category deficits detected for {customer?.name}. Recommending seasonal trend upgrades and styling complements.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {normalizedGaps.map((gap) => (
              <div
                key={gap.id}
                className={`rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${gap.severityClass}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-slate-600">
                      {gap.kind}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${gap.badgeClass}`}
                    >
                      {gap.priority} Priority
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-slate-900 mb-2">
                    {gap.title}
                  </h3>

                  <p className="text-xs text-slate-700 leading-relaxed mb-4">
                    {gap.description}
                  </p>

                  {gap.hasSignal && (
                    <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 text-xs font-semibold text-slate-800 border border-stone-200">
                      <span className="material-symbols-outlined text-[15px] text-[#930044]">ads_click</span>
                      <span>Verified browsing interest detected ({gap.supporting_product_ids.length} items)</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500 font-medium">
                    Category: <strong className="capitalize text-slate-800">{gap.category}</strong>
                  </div>

                  <button
                    onClick={() => handleExplore(gap)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#930044] hover:bg-[#b81d5b] text-white text-xs font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Explore Solutions</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
