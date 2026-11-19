import React from 'react';
import { MapPin, Navigation, Clock, Phone, Car, Bike, AlertCircle, ExternalLink } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export default function Location() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-ember-700 text-xs font-bold tracking-wider uppercase">Find Our Pizzeria</span>
        <h1 className="font-serif-heading text-4xl sm:text-5xl font-extrabold text-neutral-900">
          Location & Directions
        </h1>
        <p className="text-neutral-600 text-sm">
          Visit SuBakes in Sadashiv Peth, Pune for an authentic wood-fired pizza experience right next to SP College.
        </p>
      </div>

      {/* Main Grid: Details & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Address, Hours, Parking Information */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Address Card */}
          <div className="bg-crust-50 rounded-3xl p-6 sm:p-8 border border-crust-200 shadow-sm space-y-5">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-ember-100 text-ember-800 flex items-center justify-center flex-shrink-0 mt-0.5 border border-ember-200">
                <MapPin className="w-5 h-5 text-ember-700" />
              </div>
              <div>
                <h3 className="font-serif-heading font-bold text-xl text-neutral-900">
                  {restaurantData.officialName}
                </h3>
                <address className="not-italic text-xs text-neutral-700 mt-2 leading-relaxed">
                  <p className="font-semibold text-neutral-900">{restaurantData.address.shop}</p>
                  <p>{restaurantData.address.locality}</p>
                  <p>{restaurantData.address.city}, {restaurantData.address.state} – {restaurantData.address.pincode}</p>
                  <p className="text-neutral-500 mt-1">Landmark: {restaurantData.address.landmark}</p>
                </address>
              </div>
            </div>

            {/* Get Directions Button */}
            <div className="pt-2">
              <a
                href={restaurantData.googleMaps.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-ember-700 hover:bg-ember-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-warm hover:shadow-warm-lg transition-all text-sm group"
              >
                <Navigation className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
              </a>
            </div>
          </div>

          {/* Parking & Landmark Advice Card */}
          <div className="bg-crust-50 rounded-3xl p-6 sm:p-8 border border-crust-200 shadow-sm space-y-4">
            <h4 className="font-serif-heading font-bold text-lg text-neutral-900 flex items-center space-x-2">
              <Car className="w-5 h-5 text-ember-700" />
              <span>Parking & Transit Information</span>
            </h4>
            
            <div className="space-y-3 text-xs text-neutral-700">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-3">
                <Bike className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-950">Two-Wheelers (Recommended)</p>
                  <p className="text-emerald-800 mt-0.5">Ample convenient two-wheeler parking available along the street directly outside the cafe.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-950">Four-Wheelers (Cars)</p>
                  <p className="text-amber-800 mt-0.5">{restaurantData.parkingInfo}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="bg-crust-50 rounded-3xl p-6 sm:p-8 border border-crust-200 shadow-sm space-y-4">
            <h4 className="font-serif-heading font-bold text-lg text-neutral-900 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-ember-700" />
              <span>Timings</span>
            </h4>
            
            <div className="space-y-2 text-xs">
              <p className="text-neutral-900 font-semibold">{restaurantData.hoursSummary}</p>
              <p className="text-neutral-600">Open for lunch, afternoon snacks, and late evening dining.</p>
              <div className="pt-2 flex items-center space-x-2 text-ember-800 font-bold">
                <Phone className="w-4 h-4" />
                <a href={`tel:${restaurantData.phone}`} className="hover:underline">
                  Questions? Call: {restaurantData.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Google Maps Embed Iframe */}
        <div className="lg:col-span-7">
          <div className="bg-crust-50 rounded-3xl overflow-hidden border border-crust-200 shadow-warm">
            <div className="p-4 bg-crust-100 border-b border-crust-200 flex items-center justify-between text-xs font-semibold text-neutral-700">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-ember-700" />
                <span>Google Maps Interactive View</span>
              </span>
              <a
                href={restaurantData.googleMaps.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ember-700 hover:underline flex items-center space-x-1"
              >
                <span>Full Screen</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="w-full h-[520px] bg-neutral-200 relative">
              <iframe
                title="SuBakes Wood Fired Pizzeria Google Map"
                src={restaurantData.googleMaps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>

            <div className="p-4 bg-crust-50 text-[11px] text-neutral-500 border-t border-crust-200 flex items-center justify-between">
              <span>Google Place ID: {restaurantData.googleMaps.placeId}</span>
              <span>Pune, Maharashtra 411030</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
