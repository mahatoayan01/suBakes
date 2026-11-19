import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pizza, ShoppingBag, Phone, Menu as MenuIcon, X, User, Flame } from 'lucide-react';
import { restaurantData } from '../data/restaurant';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItemsCount } = useCart();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Location & Map', path: '/location' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-crust-50/95 backdrop-blur-md border-b border-crust-200 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-ember-600 rounded-lg p-1">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-ember-800 to-ember-600 flex items-center justify-center text-white shadow-warm group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif-heading text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-ember-700 transition-colors">
                  {restaurantData.brandName}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-ember-100 text-ember-800 border border-ember-200">
                  Wood Fired
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-medium tracking-wide">Pizzeria • Sadashiv Peth</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 py-1.5 px-1 border-b-2 ${
                  isActive(link.path)
                    ? 'text-ember-700 border-ember-600'
                    : 'text-neutral-700 hover:text-ember-600 border-transparent hover:border-ember-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Phone button */}
            <a
              href={`tel:${restaurantData.phone}`}
              className="inline-flex items-center space-x-2 text-xs font-semibold text-neutral-700 hover:text-ember-700 bg-crust-100 hover:bg-crust-200 px-3.5 py-2 rounded-full border border-crust-300 transition-colors"
              title="Call SuBakes"
            >
              <Phone className="w-3.5 h-3.5 text-ember-600" />
              <span>{restaurantData.phoneDisplay}</span>
            </a>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full bg-crust-100 hover:bg-ember-50 text-neutral-800 hover:text-ember-700 transition-colors border border-crust-300 hover:border-ember-300 focus:outline-none focus:ring-2 focus:ring-ember-500"
              aria-label={`Cart with ${totalItemsCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-ember-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {/* Owner portal link */}
            <Link
              to={isAuthenticated ? "/owner" : "/owner-login"}
              className={`p-2 rounded-full transition-colors text-xs font-medium flex items-center space-x-1 ${
                isAuthenticated 
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200' 
                  : 'text-neutral-500 hover:text-neutral-800 hover:bg-crust-200'
              }`}
              title={isAuthenticated ? "Owner Dashboard" : "Owner Login"}
            >
              <User className="w-4 h-4" />
              {isAuthenticated && <span className="text-[11px] font-semibold pr-1">Owner</span>}
            </Link>

            {/* Order Now CTA */}
            <Link
              to="/menu"
              className="inline-flex items-center space-x-1.5 bg-ember-700 hover:bg-ember-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-warm hover:shadow-warm-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ember-600 focus:ring-offset-2"
            >
              <Pizza className="w-4 h-4" />
              <span>Order Now</span>
            </Link>
          </div>

          {/* Mobile Right Controls: Cart & Hamburger */}
          <div className="flex lg:hidden items-center space-x-3">
            <Link
              to="/cart"
              className="relative p-2 rounded-full bg-crust-100 text-neutral-800 border border-crust-300"
              aria-label={`Cart with ${totalItemsCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-ember-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-crust-100 text-neutral-800 hover:bg-crust-200 focus:outline-none focus:ring-2 focus:ring-ember-600"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-crust-50 border-b border-crust-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3 rounded-lg text-base font-semibold ${
                  isActive(link.path)
                    ? 'bg-ember-100 text-ember-900 font-bold'
                    : 'text-neutral-700 hover:bg-crust-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-base font-semibold text-neutral-700 hover:bg-crust-200 flex items-center justify-between"
            >
              <span>View Cart & Checkout</span>
              <span className="bg-ember-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {totalItemsCount} items
              </span>
            </Link>
            <Link
              to={isAuthenticated ? "/owner" : "/owner-login"}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-sm font-medium text-neutral-600 hover:bg-crust-200 flex items-center space-x-2"
            >
              <User className="w-4 h-4 text-neutral-500" />
              <span>{isAuthenticated ? "Owner Dashboard (Logged In)" : "Owner Demo Login"}</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-crust-200 flex flex-col gap-2">
            <a
              href={`tel:${restaurantData.phone}`}
              className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl bg-crust-200 text-neutral-900 font-semibold text-sm border border-crust-300"
            >
              <Phone className="w-4 h-4 text-ember-700" />
              <span>Call: {restaurantData.phoneDisplay}</span>
            </a>
            <Link
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl bg-ember-700 text-white font-semibold text-sm shadow-warm"
            >
              <Pizza className="w-4 h-4" />
              <span>Explore Menu & Order</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
