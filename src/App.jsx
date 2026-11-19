import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Pizza } from 'lucide-react';

// Code-split routes with React.lazy for optimal bundle size & performance
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Location = lazy(() => import('./pages/Location'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const OwnerLogin = lazy(() => import('./pages/OwnerLogin'));
const OwnerDashboard = lazy(() => import('./pages/OwnerDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Fallback loader while route chunks load
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-ember-100 text-ember-700 flex items-center justify-center animate-pulse shadow-sm">
        <Pizza className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
      </div>
      <p className="text-xs font-semibold text-neutral-500 font-mono">Baking SuBakes page...</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-crust-50 text-neutral-800">
            {/* Sticky Header across all pages */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/owner-login" element={<OwnerLogin />} />
                  <Route path="/owner" element={<OwnerDashboard />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </Suspense>
            </main>

            {/* Floating Quick Action Buttons (Call & WhatsApp) on every page */}
            <FloatingActions />

            {/* Footer with required demo label */}
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
