import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStyleHub } from "../context/StyleHubContext";

export default function Navbar() {
  const {
    gender,
    setGenderView,
    currentPersona,
    wishlist,
    cart,
    customersList,
    switchCustomer,
    customerId
  } = useStyleHub();

  const location = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* 1. Top Bar Ticker & Gender Toggle */}
      <div className="bg-[#eae8e5] text-slate-700 font-sans text-xs px-4 md:px-12 h-9 flex items-center justify-between border-b border-[#e0bec4]/30">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="material-symbols-outlined text-[#930044] text-[15px]">auto_awesome</span>
          <span className="font-medium">
            Free Express Delivery on orders above ₹499 • AI Wardrobe Stylist Active • 100% Grounded Recommendations
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/80 rounded-full p-0.5 border border-slate-300/60 shadow-xs">
            <button
              onClick={() => setGenderView("male")}
              className={`px-3 py-0.5 rounded-full text-xs font-semibold transition-all ${
                gender === "male"
                  ? "bg-[#930044] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Men
            </button>
            <button
              onClick={() => setGenderView("female")}
              className={`px-3 py-0.5 rounded-full text-xs font-semibold transition-all ${
                gender === "female"
                  ? "bg-[#930044] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Women
            </button>
          </div>
          
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center gap-1 text-slate-600 hover:text-[#930044] transition-colors font-medium text-xs ml-2"
          >
            <span className="material-symbols-outlined text-[15px]">sync_alt</span>
            Switch Account
          </Link>
        </div>
      </div>

      {/* 2. Main Navbar Row */}
      <div className="h-20 max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-gradient-to-br from-[#BE185D] to-[#9D174D] rounded-2xl flex items-center justify-center shadow-md shadow-pink-900/20 text-white relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center top-3">
              <svg className="w-2.5 h-2.5 text-white fill-white" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-tight font-sans leading-none">
              <span className="text-slate-900">Style</span>
              <span className="text-[#BE185D]">Hub</span>
            </span>
            <span className="font-editorial italic text-xs text-slate-500 tracking-wide mt-0.5">
              Velvet &amp; Algorithm AI
            </span>
          </div>
        </Link>

        {/* Deliver To Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] transition-colors">
          <span className="material-symbols-outlined text-[#930044] text-[18px]">location_on</span>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Deliver to</span>
            <span className="text-xs font-semibold text-slate-900">{currentPersona.location}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-2 hidden md:block">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px]">search</span>
            <input
              type="text"
              placeholder={`Search ${gender === 'female' ? 'dresses, kurtas, blazers' : 'slim shirts, linen trousers, chelsea boots'}...`}
              className="w-full h-11 pl-10 pr-20 bg-white text-slate-800 placeholder:text-slate-400 text-sm rounded-lg border border-[#e4e2df] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#930044]/20 focus:border-[#930044] transition-all"
            />
            <div className="absolute right-2 flex items-center gap-1 text-slate-400">
              <button title="Voice Search" className="p-1 hover:text-[#930044] transition-colors">
                <span className="material-symbols-outlined text-[17px]">mic</span>
              </button>
              <button title="Visual AI Search" className="p-1 hover:text-[#930044] transition-colors">
                <span className="material-symbols-outlined text-[17px]">photo_camera</span>
              </button>
            </div>
          </div>
        </div>

        {/* Actions: Wishlist, Cart, Profile */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Wishlist Button */}
            <Link
              to="/#wishlist"
              className="relative p-2.5 text-slate-700 hover:text-[#930044] hover:bg-white rounded-full transition-colors"
              title="Your Wishlist"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#930044] text-white text-[10px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setCartDrawerOpen(!cartDrawerOpen)}
              className="relative p-2.5 text-slate-700 hover:text-[#930044] hover:bg-white rounded-full transition-colors"
              title="Shopping Bag"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#BE185D] text-white text-[10px] flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          <div className="h-6 w-[1px] bg-slate-300 hidden sm:block"></div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 text-left p-1 rounded-lg hover:bg-white transition-colors"
            >
              <img
                src={currentPersona.avatar}
                alt={currentPersona.name}
                className="w-9 h-9 rounded-full object-cover border border-[#b81d5b]/30 shadow-xs"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80";
                }}
              />
              <div className="hidden lg:flex flex-col leading-tight">
                <span className="text-xs font-bold text-slate-900">{currentPersona.name}</span>
                <span className="text-[10px] text-[#00703c] font-semibold tracking-wider uppercase">
                  {customerId} • {currentPersona.title}
                </span>
              </div>
              <span className="material-symbols-outlined text-slate-500 text-[18px]">expand_more</span>
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs text-slate-500 font-medium">Logged in customer profile</p>
                  <p className="text-sm font-bold text-slate-900">{currentPersona.name} ({customerId})</p>
                  <p className="text-xs text-slate-600">{currentPersona.bio}</p>
                </div>
                
                <div className="px-2 py-1">
                  <p className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Switch Persona</p>
                  {customersList.slice(0, 6).map((c) => (
                    <button
                      key={c.customer_id}
                      onClick={() => {
                        switchCustomer(c.customer_id);
                        setProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        c.customer_id === customerId
                          ? "bg-[#930044] text-white font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{c.customer_id} • {c.preferred_styles?.join(", ") || "Fashion"}</span>
                      <span className="text-[10px] opacity-75">{c.current_season}</span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-100 mt-2 pt-1 px-2">
                  <Link
                    to="/closet"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="block px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-100"
                  >
                    ✦ View My Closet ({customerId})
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="block px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-100 font-medium text-[#930044]"
                  >
                    ✦ Retailer Platform Dashboard
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="block px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-red-50 hover:text-red-700 mt-1"
                  >
                    Log Out / Switch Account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Secondary Navigation Bar */}
      <div className="bg-white border-t border-[#e4e2df] shadow-xs overflow-x-auto no-scrollbar">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          <nav className="flex items-center gap-6 whitespace-nowrap h-11 text-xs font-semibold">
            <Link
              to="/"
              className={`h-full flex items-center gap-1.5 transition-colors border-b-2 ${
                location.pathname === "/"
                  ? "text-[#930044] border-[#930044] font-bold"
                  : "text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#930044]">auto_awesome</span>
              For You (AI Curated)
            </Link>

            <a
              href="#wardrobe-gaps"
              className="text-slate-600 hover:text-slate-900 h-full flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-[#00703c]">psychology</span>
              Wardrobe Gap Analysis
            </a>

            <a
              href="#product-catalog"
              className="text-slate-600 hover:text-slate-900 h-full flex items-center transition-colors"
            >
              Catalog &amp; New Arrivals
            </a>

            <Link
              to="/closet"
              className={`h-full flex items-center gap-1 transition-colors border-b-2 ${
                location.pathname === "/closet"
                  ? "text-[#930044] border-[#930044] font-bold"
                  : "text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">checkroom</span>
              My Closet ({customerId})
            </Link>

            <Link
              to="/platform"
              className={`h-full flex items-center gap-1 transition-colors border-b-2 ${
                location.pathname === "/platform"
                  ? "text-[#930044] border-[#930044] font-bold"
                  : "text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#BE185D]">analytics</span>
              Retailer Platform
            </Link>

            <Link
              to="/login"
              className={`h-full flex items-center gap-1 ml-auto text-slate-500 hover:text-[#930044] transition-colors`}
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
              Login Page Demo
            </Link>
          </nav>
        </div>
      </div>

      {/* Cart Flyout Drawer */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setCartDrawerOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col p-6 animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#930044]">shopping_bag</span>
                <h3 className="text-lg font-bold text-slate-900">Your StyleHub Bag ({cart.length})</h3>
              </div>
              <button onClick={() => setCartDrawerOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <span className="material-symbols-outlined text-4xl text-slate-300">shopping_bag</span>
                  <p className="mt-2 text-sm">Your shopping bag is empty.</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex gap-3 pb-3 border-b border-slate-100">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-900">{item.name}</h4>
                      <p className="text-xs text-slate-500">Size: {item.size} • Color: {item.color}</p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-[#930044] mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex justify-between text-base font-bold text-slate-900">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-xs text-slate-500">Taxes and free express shipping calculated at checkout.</p>
              <button
                onClick={() => alert(`Proceeding to checkout with ₹${cartTotal.toLocaleString("en-IN")}`)}
                className="w-full py-3 rounded-lg bg-[#930044] text-white font-bold text-sm shadow-md hover:bg-[#b81d5b] transition-colors"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
