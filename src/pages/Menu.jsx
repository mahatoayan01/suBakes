import React, { useState, useMemo } from 'react';
import { Search, Flame, Plus, Minus, Check, Pizza, ShoppingBag } from 'lucide-react';
import { menuCategories, menuItems } from '../data/menu';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Menu() {
  const { addToCart, updateQuantity, cartItems, totalItemsCount, subtotal } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegOnly, setFilterVegOnly] = useState(false);

  const getItemQuantity = (id) => {
    const found = cartItems.find(i => i.id === id);
    return found ? found.quantity : 0;
  };

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Category match
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
      // Search match
      const searchMatch = searchQuery.trim() === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      // Veg filter match
      const vegMatch = !filterVegOnly || item.isVeg === true;

      return categoryMatch && searchMatch && vegMatch;
    });
  }, [activeCategory, searchQuery, filterVegOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-ember-700 text-xs font-bold tracking-wider uppercase inline-flex items-center space-x-1.5">
          <Flame className="w-4 h-4 text-ember-600 animate-pulse" />
          <span>Stone Hearth Baked at 450°C</span>
        </span>
        <h1 className="font-serif-heading text-4xl sm:text-5xl font-extrabold text-neutral-900">
          SuBakes Artisan Menu
        </h1>
        <p className="text-neutral-600 text-sm leading-relaxed">
          Crafted with 24-hour fermented sourdough, authentic Italian plum tomatoes, and real hardwood fire in Sadashiv Peth, Pune.
        </p>
      </div>

      {/* Sticky Filter & Search Bar */}
      <div className="sticky top-20 z-30 bg-crust-50/95 backdrop-blur-md py-4 border-b border-crust-200 space-y-4">
        
        {/* Search & Veg toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search pizzas, pasta, crostini..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500 shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-neutral-400 hover:text-neutral-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Veg Filter Toggle */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                filterVegOnly
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                  : 'bg-crust-100 text-neutral-700 border-crust-300 hover:bg-crust-200'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${filterVegOnly ? 'bg-white' : 'bg-emerald-600'}`}></span>
              <span>Pure Veg Only</span>
            </button>

            {/* Quick Cart Pill on Mobile */}
            {totalItemsCount > 0 && (
              <Link
                to="/cart"
                className="sm:hidden inline-flex items-center space-x-1.5 bg-ember-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-warm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{totalItemsCount} (₹{subtotal})</span>
              </Link>
            )}
          </div>

        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                activeCategory === cat.id
                  ? 'bg-ember-700 text-white shadow-warm'
                  : 'bg-crust-100 text-neutral-700 hover:bg-crust-200 border border-crust-200'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
        <span>Showing {filteredItems.length} delicious items</span>
        {filterVegOnly && <span className="text-emerald-700 font-semibold">• Vegetarian items filtered</span>}
      </div>

      {/* Menu Dishes Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-crust-100 rounded-3xl border border-crust-200 space-y-3">
          <Pizza className="w-12 h-12 text-neutral-400 mx-auto" />
          <h3 className="font-serif-heading font-bold text-xl text-neutral-800">No dishes match your search</h3>
          <p className="text-xs text-neutral-500">Try adjusting your search keywords or switching category filters.</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); setFilterVegOnly(false); }}
            className="text-xs font-bold text-ember-700 hover:underline pt-2"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const qty = getItemQuantity(item.id);
            return (
              <div 
                key={item.id}
                className="bg-crust-50 rounded-2xl overflow-hidden border border-crust-200 shadow-sm hover:shadow-warm transition-all flex flex-col justify-between group"
              >
                {/* Image Container */}
                <div className="relative h-56 bg-neutral-900 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width="800"
                    height="600"
                  />
                  
                  {/* Veg / Non-Veg Badge */}
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold shadow-sm ${
                      item.isVeg ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                    }`}>
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                    {item.isPopular && (
                      <span className="bg-amber-400 text-neutral-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm">
                        Bestseller
                      </span>
                    )}
                  </div>

                  {/* Sample image tag per instructions */}
                  {item.isSample && (
                    <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm text-neutral-300 text-[10px] px-2 py-0.5 rounded border border-white/10 font-medium">
                      Sample image
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif-heading font-bold text-lg text-neutral-900 group-hover:text-ember-700 transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-extrabold text-base text-ember-900 whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-neutral-600 text-xs mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Footer / Add to Cart Action */}
                  <div className="pt-3 border-t border-crust-200 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500 font-medium">
                      ⏱️ {item.prepTime}
                    </span>

                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="inline-flex items-center space-x-1.5 bg-ember-700 hover:bg-ember-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2 bg-crust-200 border border-crust-300 rounded-xl px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, qty - 1)}
                          className="p-1 rounded-md text-neutral-700 hover:bg-crust-300 transition-colors"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-neutral-900 w-5 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, qty + 1)}
                          className="p-1 rounded-md text-neutral-700 hover:bg-crust-300 transition-colors"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Sticky Bottom Cart Floating Pill (When cart has items) */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-11/12 max-w-md">
          <Link
            to="/cart"
            className="flex items-center justify-between bg-charcoal-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-ember-600 hover:bg-charcoal-900 transition-all transform hover:-translate-y-0.5"
          >
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded-full bg-ember-600 text-white text-xs font-bold flex items-center justify-center">
                {totalItemsCount}
              </span>
              <div>
                <p className="text-xs font-bold">Items in Cart</p>
                <p className="text-[11px] text-neutral-400">Subtotal: ₹{subtotal}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-ember-400">
              <span>View Cart & Checkout</span>
              <span className="text-base font-normal">→</span>
            </div>
          </Link>
        </div>
      )}

    </div>
  );
}
