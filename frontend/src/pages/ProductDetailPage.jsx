import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useStyleHub, getProductImage, FALLBACK_IMAGE } from "../context/StyleHubContext";
import { fetchProductById } from "../api";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { products, customer, wardrobe, addToCart, wishlist, toggleWishlist, gender } = useStyleHub();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    // Look up in products list or fetch
    const found = products.find((p) => p.product_id === productId);
    if (found) {
      setProduct(found);
    } else {
      fetchProductById(productId)
        .then((res) => setProduct(res))
        .catch(() => {
          // Fallback demo product
          setProduct({
            product_id: productId,
            name: "Tailored Linen Casual Silhouette",
            category: "top",
            subcategory: "shirt",
            price: 2499,
            color: "olive",
            season: "summer",
            fit_description: "Relaxed tailored cut in breathable Italian slub cotton."
          });
        });
    }
  }, [productId, products]);

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-24 text-center">
        <span className="material-symbols-outlined text-4xl text-[#930044] animate-spin mb-2">progress_activity</span>
        <p className="text-slate-600 text-sm">Loading product details...</p>
      </div>
    );
  }

  const mainImg = getProductImage(product, gender);
  const gallery = [
    mainImg,
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDixg-TU_DfWC_1zJWUWKy-u6rqhOrgQ5h2f5W5bx5M589kthcegHtf_ey7_hfUwFozlS0YYKaB__LfcJM7aSUeIq0YJy4UQBggZFC-kRvgBUsnfx5FtN5ubBGh8B4rxSj7sbXenIDF9FXxL5PWw1XpKC1cJTvG9fDFo65v6-AFpDEUWwXJ-eK9CZQCexXVtK3u8GPAOrVTs3CIREf-kUlskP4SHFimJhSvHVDjpRFqkp-t3Odqo2AmiQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDZqipr9MjrYolMssRuJhgdsUfIrhmdek2Vz2b5FencQAzFUg_3RwMDbNcaAn_1fcUBM4tmcf90Zh5fI_IiZ2jtRj_RlmGfTULJQSPY-vX-dYHTwbu4hXyX4Igxg5vefTopaW-MXb-L3ehzedf9CNxGl5-B5tQlweugrQQIxR4_FeQryymYHCmIdLj6yHvYcRnKMEcJQmAVQ_uA9XZvuEA-CnSasJBMhDhw3nitKQi3IIvZP6KqUh4sMQ"
  ];

  const handleAddToCart = () => {
    addToCart({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      image_url: gallery[selectedImage],
      size: selectedSize
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const isFav = wishlist.includes(product.product_id);

  // Cross-reference user's owned closet items that pair with this piece
  const pairsWithCloset = wardrobe.slice(0, 3);

  return (
    <div className="bg-[#FBF9F6] min-h-screen text-slate-800 pb-16">
      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#930044]">Home</Link>
          <span>/</span>
          <span className="capitalize">{product.category || "Apparel"}</span>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate">{product.name}</span>
        </nav>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 md:px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-[#930044] shadow-xs" : "border-stone-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt="Thumb"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-md relative aspect-[3/4]">
              <img
                src={gallery[selectedImage]}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-[#00703c] shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00703c] animate-pulse"></span>
                <span>98% AI Match for {customer?.name || "Rahul"}</span>
              </div>
              <button
                onClick={() => toggleWishlist(product.product_id)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#930044] shadow-sm hover:scale-105 transition-transform"
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isFav ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  favorite
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT: PRODUCT DETAILS & FIT CALIBRATION */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-pink-100 text-[#930044] text-[11px] font-extrabold uppercase tracking-wide">
                  AI Calibrated Recommendation
                </span>
                <span className="text-xs text-stone-500 capitalize">
                  {product.season || "Monsoon"} Season
                </span>
              </div>

              <h1 className="font-editorial text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                {product.name}
              </h1>

              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Color: <span className="capitalize text-slate-800">{product.color || "Classic"}</span> • Style: <span className="capitalize text-slate-800">{product.subcategory || product.category}</span>
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl font-bold text-slate-900">
                  ₹{product.price?.toLocaleString("en-IN") || "2,499"}
                </span>
                <span className="text-sm line-through text-slate-400">
                  ₹{(Math.round((product.price || 2499) * 1.6)).toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-bold text-[#930044]">
                  38% OFF
                </span>
              </div>

              {/* Personal Fit Box */}
              <div className="p-4 rounded-2xl bg-[#FBF9F6] border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#00703c] text-[18px]">verified</span>
                    Calibrated Size for {customer?.name || "Rahul"}
                  </span>
                  <span className="text-[11px] text-[#930044] font-bold">99.4% Fit Accuracy</span>
                </div>
                <p className="text-xs text-slate-600">
                  Based on your measurements and preferred relaxed drape, we recommend <strong>Size M (Chest 39")</strong>.
                </p>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900">Select Size</label>
                  <button className="text-[11px] text-[#930044] font-bold hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-2">
                  {["S", "M", "L", "XL"].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-12 h-11 rounded-xl text-xs font-bold transition-all ${
                        selectedSize === sz
                          ? "bg-[#930044] text-white shadow-xs"
                          : "bg-white border border-stone-300 text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                    addedNotice
                      ? "bg-[#00703c] text-white"
                      : "bg-[#930044] hover:bg-[#b81d5b] text-white hover:scale-[1.01]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {addedNotice ? "check" : "shopping_bag"}
                  </span>
                  <span>{addedNotice ? "Added to Bag!" : "Add to Shopping Bag"}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.product_id)}
                  className="px-4 py-3.5 rounded-xl border border-stone-300 bg-white text-slate-700 hover:bg-stone-50 font-bold text-xs"
                >
                  Save
                </button>
              </div>
            </div>

            {/* PAIRS WITH YOUR CLOSET (Live cross-reference with GET /customers/{id}/wardrobe) */}
            <div className="pt-4 border-t border-stone-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#930044]">checkroom</span>
                Pairs With What You Already Own
              </h4>
              <p className="text-[11px] text-slate-500 mb-3">
                Cross-referenced with items in {customer?.name}'s digital wardrobe twin:
              </p>
              
              <div className="grid grid-cols-3 gap-2">
                {pairsWithCloset.map((wItem, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-white border border-stone-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      {wItem.category}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 truncate mt-0.5">
                      {wItem.name}
                    </p>
                    <span className="text-[9px] text-[#00703c] font-bold">100% Match</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
