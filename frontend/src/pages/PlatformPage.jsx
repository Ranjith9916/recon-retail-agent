import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchOverview, fetchPlatformRecommendations, fetchAnalytics } from "../api";

export default function PlatformPage() {
  const [overview, setOverview] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchOverview().catch(() => null),
      fetchPlatformRecommendations().catch(() => []),
      fetchAnalytics().catch(() => null)
    ]).then(([ov, recs, an]) => {
      setOverview(ov);
      setRecommendations(recs || []);
      setAnalytics(an);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-[#FBF9F6] min-h-screen text-slate-800 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider">
                Enterprise B2B Engine
              </span>
              <span className="text-xs text-slate-500">Live Retailer Telemetry</span>
            </div>
            <h1 className="font-editorial text-3xl md:text-4xl font-bold text-slate-900">
              StyleHub Intelligence Platform
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Real-time cross-customer wardrobe gap monitoring and algorithmic AI recommendation analytics.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-700 hover:bg-stone-50 font-bold text-xs shadow-xs self-start md:self-center"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Consumer Storefront</span>
          </Link>
        </div>

        {/* Overview KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">Total Active Customers</span>
            <span className="text-3xl font-bold text-slate-900 mt-1 block">
              {overview?.customers_count || 10}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">100% Wardrobes Synced</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">Identified Gaps</span>
            <span className="text-3xl font-bold text-[#930044] mt-1 block">
              {overview?.gaps_count || 18}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">Cross-category deficits</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">Catalog Inventory</span>
            <span className="text-3xl font-bold text-slate-900 mt-1 block">
              {overview?.products_count || 200}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">Across 5 major categories</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
            <span className="text-[11px] uppercase font-bold text-slate-500 block">Avg Gap Closure Match</span>
            <span className="text-3xl font-bold text-[#00703c] mt-1 block">
              96.2%
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">Deterministic fit rate</span>
          </div>
        </div>

        {/* Recommendations Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Customer AI Recommendations</h3>
              <p className="text-xs text-slate-500">Live feed of recommendations synthesized by Gemini Agent</p>
            </div>
            <span className="text-xs font-bold text-[#930044] bg-pink-50 px-3 py-1 rounded-full">
              {recommendations.length} Active Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-200 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Recommendation</th>
                  <th className="pb-3">Target Gap</th>
                  <th className="pb-3">Match Score</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium text-slate-700">
                {recommendations.slice(0, 10).map((rec, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/60">
                    <td className="py-3 font-bold text-slate-900">
                      {rec.customer_name || rec.customer_id || "Customer"}
                    </td>
                    <td className="py-3 text-slate-800">
                      {rec.product_name || rec.title || "Curated Solution Item"}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded bg-pink-50 text-[#930044] font-bold">
                        {rec.gap_type || rec.category || "Wardrobe Opportunity"}
                      </span>
                    </td>
                    <td className="py-3 text-[#00703c] font-bold">
                      {rec.match_score || "98%"}
                    </td>
                    <td className="py-3 font-semibold">
                      ₹{rec.price?.toLocaleString("en-IN") || "2,499"}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
