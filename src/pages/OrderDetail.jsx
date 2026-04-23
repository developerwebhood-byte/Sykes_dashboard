import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  ArrowLeft, 
  Bell, 
  Mail, 
  Download, 
  Calendar, 
  IndianRupee, 
  CreditCard,
  FileText,
  Link as LinkIcon,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  User,
  MapPin,
  Phone,
  Mail as MailIcon,
  MoreVertical,
  Check
} from 'lucide-react';

import { mockOrders } from '../data/mockOrders';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expiryDate, setExpiryDate] = React.useState('');
  const [isExtending, setIsExtending] = React.useState(false);

  // Find the specific order from mockOrders
  const order = mockOrders.find(o => o.id === `#${id}` || o.id === id);

  React.useEffect(() => {
    if (order) {
      // Logic to calculate 24 hours after placedOn
      // order.placedOn is like "Oct 24, 2023 at 14:30 PM"
      const parts = order.placedOn.split(' at ');
      if (parts.length === 2) {
        const baseDate = new Date(parts[0]);
        const expiry = new Date(baseDate.getTime() + (24 * 60 * 60 * 1000));
        const formattedExpiry = expiry.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' at ' + parts[1];
        setExpiryDate(formattedExpiry);
      }
    }
  }, [order]);

  if (!order) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <div className="flex-1 ml-72 flex flex-col items-center justify-center p-8">
          <div className="text-center p-12 bg-white rounded-3xl border border-slate-100 shadow-xl max-w-md">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Order Not Found</h2>
            <p className="text-slate-500 mb-8 font-medium">The order ID "#{id}" could not be found in our records. Please check the ID or go back to the payments list.</p>
            <button 
              onClick={() => navigate('/payments')}
              className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all cursor-pointer"
            >
              Back to Payments
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 ml-72">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/payments')}
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer text-slate-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-800">Order {order.id}</h2>
              <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold border border-green-100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                {order.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
              <Mail className="w-4 h-4" />
              Resend Receipt
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-800 rounded-xl hover:bg-slate-900 transition-all cursor-pointer shadow-sm shadow-slate-200">
              <Download className="w-4 h-4" />
              Download Invoice
            </button>
          </div>
        </header>

        <main className="p-8 max-w-7xl mx-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</span>
                </div>
                <p className="text-xs font-semibold text-slate-400 mb-1">Placed on</p>
                <h4 className="text-sm font-bold text-slate-800">{order.placedOn}</h4>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-green-50 rounded-xl text-green-600">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
                </div>
                <p className="text-xs font-semibold text-slate-400 mb-1">Order Amount</p>
                <h4 className="text-xl font-black text-slate-800">₹{order.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h4>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-red-50 rounded-xl text-red-600">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Method</span>
                </div>
                <p className="text-xs font-semibold text-slate-400 mb-1">Payment via {order.paymentGateway}</p>
                <h4 className="text-sm font-bold text-slate-800">{order.paymentMethod}</h4>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="col-span-8 space-y-8">
              {/* Purchased Manuals */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <FileText className="w-4 h-4 text-slate-400" />
                    Purchased Manuals
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                    {order.items.length} Item
                  </span>
                </div>
                <div className="p-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 group hover:border-slate-200 transition-all">
                      <div className="w-20 h-24 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-2 shadow-sm overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-800 mb-1">{item.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                          <span>Category: {item.category}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span>Brand: {item.brand}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-black text-slate-800">₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                            <span className="text-[10px] font-bold text-slate-400">Qty: {item.qty}</span>
                          </div>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all cursor-pointer shadow-sm">
                            <LinkIcon className="w-3 h-3" />
                            Copy Link
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-8 border-t border-slate-100 pt-6 space-y-3">
                    <div className="flex justify-between text-sm font-semibold text-slate-500">
                      <span>Subtotal</span>
                      <span className="text-slate-800">₹{order.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-slate-500">
                      <span>Discount (None)</span>
                      <span className="text-slate-800">₹0.00</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-slate-500">
                      <span>Tax (GST 18%)</span>
                      <span className="text-slate-800">₹{(order.amount * 0.18).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-slate-100">
                      <span className="text-base font-black text-slate-800 font-sans">Total</span>
                      <span className="text-base font-black text-slate-800">₹{(order.amount * 1.18).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <User className="w-4 h-4 text-slate-400" />
                    Customer Details
                  </h3>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-5 mb-8">
                    <img src={order.customer.avatar} alt={order.customer.name} className="w-16 h-16 rounded-full border-4 border-slate-50 shadow-sm" />
                    <div>
                      <h4 className="text-lg font-black text-slate-800">{order.customer.name}</h4>
                      <p className="text-xs text-slate-400 font-bold">Customer since {order.customer.customerSince}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-12">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Contact Info</p>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                          <MailIcon className="w-4 h-4 text-slate-400" />
                          {order.customer.email}
                        </div>
                        <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                          <Phone className="w-4 h-4 text-slate-400" />
                          {order.customer.phone}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Billing Address</p>
                      <div className="flex items-start gap-3 text-sm font-semibold text-slate-600 leading-relaxed">
                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                        {order.customer.billingAddress}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <FileText className="w-4 h-4 text-slate-400" />
                    Internal Notes
                  </h3>
                </div>
                <div className="p-8 space-y-4">
                  <textarea 
                    className="w-full h-32 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 focus:outline-none focus:border-red-400 transition-all resize-none placeholder:text-slate-400 font-medium"
                    placeholder="Add a private note about this order (only visible to admins)..."
                  ></textarea>
                  <div className="flex justify-end">
                    <button className="px-8 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-all cursor-pointer shadow-sm shadow-slate-200">
                      Save Note
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-4 space-y-8">
              {/* Timeline */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Clock className="w-4 h-4 text-slate-400" />
                    Timeline
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                    {order.timeline.map((item, index) => (
                      <div key={index} className="relative pl-8">
                        <div className={`absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full border-4 border-white shadow-sm ${item.color}`}></div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 leading-tight mb-1">{item.status}</p>
                          <p className="text-xs text-slate-400 font-semibold mb-1">{item.description}</p>
                          <p className="text-[10px] text-slate-400 font-bold">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Link Expiration Box */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden border-l-4 border-l-amber-400">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <LinkIcon className="w-4 h-4 text-amber-500" />
                    Download Link Status
                  </h3>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-[9px] font-black uppercase tracking-widest">Expires Soon</span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
                    The customer's download link is set to expire <span className="text-slate-800 font-bold">24 hours</span> after the order was placed.
                  </p>
                  
                  <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100 mb-6">
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Expiration Date & Time</p>
                    <p className="text-sm font-bold text-slate-800">{expiryDate}</p>
                  </div>

                  <button 
                    onClick={() => setIsExtending(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-sm"
                  >
                    <Calendar className="w-4 h-4 text-slate-400" />
                    Extend Link Validity
                  </button>
                </div>
              </div>

              {/* Fraud Analysis */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                    Fraud Analysis
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 border border-green-100">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{order.fraudAnalysis.risk}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{order.fraudAnalysis.evaluation}</p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {order.fraudAnalysis.checks.map((check, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        {check.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Extend Expiry Modal */}
      {isExtending && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">Extend Link Validity</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">Select a new date and time for the download link to expire.</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">New Expiry Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-red-500"
                  defaultValue="2023-10-26"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">New Expiry Time</label>
                <input 
                  type="time" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-red-500"
                  defaultValue="14:30"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setIsExtending(false);
                  setExpiryDate("Oct 26, 2023 at 14:30 PM"); // Mock update
                }}
                className="w-full py-3.5 bg-slate-800 text-white rounded-2xl text-sm font-black hover:bg-slate-900 transition-all shadow-xl shadow-slate-100 cursor-pointer"
              >
                Update Expiration
              </button>
              <button 
                onClick={() => setIsExtending(false)}
                className="w-full py-3.5 text-sm font-black text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
