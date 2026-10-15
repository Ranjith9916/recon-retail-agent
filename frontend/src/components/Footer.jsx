import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F5F2ED] border-t border-stone-200 mt-16 text-slate-700">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12">
          
          {/* Col 1 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Shop Men</h3>
            <ul className="flex flex-col gap-2 text-xs text-slate-600">
              <li><Link to="/#product-catalog" className="hover:text-[#930044] transition-colors">AI Tailored Suits</Link></li>
              <li><Link to="/#product-catalog" className="hover:text-[#930044] transition-colors">Casual Linen Shirts</Link></li>
              <li><Link to="/#product-catalog" className="hover:text-[#930044] transition-colors">Slim Chinos & Trousers</Link></li>
              <li><Link to="/#product-catalog" className="hover:text-[#930044] transition-colors">Italian Leather Loafers</Link></li>
              <li><Link to="/#product-catalog" className="hover:text-[#930044] transition-colors">Luxe Outerwear</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Shop Women</h3>
            <ul className="flex flex-col gap-2 text-xs text-slate-600">
              <li><Link to="/#product-catalog" className="hover:text-[#930044] transition-colors">Editorial Dresses</Link></li>
              <li><Link to="/#product-catalog" className="hover:text-[#930044] transition-colors">Tailored Blazers</Link></li>
              <li><Link to="/#product-catalog" className="hover:text-[#930044] transition-colors">Silk Tops & Blouses</Link></li>
              <li><Link to="/#product-catalog" className="hover:text-[#930044] transition-colors">Contemporary Handbags</Link></li>
              <li><Link to="/#product-catalog" className="hover:text-[#930044] transition-colors">Footwear Collection</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Wardrobe Twin</h3>
            <ul className="flex flex-col gap-2 text-xs text-slate-600">
              <li><Link to="/closet" className="hover:text-[#930044] transition-colors">My Digital Closet</Link></li>
              <li><Link to="/#wardrobe-gaps" className="hover:text-[#930044] transition-colors">Wardrobe Gap Analysis</Link></li>
              <li><Link to="/#ai-curated-recommendations" className="hover:text-[#930044] transition-colors">AI Recommendations</Link></li>
              <li><Link to="/platform" className="hover:text-[#930044] transition-colors">Retailer Telemetry Engine</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">StyleHub AI Engine</h3>
            <ul className="flex flex-col gap-2 text-xs text-slate-600">
              <li><span className="text-slate-500">Google Gemini 2.5 Flash</span></li>
              <li><span className="text-slate-500">Deterministic Gap Logic</span></li>
              <li><span className="text-slate-500">Dynamic Temperature Routing</span></li>
              <li><span className="text-slate-500">Verified Fit Matrix</span></li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Stay Ahead</h3>
            <p className="text-xs text-slate-600">
              Receive AI-personalized lookbooks and curated drops generated for your taste.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs focus:outline-none focus:border-[#930044]"
              />
              <button className="px-4 py-2 rounded-xl bg-[#930044] text-white text-xs font-bold hover:bg-[#b81d5b] transition-colors">
                Join
              </button>
            </div>
            <span className="text-[10px] text-slate-400">
              By subscribing you agree to our Terms & Privacy Policy.
            </span>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-300/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#930044] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
            </div>
            <span className="font-bold text-slate-800">StyleHub AI Fashion Intelligence</span>
            <span>• Velvet & Algorithm Edition</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-[#930044] transition-colors">Demo Login</Link>
            <Link to="/platform" className="hover:text-[#930044] transition-colors">Retailer Telemetry</Link>
            <a href="#" className="hover:text-[#930044] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#930044] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
