import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, Instagram, Share2, Clock, CheckCircle } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build prefilled WhatsApp message text
    const text = `*New Website Inquiry for SuBakes:*
👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
📌 *Subject:* ${formData.subject}
💬 *Message:* ${formData.message}`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${restaurantData.whatsappNumber}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-ember-700 text-xs font-bold tracking-wider uppercase">We'd Love to Hear from You</span>
        <h1 className="font-serif-heading text-4xl sm:text-5xl font-extrabold text-neutral-900">
          Contact SuBakes
        </h1>
        <p className="text-neutral-600 text-sm">
          Have a question about our wood-fired pizzas, want to cater an event, or reserve for a large group? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Phone Card */}
          <div className="bg-crust-50 rounded-2xl p-6 border border-crust-200 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-ember-100 text-ember-800 flex items-center justify-center flex-shrink-0 border border-ember-200">
              <Phone className="w-6 h-6 text-ember-700" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Direct Phone</p>
              <a 
                href={`tel:${restaurantData.phone}`} 
                className="font-serif-heading font-bold text-xl text-neutral-900 hover:text-ember-700 transition-colors block mt-1"
              >
                {restaurantData.phoneDisplay}
              </a>
              <p className="text-xs text-neutral-600 mt-1">Available daily 11:30 AM to 11:00 PM for orders & queries.</p>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-crust-50 rounded-2xl p-6 border border-crust-200 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 border border-emerald-200">
              <MessageCircle className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Instant WhatsApp</p>
              <a 
                href={restaurantData.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer" 
                className="font-serif-heading font-bold text-xl text-neutral-900 hover:text-emerald-700 transition-colors block mt-1"
              >
                {restaurantData.phoneDisplay}
              </a>
              <p className="text-xs text-neutral-600 mt-1">Fast replies for orders, table bookings, and customized party pies.</p>
            </div>
          </div>

          {/* Location & Hours Card */}
          <div className="bg-crust-50 rounded-2xl p-6 border border-crust-200 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 border border-amber-200">
              <MapPin className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Pizzeria Address</p>
              <p className="font-semibold text-sm text-neutral-900 mt-1">
                {restaurantData.address.shop}
              </p>
              <p className="text-xs text-neutral-600">
                {restaurantData.address.locality}, {restaurantData.address.city} – {restaurantData.address.pincode}
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">Near SP College & opposite NMV Girls School</p>
            </div>
          </div>

          {/* Social Links & Placeholders */}
          <div className="bg-crust-50 rounded-2xl p-6 border border-crust-200 shadow-sm space-y-3">
            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Online & Social</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={restaurantData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-pink-50 text-pink-700 border border-pink-200 text-xs font-bold hover:bg-pink-100 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Instagram Profile</span>
              </a>

              <a
                href={restaurantData.googleMaps.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-crust-200 text-neutral-800 border border-crust-300 text-xs font-bold hover:bg-crust-300 transition-colors"
              >
                <Share2 className="w-4 h-4 text-neutral-600" />
                <span>Google Maps Profile</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form opening prefilled WhatsApp */}
        <div className="lg:col-span-7">
          <div className="bg-crust-50 rounded-3xl p-8 sm:p-10 border border-crust-200 shadow-warm space-y-6">
            <div className="space-y-1">
              <span className="text-ember-700 text-xs font-bold tracking-wider uppercase">Direct Dispatch</span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-neutral-900">
                Send Us a Message
              </h3>
              <p className="text-neutral-600 text-xs">
                Submitting this form directly opens a prefilled WhatsApp message to our restaurant line. No backend or waiting required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="cnt-name">
                    Your Name *
                  </label>
                  <input
                    id="cnt-name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Shruti Kulkarni"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="cnt-phone">
                    Phone Number *
                  </label>
                  <input
                    id="cnt-phone"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98220 XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="cnt-subject">
                  Inquiry Topic
                </label>
                <select
                  id="cnt-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Wood-Fired Pizza Catering">Party / Event Catering</option>
                  <option value="Table Booking Inquiry">Table Reservation</option>
                  <option value="Feedback / Compliment">Feedback on Food</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="cnt-message">
                  Your Message *
                </label>
                <textarea
                  id="cnt-message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you with our wood-fired pizzas today?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Open in WhatsApp</span>
              </button>
            </form>

            <div className="pt-2 border-t border-crust-200 text-center">
              <p className="text-[11px] text-neutral-500">
                Direct WhatsApp opens instantly on both mobile devices and WhatsApp Web.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
