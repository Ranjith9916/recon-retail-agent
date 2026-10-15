import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as api from "../api";

const StyleHubContext = createContext(null);

export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&auto=format&fit=crop&q=80";

// Helper to identify strictly female garments
export const isFemaleProduct = (product) => {
  if (!product) return false;
  const sub = (product.subcategory || "").toLowerCase();
  const name = (product.name || "").toLowerCase();
  const femaleSubcats = [
    "casual-dress",
    "festive-dress",
    "maxi-dress",
    "midi-dress",
    "shirt-dress",
    "crop-top",
    "blouse",
    "skirt"
  ];
  const femaleKeywords = [
    "dress",
    "skirt",
    "blouse",
    "crop top",
    "crop-top",
    "kurta",
    "kurti",
    "saree",
    "heel",
    "women",
    "ladies"
  ];
  if (femaleSubcats.includes(sub)) return true;
  if (femaleKeywords.some((w) => name.includes(w))) return true;
  return false;
};

// Curated high-res fashion photography mapping for StyleHub aesthetic
export const getProductImage = (product, gender = "male") => {
  if (!product) return FALLBACK_IMAGE;

  const cat = (product.category || "").toLowerCase();
  const sub = (product.subcategory || "").toLowerCase();
  const color = (product.color || "").toLowerCase();
  const name = (product.name || "").toLowerCase();
  const female = isFemaleProduct(product) || gender === "female";

  // Women's imagery
  if (female) {
    if (sub.includes("maxi") || name.includes("maxi")) {
      return "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&auto=format&fit=crop&q=80";
    }
    if (sub.includes("midi") || name.includes("midi")) {
      return "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=700&auto=format&fit=crop&q=80";
    }
    if (cat === "dress" || sub.includes("dress") || name.includes("dress")) {
      return "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=700&auto=format&fit=crop&q=80";
    }
    if (sub.includes("crop") || name.includes("crop")) {
      return "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&auto=format&fit=crop&q=80";
    }
    if (sub.includes("skirt") || name.includes("skirt")) {
      return "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=700&auto=format&fit=crop&q=80";
    }
    if (sub.includes("blouse") || name.includes("blouse")) {
      return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=80";
    }
    if (cat === "bottom" || sub.includes("trouser") || sub.includes("pant") || sub.includes("denim")) {
      return "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=700&auto=format&fit=crop&q=80";
    }
    if (cat === "outerwear" || sub.includes("jacket") || sub.includes("blazer") || sub.includes("coat")) {
      return "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&auto=format&fit=crop&q=80";
    }
    if (cat === "shoes" || sub.includes("boot") || sub.includes("heel") || sub.includes("sneaker")) {
      return "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&auto=format&fit=crop&q=80";
    }
    if (cat === "accessories" || sub.includes("bag") || sub.includes("watch")) {
      return "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&auto=format&fit=crop&q=80";
    }
    return "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&auto=format&fit=crop&q=80";
  }

  // Men's imagery
  if (sub.includes("boot") || (cat === "shoes" && name.includes("boot"))) {
    return "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("loafer") || name.includes("loafer")) {
    return "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("formal-shoes") || name.includes("oxford") || name.includes("formal")) {
    return "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=700&auto=format&fit=crop&q=80";
  }
  if (cat === "shoes" || sub.includes("sneaker")) {
    return "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("blazer") || name.includes("blazer")) {
    return "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("jacket") || sub.includes("coat") || cat === "outerwear") {
    return "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("sweater") || sub.includes("cardigan") || name.includes("cardigan")) {
    return "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("hoodie") || name.includes("hoodie")) {
    return "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("chino") || name.includes("chino")) {
    return "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("trouser") || name.includes("trouser") || (cat === "bottom" && !sub.includes("short"))) {
    return "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("short") || name.includes("short")) {
    return "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("polo") || name.includes("polo")) {
    return "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("shirt") || sub.includes("tee") || cat === "top") {
    if (color.includes("white")) {
      return "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop&q=80";
    }
    if (color.includes("navy") || color.includes("blue")) {
      return "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=700&auto=format&fit=crop&q=80";
    }
    return "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("watch") || name.includes("watch")) {
    return "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("belt") || name.includes("belt")) {
    return "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=700&auto=format&fit=crop&q=80";
  }
  if (sub.includes("cap") || name.includes("cap")) {
    return "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=700&auto=format&fit=crop&q=80";
  }

  return "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&auto=format&fit=crop&q=80";
};

// Persona definition helpers
export const DEMO_PERSONAS = {
  male: {
    id: "C002",
    name: "Rahul Verma",
    title: "Men's Studio",
    location: "Bandra, Mumbai 400050",
    avatar: "/stitch/image.png_1/screen.png",
    bio: "Smart-casual & tailored architecture for coastal humid climate.",
    city: "Mumbai",
    gender: "male"
  },
  female: {
    id: "C001",
    name: "Priya Sharma",
    title: "Women's Studio",
    location: "Indiranagar, Bangalore 560038",
    avatar: "/stitch/image.png_2/screen.png",
    bio: "Casual streetwear & contemporary silhouettes for monsoon season.",
    city: "Bangalore",
    gender: "female"
  }
};

export function StyleHubProvider({ children }) {
  const [gender, setGender] = useState("male");
  const [customerId, setCustomerId] = useState("C002");
  const [customer, setCustomer] = useState(null);
  const [customersList, setCustomersList] = useState([]);
  const [intelligence, setIntelligence] = useState(null);
  const [wardrobe, setWardrobe] = useState([]);
  const [browsing, setBrowsing] = useState([]);
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recommendations state
  const [recommendations, setRecommendations] = useState(null);
  const [trace, setTrace] = useState([]);
  const [recommendLoading, setRecommendLoading] = useState(false);
  const [recommendError, setRecommendError] = useState(null);

  // Shopping state
  const [wishlist, setWishlist] = useState(["P0002", "P0015", "P0032"]);
  const [cart, setCart] = useState([
    {
      product_id: "P0002",
      name: "Brown Chelsea Boots",
      price: 999,
      size: "UK 9",
      color: "Brown",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=700&auto=format&fit=crop&q=80"
    }
  ]);

  // Modals & Assistant
  const [stylistOpen, setStylistOpen] = useState(false);
  const [styleQuizOpen, setStyleQuizOpen] = useState(false);

  // Fetch initial customers list
  useEffect(() => {
    let mounted = true;
    api.listCustomers()
      .then((data) => {
        if (mounted && Array.isArray(data)) {
          setCustomersList(data);
        }
      })
      .catch((err) => console.warn("Failed to list customers:", err));
    return () => { mounted = false; };
  }, []);

  // Fetch all products for catalog
  useEffect(() => {
    let mounted = true;
    api.listProducts({ limit: 120 })
      .then((data) => {
        if (mounted && Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch((err) => console.warn("Failed to load products:", err));
    return () => { mounted = false; };
  }, []);

  // Load customer data, intelligence, wardrobe, browsing, and offers
  const loadCustomerData = useCallback(async (id) => {
    setLoading(true);
    try {
      const [custProfile, intelData, wardrobeData, browsingData, offersData] = await Promise.all([
        api.getCustomer(id).catch(() => null),
        api.getIntelligence(id).catch(() => null),
        api.getCustomerWardrobe(id).catch(() => []),
        api.getCustomerBrowsing(id).catch(() => []),
        api.getCustomerOffers(id).catch(() => [])
      ]);

      setCustomer(custProfile);
      setIntelligence(intelData);
      setWardrobe(Array.isArray(wardrobeData) ? wardrobeData : []);
      setBrowsing(Array.isArray(browsingData) ? browsingData : []);
      setOffers(Array.isArray(offersData) ? offersData : []);

      // If customer has recommendations in platform, initialize them
      if (intelData?.recommendations) {
        setRecommendations(intelData.recommendations);
      }
    } catch (err) {
      console.error("Error loading customer data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCustomerData(customerId);
  }, [customerId, loadCustomerData]);

  // Gender switch helper
  const setGenderView = (newGender) => {
    setGender(newGender);
    const targetPersona = DEMO_PERSONAS[newGender];
    if (targetPersona) {
      setCustomerId(targetPersona.id);
    }
  };

  // Switch to any customer by ID
  const switchCustomer = (id) => {
    setCustomerId(id);
    if (id === "C001" || id === "C003") {
      setGender("female");
    } else {
      setGender("male");
    }
  };

  // Trigger Gemini Agent recommendation execution
  const runAgentRecommend = async () => {
    setRecommendLoading(true);
    setRecommendError(null);
    try {
      const result = await api.recommend(customerId);
      if (result?.recommendations) {
        setRecommendations(result.recommendations);
        setTrace(result.trace || []);
      } else {
        throw new Error("No recommendations returned by agent.");
      }
    } catch (err) {
      console.error("Agent recommend error:", err);
      setRecommendError(err.message || "Failed to generate AI recommendations.");
    } finally {
      setRecommendLoading(false);
    }
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Cart operations
  const addToCart = (product, size = "M", color = "Default") => {
    const pId = product.product_id || product.id;
    setCart((prev) => {
      const existing = prev.find((item) => item.product_id === pId && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product_id === pId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          product_id: pId,
          name: product.name,
          price: product.price || 1499,
          size,
          color: color || product.color,
          quantity: 1,
          image: product.image || getProductImage(product, gender)
        }
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product_id !== productId));
  };

  const currentPersona = DEMO_PERSONAS[gender] || DEMO_PERSONAS.male;

  const value = {
    gender,
    setGenderView,
    customerId,
    switchCustomer,
    switchPersona: switchCustomer,
    customer,
    customersList,
    intelligence,
    wardrobe,
    browsing,
    browsingHistory: browsing || [],
    offers,
    products,
    loading,
    currentPersona,
    recommendations,
    trace,
    recommendLoading,
    recommendError,
    runAgentRecommend,
    wishlist,
    toggleWishlist,
    cart,
    addToCart,
    removeFromCart,
    stylistOpen,
    setStylistOpen,
    isStylistOpen: stylistOpen,
    setIsStylistOpen: setStylistOpen,
    styleQuizOpen,
    setStyleQuizOpen,
    isQuizOpen: styleQuizOpen,
    setIsQuizOpen: setStyleQuizOpen,
    refreshCustomerData: () => loadCustomerData(customerId)
  };

  return <StyleHubContext.Provider value={value}>{children}</StyleHubContext.Provider>;
}

export function useStyleHub() {
  const context = useContext(StyleHubContext);
  if (!context) {
    throw new Error("useStyleHub must be used within a StyleHubProvider");
  }
  return context;
}
