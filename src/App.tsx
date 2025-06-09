import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import { RecentlyViewedProvider } from "./contexts/RecentlyViewedContext";
import { CouponProvider } from "./contexts/CouponContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

// Pages
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import EnhancedCart from "./pages/EnhancedCart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Dashboard from "./pages/Dashboard";
import CustomerService from "./pages/CustomerService";
import ShippingInfo from "./pages/ShippingInfo";
import Returns from "./pages/Returns";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// App content without Clerk
const AppContent = () => {
  return (
    <ThemeProvider>
      <CouponProvider>
        <ComparisonProvider>
          <RecentlyViewedProvider>
            <WishlistProvider>
              <CartProvider>
                <Toaster />
                <Sonner />
                <div className="min-h-screen flex flex-col w-full">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<EnhancedCart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/customer-service" element={<CustomerService />} />
                      <Route path="/shipping-info" element={<ShippingInfo />} />
                      <Route path="/returns" element={<Returns />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <Chatbot />
                </div>
              </CartProvider>
            </WishlistProvider>
          </RecentlyViewedProvider>
        </ComparisonProvider>
      </CouponProvider>
    </ThemeProvider>
  );
};

// Inner component to use useNavigate hook for ClerkProvider
const ClerkAppWrapper = () => {
  const navigate = useNavigate();

  if (!PUBLISHABLE_KEY) {
    // If no Clerk key is provided, render the app without Clerk authentication
    console.warn("Clerk publishable key not found. Running in demo mode without authentication.");
    return <AppContent />;
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppContent />
    </ClerkProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ClerkAppWrapper />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
