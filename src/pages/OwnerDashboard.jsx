import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, LogOut, Search, Filter, TrendingUp, ShoppingBag, 
  Clock, CheckCircle, AlertCircle, RefreshCw, ChevronDown, User, 
  Pizza, ArrowUpRight 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { sampleOrders, samplePayments } from '../data/orders';
import { restaurantData } from '../data/restaurant';

export default function OwnerDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const { demoOrders } = useCart();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/owner-login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Merge sample pre-filled orders with any real-time demo orders submitted in this browser session
  const [orders, setOrders] = useState(() => {
    return [...demoOrders, ...sampleOrders];
  });

  // Re-sync if demoOrders changes
  useEffect(() => {
    setOrders([...demoOrders, ...sampleOrders]);
  }, [demoOrders]);

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'payments'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Order status updater
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(ord => ord.id === orderId ? { ...ord, status: newStatus } : ord)
    );
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchSearch = searchTerm === '' ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.phone.includes(searchTerm);

      const matchStatus = statusFilter === 'All' || order.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const pendingOrdersCount = orders.filter(ord => ord.status === 'Pending' || ord.status === 'Preparing').length;
  const completedOrdersCount = orders.filter(ord => ord.status === 'Delivered' || ord.status === 'Completed').length;

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header & Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-crust-200">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-ember-800 to-ember-600 text-white flex items-center justify-center shadow-warm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-neutral-900">
                SuBakes Owner Dashboard
              </h1>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Demo Mode
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Live orders, kitchen management & payments ledger for Sadashiv Peth branch
            </p>
          </div>
        </div>

        <button
          onClick={() => { logout(); navigate('/owner-login'); }}
          className="inline-flex items-center space-x-2 bg-crust-200 hover:bg-rose-50 text-neutral-800 hover:text-rose-700 font-bold px-4 py-2.5 rounded-xl border border-crust-300 transition-colors text-xs self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Orders */}
        <div className="bg-crust-50 rounded-2xl p-5 border border-crust-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Total Orders</p>
            <h3 className="font-serif-heading text-3xl font-bold text-neutral-900 mt-1">{orders.length}</h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">16 Sample + {demoOrders.length} Demo Session</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-ember-100 text-ember-700 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Total Sales Revenue */}
        <div className="bg-crust-50 rounded-2xl p-5 border border-crust-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Total Sales Revenue</p>
            <h3 className="font-serif-heading text-3xl font-bold text-neutral-900 mt-1">₹{totalRevenue.toLocaleString()}</h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Includes active orders</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Pending & In-Kitchen */}
        <div className="bg-crust-50 rounded-2xl p-5 border border-crust-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Active In-Kitchen</p>
            <h3 className="font-serif-heading text-3xl font-bold text-amber-700 mt-1">{pendingOrdersCount}</h3>
            <p className="text-[11px] text-amber-600 font-medium mt-1">Needs attention</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-crust-50 rounded-2xl p-5 border border-crust-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Completed / Delivered</p>
            <h3 className="font-serif-heading text-3xl font-bold text-neutral-900 mt-1">{completedOrdersCount}</h3>
            <p className="text-[11px] text-neutral-500 font-medium mt-1">Successfully fulfilled</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Tabs Switcher: Orders vs Payment History */}
      <div className="flex border-b border-crust-200 space-x-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'orders'
              ? 'border-ember-700 text-ember-800'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>All Orders Stream ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-3 border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'payments'
              ? 'border-ember-700 text-ember-800'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Payment History Ledger ({samplePayments.length + demoOrders.length})</span>
        </button>
      </div>

      {/* TAB 1: ORDERS STREAM */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-crust-50 p-4 rounded-2xl border border-crust-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search order ID, customer, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-crust-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-ember-500"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-neutral-500" />
              <span className="text-xs text-neutral-600 font-semibold">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-crust-300 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ember-500"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-crust-50 rounded-2xl border border-crust-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-crust-100 border-b border-crust-200 text-neutral-700 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Order ID & Source</th>
                    <th className="py-3 px-4">Customer & Type</th>
                    <th className="py-3 px-4">Dishes & Quantity</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Status & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-crust-200">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-crust-100/60 transition-colors">
                      
                      {/* ID & Source */}
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-neutral-900 block">{ord.id}</span>
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold mt-0.5 ${
                          ord.isDemoPlaced 
                            ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                            : 'bg-neutral-200 text-neutral-700'
                        }`}>
                          {ord.dataLabel || "Sample data"}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-3 px-4">
                        <p className="font-bold text-neutral-900">{ord.customer.name}</p>
                        <p className="text-neutral-500 text-[11px]">{ord.customer.phone}</p>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-crust-200 text-neutral-700 mt-0.5 font-medium">
                          {ord.customer.type}
                        </span>
                      </td>

                      {/* Items */}
                      <td className="py-3 px-4 max-w-xs">
                        <ul className="space-y-0.5">
                          {ord.items.map((it, idx) => (
                            <li key={idx} className="text-neutral-800 truncate">
                              <strong>{it.quantity}x</strong> {it.name}
                            </li>
                          ))}
                        </ul>
                      </td>

                      {/* Total */}
                      <td className="py-3 px-4 font-bold text-neutral-900 whitespace-nowrap">
                        ₹{ord.total}
                        <span className="block text-[10px] text-neutral-500 font-normal">{ord.paymentMethod}</span>
                      </td>

                      {/* Time */}
                      <td className="py-3 px-4 text-neutral-600 whitespace-nowrap">
                        {ord.time}
                      </td>

                      {/* Status Dropdown Control */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                            ord.status === 'Pending' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                            ord.status === 'Preparing' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                            ord.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-900 border-purple-300' :
                            'bg-emerald-100 text-emerald-900 border-emerald-300'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="p-8 text-center text-xs text-neutral-500">
                No orders match your search criteria.
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: PAYMENT HISTORY LEDGER */}
      {activeTab === 'payments' && (
        <div className="bg-crust-50 rounded-2xl border border-crust-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-crust-100 border-b border-crust-200 flex items-center justify-between text-xs">
            <span className="font-bold text-neutral-800">Verified Payment Records Ledger</span>
            <span className="text-neutral-500">Plainly labeled Sample Data & Demo Orders</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-crust-100 border-b border-crust-200 text-neutral-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Payment ID</th>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Data Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-crust-200">
                {/* Real-time placed demo orders payments */}
                {demoOrders.map((ord) => (
                  <tr key={`pay-${ord.id}`} className="bg-purple-50/40 hover:bg-purple-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-purple-900">PAY-{ord.id}</td>
                    <td className="py-3 px-4 font-mono text-neutral-800">{ord.id}</td>
                    <td className="py-3 px-4 font-bold text-neutral-900">{ord.customer.name}</td>
                    <td className="py-3 px-4 text-neutral-700">{ord.paymentMethod}</td>
                    <td className="py-3 px-4 font-bold text-emerald-800">₹{ord.total}</td>
                    <td className="py-3 px-4">
                      <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded text-[10px] font-bold">
                        {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-600">{ord.time}</td>
                    <td className="py-3 px-4">
                      <span className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                        Demo session
                      </span>
                    </td>
                  </tr>
                ))}

                {/* Pre-filled Sample Payments */}
                {samplePayments.map((pay) => (
                  <tr key={pay.paymentId} className="hover:bg-crust-100/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-neutral-900">{pay.paymentId}</td>
                    <td className="py-3 px-4 font-mono text-neutral-800">{pay.orderId}</td>
                    <td className="py-3 px-4 font-bold text-neutral-900">{pay.customerName}</td>
                    <td className="py-3 px-4 text-neutral-700">{pay.method}</td>
                    <td className="py-3 px-4 font-bold text-neutral-900">₹{pay.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        pay.status === 'Paid' 
                          ? 'bg-emerald-100 text-emerald-900' 
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {pay.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-600">{pay.date}</td>
                    <td className="py-3 px-4">
                      <span className="bg-neutral-200 text-neutral-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
                        {pay.dataLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
