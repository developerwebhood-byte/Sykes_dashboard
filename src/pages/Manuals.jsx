import React from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Home, 
  ChevronRight, 
  List, 
  Grid, 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  MoreVertical
} from 'lucide-react';

const ManualRow = ({ title, id, category, subCategory, brand, model, price, date, selected, onToggle }) => (
  <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${selected ? 'bg-blue-50/30' : ''}`}>
    <td className="py-4 px-4">
      <input 
        type="checkbox" 
        checked={selected} 
        onChange={onToggle}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
      />
    </td>
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <div className="bg-blue-50 p-2 rounded-lg">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 leading-tight">{title}</p>
          <p className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-wider font-medium">ID: {id}</p>
        </div>
      </div>
    </td>
    <td className="py-4 px-4 text-xs uppercase tracking-wider font-bold text-gray-500 whitespace-nowrap">
      <p className="text-sm font-semibold text-gray-900 mb-0.5">{category}</p>
      <p className="text-[11px] text-gray-400 font-medium">{subCategory}</p>
    </td>
    <td className="py-4 px-4 text-xs uppercase tracking-wider font-bold text-gray-500 whitespace-nowrap">
      <p className="text-sm font-semibold text-gray-900 mb-0.5">{brand}</p>
      <p className="text-[11px] text-gray-400 font-medium">{model}</p>
    </td>
    <td className="py-4 px-4 whitespace-nowrap">
      <p className="text-sm font-bold text-gray-900">₹{price}</p>
    </td>
    <td className="py-4 px-4 whitespace-nowrap">
      <p className="text-sm font-medium text-gray-500">{date}</p>
    </td>
    <td className="py-4 px-4 text-right whitespace-nowrap">
      <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
        <MoreVertical className="w-5 h-5" />
      </button>
    </td>
  </tr>
);

const Manuals = () => {
  const [manuals, setManuals] = React.useState([
    { id: "SM-81794MT", title: "CAT 320D Excavator Service Manual", category: "Excavators", subCategory: "Service", brand: "Caterpillar", model: "320D", price: "2,500", date: "12 Oct 2023" },
    { id: "SM-07642MS", title: "Komatsu PC200-8 Shop Manual", category: "Excavators", subCategory: "Shop", brand: "Komatsu", model: "PC200-8", price: "3,200", date: "10 Oct 2023" },
    { id: "SM-06473MB", title: "John Deere 310G Backhoe Loader", category: "Loaders", subCategory: "Parts", brand: "John Deere", model: "310G", price: "1,800", date: "08 Oct 2023" },
    { id: "SM-081794MS", title: "Volvo L120F Wheel Loader Manual", category: "Loaders", subCategory: "Service", brand: "Volvo", model: "L120F", price: "2,100", date: "05 Oct 2023" },
    { id: "SM-03261WS", title: "Hitachi ZX200-3 Excavator Parts", id: "SM-03261WS", category: "Excavators", subCategory: "Parts", brand: "Hitachi", model: "ZX200-3", price: "1,500", date: "01 Oct 2023" },
  ]);

  const [selectedIds, setSelectedIds] = React.useState([]);

  const toggleRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedIds(prev => 
      prev.length === manuals.length ? [] : manuals.map(m => m.id)
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 ml-72">
        {/* Top Header / Breadcrumbs */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-8 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-gray-400">
            <Home className="w-4 h-4 cursor-pointer hover:text-blue-600 transition-colors" />
            <ChevronRight className="w-4 h-4" />
            <span className="text-sm font-semibold text-gray-600">Manuals</span>
          </div>
        </header>

        <main className="p-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Toolbar - Two group flex layout guarantees all items are visible */}
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between gap-3">
              {/* Left Group */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex shrink-0 bg-gray-50 p-0.5 rounded-lg border border-gray-100">
                  <button className="p-1.5 bg-white rounded-md shadow-sm text-blue-600 cursor-pointer">
                    <List className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
                    <Grid className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative w-40 shrink-0">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search manuals..."
                    className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg outline-none text-xs font-medium text-gray-600 placeholder-gray-400 focus:border-blue-400"
                  />
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {[["Category: All"], ["Brand: All"], ["Sort by: Newest"]].map(([label]) => (
                    <div key={label} className="relative">
                      <select className="appearance-none pl-2.5 pr-7 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[11px] font-bold text-gray-600 outline-none cursor-pointer hover:border-blue-300">
                        <option>{label}</option>
                      </select>
                      <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Group */}
              <div className="flex items-center gap-2 shrink-0">
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-600 text-blue-600 rounded-lg font-bold text-[11px] hover:bg-blue-50 transition-colors cursor-pointer">
                  <Filter className="w-3.5 h-3.5" />
                  Filter
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-[11px] hover:bg-blue-700 transition-all shadow-sm cursor-pointer">
                  <Plus className="w-3.5 h-3.5" />
                  Add new manual
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 border-b border-gray-100 uppercase tracking-wider text-[11px] font-bold text-gray-400">
                  <tr>
                    <th className="py-4 px-4 w-10">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.length === manuals.length}
                        onChange={toggleAll}
                        className="w-4 h-4 border-gray-300 rounded cursor-pointer accent-blue-600" 
                      />
                    </th>
                    <th className="py-4 px-4">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-gray-500 cursor-pointer hover:text-gray-700">
                        Manual Title <ChevronsUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="py-4 px-4">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-gray-500 cursor-pointer hover:text-gray-700">
                        Category <ChevronsUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="py-4 px-6">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-gray-500">
                        Brand / Model
                      </div>
                    </th>
                    <th className="py-4 px-4">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-gray-500 cursor-pointer hover:text-gray-700">
                        Price <ChevronsUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="py-4 px-4">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-gray-500 cursor-pointer hover:text-gray-700">
                        Upload Date <ChevronsUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="py-4 px-6 text-right text-xs uppercase tracking-wider font-bold text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {manuals.map((manual) => (
                    <ManualRow 
                      key={manual.id} 
                      {...manual} 
                      selected={selectedIds.includes(manual.id)}
                      onToggle={() => toggleRow(manual.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500">Rows per page:</span>
                <div className="relative">
                  <select className="appearance-none pl-3 pr-8 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-bold text-gray-700 outline-none cursor-pointer">
                    <option>10</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <p className="text-sm font-medium text-gray-500">
                Showing <span className="font-bold text-gray-900">1</span> to <span className="font-bold text-gray-900">5</span> of <span className="font-bold text-gray-900">41</span> entries
              </p>

              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30 cursor-pointer" disabled>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-1">
                  {[1, 2, 3].map((page) => (
                    <button 
                      key={page}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${
                        page === 1 ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <span className="w-9 h-9 flex items-center justify-center text-gray-400">...</span>
                  {[12, 13].map((page) => (
                    <button 
                      key={page}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-gray-500 hover:bg-gray-50 cursor-pointer"
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Manuals;
