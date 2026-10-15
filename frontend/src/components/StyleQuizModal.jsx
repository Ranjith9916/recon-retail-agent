import React, { useState } from "react";
import { useStyleHub } from "../context/StyleHubContext";

export default function StyleQuizModal() {
  const { styleQuizOpen, setStyleQuizOpen, customer, currentPersona } = useStyleHub();

  const [budget, setBudget] = useState(customer?.budget || 2500);
  const [styles, setStyles] = useState(customer?.preferred_styles || ["smart-casual", "formal"]);
  const [occasions, setOccasions] = useState(customer?.preferred_occasions || ["office", "casual"]);

  if (!styleQuizOpen) return null;

  const styleOptions = ["casual", "smart-casual", "formal", "streetwear", "ethnic", "minimalist"];
  const occasionOptions = ["office", "college", "casual", "party", "festive", "date night"];

  const toggleStyle = (s) => {
    setStyles((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const toggleOccasion = (o) => {
    setOccasions((prev) => (prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]));
  };

  const handleSave = () => {
    if (customer) {
      customer.budget = budget;
      customer.preferred_styles = styles;
      customer.preferred_occasions = occasions;
    }
    setStyleQuizOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setStyleQuizOpen(false)} />
      
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 z-10 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-[#930044] uppercase tracking-wider block">
              ✦ Personalization Engine
            </span>
            <h3 className="font-editorial text-2xl font-bold text-slate-900">Refine Style Quiz</h3>
          </div>
          <button onClick={() => setStyleQuizOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="py-5 space-y-6">
          {/* Budget Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Maximum Item Budget:
              </label>
              <span className="text-base font-bold text-[#930044]">
                ₹{Number(budget).toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min="800"
              max="6000"
              step="100"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-[#930044] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>Budget (₹800)</span>
              <span>Mid (₹3,000)</span>
              <span>Luxury (₹6,000+)</span>
            </div>
          </div>

          {/* Preferred Styles */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">
              Preferred Aesthetics:
            </label>
            <div className="flex flex-wrap gap-2">
              {styleOptions.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => toggleStyle(st)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                    styles.includes(st)
                      ? "bg-[#930044] text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Occasions */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">
              Routine Occasions:
            </label>
            <div className="flex flex-wrap gap-2">
              {occasionOptions.map((occ) => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => toggleOccasion(occ)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                    occasions.includes(occ)
                      ? "bg-[#00703c] text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setStyleQuizOpen(false)}
            className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg text-xs font-bold bg-[#930044] text-white shadow hover:bg-[#7a0038]"
          >
            Save &amp; Update Recommendations
          </button>
        </div>
      </div>
    </div>
  );
}
