import React, { useState } from "react";
import { useStyleHub } from "../context/StyleHubContext";

export default function FloatingAIStylist() {
  const {
    stylistOpen,
    setStylistOpen,
    currentPersona,
    customer,
    intelligence,
    recommendations,
    runAgentRecommend,
    recommendLoading,
    gender
  } = useStyleHub();

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello ${currentPersona.name.split(" ")[0]}! I'm your StyleHub AI Personal Stylist. I've analyzed your ${
        intelligence?.wardrobe_summary?.total_items || 12
      } closet pieces and found ${
        intelligence?.gaps?.missing_categories?.length || 2
      } wardrobe gaps. How can I assist your wardrobe curation today?`
    }
  ]);

  const quickPrompts = [
    "What should I wear today?",
    "Explain my wardrobe gaps",
    "Find pieces under ₹2,000",
    "Monsoon style advice"
  ];

  const handleSend = (text) => {
    const userText = text || inputMessage.trim();
    if (!userText) return;

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputMessage("");

    // Generate intelligent contextual response
    setTimeout(() => {
      let reply = "";
      const lower = userText.toLowerCase();

      if (lower.includes("gap")) {
        const missing = intelligence?.gaps?.missing_categories?.map((g) => `${g.category} (${g.priority || "high"} priority)`).join(", ") || "Outerwear & Footwear";
        reply = `Based on your wardrobe, your active gaps are: ${missing}. You currently have very few layering pieces suited for formal settings. I suggest prioritizing a breathable linen blazer or water-resistant jacket.`;
      } else if (lower.includes("monsoon") || lower.includes("weather") || lower.includes("wear today")) {
        reply = `For ${currentPersona.city}'s current climate, I recommend pairing dark chinos (water-spot resistant) with a crisp oxford shirt or cotton knit. Complete the look with Chelsea boots to handle wet pavements!`;
      } else if (lower.includes("under") || lower.includes("price") || lower.includes("budget")) {
        reply = `Your profile budget is ₹${customer?.budget?.toLocaleString("en-IN") || "2,500"}. I have highlighted items like the Chelsea Boots (₹999) and Oxford Shirt (₹1,399) that fit comfortably within your budget while maximizing wardrobe pairings!`;
      } else {
        reply = `I've refreshed your style preferences. Let me know if you'd like me to trigger a complete multi-turn reasoning agent run with Gemini to generate new tailored looks!`;
      }

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Collapsed Pill Button */}
      {!stylistOpen ? (
        <button
          onClick={() => setStylistOpen(true)}
          className="group relative flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-[#930044] to-[#b81d5b] text-white font-semibold text-xs shadow-2xl hover:scale-105 transition-all animate-pulse-glow"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:rotate-45 transition-transform duration-300">
            auto_awesome
          </span>
          <span>✦ AI Stylist • Online</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        </button>
      ) : (
        /* Expanded Floating Chat Canvas */
        <div className="w-[360px] sm:w-[400px] h-[540px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#eae5dc] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#930044] to-[#b81d5b] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                ✦
              </div>
              <div>
                <h4 className="text-sm font-bold">StyleHub AI Stylist</h4>
                <p className="text-[10px] text-pink-100">Velvet &amp; Algorithm • Gemini Powered</p>
              </div>
            </div>

            <button
              onClick={() => setStylistOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#930044] text-white rounded-br-none"
                      : "bg-[#f5f3f0] text-slate-800 rounded-bl-none border border-slate-200/60"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="px-4 py-2 bg-[#fbf9f6] border-t border-[#eae8e5] flex gap-2 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-full bg-white text-slate-700 hover:text-[#930044] border border-slate-200 text-[10px] font-medium whitespace-nowrap shadow-2xs hover:border-[#930044]"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask your stylist anything..."
              className="flex-1 h-10 px-3 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#930044]/20"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-xl bg-[#930044] text-white flex items-center justify-center shadow-md hover:bg-[#7a0038] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
