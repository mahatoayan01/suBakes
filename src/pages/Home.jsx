import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, Pizza, Phone, ArrowRight, Star, Clock, MapPin, 
  CheckCircle2, Plus, Minus, ChevronDown, ChevronUp, Instagram, 
  Sparkles, ShieldCheck, Calendar, Users, UtensilsCrossed 
} from 'lucide-react';
import { restaurantData } from '../data/restaurant';
import { menuItems } from '../data/menu';
import { reviewsData } from '../data/reviews';
import { galleryItems, galleryCategories } from '../data/gallery';
import { faqsData } from '../data/faqs';
import { offersData } from '../data/offers';
import { instagramData } from '../data/instagram';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(0); // first FAQ open by default
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: '19:30',
    notes: ''
  });

  // Filter popular dishes for Home showcase
  const popularDishes = menuItems.filter(item => item.isPopular).slice(0, 6);

  // Filter gallery
  const filteredGallery = selectedGalleryCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedGalleryCategory);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const getItemQuantity = (id) => {
    const found = cartItems.find(i => i.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-charcoal-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
          <img 
            src="/images/hero/subakes-wood-fired-hero.svg" 
            alt="Artisan wood-fired pizza stone oven background" 
            className="w-full h-full object-cover"
            width="1600"
            height="900"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-charcoal-950/40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-ember-900/80 border border-ember-600/50 text-ember-300 text-xs font-bold tracking-wider uppercase">
                <Flame className="w-4 h-4 text-ember-400 animate-pulse" />
                <span>450°C Hardwood Stone Oven Baking</span>
              </div>

              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Authentic Wood-Fired Pizza in <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember-400 via-orange-300 to-amber-400">Sadashiv Peth</span>
              </h1>

              <p className="text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
                Handcrafted Neapolitan-style dough, naturally fermented for airy digestiveness and baked over glowing hardwood for that signature leopard-spotted charred crust.
              </p>

              {/* Rating & Location Pill */}
              <div className="flex flex-wrap items-center gap-4 text-sm pt-1">
                <div className="flex items-center space-x-1.5 bg-neutral-900/90 border border-neutral-700/80 px-3.5 py-1.5 rounded-xl text-amber-300">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{restaurantData.rating}</span>
                  <span className="text-neutral-400 text-xs">({restaurantData.reviewCount} Reviews on Maps)</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-neutral-900/90 border border-neutral-700/80 px-3.5 py-1.5 rounded-xl text-neutral-300">
                  <MapPin className="w-4 h-4 text-ember-400" />
                  <span>Near SP College, Sadashiv Peth</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/menu"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-ember-600 to-ember-700 hover:from-ember-500 hover:to-ember-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-warm hover:shadow-warm-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ember-500"
                >
                  <Pizza className="w-5 h-5" />
                  <span>Order Now</span>
                </Link>

                <Link
                  to="/menu"
                  className="inline-flex items-center space-x-2 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-100 font-semibold px-6 py-3.5 rounded-xl border border-neutral-700 transition-colors"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </Link>

                <a
                  href={`tel:${restaurantData.phone}`}
                  className="inline-flex items-center space-x-2 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-100 font-semibold px-5 py-3.5 rounded-xl border border-neutral-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-ember-400" />
                  <span>{restaurantData.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-ember-900/40 shadow-2xl bg-neutral-900 group">
                <img 
                  src="/images/food/zesty-chicken-pizza.svg" 
                  alt="SuBakes signature Zesty Chicken Pizza freshly baked" 
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  width="800"
                  height="600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-charcoal-900/90 backdrop-blur-md border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-ember-400 uppercase tracking-wider">Crowd Favorite</span>
                    <h3 className="text-white font-serif-heading font-bold text-lg">Zesty Chicken Pizza</h3>
                    <p className="text-neutral-400 text-xs">Spiced chicken chunks, paprika & fresh basil</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-white">₹540</span>
                    <div className="text-[10px] text-emerald-400 font-medium">Stone Hearth Baked</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-warm border border-crust-200">
                <img 
                  src="/images/interior/wood-fired-stone-oven.svg" 
                  alt="Wood-fired stone oven at 450 degrees" 
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-warm border border-crust-200 pt-6">
                <img 
                  src="/images/food/cheese-garlic-bread.svg" 
                  alt="Artisanal cheese garlic bread with dip" 
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 bg-ember-800 text-white p-5 rounded-2xl shadow-xl hidden sm:flex items-center space-x-3 max-w-xs border border-ember-600">
              <Flame className="w-8 h-8 text-amber-300 flex-shrink-0 animate-bounce" />
              <div>
                <p className="font-bold text-sm">Real Wood Fire</p>
                <p className="text-xs text-ember-200">No electric heating elements. 100% genuine hardwood stone oven.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-ember-700 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              <span>The SuBakes Story</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
              Honest Artisanal Pizza Made with Patience & Fire
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              {restaurantData.story}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-crust-100 border border-crust-200">
                <h4 className="font-bold text-neutral-900 text-sm flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>24-Hour Fermentation</span>
                </h4>
                <p className="text-xs text-neutral-600 mt-1">Light, easily digestible sourdough with crisp blistered cornicione.</p>
              </div>
              <div className="p-4 rounded-xl bg-crust-100 border border-crust-200">
                <h4 className="font-bold text-neutral-900 text-sm flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Artisan Ingredients</span>
                </h4>
                <p className="text-xs text-neutral-600 mt-1">Crushed plum tomato sauce, fior di latte mozzarella, and fresh garden herbs.</p>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                to="/location" 
                className="inline-flex items-center space-x-2 text-ember-700 hover:text-ember-800 font-bold text-sm group"
              >
                <span>Find our cozy cafe in Sadashiv Peth</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. POPULAR DISHES */}
      <section className="bg-crust-100 py-20 border-y border-crust-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-ember-700 text-xs font-bold tracking-wider uppercase">Most Loved by Pune Diners</span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
                Popular Dishes from the Hearth
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center space-x-2 bg-crust-50 hover:bg-crust-200 text-neutral-900 font-semibold px-5 py-2.5 rounded-xl border border-crust-300 text-sm transition-colors"
            >
              <span>View Full Menu ({menuItems.length} items)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDishes.map((item) => {
              const qty = getItemQuantity(item.id);
              return (
                <div 
                  key={item.id}
                  className="bg-crust-50 rounded-2xl overflow-hidden border border-crust-200 shadow-sm hover:shadow-warm transition-all flex flex-col group"
                >
                  {/* Dish Image */}
                  <div className="relative h-52 overflow-hidden bg-charcoal-900">
                    <img 
                      src={item.image} 
                      alt={item.alt} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width="800"
                      height="600"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold shadow-sm ${
                        item.isVeg ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                      }`}>
                        {item.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                      {item.isPopular && (
                        <span className="bg-amber-500 text-neutral-900 text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Sample image tag per instructions */}
                    {item.isSample && (
                      <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-neutral-300 text-[10px] px-2 py-0.5 rounded border border-white/10 font-medium">
                        Sample image
                      </span>
                    )}
                  </div>

                  {/* Dish Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif-heading font-bold text-xl text-neutral-900 group-hover:text-ember-700 transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-extrabold text-lg text-ember-800 whitespace-nowrap">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-neutral-600 text-xs mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Add to Cart Actions */}
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
                            className="p-1 rounded-md text-neutral-700 hover:bg-crust-300"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-neutral-900 w-5 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, qty + 1)}
                            className="p-1 rounded-md text-neutral-700 hover:bg-crust-300"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. OFFERS SECTION (Editable demo placeholder) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {offersData.map((offer) => (
          <div 
            key={offer.id}
            className="rounded-3xl bg-gradient-to-r from-ember-900 via-ember-800 to-amber-900 text-white p-8 sm:p-12 shadow-warm relative overflow-hidden border border-ember-700"
          >
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center space-x-2 bg-amber-400 text-neutral-950 px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wide">
                  <span>{offer.tag}</span>
                </div>
                <h3 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-white">
                  {offer.title} — Save {offer.discount}
                </h3>
                <p className="text-amber-100/90 text-sm leading-relaxed">
                  {offer.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-amber-200">
                  <span>Promo Code: <strong className="text-white bg-black/40 px-2 py-1 rounded border border-amber-300/30">{offer.code}</strong></span>
                  <span>•</span>
                  <span>{offer.validity}</span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <Link
                  to="/menu"
                  className="inline-flex items-center space-x-2 bg-white hover:bg-amber-50 text-ember-900 font-extrabold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105"
                >
                  <Pizza className="w-4 h-4 text-ember-700" />
                  <span>Redeem on Menu</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 5. GALLERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-ember-700 text-xs font-bold tracking-wider uppercase">Visual Journey</span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-neutral-900">
            Inside the Pizzeria & Oven Craft
          </h2>
          <p className="text-neutral-600 text-sm">
            Experience the smoky heat, rustic ambiance, and handcrafted pizzas at SuBakes.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedGalleryCategory(cat.id)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                  selectedGalleryCategory === cat.id
                    ? 'bg-ember-700 text-white shadow-sm'
                    : 'bg-crust-200 text-neutral-700 hover:bg-crust-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div 
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-crust-200 shadow-sm bg-neutral-900 h-64"
            >
              <img 
                src={item.image} 
                alt={item.alt} 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
                width="800"
                height="600"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h4 className="font-serif-heading font-bold text-lg text-white">
                  {item.title}
                </h4>
                <p className="text-neutral-300 text-xs leading-snug">
                  {item.description}
                </p>
                {item.isSample && (
                  <span className="inline-block mt-1 bg-black/60 text-neutral-400 text-[10px] px-2 py-0.5 rounded border border-white/10">
                    Sample image
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. OPENING HOURS & TABLE BOOKING FORM */}
      <section className="bg-crust-100 py-20 border-y border-crust-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Opening Hours Timetable */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-ember-700 text-xs font-bold tracking-wider uppercase">Operating Schedule</span>
                <h2 className="font-serif-heading text-3xl font-bold text-neutral-900 mt-1">
                  Opening Hours
                </h2>
                <p className="text-neutral-600 text-xs mt-2">
                  Serving hot wood-fired pizzas continuous all day without break.
                </p>
              </div>

              <div className="bg-crust-50 rounded-2xl border border-crust-200 p-6 divide-y divide-crust-200 shadow-sm">
                {restaurantData.openingHours.map((h) => (
                  <div key={h.day} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-800">{h.day}</span>
                    <span className="font-mono font-medium text-ember-900 bg-crust-100 px-2 py-1 rounded">
                      {h.open} – {h.close}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-3">
                <Clock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold">Continuous Dining (11:30 AM - 11:00 PM):</strong>
                  <p className="text-neutral-600 mt-0.5">Drop by for early lunch, afternoon coffee and crostini, or late evening dinner.</p>
                </div>
              </div>
            </div>

            {/* Table Booking Form */}
            <div className="lg:col-span-7">
              <div className="bg-crust-50 rounded-3xl p-8 sm:p-10 border border-crust-200 shadow-warm">
                <div className="space-y-2 mb-6">
                  <span className="text-ember-700 text-xs font-bold tracking-wider uppercase">Reserve Your Spot</span>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-neutral-900">
                    Book a Table at SuBakes
                  </h3>
                  <p className="text-neutral-600 text-xs">
                    Reserve ahead to avoid waiting during peak college and weekend dinner hours.
                  </p>
                </div>

                {bookingSubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="font-serif-heading text-xl font-bold">Table Reservation Received!</h4>
                    <p className="text-xs text-neutral-700 max-w-md mx-auto">
                      Thank you, <strong>{bookingData.name}</strong>. We have noted your reservation for {bookingData.guests} guests on {bookingData.date || 'today'} at {bookingData.time}. Our team will confirm shortly via WhatsApp/Phone.
                    </p>
                    <button
                      onClick={() => setBookingSubmitted(false)}
                      className="mt-3 text-xs font-bold text-emerald-800 underline hover:text-emerald-900"
                    >
                      Book Another Table
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="book-name">
                          Full Name *
                        </label>
                        <input
                          id="book-name"
                          required
                          type="text"
                          value={bookingData.name}
                          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                          placeholder="e.g. Rohan Joshi"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="book-phone">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          id="book-phone"
                          required
                          type="tel"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                          placeholder="+91 98220 XXXXX"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="book-guests">
                          Number of Guests
                        </label>
                        <select
                          id="book-guests"
                          value={bookingData.guests}
                          onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="3">3 People</option>
                          <option value="4">4 People</option>
                          <option value="5-8">5 to 8 People</option>
                          <option value="8+">Large Group (8+)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="book-date">
                          Date *
                        </label>
                        <input
                          id="book-date"
                          required
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="book-time">
                          Preferred Time *
                        </label>
                        <input
                          id="book-time"
                          required
                          type="time"
                          value={bookingData.time}
                          onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="book-notes">
                        Special Requests or Seating Preferences (Optional)
                      </label>
                      <textarea
                        id="book-notes"
                        rows="2"
                        value={bookingData.notes}
                        onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                        placeholder="e.g. Celebrating a birthday, corner booth preferred..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-ember-700 hover:bg-ember-800 text-white font-bold py-3.5 rounded-xl shadow-warm hover:shadow-warm-lg transition-colors text-sm"
                    >
                      Confirm Table Booking
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-ember-700 text-xs font-bold tracking-wider uppercase">Verified Patron Feedback</span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
              What Customers Say About SuBakes
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-sm text-neutral-700">
            <span className="font-bold text-xl text-neutral-900">⭐ {reviewsData.overallRating}</span>
            <span>based on {reviewsData.totalReviews} reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsData.reviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-crust-50 rounded-2xl p-6 border border-crust-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-ember-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 rounded-full bg-ember-100 text-ember-800 font-bold flex items-center justify-center text-sm border border-ember-200">
                      {rev.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm">{rev.name}</h4>
                      <p className="text-[10px] text-neutral-500">{rev.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-neutral-700 text-xs leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {rev.dishMentioned && (
                <div className="pt-3 border-t border-crust-200 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500">Dish praised:</span>
                  <span className="font-semibold text-ember-800">{rev.dishMentioned}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. INSTAGRAM SECTION */}
      <section className="bg-charcoal-950 text-white py-20 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <Instagram className="w-4 h-4" />
                <span>Follow Our Food Journey</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mt-1">
                @subakes on Instagram
              </h2>
            </div>
            
            <a
              href={instagramData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all transform hover:scale-105"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow on Instagram</span>
            </a>
          </div>

          {/* 6 Grid Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramData.posts.map((post) => (
              <a
                key={post.id}
                href={instagramData.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl overflow-hidden bg-neutral-900 aspect-square block border border-neutral-800 hover:border-pink-500 transition-colors"
              >
                <img 
                  src={post.image} 
                  alt={post.dish} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  width="600"
                  height="600"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 text-[10px] text-white">
                  <p className="font-bold truncate">{post.dish}</p>
                  <p className="text-neutral-300 text-[9px] line-clamp-2">{post.caption}</p>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-ember-700 text-xs font-bold tracking-wider uppercase">Got Questions?</span>
          <h2 className="font-serif-heading text-3xl font-bold text-neutral-900">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600 text-xs">
            Everything you need to know about our stone oven, ingredients, and dining at SuBakes.
          </p>
        </div>

        <div className="space-y-3">
          {faqsData.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={faq.id}
                className="bg-crust-50 rounded-2xl border border-crust-200 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-sm font-bold text-neutral-900 hover:text-ember-700 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-ember-700 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-neutral-700 leading-relaxed border-t border-crust-200/60 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 border-2 border-ember-800 shadow-warm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold">
              Ready for an Authentic Wood-Fired Slice?
            </h3>
            <p className="text-neutral-400 text-xs max-w-lg">
              Order your favorite Neapolitan pizzas, freshly baked garlic breads, and chilled brews for pickup or demo delivery.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/menu"
              className="bg-ember-700 hover:bg-ember-800 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-warm transition-transform hover:scale-105"
            >
              Order Online Now
            </Link>
            <a
              href={`tel:${restaurantData.phone}`}
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm px-5 py-3 rounded-xl border border-neutral-700 transition-colors"
            >
              Call: {restaurantData.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
