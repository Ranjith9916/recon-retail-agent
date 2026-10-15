import React from "react";
import { useStyleHub } from "../context/StyleHubContext";

export default function HeroSection() {
  const {
    gender,
    setGenderView,
    currentPersona,
    customer,
    intelligence,
    setStyleQuizOpen,
    runAgentRecommend,
    recommendLoading
  } = useStyleHub();

  const customerName = currentPersona.name.split(" ")[0];
  const stylesStr = customer?.preferred_styles?.join(" & ") || "Modern Minimalist";
  const seasonStr = customer?.current_season || intelligence?.seasonal_context?.season || "Monsoon";
  const budgetStr = customer?.budget ? `₹${customer.budget.toLocaleString("en-IN")}` : "₹2,500";
  const gapsCount =
    intelligence?.gaps?.missing_categories?.length ||
    (Array.isArray(intelligence?.gaps) ? intelligence.gaps.length : 2);

  return (
    <div className="w-full flex flex-col">
      {/* Diagnostics / Persona Sync Bar from Stitch */}
      <div className="w-full bg-[#efeeeb]/90 backdrop-blur-md py-2 px-4 md:px-12 border-b border-[#e4e2df]">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#930044] text-white text-[11px] font-bold tracking-wide uppercase shadow-xs">
              Live Profile Sync
            </span>
            <span className="text-slate-800 font-medium">
              Active Context: <code className="px-1.5 py-0.5 rounded bg-white text-[#930044] font-mono text-[11px] border border-slate-200">user.id = "{currentPersona.id}" ({gender})</code>
            </span>
            <span className="hidden lg:inline text-slate-500">
              • Season: <strong className="text-slate-700 capitalize">{seasonStr}</strong> • Budget: <strong className="text-slate-700">{budgetStr}</strong> • Preferred: <strong className="text-slate-700 capitalize">{stylesStr}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[11px] font-medium hidden sm:inline">Switch Persona View:</span>
            <div className="inline-flex rounded-full bg-white p-0.5 border border-slate-200 shadow-xs">
              <button
                onClick={() => setGenderView("male")}
                className={`px-3 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  gender === "male"
                    ? "bg-[#930044] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Men's (Active)
              </button>
              <button
                onClick={() => setGenderView("female")}
                className={`px-3 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  gender === "female"
                    ? "bg-[#930044] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Women's Studio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Container */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-12 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-slate-700 text-xs font-semibold shadow-xs border border-[#e4e2df]">
              <span className="material-symbols-outlined text-[#930044] text-[18px]">auto_awesome</span>
              <span className="text-[#930044] font-bold">AI Style Profile Active</span>
              <span className="text-slate-300">•</span>
              <span className="capitalize">{stylesStr} Edit</span>
            </div>

            <div className="space-y-1">
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1]">
                Style That Fits You, <span className="text-[#930044] italic">{customerName}</span>
              </h1>
              <p className="script-font text-2xl sm:text-3xl text-[#b81d5b] font-normal tracking-wide">
                Your personalized wardrobe, refreshed today ♡
              </p>
            </div>

            <p className="text-base text-slate-600 max-w-xl leading-relaxed mt-1">
              Based on your wardrobe inventory of <strong className="text-slate-900 font-semibold">{intelligence?.wardrobe_summary?.total_items || 12} pieces</strong> and your recent interest in breathable silhouettes, your AI stylist identified <strong className="text-[#930044] font-semibold">{gapsCount} critical wardrobe gaps</strong> for {seasonStr} in {currentPersona.city}.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#for-you-recommendations"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#930044] text-white font-semibold text-sm shadow-md hover:bg-[#7a0038] transition-all hover:scale-[1.02]"
              >
                <span>Shop For You</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>

              <button
                onClick={runAgentRecommend}
                disabled={recommendLoading}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-[#00703c] text-white font-semibold text-sm shadow-md hover:bg-[#00552c] transition-all disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-[18px] ${recommendLoading ? "animate-spin" : ""}`}>
                  {recommendLoading ? "sync" : "magic_button"}
                </span>
                <span>{recommendLoading ? "Consulting AI Agent..." : "Run AI Agent Analysis"}</span>
              </button>

              <button
                onClick={() => setStyleQuizOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-white text-slate-800 font-semibold text-sm shadow-xs border border-slate-300/80 hover:bg-slate-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[#930044] text-[18px]">tune</span>
                <span>Refine Style Quiz</span>
              </button>
            </div>

            {/* Wardrobe Quick Stats Badges */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md pt-4 border-t border-slate-200/80 mt-2">
              <div className="bg-white/80 p-3 rounded-xl border border-slate-200/60 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Owned Items</span>
                <span className="text-xl font-bold text-slate-900">{intelligence?.wardrobe_summary?.total_items || 14}</span>
                <span className="text-[11px] text-slate-500 block">In your closet</span>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-slate-200/60 shadow-xs">
                <span className="text-[11px] font-bold text-[#b81d5b] uppercase tracking-wider block">Gaps Detected</span>
                <span className="text-xl font-bold text-[#930044]">{gapsCount}</span>
                <span className="text-[11px] text-slate-500 block">Needs attention</span>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-slate-200/60 shadow-xs">
                <span className="text-[11px] font-bold text-[#00703c] uppercase tracking-wider block">Affinity Score</span>
                <span className="text-xl font-bold text-[#00703c]">96%</span>
                <span className="text-[11px] text-slate-500 block">Style match</span>
              </div>
            </div>
          </div>

          {/* Right Editorial Hero Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <img
                src={
                  gender === "male"
                    ? "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=80"
                    : "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&auto=format&fit=crop&q=80"
                }
                alt="Editorial Style Showcase"
                className="w-full h-[480px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 arch-overlay flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#930044] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    ✦ AI Curated Lookbook
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                    {seasonStr} 2026
                  </span>
                </div>
                <h3 className="font-editorial text-2xl font-bold leading-tight">
                  {gender === "male" ? "The Mediterranean Tailored Casual" : "Monsoon Contemporary Luxe"}
                </h3>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                  Harmonizes with your existing wardrobe while filling missing layering pieces.
                </p>
              </div>
            </div>

            {/* Floating Match Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00703c] flex items-center justify-center font-bold">
                ✦
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">98% Fit &amp; Versatility</p>
                <p className="text-[11px] text-slate-500">Pairs with pieces in your closet</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
