import React from 'react';
import Sidebar from '../components/Sidebar';
import { 
  IndianRupee, 
  ShoppingCart, 
  Users, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';

const StatCard = ({ title, value, change, isPositive, icon: Icon, iconBg }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`${iconBg} p-2.5 rounded-xl`}>
        <Icon className="w-5 h-5 text-current" />
      </div>
    </div>
    <div className="flex items-center gap-1">
      <div className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
        isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
      }`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
        {change}
      </div>
      <span className="text-xs text-gray-400 font-medium">vs last month</span>
    </div>
  </div>
);

const LineChartComponent = () => {
  const data = [
    { name: 'Jan', sales: 1500 },
    { name: 'Feb', sales: 1900 },
    { name: 'Mar', sales: 1600 },
    { name: 'Apr', sales: 2100 },
    { name: 'May', sales: 1800 },
    { name: 'Jun', sales: 2600 },
    { name: 'Jul', sales: 2800 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-bold text-gray-900">Sales Over Time</h3>
        <button className="text-gray-400 cursor-pointer hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#DC2626" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#DC2626', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CategoryPieChart = () => {
  const data = [
    { name: 'Excavators', value: 45 },
    { name: 'Tractors', value: 25 },
    { name: 'Loaders', value: 15 },
    { name: 'Cranes', value: 10 },
    { name: 'Others', value: 5 },
  ];

  const COLORS = ['#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FECACA'];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-bold text-gray-900">Category Sales</h3>
        <button className="text-gray-400 cursor-pointer hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <div className="h-[250px] w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-y-3 gap-x-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[index] }}></div>
            <span className="text-[12px] font-medium text-gray-600 truncate">{item.name}</span>
            {/* <span className="text-[12px] font-bold text-gray-900 ml-auto">{item.value}%</span> */}
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 ml-72">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-8 sticky top-0 z-40">
          <h2 className="text-sm font-semibold text-gray-600">Analytics Overview</h2>
        </header>

        <main className="p-6 max-w-7xl mx-auto">
          {/* Dashboard Title Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
            <p className="text-gray-500 font-medium text-sm">Detailed insights into your overall business health</p>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Total Revenue" 
              value="₹4,250,000" 
              change="12.5%" 
              isPositive={true} 
              icon={IndianRupee}
              iconBg="bg-red-50 text-red-600"
            />
            <StatCard 
              title="Total Sales" 
              value="1,245" 
              change="8.2%" 
              isPositive={true} 
              icon={ShoppingCart}
              iconBg="bg-indigo-50 text-indigo-600"
            />
            <StatCard 
              title="Total Visitors" 
              value="45,231" 
              change="2.4%" 
              isPositive={false} 
              icon={Users}
              iconBg="bg-purple-50 text-purple-600"
            />
            <StatCard 
              title="Conversion Rate" 
              value="2.8%" 
              change="0.5%" 
              isPositive={true} 
              icon={Zap}
              iconBg="bg-orange-50 text-orange-600"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <LineChartComponent />
            </div>
            <div>
              <CategoryPieChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
