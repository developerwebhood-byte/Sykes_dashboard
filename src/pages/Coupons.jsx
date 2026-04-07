import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Search, 
  Plus, 
  Pencil, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const CreateCouponView = ({ onBack }) => {
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('Percentage (%)');
  const [discountValue, setDiscountValue] = useState('');
  const [usageLimit, setUsageLimit] = useState('Unlimited uses');
  const [applyTo, setApplyTo] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const previewCode = code.toUpperCase() || 'COUPONCODE';
  const previewDiscount = discountValue
    ? discountType.includes('%') ? `${discountValue}% off all manuals` : `₹${discountValue} off all manuals`
    : '0% off all manuals';
  const previewLimit = usageLimit === 'Unlimited uses' ? 'Unlimited' : usageLimit;
  const previewExpiry = expiryDate || 'No expiry';
  const previewAppliesTo = applyTo === 'all' ? 'All Manuals' : 'Specific Manuals';

  return (
    <div className="flex-1 ml-72">
      <header className="h-16 bg-white border-b border-gray-100 flex items-center px-8 sticky top-0 z-40">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer font-bold text-base transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Create Coupon
        </button>
      </header>

      <main className="p-8">
        <div className="flex gap-6 items-start max-w-5xl mx-auto">
          {/* Form Card */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Coupon Details</h3>

            <div className="space-y-5">
              {/* Coupon Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Coupon Code <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={code}
                    onChange={e => setCode(e.target.value.toUpperCase())}
                    placeholder="E.G., SUMMER20"
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all uppercase tracking-wider font-mono"
                  />
                  <button
                    onClick={() => setCode(generateCode())}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Generate
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1.5 font-medium">Customers will enter this code at checkout.</p>
              </div>

              {/* Discount Type + Value */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Discount Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={discountType}
                    onChange={e => setDiscountType(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 bg-white cursor-pointer transition-all"
                  >
                    <option>Percentage (%)</option>
                    <option>Flat (₹)</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Discount Value <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={discountValue}
                    onChange={e => setDiscountValue(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>
              </div>

              {/* Usage Limit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Usage Limit</label>
                <select
                  value={usageLimit}
                  onChange={e => setUsageLimit(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 bg-white cursor-pointer transition-all"
                >
                  <option>Unlimited uses</option>
                  <option>One-time use</option>
                  <option>100</option>
                  <option>500</option>
                  <option>1000</option>
                </select>
              </div>

              {/* Apply To */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">Apply To</label>
                <div className="space-y-2">
                  {[['all', 'All Manuals'], ['specific', 'Specific Manuals']].map(([val, label]) => (
                    <label key={val} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="applyTo"
                        value={val}
                        checked={applyTo === val}
                        onChange={() => setApplyTo(val)}
                        className="w-4 h-4 accent-purple-600 cursor-pointer"
                      />
                      <span className={`text-sm font-semibold transition-colors ${applyTo === val ? 'text-gray-800' : 'text-gray-500 group-hover:text-gray-700'}`}>
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expiry Date</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={e => setExpiryDate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all cursor-pointer"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={onBack} className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-800 cursor-pointer transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-all shadow-md shadow-purple-100 cursor-pointer">
                  Save Coupon
                </button>
              </div>
            </div>
          </div>

          {/* Preview Summary */}
          <div className="w-64 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Preview Summary</p>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center mb-5">
              <p className="text-lg font-black text-purple-700 tracking-widest font-mono mb-1">{previewCode}</p>
              <p className="text-xs font-semibold text-gray-500">{previewDiscount}</p>
            </div>
            <div className="space-y-3">
              {[
                ['Status', <span key="s" className="text-green-600 font-bold text-sm">Active</span>],
                ['Applies to', previewAppliesTo],
                ['Usage Limit', previewLimit],
                ['Valid until', previewExpiry],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">{label}</span>
                  <span className="text-xs font-bold text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-green-50 text-green-700 border border-green-200',
    Expired: 'bg-gray-100 text-gray-500 border border-gray-200',
    Inactive: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  };
  const dotStyles = {
    Active: 'bg-green-500',
    Expired: 'bg-gray-400',
    Inactive: 'bg-yellow-500',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`}></span>
      {status}
    </span>
  );
};

const CouponCode = ({ code, expired }) => (
  <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold border tracking-widest ${
    expired 
      ? 'text-gray-400 border-gray-200 bg-gray-50' 
      : 'text-purple-700 border-purple-200 bg-purple-50'
  }`}>
    {code}
  </span>
);

const CouponRow = ({ code, discount, discountType, usageType, used, limit, status, expiry, onToggle, selected }) => {
  const isExpired = status === 'Expired';
  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${selected ? 'bg-purple-50/20' : ''}`}>
      <td className="py-4 px-4">
        <input 
          type="checkbox" 
          checked={selected} 
          onChange={onToggle}
          className="w-4 h-4 border-gray-300 rounded cursor-pointer accent-purple-600" 
        />
      </td>
      <td className="py-4 px-4">
        <CouponCode code={code} expired={isExpired} />
      </td>
      <td className="py-4 px-4">
        <span className={`text-sm font-bold ${isExpired ? 'text-gray-400' : 'text-gray-900'}`}>{discount}</span>
        <span className={`text-xs ml-1.5 font-medium ${isExpired ? 'text-gray-400' : 'text-gray-400'}`}>({discountType})</span>
      </td>
      <td className="py-4 px-4">
        <span className={`text-sm font-semibold ${isExpired ? 'text-gray-400' : 'text-gray-700'}`}>{usageType}</span>
      </td>
      <td className="py-4 px-4">
        <p className={`text-sm font-bold leading-tight ${isExpired ? 'text-gray-400' : 'text-gray-900'}`}>{used.toLocaleString()}</p>
        <p className={`text-xs font-medium ${isExpired ? 'text-gray-400' : 'text-gray-400'}`}>/ {limit}</p>
      </td>
      <td className="py-4 px-4">
        <StatusBadge status={status} />
      </td>
      <td className="py-4 px-4">
        <span className={`text-sm font-medium ${isExpired ? 'text-gray-400' : 'text-gray-600'}`}>{expiry}</span>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center justify-end gap-1">
          {!isExpired && (
            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer">
              <Pencil className="w-4 h-4" />
            </button>
          )}
          <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

const Coupons = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const coupons = [
    { id: 1, code: 'SUMMER2624', discount: '20%', discountType: 'Percentage', usageType: 'Multiple', used: 145, limit: 'Unlimited', status: 'Active', expiry: 'Aug 31, 2024' },
    { id: 2, code: 'WELCOME50', discount: '₹50.00', discountType: 'Flat', usageType: 'One-time', used: 892, limit: '1000', status: 'Active', expiry: 'Dec 31, 2024' },
    { id: 3, code: 'BLACKFRIDAY', discount: '40%', discountType: 'Percentage', usageType: 'Multiple', used: 1240, limit: 'Unlimited', status: 'Expired', expiry: 'Nov 30, 2023' },
  ];

  const toggleRow = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const toggleAll = () => {
    setSelectedIds(prev => prev.length === coupons.length ? [] : coupons.map(c => c.id));
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      {showCreate ? (
        <CreateCouponView onBack={() => setShowCreate(false)} />
      ) : (
      <div className="flex-1 ml-72">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-8 sticky top-0 z-40">
          <h2 className="text-base font-bold text-gray-900">Coupons</h2>
        </header>

        <main className="p-6">
          {/* Sub-header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-medium text-gray-500">Manage your discount codes and promotions</p>
            <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-all shadow-md shadow-purple-100 cursor-pointer">
              <Plus className="w-4 h-4" />
              Create Coupon
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Search & Filters */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="relative max-w-xs flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search coupons by code..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 outline-none cursor-pointer hover:border-purple-300 focus:border-purple-400"
                  >
                    <option>All Statuses</option>
                    <option>Active</option>
                    <option>Expired</option>
                    <option>Inactive</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 outline-none cursor-pointer hover:border-purple-300 focus:border-purple-400"
                  >
                    <option>All Types</option>
                    <option>Percentage</option>
                    <option>Flat</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="py-4 px-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === coupons.length}
                        onChange={toggleAll}
                        className="w-4 h-4 border-gray-300 rounded cursor-pointer accent-purple-600"
                      />
                    </th>
                    {['COUPON CODE', 'DISCOUNT', 'USAGE LIMIT', 'USED', 'STATUS', 'EXPIRY DATE', 'ACTIONS'].map(col => (
                      <th key={col} className="py-4 px-4 text-[10px] uppercase tracking-wider font-bold text-gray-400 whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coupons.map(coupon => (
                    <CouponRow
                      key={coupon.id}
                      {...coupon}
                      selected={selectedIds.includes(coupon.id)}
                      onToggle={() => toggleRow(coupon.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Showing <span className="font-bold text-gray-900">1</span> to{' '}
                <span className="font-bold text-gray-900">3</span> of{' '}
                <span className="font-bold text-gray-900">12</span> results
              </p>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 cursor-pointer transition-colors" disabled>
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                {[1, 2].map(page => (
                  <button
                    key={page}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${
                      page === 1 ? 'bg-purple-600 text-white shadow-md shadow-purple-100' : 'text-gray-500 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      )}
    </div>
  );
};

export default Coupons;

