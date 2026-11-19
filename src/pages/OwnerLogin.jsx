import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, ArrowRight, Flame } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { restaurantData } from '../data/restaurant';

export default function OwnerLogin() {
  const { isAuthenticated, login, authError, credentials } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState(credentials.username);
  const [password, setPassword] = useState(credentials.password);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/owner', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/owner');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-ember-800 to-ember-600 text-white flex items-center justify-center mx-auto shadow-warm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="font-serif-heading text-3xl font-bold text-neutral-900">
          Owner Portal Login
        </h1>
        <p className="text-xs text-neutral-600">
          Access SuBakes live demo order stream, sales ledger, and kitchen controls.
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-crust-50 rounded-3xl p-8 border border-crust-200 shadow-warm space-y-6">
        
        {authError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="login-username">
              Username / Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                id="login-username"
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="login-password">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                id="login-password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-ember-700 hover:bg-ember-800 text-white font-bold py-3.5 rounded-xl shadow-warm hover:shadow-warm-lg transition-colors text-sm flex items-center justify-center space-x-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* DEMO CREDENTIALS BOX - STRICTLY REQUIRED */}
        <div className="pt-4 border-t border-crust-200">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-amber-900">
              <Flame className="w-3.5 h-3.5 text-ember-700" />
              <span>Demo credentials - change before going live</span>
            </div>
            <div className="space-y-1 font-mono text-[11px] bg-white/70 p-2.5 rounded-lg border border-amber-200">
              <p>Username: <strong>{credentials.username}</strong></p>
              <p>Password: <strong>{credentials.password}</strong></p>
            </div>
            <p className="text-[10px] text-amber-800">
              Clicking "Sign In" will authenticate using client-side session state.
            </p>
          </div>
        </div>

      </div>

      <div className="text-center">
        <Link to="/" className="text-xs text-neutral-500 hover:text-ember-700">
          ← Back to SuBakes Home
        </Link>
      </div>

    </div>
  );
}
