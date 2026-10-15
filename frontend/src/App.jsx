import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AnalyticsPage from "./pages/AnalyticsPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomersPage from "./pages/CustomersPage";
import DashboardPage from "./pages/DashboardPage";
import DemoPage from "./pages/DemoPage";
import NotFoundPage from "./pages/NotFoundPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import Layout from "./platform/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ClosetPage from "./pages/ClosetPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import PlatformPage from "./pages/PlatformPage";
import { StyleHubProvider } from "./context/StyleHubContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function StoreLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F6]">
      <Navbar />
      <div className="pt-28 flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StyleHubProvider>
        <Routes>
          {/* Consumer Storefront Routes */}
          <Route path="/store" element={<StoreLayout><HomePage /></StoreLayout>} />
          <Route path="/closet" element={<StoreLayout><ClosetPage /></StoreLayout>} />
          <Route path="/product/:productId" element={<StoreLayout><ProductDetailPage /></StoreLayout>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/store-platform" element={<StoreLayout><PlatformPage /></StoreLayout>} />

          {/* Retailer B2B Intelligence Platform */}
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="customers/:customerId" element={<CustomerDetailPage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="demo" element={<DemoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </StyleHubProvider>
    </BrowserRouter>
  );
}

