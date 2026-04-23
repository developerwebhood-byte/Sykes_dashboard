import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Book, 
  CloudUpload, 
  Ticket, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut,
  BookOpen
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path = "#", active = false, activeColor = "bg-red-600" }) => (
  <Link to={path} className={`
    flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 group
    ${active 
      ? `${activeColor} text-white shadow-lg shadow-red-900/20` 
      : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'}
  `}>
    <Icon className={`w-[18px] h-[18px] ${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-100'}`} />
    <span className="font-medium text-[13px]">{label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // For now, just navigate back to login
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-72 h-screen bg-[#0B101B] flex flex-col border-r border-slate-900 text-white p-4 overflow-y-auto no-scrollbar hover:no-scrollbar transition-all font-sans">
      {/* Header / Logo */}
      <div className="flex items-center gap-3 mb-6 px-2 mt-1">
        <div className="bg-red-600 p-1.5 rounded-lg">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">Sykes Manuals</span>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-1 min-h-0">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/dashboard" active={location.pathname === '/dashboard'} />
        <SidebarItem icon={Book} label="Manuals" path="/manuals" active={location.pathname === '/manuals' || location.pathname.startsWith('/manual-detail')} />
        <SidebarItem icon={CloudUpload} label="Upload Manuals" path="/upload" active={location.pathname === '/upload'} />
        <SidebarItem icon={Ticket} label="Coupons" path="/coupons" active={location.pathname === '/coupons'} />
        <SidebarItem icon={Users} label="Customers" path="/customers" active={location.pathname === '/customers'} />
        <SidebarItem 
          icon={CreditCard} 
          label="Payments / Orders" 
          path="/payments" 
          active={location.pathname === '/payments' || location.pathname.startsWith('/order-detail')} 
        />
      </nav>

      {/* Bottom Section - Pushed to bottom with mt-auto */}
      <div className="mt-auto space-y-4 pt-4 border-t border-slate-900">
        <SidebarItem icon={Settings} label="Settings" path="/settings" active={location.pathname === '/settings'} activeColor="bg-gray-700" />

        {/* Help Card */}
        <div className="bg-[#141B26] border border-slate-800 rounded-xl p-3.5 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 mb-1">Need Help?</p>
          <p className="text-[10px] text-slate-500 mb-2.5 leading-relaxed">
            Check our docs or contact support.
          </p>
          <button className="w-full bg-[#202936] cursor-pointer hover:bg-[#2D3947] text-white py-1.5 rounded-lg text-[11px] font-medium transition-colors">
            Get Support
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center justify-between group cursor-pointer p-1 rounded-xl hover:bg-white/5 transition-all">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 bg-slate-800">
              <img 
                src="https://i.pravatar.cc/100?img=12" 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-100 italic">Admin User</span>
              <span className="text-xs text-slate-500">admin@sykes.com</span>
            </div>
          </div>
          <button onClick={handleLogout} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
