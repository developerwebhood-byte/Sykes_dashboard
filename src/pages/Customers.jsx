import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
  Users,
  UserCheck,
  UserPlus,
  BarChart3,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Calendar,
  ChevronDown
} from 'lucide-react';

const CustomersStatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      {trend && (
        <span className={`text-xs font-bold ${trend > 0 ? 'text-green-600' : 'text-red-500'} mt-1 inline-block`}>
          {trend > 0 ? '+' : ''}{trend}% vs last month
        </span>
      )}
    </div>
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

const CustomerStatusBadge = ({ status }) => {
  const isActive = status === 'Active';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
      isActive ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
      {status}
    </span>
  );
};

const CustomerRow = ({ customer }) => (
  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
          <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 leading-tight">{customer.name}</p>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <Mail className="w-3 h-3" />
            <span>{customer.email}</span>
          </div>
        </div>
      </div>
    </td>
    <td className="py-4 px-4">
      <div className="flex items-center gap-1 text-sm text-gray-600 font-medium">
        <MapPin className="w-3.5 h-3.5 text-gray-400" />
        {customer.location}
      </div>
    </td>
    <td className="py-4 px-4">
      <span className="text-sm font-bold text-gray-900">{customer.orders}</span>
    </td>
    <td className="py-4 px-4">
      <span className="text-sm font-bold text-gray-900">₹{customer.totalSpent.toLocaleString()}</span>
    </td>
    <td className="py-4 px-4 text-sm font-medium text-gray-500">
      {customer.joinDate}
    </td>
    <td className="py-4 px-4">
      <CustomerStatusBadge status={customer.status} />
    </td>
    <td className="py-4 px-4 text-right">
      <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer">
        <MoreVertical className="w-4 h-4" />
      </button>
    </td>
  </tr>
);

const Customers = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const customerData = [
    {
      id: 1,
      name: 'Sarah Connor',
      email: 'sarah.c@skyenet.com',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      location: 'New Delhi, India',
      orders: 12,
      totalSpent: 12450,
      joinDate: 'Jan 12, 2023',
      status: 'Active'
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatar: 'https://i.pravatar.cc/150?u=john',
      location: 'Mumbai, India',
      orders: 5,
      totalSpent: 4500,
      joinDate: 'Feb 24, 2023',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Alex Hunter',
      email: 'alex.h@outlook.com',
      avatar: 'https://i.pravatar.cc/150?u=alex',
      location: 'Bangalore, India',
      orders: 1,
      totalSpent: 1200,
      joinDate: 'Mar 05, 2023',
      status: 'Blocked'
    },
    {
      id: 4,
      name: 'Priyanka Sharma',
      email: 'priyanka.s@rediff.com',
      avatar: 'https://i.pravatar.cc/150?u=priyanka',
      location: 'Pune, India',
      orders: 24,
      totalSpent: 35600,
      joinDate: 'Dec 15, 2022',
      status: 'Active'
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 ml-72">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-8 sticky top-0 z-40">
          <h2 className="text-base font-bold text-gray-900">Customers</h2>
        </header>

        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <CustomersStatCard title="Total Customers" value="4,821" icon={Users} color="bg-blue-50 text-blue-600" trend={12} />
            <CustomersStatCard title="Active Now" value="1,124" icon={UserCheck} color="bg-green-50 text-green-600" trend={5} />
            <CustomersStatCard title="Total New" value="450" icon={UserPlus} color="bg-purple-50 text-purple-600" trend={-2} />
            <CustomersStatCard title="Avg Retention" value="92%" icon={BarChart3} color="bg-orange-50 text-orange-600" trend={8} />
          </div>

          {/* Customer Table List */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-gray-900">Registered Members</span>
                <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">4,821 total</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email..."
                    className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-600 placeholder-gray-400 outline-none focus:border-blue-300 w-48 transition-all"
                  />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 outline-none cursor-pointer hover:border-blue-200 transition-colors"
                  >
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Blocked</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 cursor-pointer">
                  <UserPlus className="w-3.5 h-3.5" />
                  Add New
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    {['Customer Name', 'Location', 'Orders', 'Total Spent', 'Join Date', 'Status', ''].map((head, i) => (
                      <th key={i} className="py-4 px-4 text-[10px] uppercase tracking-wider font-bold text-gray-400">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customerData.map(customer => (
                    <CustomerRow key={customer.id} customer={customer} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Showing <span className="font-bold text-gray-900">1</span> to <span className="font-bold text-gray-900">4</span> of <span className="font-bold text-gray-900">4,821</span> results
              </p>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-gray-400 border border-gray-100 rounded-lg opacity-50 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <div className="flex gap-1.5">
                  <button className="w-9 h-9 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-100">1</button>
                  <button className="w-9 h-9 border border-gray-100 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">2</button>
                  <button className="w-9 h-9 border border-gray-100 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">3</button>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-gray-600 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
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

export default Customers;
