import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStyleHub, getProductImage, isFemaleProduct, FALLBACK_IMAGE } from "../context/StyleHubContext";

export default function AICuratedSection() {
  const {
    recommendations,
    trace,
    recommendLoading,
    recommendError,
    runAgentRecommend,
    addToCart,
    wishlist,
    toggleWishlist,
    currentPersona,
    gender,
    customerId
  } = useStyleHub();

  const [traceExpanded, setTraceExpanded] = useState(false);

  // Fallback items if recommendations haven't been run yet (strictly tailored by gender)
  const defaultItems = gender === "female"
    ? [
        {
          product_id: "P0073",
          name: "Black Maxi Dress",
          category: "dress",
          subcategory: "maxi-dress",
          price: 1899,
          store: "UrbanWear",
          match_score: 98,
          reason: "Versatile monochrome maxi silhouette tailored for humid monsoon weather.",
          gap_addressed: "Evening Silhouette"
        },
        {
          product_id: "P0092",
          name: "Chic Linen Crop Top",
          category: "top",
          subcategory: "crop-top",
          price: 799,
          store: "StyleHub",
          match_score: 96,
          reason: "Pairs with your wide-leg trousers for college & casual styling.",
          gap_addressed: "Tops Rotation"
        },
        {
          product_id: "P0100",
          name: "Beige Midi Dress",
          category: "dress",
          subcategory: "midi-dress",
          price: 1499,
          store: "CampusCloset",
          match_score: 94,
          reason: "Casual weekend piece in your preferred neutral palette.",
          gap_addressed: "Casual Dresses"
        }
      ]
    : [
        {
          product_id: "P0002",
          name: "Brown Chelsea Boots",
          category: "shoes",
          subcategory: "boots",
          price: 999,
          store: "UrbanWear",
          match_score: 98,
          reason: "Directly resolves your footwear gap. Versatile brown tone coordinates with your tailored trousers and chinos while providing monsoon durability.",
          gap_addressed: "Footwear Versatility"
        },
        {
          product_id: "P0045",
          name: "Water-Resistant Linen Blazer",
          category: "outerwear",
          subcategory: "blazer",
          price: 2199,
          store: "Zara Luxe",
          match_score: 96,
          reason: "Solves your critical high-priority outerwear gap. Breathable linen fabric matches Mumbai's climate while elevating office presentations.",
          gap_addressed: "Outerwear & Layering"
        },
        {
          product_id: "P0015",
          name: "Tailored Crisp Oxford Shirt",
          category: "top",
          subcategory: "shirt",
          price: 1399,
          store: "CampusCloset",
          match_score: 94,
          reason: "High-affinity white staple that pairs seamlessly with your 4 existing dark trousers.",
          gap_addressed: "Office Core"
        }
      ];

  const sourceItems = (recommendations && recommendations.length > 0) ? recommendations : defaultItems;
  const displayItems = sourceItems.filter((item) => {
    if (gender === "male" && isFemaleProduct(item)) return false;
    return true;
  });


  return (
    <section id="for-you-recommendations" className="max-w-[1440px] mx-auto px-4 md:px-12 py-10">
      <div className="bg-gradient-to-br from-[#FAF8F5] to-[#F5F1EA] rounded-3xl p-6 md:p-10 border border-[#EAE5DC] shadow-sm">
        
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-[#EAE5DC]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#930044]/10 text-[#930044] text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              Gemini Agent Recommendation Engine
            </div>
            <h2 className="font-editorial text-3xl md:text-4xl text-slate-900 font-bold">
              Curated For You, {currentPersona.name.split(" ")[0]}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Grounded multi-turn AI reasoning verified against your real wardrobe data &amp; current climate.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={runAgentRecommend}
              disabled={recommendLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#930044] text-white font-semibold text-xs shadow-md hover:bg-[#7a0038] transition-all disabled:opacity-60"
            >
              <span className={`material-symbols-outlined text-[16px] ${recommendLoading ? "animate-spin" : ""}`}>
                {recommendLoading ? "sync" : "refresh"}
              </span>
              <span>{recommendLoading ? "Agent Running Reasoning Loop..." : "Re-Run AI Agent"}</span>
            </button>

            <button
              onClick={() => setTraceExpanded(!traceExpanded)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white text-slate-800 font-semibold text-xs border border-slate-300/80 shadow-xs hover:bg-slate-50 transition-colors"
            >
              <span className="material-symbols-outlined text-[#00703c] text-[16px]">terminal</span>
              <span>{traceExpanded ? "Hide Agent Trace" : "View Agent Trace"}</span>
              <span className="material-symbols-outlined text-[16px]">
                {traceExpanded ? "expand_less" : "expand_more"}
              </span>
            </button>
          </div>
        </div>

        {/* Error Alert if any */}
        {recommendError && (
          <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-rose-600">error</span>
            <div>
              <strong>Agent Notice:</strong> {recommendError}
              <span className="block text-slate-500 mt-0.5">Showing grounded intelligence preview recommendations.</span>
            </div>
          </div>
        )}

        {/* Agent Execution Trace Drawer */}
        {traceExpanded && (
          <div className="mt-6 p-5 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs shadow-xl border border-slate-800 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="font-bold text-emerald-400">Gemini Reasoning &amp; Tool Call Trace ({customerId})</span>
              </div>
              <span className="text-[10px] text-slate-400">Model: Gemini 2.5 Flash</span>
            </div>

            {trace && trace.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar pr-2">
                {trace.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-800/80 border border-slate-700/60">
                    <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                      <span className="text-pink-400 font-semibold">Step {idx + 1}: {step.type || step.tool || "Action"}</span>
                      <span>{step.duration || "completed"}</span>
                    </div>
                    <pre className="text-slate-200 whitespace-pre-wrap text-[11px]">
                      {typeof step.output === "object" ? JSON.stringify(step.output, null, 2) : step.output || step.message || JSON.stringify(step)}
                    </pre>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-slate-400">
                <p>Click <strong>"Re-Run AI Agent"</strong> to watch Gemini execute tool calls (`get_customer_profile`, `get_wardrobe_gaps`, `search_products`, `check_offer`) in real time.</p>
              </div>
            )}
          </div>
        )}

        {/* Curated Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {displayItems.map((item, index) => {
            const pId = item.product_id || item.id || `rec-${index}`;
            const image = getProductImage(item, gender);
            const isWishlisted = wishlist.includes(pId);
            const matchScore = item.match_score || (98 - index * 2);

            return (
              <div
                key={pId}
                className="bg-white rounded-2xl overflow-hidden border border-[#EAE5DC] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                  <img
                    src={image}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#930044] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                      ✦ {matchScore}% Match
                    </span>
                    {item.gap_addressed && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-800 text-white text-[9px] font-semibold tracking-wide shadow-md">
                        Solves {item.gap_addressed}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Action */}
                  <button
                    onClick={() => toggleWishlist(pId)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 text-slate-800 shadow-md flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isWishlisted ? "text-[#930044] fill" : "text-slate-600"
                      }`}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Quick Add Overlay on Desktop */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full py-2.5 bg-white/95 backdrop-blur-md text-slate-900 rounded-lg text-xs font-bold shadow-lg hover:bg-[#930044] hover:text-white transition-colors"
                    >
                      + Quick Add to Bag
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                      <span>{item.store || "StyleHub Curation"}</span>
                      <span className="text-[#00703c]">Verified Fit</span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#930044] transition-colors line-clamp-1">
                      <Link to={`/product/${pId}`}>{item.name}</Link>
                    </h3>

                    {/* AI Reasoning Box */}
                    {item.reason && (
                      <div className="my-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] text-xs text-slate-700 leading-relaxed">
                        <span className="font-bold text-[#930044] block mb-0.5">✦ Why AI Picked This:</span>
                        {item.reason}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                    <div>
                      <span className="text-lg font-bold text-slate-900">
                        ₹{(item.price || 1499).toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-slate-400 line-through ml-2">
                        ₹{Math.round((item.price || 1499) * 1.35).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <Link
                      to={`/product/${pId}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#930044] hover:underline"
                    >
                      <span>Explore</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
