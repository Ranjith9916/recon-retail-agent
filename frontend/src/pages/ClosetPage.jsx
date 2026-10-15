import React from "react";
import { Link } from "react-router-dom";
import { useStyleHub, getProductImage, FALLBACK_IMAGE } from "../context/StyleHubContext";

export default function ClosetPage() {
  const { customer, wardrobe, currentPersona, gender } = useStyleHub();

  const totalValue = wardrobe.reduce((acc, item) => acc + (item.price || 2000), 0);
  const categoriesCount = wardrobe.reduce((acc, item) => {
    const cat = item.category || "other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-[#FBF9F6] min-h-screen text-slate-800 pb-16">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full bg-[#930044] text-white text-[11px] font-bold uppercase tracking-wider">
                Digital Wardrobe Twin
              </span>
              <span className="text-xs text-slate-500">Live Closet Sync</span>
            </div>
            <h1 className="font-editorial text-3xl md:text-4xl font-bold text-slate-900">
              {customer?.name || "Rahul Verma"}'s Closet
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Digital representation of all verified owned garments, fabrics, and fit metrics.
            </p>
          </div>

          <Link
            to="/#wardrobe-gaps"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#930044] hover:bg-[#b81d5b] text-white font-bold text-xs shadow-md transition-all self-start md:self-center"
          >
            <span className="material-symbols-outlined text-[18px]">radar</span>
            <span>View Wardrobe Gap Analysis</span>
          </Link>
        </div>

        {/* Closet Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">Total Items Owned</span>
            <span className="text-3xl font-bold text-slate-900 mt-1 block">{wardrobe.length}</span>
            <span className="text-[11px] text-slate-400 mt-1 block">Active in rotation</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">Estimated Valuation</span>
            <span className="text-3xl font-bold text-[#930044] mt-1 block">
              ₹{totalValue.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">Based on MSRP</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">Primary Palette</span>
            <div className="flex gap-1.5 mt-3">
              {(customer?.preferred_colors || ["navy", "white", "black", "grey"]).map((col, idx) => (
                <span
                  key={idx}
                  className="w-5 h-5 rounded-full border border-stone-300 shadow-xs capitalize"
                  title={col}
                  style={{
                    backgroundColor:
                      col === "navy" ? "#1e3a8a" : col === "white" ? "#ffffff" : col === "black" ? "#111827" : "#9ca3af"
                  }}
                ></span>
              ))}
            </div>
            <span className="text-[11px] text-slate-400 mt-2 block">Harmonized</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">Current Season</span>
            <span className="text-2xl font-bold text-[#00703c] mt-1 capitalize block">
              {customer?.current_season || "Monsoon"}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">Mumbai Climate</span>
          </div>
        </div>

        {/* Owned Items Grid */}
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#930044]">checkroom</span>
          <span>Owned Garments & Essentials</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {wardrobe.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-[4/5] bg-stone-100 relative overflow-hidden">
                <img
                  src={getProductImage(item, gender)}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-bold text-slate-800 uppercase tracking-wide shadow-xs">
                  {item.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
                  Owned
                </span>
              </div>


              <div className="p-4 space-y-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                  <p className="text-xs text-slate-500 capitalize">
                    {item.color || "Neutral"} • {item.subcategory || item.category}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Price: ₹{item.price?.toLocaleString("en-IN") || "1,999"}</span>
                  <span className="text-emerald-700 font-bold">In Rotation</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
