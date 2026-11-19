import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, 
  CheckCircle2, CreditCard, Banknote, QrCode, AlertTriangle, 
  MapPin, Phone, User, Pizza 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurantData } from '../data/restaurant';

export default function Cart() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    tax, 
    deliveryFee, 
    saveOrder 
  } = useCart();

  const [orderType, setOrderType] = useState('Delivery'); // 'Delivery' or 'Pickup'
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI', 'Card', 'Cash'
  const [submittedOrder, setSubmittedOrder] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    instructions: ''
  });

  const activeDeliveryFee = orderType === 'Delivery' ? deliveryFee : 0;
  const grandTotal = subtotal + tax + activeDeliveryFee;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const orderPayload = {
      customer: {
        name: formData.name,
        phone: formData.phone,
        address: orderType === 'Delivery' ? formData.address : 'Storefront Pickup - Sadashiv Peth',
        type: orderType,
        instructions: formData.instructions
      },
      items: cartItems.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity
      })),
      subtotal,
      tax,
      deliveryFee: activeDeliveryFee,
      total: grandTotal,
      paymentMethod: paymentMethod === 'UPI' ? 'Demo UPI (GPay/PhonePe)' : (paymentMethod === 'Card' ? 'Demo Credit/Debit Card' : 'Demo Cash on Delivery'),
      paymentStatus: paymentMethod === 'Cash' ? 'Pending (Pay on Delivery)' : 'Paid (Demo Verified)',
      status: 'Pending'
    };

    const newOrder = saveOrder(orderPayload);
    setSubmittedOrder(newOrder);
  };

  // SUCCESS SCREEN
  if (submittedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-crust-50 rounded-3xl p-8 sm:p-12 border border-crust-200 shadow-warm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>Demo only - no real payment is processed</span>
            </div>
            <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-neutral-900">
              Order Placed Successfully!
            </h1>
            <p className="text-neutral-600 text-xs">
              Thank you, <strong>{submittedOrder.customer.name}</strong>. Your demo order has been logged in the owner system.
            </p>
          </div>

          {/* Order Summary Receipt Box */}
          <div className="bg-white rounded-2xl border border-crust-200 p-6 text-left space-y-4 shadow-sm text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-crust-200">
              <span className="text-neutral-500 font-semibold">Order ID:</span>
              <span className="font-mono font-bold text-neutral-900 bg-crust-100 px-2 py-0.5 rounded">
                {submittedOrder.id}
              </span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-crust-200">
              <span className="text-neutral-500 font-semibold">Fulfillment Type:</span>
              <span className="font-bold text-ember-800">{submittedOrder.customer.type}</span>
            </div>

            <div className="space-y-2 pb-3 border-b border-crust-200">
              <p className="font-bold text-neutral-900">Items Ordered:</p>
              {submittedOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-neutral-700">
                  <span>{it.quantity}x {it.name}</span>
                  <span className="font-semibold">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between font-bold text-sm text-neutral-900 pt-1">
              <span>Grand Total:</span>
              <span className="text-ember-900 text-base">₹{submittedOrder.total}</span>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
              <strong>Demo Status:</strong> This order has been written to <code>localStorage</code> and is viewable inside the <Link to="/owner" className="underline font-bold text-ember-800">Owner Dashboard</Link>.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center space-x-2 bg-ember-700 hover:bg-ember-800 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              <Pizza className="w-4 h-4" />
              <span>Order More Pizzas</span>
            </Link>

            <Link
              to="/owner"
              className="inline-flex items-center justify-center space-x-2 bg-crust-200 hover:bg-crust-300 text-neutral-900 font-bold px-6 py-3 rounded-xl transition-colors text-sm border border-crust-300"
            >
              <ShieldCheck className="w-4 h-4 text-neutral-700" />
              <span>View in Owner Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART VIEW
  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-crust-200 text-neutral-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif-heading text-3xl font-bold text-neutral-900">Your Cart is Empty</h2>
          <p className="text-neutral-600 text-sm">
            You haven't added any of our delicious wood-fired pizzas or garlic breads yet.
          </p>
        </div>
        <div>
          <Link
            to="/menu"
            className="inline-flex items-center space-x-2 bg-ember-700 hover:bg-ember-800 text-white font-bold px-7 py-3.5 rounded-xl shadow-warm hover:shadow-warm-lg transition-all"
          >
            <Pizza className="w-4 h-4" />
            <span>Browse Artisan Menu</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-neutral-900">
          Review Your Order & Checkout
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Review your wood-fired selections and complete your demo order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-crust-50 rounded-3xl p-6 sm:p-8 border border-crust-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-crust-200">
              <h2 className="font-serif-heading font-bold text-xl text-neutral-900">
                Selected Dishes ({cartItems.length})
              </h2>
              <button
                onClick={clearCart}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            <div className="divide-y divide-crust-200">
              {cartItems.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-xl object-cover border border-crust-300 flex-shrink-0"
                      width="64"
                      height="64"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900">{item.name}</h4>
                      <p className="text-xs text-ember-900 font-bold mt-0.5">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-crust-200 border border-crust-300 rounded-xl px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded text-neutral-700 hover:bg-crust-300"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-neutral-900 w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded text-neutral-700 hover:bg-crust-300"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-bold text-sm text-neutral-900 w-16 text-right">
                      ₹{item.price * item.quantity}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-400 hover:text-rose-600 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/menu"
                className="text-xs font-bold text-ember-700 hover:text-ember-800 flex items-center space-x-1"
              >
                <span>+ Add more dishes from menu</span>
              </Link>
            </div>
          </div>

          {/* Delivery or Pickup Switcher */}
          <div className="bg-crust-50 rounded-3xl p-6 sm:p-8 border border-crust-200 shadow-sm space-y-4">
            <h3 className="font-serif-heading font-bold text-lg text-neutral-900">
              Fulfillment Method
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setOrderType('Delivery')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  orderType === 'Delivery'
                    ? 'border-ember-600 bg-ember-50/50 text-ember-900 ring-2 ring-ember-600/20'
                    : 'border-crust-300 bg-white text-neutral-700 hover:bg-crust-100'
                }`}
              >
                <p className="font-bold text-sm">🛵 Doorstep Delivery</p>
                <p className="text-xs text-neutral-500 mt-1">Delivered hot across Sadashiv Peth & Pune central (₹40)</p>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('Pickup')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  orderType === 'Pickup'
                    ? 'border-ember-600 bg-ember-50/50 text-ember-900 ring-2 ring-ember-600/20'
                    : 'border-crust-300 bg-white text-neutral-700 hover:bg-crust-100'
                }`}
              >
                <p className="font-bold text-sm">🍕 Self Pickup / Takeaway</p>
                <p className="text-xs text-neutral-500 mt-1">Pick up fresh at Chaitanya Apt, Sadashiv Peth (Free)</p>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Checkout Form & DEMO Payment */}
        <div className="lg:col-span-5 space-y-6">
          
          <form onSubmit={handleCheckoutSubmit} className="bg-crust-50 rounded-3xl p-6 sm:p-8 border border-crust-200 shadow-warm space-y-6">
            
            {/* MANDATORY VISIBLE DEMO BANNER */}
            <div className="p-4 rounded-2xl bg-amber-100/90 border border-amber-300 text-amber-950 space-y-1">
              <div className="flex items-center space-x-2 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>Demo only - no real payment is processed</span>
              </div>
              <p className="text-[11px] text-amber-900 leading-relaxed">
                This is a fully functional demonstration storefront. Submitting will simulate a payment and log an order into the demo database.
              </p>
            </div>

            {/* Customer Contact Details */}
            <div className="space-y-4">
              <h3 className="font-serif-heading font-bold text-lg text-neutral-900">
                Customer Details
              </h3>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="cust-name">
                  Full Name *
                </label>
                <input
                  id="cust-name"
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Abdullah Sayyed"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="cust-phone">
                  Phone Number *
                </label>
                <input
                  id="cust-phone"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98220 XXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                />
              </div>

              {orderType === 'Delivery' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1" htmlFor="cust-addr">
                    Delivery Address *
                  </label>
                  <textarea
                    id="cust-addr"
                    required
                    rows="2"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Building name, flat number, street / landmark in Pune"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-crust-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ember-500"
                  />
                </div>
              )}
            </div>

            {/* DEMO Payment Option Selection */}
            <div className="space-y-3 pt-2 border-t border-crust-200">
              <h3 className="font-serif-heading font-bold text-base text-neutral-900">
                Demo Payment Method
              </h3>

              <div className="space-y-2">
                <label className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'UPI' ? 'border-ember-600 bg-ember-50/60' : 'border-crust-300 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="text-ember-700 focus:ring-ember-500"
                  />
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-neutral-800">Demo UPI (GPay, PhonePe, Paytm QR)</span>
                </label>

                <label className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'Card' ? 'border-ember-600 bg-ember-50/60' : 'border-crust-300 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={paymentMethod === 'Card'}
                    onChange={() => setPaymentMethod('Card')}
                    className="text-ember-700 focus:ring-ember-500"
                  />
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-neutral-800">Demo Credit / Debit Card</span>
                </label>

                <label className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'Cash' ? 'border-ember-600 bg-ember-50/60' : 'border-crust-300 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="Cash"
                    checked={paymentMethod === 'Cash'}
                    onChange={() => setPaymentMethod('Cash')}
                    className="text-ember-700 focus:ring-ember-500"
                  />
                  <Banknote className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-neutral-800">Demo Cash on Delivery / Counter</span>
                </label>
              </div>
            </div>

            {/* Order Price Breakdown */}
            <div className="pt-4 border-t border-crust-200 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-neutral-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>GST (5%):</span>
                <span className="font-semibold text-neutral-900">₹{tax}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Delivery Fee:</span>
                <span className="font-semibold text-neutral-900">
                  {activeDeliveryFee > 0 ? `₹${activeDeliveryFee}` : 'FREE (Pickup)'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-neutral-900 pt-2 border-t border-crust-200">
                <span>Total Amount:</span>
                <span className="text-ember-900 text-lg">₹{grandTotal}</span>
              </div>
            </div>

            {/* Place Demo Order CTA */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-ember-700 to-ember-800 hover:from-ember-600 hover:to-ember-700 text-white font-bold py-4 rounded-xl shadow-warm hover:shadow-warm-lg transition-all text-sm flex items-center justify-center space-x-2"
            >
              <span>Place Demo Order (₹{grandTotal})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}
