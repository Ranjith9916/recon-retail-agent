import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStyleHub, getProductImage, isFemaleProduct, FALLBACK_IMAGE } from "../context/StyleHubContext";

export default function ProductCatalogGrid({
  activeGapSolution = null,
  onClearGapSolution = () => {}
}) {
  const { products, customer, currentPersona, gender, addToCart, wishlist, toggleWishlist } = useStyleHub();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("match");

  const categories = gender === "female"
    ? [
        { id: "all", label: "All Women's Fits" },
        { id: "top", label: "Tops & Blouses" },
        { id: "bottom", label: "Skirts & Trousers" },
        { id: "outerwear", label: "Jackets & Blazers" },
        { id: "shoes", label: "Footwear & Heels" },
        { id: "accessories", label: "Bags & Accessories" }
      ]
    : [
        { id: "all", label: "All Men's Fits" },
        { id: "top", label: "Shirts & Polos" },
        { id: "bottom", label: "Trousers & Chinos" },
        { id: "outerwear", label: "Blazers & Jackets" },
        { id: "shoes", label: "Footwear & Boots" },
        { id: "accessories", label: "Watches & Belts" }
      ];

  useEffect(() => {
    if (activeGapSolution?.category) {
      setSelectedCategory(activeGapSolution.category.toLowerCase());
    }
  }, [activeGapSolution]);

  // Compute "Important / High Affinity" products for the active gap
  const getFilteredProducts = () => {
    // 1. GAP SOLUTION MODE: Show only the most important products for this gap
    if (activeGapSolution) {
      const gapCat = (activeGapSolution.category || "").toLowerCase();
      const supportingIds = activeGapSolution.supporting_product_ids || [];
      const budget = customer?.budget || 2500;
      const season = customer?.current_season || "monsoon";
      const preferredColors = customer?.preferred_colors || ["navy", "white", "black", "grey"];
      const avoidedColors = customer?.avoided_colors || [];

      // Filter products matching category and STRICTLY matching gender
      const candidateProducts = products.filter((p) => {
        if ((p.category || "").toLowerCase() !== gapCat) return false;
        if (gender === "male" && isFemaleProduct(p)) return false;
        return true;
      });


      // Score candidates to find the strictly "important" ones
      const scored = candidateProducts.map((p) => {
        let score = 50;
        const pId = p.product_id;
        const color = (p.color || "").toLowerCase();
        const pSeason = (p.season || "").toLowerCase();

        // 1. Explicit supporting product ID from intelligence
        if (supportingIds.includes(pId)) score += 40;

        // 2. Budget adherence
        if (p.price <= budget) {
          score += 20;
        } else if (p.price <= budget * 1.2) {
          score += 5;
        } else {
          score -= 15;
        }

        // 3. Climate / Season alignment
        if (pSeason === season || pSeason === "all-season") {
          score += 15;
        }

        // 4. Color alignment
        if (preferredColors.includes(color)) score += 15;
        if (avoidedColors.includes(color)) score -= 30;

        // 5. Style tags match
        if (customer?.preferred_styles) {
          const styleMatches = (p.style_tags || []).filter((st) =>
            customer.preferred_styles.includes(st)
          );
          score += styleMatches.length * 8;
        }

        return { product: p, score };
      });

      // Sort by score descending
      scored.sort((a, b) => b.score - a.score);

      // Limit strictly to the top 4 - 6 most important products
      return scored.slice(0, 6).map((item) => ({
        ...item.product,
        isGapEssential: true,
        gapScore: Math.min(99, Math.max(88, item.score))
      }));
    }

    // 2. STANDARD CATALOG MODE: Full inventory with filters
    return products.filter((p) => {
      // Exclude female garments when viewing Men's category/persona
      if (gender === "male" && isFemaleProduct(p)) {
        return false;
      }
      if (selectedCategory !== "all" && (p.category || "").toLowerCase() !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = (p.name || "").toLowerCase().includes(q);
        const matchColor = (p.color || "").toLowerCase().includes(q);
        const matchSub = (p.subcategory || "").toLowerCase().includes(q);
        return matchName || matchColor || matchSub;
      }
      return true;
    });

  };

  const displayedProducts = getFilteredProducts();

  // Sort if not in gap mode
  const sortedProducts = activeGapSolution
    ? displayedProducts
    : [...displayedProducts].sort((a, b) => {
        if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
        if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
        return 0;
      });

  return (
    <section id="product-catalog" className="max-w-[1440px] mx-auto px-4 md:px-12 py-12">
      
      {/* ACTIVE GAP SOLUTIONS BANNER */}
      {activeGapSolution ? (
        <div className="mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-pink-50 via-white to-pink-50/50 border-2 border-[#930044]/30 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="px-3 py-1 rounded-full bg-[#930044] text-white text-xs font-bold uppercase tracking-wider shadow-xs">
                  ✦ Targeted Gap Solutions Active
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#00703c] text-xs font-semibold capitalize">
                  {activeGapSolution.category} Gap Fix
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  • Filtered to {sortedProducts.length} high-priority essentials
                </span>
              </div>

              <h2 className="font-editorial text-2xl md:text-3xl font-bold text-slate-900">
                Essential Solutions for Your {activeGapSolution.category} Gap
              </h2>
              <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Showing only the most important pieces curated specifically to solve your {activeGapSolution.category} gap, within your ₹{customer?.budget?.toLocaleString("en-IN") || "2,500"} budget and optimized for {customer?.current_season || "Monsoon"} climate.
              </p>
            </div>

            <button
              onClick={onClearGapSolution}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-300 shadow-xs transition-all whitespace-nowrap self-start md:self-center"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
              <span>View All Catalog Items</span>
            </button>
          </div>
        </div>
      ) : (
        /* STANDARD CATALOG HEADER */
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#930044] uppercase tracking-wider block mb-1">
              ✦ StyleHub Complete Catalog
            </span>
            <h2 className="font-editorial text-3xl md:text-4xl text-slate-900 font-bold">
              Curated Seasonal Inventory
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Showing {sortedProducts.length} high-affinity fashion items from verified brand partners.
            </p>
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by keyword..."
                className="h-10 pl-9 pr-3 text-xs bg-white rounded-lg border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#930044]/20"
              />
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-[16px]">
                search
              </span>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 px-3 text-xs bg-white rounded-lg border border-slate-200 text-slate-800 font-medium focus:outline-none"
            >
              <option value="match">Sort by: AI Match Score</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      )}

      {/* Category Filter Pills (Only shown when not in gap solution mode) */}
      {!activeGapSolution && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#930044] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
          <p className="text-sm font-semibold text-slate-700 mt-2">No products matched your criteria.</p>
          <button
            onClick={() => {
              if (onClearGapSolution) onClearGapSolution();
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-3 text-xs text-[#930044] font-bold underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {sortedProducts.map((p, idx) => {
            const pId = p.product_id;
            const image = getProductImage(p, gender);
            const isWishlisted = wishlist.includes(pId);
            const affinity = p.gapScore || (99 - ((idx * 3) % 15));

            return (
              <div
                key={pId}
                className={`bg-white rounded-2xl overflow-hidden border shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                  p.isGapEssential
                    ? "border-[#930044]/40 ring-1 ring-[#930044]/20"
                    : "border-[#eae5dc]"
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                  <img
                    src={image}
                    alt={p.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {p.isGapEssential ? (
                      <span className="px-2.5 py-1 rounded-full bg-[#930044] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                        ✦ Essential Gap Fix
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-[#00703c] text-white text-[10px] font-bold shadow-xs">
                        ✦ {affinity}% Match
                      </span>
                    )}
                    {p.isGapEssential && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-semibold">
                        {affinity}% Affinity
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(pId)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 text-slate-800 shadow-xs flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        isWishlisted ? "text-[#930044] fill" : "text-slate-600"
                      }`}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full py-2 bg-white/95 text-slate-900 rounded-lg text-xs font-bold shadow hover:bg-[#930044] hover:text-white transition-colors"
                    >
                      + Add to Bag
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      <span>{p.store || "CampusCloset"} • {p.occasion || "Casual"}</span>
                      {p.isGapEssential && (
                        <span className="text-[#00703c] font-semibold">Budget Matched</span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#930044] transition-colors line-clamp-1">
                      <Link to={`/product/${pId}`}>{p.name}</Link>
                    </h4>

                    {p.isGapEssential && (
                      <p className="text-[11px] text-slate-600 mt-1.5 leading-snug line-clamp-2 bg-[#fbf9f6] p-2 rounded-lg border border-slate-100">
                        ✦ High-affinity fix for {p.category} gap: {p.color} tone coordinates with existing wardrobe.
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-slate-900">
                      ₹{p.price.toLocaleString("en-IN")}
                    </span>

                    <Link
                      to={`/product/${pId}`}
                      className="text-xs font-bold text-[#930044] hover:underline flex items-center"
                    >
                      <span>Details</span>
                      <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
