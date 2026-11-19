import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export default function FloatingActions() {
  const whatsappUrl = `https://wa.me/${restaurantData.whatsappNumber}?text=${encodeURIComponent(
    "Hello SuBakes! I would like to place an order / inquire about your wood-fired pizzas."
  )}`;

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col space-y-3 pointer-events-auto">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-emerald-400"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp with SuBakes"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute right-14 bg-charcoal-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          WhatsApp Us
        </span>
      </a>

      {/* Direct Call Button */}
      <a
        href={`tel:${restaurantData.phone}`}
        className="w-13 h-13 p-3 bg-ember-700 hover:bg-ember-800 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-ember-400"
        aria-label="Call SuBakes"
        title="Call SuBakes Now"
      >
        <Phone className="w-6 h-6 animate-bounce" />
        <span className="absolute right-14 bg-charcoal-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          Call: {restaurantData.phoneDisplay}
        </span>
      </a>
    </div>
  );
}
