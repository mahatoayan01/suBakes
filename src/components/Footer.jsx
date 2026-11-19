import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Phone, MapPin, Clock, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 text-neutral-300 pt-16 pb-12 border-t-4 border-ember-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-ember-700 flex items-center justify-center text-white shadow-warm">
                <Flame className="w-6 h-6" />
              </div>
              <span className="font-serif-heading text-2xl font-bold text-white tracking-wide">
                {restaurantData.officialName}
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Authentic Neapolitan-style wood-fired pizzas baked at 450°C in an artisan stone oven. Located in Sadashiv Peth near SP College, Pune.
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-950/60 text-amber-300 border border-amber-800/60">
                ⭐ {restaurantData.rating} Rating ({restaurantData.reviewCount} Reviews)
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif-heading text-lg font-bold text-white mb-4 tracking-wide">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-ember-400 transition-colors">Home & Highlights</Link>
              </li>
              <li>
                <Link to="/menu" className="text-neutral-400 hover:text-ember-400 transition-colors">Wood-Fired Pizza Menu</Link>
              </li>
              <li>
                <Link to="/location" className="text-neutral-400 hover:text-ember-400 transition-colors">Location & Directions</Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-ember-400 transition-colors">Contact & Table Reservation</Link>
              </li>
              <li>
                <Link to="/cart" className="text-neutral-400 hover:text-ember-400 transition-colors">Cart & Online Checkout</Link>
              </li>
              <li>
                <Link to="/owner-login" className="text-neutral-400 hover:text-ember-400 transition-colors flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-ember-500" />
                  <span>Owner Demo Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours & Service */}
          <div>
            <h3 className="font-serif-heading text-lg font-bold text-white mb-4 tracking-wide">Opening Hours</h3>
            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-ember-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Monday – Sunday (7 Days)</p>
                  <p className="text-xs text-neutral-400">11:30 AM – 11:00 PM</p>
                  <p className="text-xs text-emerald-400 mt-1 font-semibold">Continuous Service (No Afternoon Break)</p>
                </div>
              </div>
              <div className="pt-2 border-t border-neutral-800">
                <p className="text-xs text-neutral-400">Dine-in, Takeaway, and Demo Delivery available.</p>
              </div>
            </div>
          </div>

          {/* Contact & Location Info */}
          <div>
            <h3 className="font-serif-heading text-lg font-bold text-white mb-4 tracking-wide">Visit Us</h3>
            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-ember-500 mt-1 flex-shrink-0" />
                <address className="not-italic text-xs text-neutral-300 leading-relaxed">
                  {restaurantData.address.full}
                </address>
              </div>
              <div className="flex items-center space-x-3 pt-1">
                <Phone className="w-4 h-4 text-ember-500 flex-shrink-0" />
                <a href={`tel:${restaurantData.phone}`} className="text-xs font-semibold text-white hover:text-ember-400 transition-colors">
                  {restaurantData.phoneDisplay}
                </a>
              </div>
              <div className="pt-3">
                <a
                  href={restaurantData.googleMaps.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-ember-400 hover:text-ember-300 transition-colors bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg"
                >
                  <span>Open on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-neutral-300">© 2026 {restaurantData.officialName}.</span>
            <span>All rights reserved.</span>
          </div>

          {/* DEMO WEBSITE NOTICE - REQUIRED */}
          <div className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 font-semibold text-[11px] flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>Demo website — Built for showcase & preview purposes</span>
          </div>

          <div className="text-neutral-400 text-[11px]">
            Designed with artisanal warmth for wood-fired pizza lovers
          </div>
        </div>

      </div>
    </footer>
  );
}
