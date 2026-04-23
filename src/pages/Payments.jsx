import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
  ShoppingBag,
  IndianRupee,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ChevronDown,
  Calendar,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { mockOrders } from '../data/mockOrders';

const StatCard = ({ title, value, trend, trendLabel, icon: Icon, iconBg, isAlert }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{value}</h3>
      {isAlert ? (
        <p className="text-xs font-semibold text-red-500">{trendLabel}</p>
      ) : (
        <div className="flex items-center gap-1.5">
          <span className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded-full ${
            trend >= 0 ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'
          }`}>
            {trend >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(trend)}%
          </span>
          <span className="text-xs text-gray-400 font-medium">{trendLabel}</span>
        </div>
      )}
    </div>
    <div className={`p-2.5 rounded-xl ${iconBg}`}>
      <Icon className="w-5 h-5" />
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Success: 'bg-green-50 text-green-700 border border-green-200',
    Pending: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    Failed:  'bg-red-50 text-red-600 border border-red-200',
  };
  const dot = {
    Success: 'bg-green-500',
    Pending: 'bg-yellow-500',
    Failed:  'bg-red-500',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[status]}`}></span>
      {status}
    </span>
  );
};

const CustomerAvatar = ({ src, initials, bg }) =>
  src ? (
    <img src={src} alt="customer" className="w-9 h-9 rounded-full object-cover border border-gray-200" />
  ) : (
    <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center text-white text-xs font-bold border border-gray-200`}>
      {initials}
    </div>
  );

const OrderRow = ({ id, customer, manual, manualType, amount, status, date, time, onClick }) => (
  <tr 
    onClick={onClick}
    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group cursor-pointer"
  >
    <td className="py-4 px-4">
      <span className="text-sm font-bold text-gray-700">{id}</span>
    </td>
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <CustomerAvatar src={customer.avatar} initials={customer.initials} bg={customer.bg} />
        <div>
          <p className="text-sm font-bold text-gray-900 leading-tight">{customer.name}</p>
          <p className="text-xs text-gray-400 font-medium">{customer.email}</p>
        </div>
      </div>
    </td>
    <td className="py-4 px-4 max-w-[180px]">
      <p className="text-sm font-semibold text-gray-800 truncate">{manual}</p>
      <p className="text-xs text-gray-400 font-medium">{manualType}</p>
    </td>
    <td className="py-4 px-4 whitespace-nowrap">
      <span className="text-sm font-bold text-gray-900">₹{amount.toLocaleString()}</span>
    </td>
    <td className="py-4 px-4">
      <StatusBadge status={status} />
    </td>
    <td className="py-4 px-4 whitespace-nowrap">
      <p className="text-sm font-medium text-gray-600">{date}</p>
      <p className="text-xs text-gray-400 font-medium">{time}</p>
    </td>
    <td className="py-4 px-4 text-right">
      <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100">
        <MoreVertical className="w-4 h-4" />
      </button>
    </td>
  </tr>
);

const Payments = () => {
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [dateRange, setDateRange] = useState('All Time');
  const navigate = useNavigate();

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Customer Name', 'Email', 'Manual', 'Amount', 'Status', 'Date', 'Time'];
    const csvData = mockOrders.map(order => [
      order.id,
      order.customer.name,
      order.customer.email,
      `"${order.manual.replace(/"/g, '""')}"`, // Escape quotes
      order.amount,
      order.status,
      order.date,
      order.time
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `skyes_orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to parse Oct 24, 2023 format
  const parseDate = (dateStr) => {
    return new Date(dateStr);
  };

  // Filter orders based on status and date range
  const filteredOrders = mockOrders.filter(order => {
    const statusMatch = statusFilter === 'All Status' || order.status === statusFilter;
    
    // For mock purposes, we'll treat "Today" as Oct 24, 2023
    const orderDate = parseDate(order.date);
    const today = new Date('Oct 24, 2023');
    let dateMatch = true;

    if (dateRange === 'Today') {
      dateMatch = order.date === 'Oct 24, 2023';
    } else if (dateRange === 'Yesterday') {
      dateMatch = order.date === 'Oct 23, 2023';
    } else if (dateRange === 'Last 7 Days') {
      // All mock data falls within 7 days of Oct 24
      dateMatch = true; 
    }

    return statusMatch && dateMatch;
  });

  // Calculate dynamic stats
  const stats = {
    totalOrders: filteredOrders.length,
    totalRevenue: filteredOrders.filter(o => o.status === 'Success').reduce((acc, o) => acc + o.amount, 0),
    pendingOrders: filteredOrders.filter(o => o.status === 'Pending').length,
    failedPayments: filteredOrders.filter(o => o.status === 'Failed').length
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 ml-72">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="text-base font-bold text-gray-900">Payments &amp; Orders</h2>
          
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all cursor-pointer shadow-sm group"
          >
            <div className="p-1 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-100 transition-colors">
              <Download className="w-3.5 h-3.5" />
            </div>
            Export as CSV
          </button>
        </header>

        <main className="p-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Total Orders" 
              value={stats.totalOrders.toLocaleString()} 
              trend={12.5} 
              trendLabel="vs last period" 
              icon={ShoppingBag} 
              iconBg="bg-red-50 text-red-600" 
            />
            <StatCard 
              title="Total Revenue" 
              value={`₹${stats.totalRevenue.toLocaleString()}`} 
              trend={8.2} 
              trendLabel="vs last period" 
              icon={IndianRupee} 
              iconBg="bg-green-50 text-green-600" 
            />
            <StatCard 
              title="Pending Orders" 
              value={stats.pendingOrders.toString()} 
              trend={-2.4} 
              trendLabel="vs last period" 
              icon={Clock} 
              iconBg="bg-orange-50 text-orange-500" 
            />
            <StatCard 
              title="Failed Payments" 
              value={stats.failedPayments.toString()} 
              trendLabel="Requires attention" 
              icon={AlertTriangle} 
              iconBg="bg-red-50 text-red-500" 
              isAlert 
            />
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table Toolbar */}
            <div className="px-4 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="shrink-0">
                <span className="text-sm font-bold text-gray-900 mr-2">
                  {statusFilter === 'All Status' ? 'All Orders' : `${statusFilter} Orders`}
                </span>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                  {filteredOrders.length} total
                </span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Order ID..."
                    className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-600 outline-none focus:border-red-400 w-36 transition-all"
                  />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 outline-none cursor-pointer"
                  >
                    <option>All Status</option>
                    <option>Success</option>
                    <option>Pending</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={dateRange}
                    onChange={e => setDateRange(e.target.value)}
                    className="appearance-none pl-8 pr-8 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <option>All Time</option>
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 Days</option>
                  </select>
                  <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    {['ORDER ID', 'CUSTOMER NAME', 'MANUAL', 'AMOUNT', 'STATUS', 'DATE', 'ACTION'].map(col => (
                      <th key={col} className="py-4 px-4 text-[10px] uppercase tracking-wider font-bold text-gray-400">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                      <OrderRow 
                        key={order.id} 
                        {...order} 
                        onClick={() => navigate(`/order-detail/${order.id.replace('#', '')}`)} 
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-20 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                            <Search className="w-6 h-6 text-gray-300" />
                          </div>
                          <p className="text-sm font-bold text-gray-900">No orders found</p>
                          <p className="text-xs text-gray-400 font-medium mt-1">Try adjusting your filters or date range</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Showing <span className="font-bold text-gray-900">{filteredOrders.length > 0 ? 1 : 0}</span> to{' '}
                <span className="font-bold text-gray-900">{filteredOrders.length}</span> of{' '}
                <span className="font-bold text-gray-900">{filteredOrders.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 cursor-pointer transition-colors" disabled>
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <div className="flex gap-1">
                  {[1, 2, 3].map(page => (
                    <button key={page} className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${
                      page === 1 ? 'bg-red-600 text-white shadow-md shadow-red-100' : 'text-gray-500 border border-gray-200 hover:bg-gray-50'
                    }`}>
                      {page}
                    </button>
                  ))}
                  <span className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">...</span>
                  <button className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-gray-500 border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    125
                  </button>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payments;
