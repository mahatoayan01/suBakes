import React from 'react';
import { Link } from 'react-router-dom';
import { Pizza, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-ember-100 text-ember-700 flex items-center justify-center mx-auto shadow-sm">
        <Pizza className="w-10 h-10 animate-spin" style={{ animationDuration: '6s' }} />
      </div>
      <div className="space-y-2">
        <h1 className="font-serif-heading text-4xl font-extrabold text-neutral-900">404 - Page Not Found</h1>
        <p className="text-neutral-600 text-xs leading-relaxed">
          Looks like this slice rolled off the wooden peel! The page you are looking for doesn't exist or has moved.
        </p>
      </div>
      <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center space-x-2 bg-ember-700 hover:bg-ember-800 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-warm"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/menu"
          className="inline-flex items-center justify-center space-x-2 bg-crust-200 hover:bg-crust-300 text-neutral-900 font-bold px-6 py-3 rounded-xl transition-colors text-sm border border-crust-300"
        >
          <Pizza className="w-4 h-4 text-ember-700" />
          <span>Explore Menu</span>
        </Link>
      </div>
    </div>
  );
}
