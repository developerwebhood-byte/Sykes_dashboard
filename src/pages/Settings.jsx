import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Bell,
  ChevronRight,
  Pencil,
  ShieldCheck,
  Plus,
  Trash2,
  AlertCircle,
  Search,
  Settings as SettingsIcon,
  LogOut
} from "lucide-react";

const SettingsTab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
      active
        ? "bg-[#FEF2F2] text-[#DC2626]"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
    }`}
  >
    {label}
  </button>
);

const SecuritySection = ({ title, description, children, action }) => (
  <div className="py-2 border-b border-slate-50 last:border-0">
    <div className="flex items-start justify-between gap-8">
      <div className="flex-1 max-w-xl">
        <h4 className="text-sm font-bold text-slate-800 mb-1">{title}</h4>
        <p className="text-sm text-slate-400 font-medium leading-relaxed">{description}</p>
        <div className="mt-4">
          {children}
        </div>
      </div>
      <div className="shrink-0 pt-1">
        {action}
      </div>
    </div>
  </div>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Categories");
  const [activeCategoryTab, setActiveCategoryTab] = useState("Primary");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Category State
  const [categories, setCategories] = useState({
    Primary: ["Heavy Machinery", "Construction", "Agriculture", "Industrial", "Power Tools", "Mining"],
    Secondary: ["Excavators", "Tractors", "Loaders", "Generators", "Drills", "Crushers"],
    Third: ["300 Series", "5000 Series", "L-Series", "Silent Gen", "SDS Plus", "Primary Crusher"]
  });

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [inputValue, setInputValue] = useState("");
  const [selectedPrimary, setSelectedPrimary] = useState("");
  const [selectedSecondary, setSelectedSecondary] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Collaborator State
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteData, setInviteData] = useState({ name: '', email: '', password: '' });
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: "Developer Webhood", email: "dev@webhood.com", role: "Admin (Co-Owner)", joined: "Mar 17, 2026", initial: "D", color: "bg-amber-500" },
    { id: 2, name: "Tivyah Green", email: "tivyah@example.com", role: "Billing Manager Owner", joined: "Jan 15, 2026", initial: "T", color: "bg-sky-500", tag: "CLIENT" },
    { id: 3, name: "Webhood Infotech", email: "info@webhood.com", role: "Admin (Co-Owner)", joined: "Jan 15, 2026", icon: true }
  ]);
  const [isCollabDeleteModalOpen, setIsCollabDeleteModalOpen] = useState(false);
  const [collabToDelete, setCollabToDelete] = useState(null);

  // Handlers
  const handleAdd = () => {
    if (!inputValue.trim()) return;
    setCategories({
      ...categories,
      [activeCategoryTab]: [...categories[activeCategoryTab], inputValue]
    });
    setInputValue("");
    setIsAddModalOpen(false);
  };

  const handleEdit = () => {
    if (!inputValue.trim() || selectedIndex === null) return;
    const updated = [...categories[activeCategoryTab]];
    updated[selectedIndex] = inputValue;
    setCategories({
      ...categories,
      [activeCategoryTab]: updated
    });
    setInputValue("");
    setSelectedIndex(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedIndex === null) return;
    const updated = categories[activeCategoryTab].filter((_, i) => i !== selectedIndex);
    setCategories({
      ...categories,
      [activeCategoryTab]: updated
    });
    setSelectedIndex(null);
    setIsDeleteModalOpen(false);
  };
  
  const handleDeleteCollaborator = () => {
    if (!collabToDelete) return;
    setCollaborators(collaborators.filter(c => c.id !== collabToDelete.id));
    setIsCollabDeleteModalOpen(false);
    setCollabToDelete(null);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 ml-72 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="text-lg font-bold text-slate-800">Settings</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
          </div>
        </header>

        <main className="p-8 flex-1">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[700px]">
            <div className="flex flex-1">
              {/* Inner Sidebar */}
              <div className="w-72 border-r border-slate-50 p-8 flex flex-col h-[650px] overflow-y-auto no-scrollbar">
                <h3 className="text-base font-bold text-slate-800 mb-6 px-4">Account Settings</h3>
                <nav className="space-y-1.5 flex-1">
                  <SettingsTab label="My Profile" active={activeTab === "Profile"} onClick={() => setActiveTab("Profile")} />
                  <SettingsTab label="Organization" active={activeTab === "Organization"} onClick={() => setActiveTab("Organization")} />
                  <SettingsTab label="Categories" active={activeTab === "Categories"} onClick={() => setActiveTab("Categories")} />
                  <SettingsTab label="Payments & Tax" active={activeTab === "Payments"} onClick={() => setActiveTab("Payments")} />
                  <SettingsTab label="Roles & Permission" active={activeTab === "Roles"} onClick={() => setActiveTab("Roles")} />
                  <SettingsTab label="Security" active={activeTab === "Security"} onClick={() => setActiveTab("Security")} />
                  <SettingsTab label="Notifications" active={activeTab === "Notifications"} onClick={() => setActiveTab("Notifications")} />
                </nav>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <button className="w-full text-left px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer">
                    Delete Account
                  </button>
                </div>
              </div>

              {/* Content Area - Fixed Header, Scrollable Inner */}
              <div className="flex-1 flex flex-col h-[650px]">
                {activeTab === "Security" && (
                  <div className="flex-1">
                    <div className="mb-4 p-8 pb-0">
                      <h3 className="text-2xl font-black text-slate-800 mb-2">Security</h3>
                      <p className="text-sm text-slate-400 font-medium">Manage your account security and authentication methods.</p>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar p-8 pt-4 space-y-2">
                      <SecuritySection 
                        title="Email address" 
                        description="The email address associated with your account."
                        action={
                          <button className="flex items-center gap-2 mt-6 mr-2 px-4 py-1.5 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                            Edit <Pencil className="w-3 h-3" />
                          </button>
                        }
                      >
                        <span className="text-sm font-bold text-slate-800 absolute right-8 -mt-16 mr-12 pt-1.5">admin@sykesmanuals.com</span>
                      </SecuritySection>

                      <SecuritySection 
                        title="Password" 
                        description="Set a unique password to protect your account."
                        action={
                          <button className="px-5 py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                            Change Password
                          </button>
                        }
                      />

                      <SecuritySection 
                        title="2-step verification" 
                        description="Make your account extra secure. Along with your password, you'll need to enter a code."
                        action={
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={twoFactorEnabled} 
                              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} 
                              className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                          </label>
                        }
                      >
                        <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-md text-[10px] font-bold border border-green-100 uppercase ml-2">Enabled</span>
                      </SecuritySection>
                    </div>
                  </div>
                )}

                {activeTab === "Categories" && (
                  <div className="flex-1 flex flex-col">
                    <div className="p-8 pb-4">
                      <h3 className="text-2xl font-black text-slate-800 mb-2">Categories</h3>
                      <p className="text-sm text-slate-400 font-medium">Manage your 3-level manual category structure.</p>
                    </div>

                    {/* Sub-tabs - Fixed */}
                    <div className="px-8 mb-6">
                      <div className="flex items-center gap-1 p-1 bg-slate-50 rounded-2xl w-fit border border-slate-100/50">
                        {["Primary", "Secondary", "Third"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveCategoryTab(tab)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              activeCategoryTab === tab
                                ? "bg-white text-red-600 shadow-sm"
                                : "text-slate-400 hover:text-slate-600"
                            }`}
                          >
                            {tab} Categories
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar px-8 pb-8">
                      <div className="bg-slate-50/50 rounded-3xl border border-slate-100 p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-base font-bold text-slate-800">{activeCategoryTab} Categories</h4>
                          <p className="text-xs text-slate-400 font-semibold mt-1">
                            {activeCategoryTab === "Primary" && "Top-level main manual groupings."}
                            {activeCategoryTab === "Secondary" && "Specific manual types under primary categories."}
                            {activeCategoryTab === "Third" && "Individual model series or sub-specializations."}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setInputValue("");
                            setIsAddModalOpen(true);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-all cursor-pointer shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add {activeCategoryTab}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {categories[activeCategoryTab].map((cat, i) => (
                          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between group hover:border-red-200 transition-all">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-xs">
                                {i + 1}
                              </div>
                              <span className="text-sm font-bold text-slate-700">{cat}</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                              <button 
                                onClick={() => {
                                  setInputValue(cat);
                                  setSelectedIndex(i);
                                  setIsEditModalOpen(true);
                                }}
                                className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg transition-all cursor-pointer"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => {
                                  setSelectedIndex(i);
                                  setIsDeleteModalOpen(true);
                                }}
                                className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

                {activeTab === "Roles" && (
                  <div className="flex-1 flex flex-col">
                    <div className="p-8 pb-4">
                      {/* Breadcrumb & Header */}
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                            <span>Settings</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-slate-600">Roles & Permissions</span>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <button className="p-1 hover:bg-slate-100 rounded-lg transition-all">
                              <ChevronRight className="w-5 h-5 text-slate-600 rotate-180" />
                            </button>
                            <h3 className="text-2xl font-black text-slate-800">Roles & Permissions</h3>
                          </div>
                          <p className="text-xs text-slate-400 p-3 font-medium">
                            See who can work on this site and what roles they were assigned.
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setIsInviteModalOpen(true)}
                            className="px-6 py-2.5 bg-red-600 cursor-pointer text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100 flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" /> Invite Collaborators
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar px-8 pb-8 flex flex-col">
                      {/* Seats Banner - More Compact */}
                      

                    {/* Filters */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2 bg-white border border-slate-100 px-3 py-2 rounded-xl shadow-sm min-w-[120px]">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Status</span>
                        <select className="text-[11px] font-bold text-slate-600 outline-none bg-transparent cursor-pointer flex-1">
                          <option>All</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2 bg-white border border-slate-100 px-3 py-2 rounded-xl shadow-sm min-w-[120px]">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Role</span>
                        <select className="text-[11px] font-bold text-slate-600 outline-none bg-transparent cursor-pointer flex-1">
                          <option>All</option>
                        </select>
                      </div>
                      <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="Search email or name"
                          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-[11px] font-bold text-slate-800 outline-none focus:border-red-500 transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Collaborator List */}
                    <div className="flex-1 bg-[#F9FBFF]/50 rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-[#EDF2FF]/50 border-b border-slate-100">
                            <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Name ↑</th>
                            <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                            <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Joined on</th>
                            <th className="px-6 py-3 w-10"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {collaborators.map((user) => (
                            <tr key={user.id} className="bg-white hover:bg-slate-50/50 transition-all group">
                              <td className="px-6 py-3.5">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg ${user.color || 'bg-slate-800'} flex items-center justify-center shadow-sm`}>
                                    {user.icon ? (
                                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                        <AlertCircle className="w-3 h-3 text-white" />
                                      </div>
                                    ) : (
                                      <span className="text-xs font-black text-white">{user.initial}</span>
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[13px] font-bold text-slate-800">{user.name}</span>
                                      {user.tag && (
                                        <span className="px-1 py-0.5 bg-red-50 text-red-500 text-[7px] font-black rounded uppercase tracking-wider">{user.tag}</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-3.5">
                                <div className="flex flex-col">
                                  <span className="text-[12px] font-bold text-slate-600 leading-none mb-1">{user.email}</span>
                                </div>
                              </td>
                              <td className="px-3 py-3.5">
                                <span className="text-[11px] font-bold text-slate-400">{user.joined}</span>
                              </td>
                              <td className="px-6 py-3.5 text-right">
                                <button 
                                  onClick={() => {
                                    setCollabToDelete(user);
                                    setIsCollabDeleteModalOpen(true);
                                  }}
                                  className="p-1.5 text-slate-300 cursor-pointer hover:text-red-500 transition-all opacity-100 group-hover:opacity-100"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

                {activeTab !== "Security" && activeTab !== "Categories" && activeTab !== "Roles" && (
                  <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                      <SettingsIcon className="w-8 h-8 text-slate-400 animate-spin-slow" />
                    </div>
                    <p className="italic font-black text-slate-400 uppercase tracking-widest text-[10px]">{activeTab} settings coming soon...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Section - Now part of the main card flow */}
            <div className="px-10 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-all cursor-pointer">
                Cancel
              </button>
              <button className="px-8 py-2.5 bg-[#EF4444] text-white rounded-xl text-sm font-bold hover:bg-[#DC2626] transition-all shadow-lg shadow-red-100 cursor-pointer">
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
      {/* Modals */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-slate-800 mb-6">{isAddModalOpen ? 'Add New' : 'Edit'} {activeCategoryTab} Category</h3>
            
            <div className="space-y-6 mb-8">
              {/* Parent Primary Dropdown (for Secondary and Third) */}
              {(activeCategoryTab === "Secondary" || activeCategoryTab === "Third") && (
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Category</label>
                  <select 
                    value={selectedPrimary}
                    onChange={e => setSelectedPrimary(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-red-500 cursor-pointer"
                  >
                    <option value="">Select Primary...</option>
                    {categories.Primary.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Parent Secondary Dropdown (for Third only) */}
              {activeCategoryTab === "Third" && (
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Secondary Category</label>
                  <select 
                    value={selectedSecondary}
                    onChange={e => setSelectedSecondary(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-red-500 cursor-pointer"
                  >
                    <option value="">Select Secondary...</option>
                    {categories.Secondary.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category Name</label>
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-red-500"
                  placeholder="Enter name..."
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={isAddModalOpen ? handleAdd : handleEdit}
                className="w-full py-3.5 bg-slate-800 text-white rounded-2xl text-sm font-black hover:bg-slate-900 transition-all shadow-xl shadow-slate-100 cursor-pointer"
              >
                {isAddModalOpen ? 'Create Category' : 'Save Changes'}
              </button>
              <button 
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setInputValue("");
                }}
                className="w-full py-3.5 text-sm font-black text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">Delete Category?</h3>
            <p className="text-sm text-slate-500 font-medium mb-8">Are you sure you want to delete <span className="font-bold text-slate-800">"{categories[activeCategoryTab][selectedIndex]}"</span>? This action cannot be undone.</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleDelete}
                className="w-full py-3.5 bg-red-500 text-white rounded-2xl text-sm font-black hover:bg-red-600 transition-all shadow-xl shadow-red-100 cursor-pointer"
              >
                Delete Category
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full py-3.5 text-sm font-black text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[340px] rounded-3xl shadow-2xl p-7">
            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mb-5">
              <Plus className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-800 mb-1">Invite Collaborator</h3>
            <p className="text-[11px] text-slate-500 font-medium mb-6">Send an invitation to join your team.</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  value={inviteData.name}
                  onChange={e => setInviteData({...inviteData, name: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-red-500"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={inviteData.email}
                  onChange={e => setInviteData({...inviteData, email: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-red-500"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Temporary Password</label>
                <input 
                  type="password" 
                  value={inviteData.password}
                  onChange={e => setInviteData({...inviteData, password: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-red-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button 
                onClick={() => {
                  if(inviteData.name && inviteData.email) {
                    setCollaborators([...collaborators, {
                      id: Date.now(),
                      name: inviteData.name,
                      email: inviteData.email,
                      role: "Member",
                      joined: "Just now",
                      initial: inviteData.name.charAt(0),
                      color: "bg-red-500"
                    }]);
                    setIsInviteModalOpen(false);
                    setInviteData({ name: '', email: '', password: '' });
                  }
                }}
                className="w-full py-3 bg-red-600 text-white rounded-xl text-xs font-black hover:bg-red-700 transition-all shadow-xl shadow-red-100 cursor-pointer"
              >
                Send Invitation
              </button>
              <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="w-full py-2.5 text-xs font-black text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isCollabDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[320px] rounded-3xl shadow-2xl p-7">
            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mb-5">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-800 mb-1">Remove Collaborator?</h3>
            <p className="text-[11px] text-slate-500 font-medium mb-6">Are you sure you want to remove <span className="font-bold text-slate-800">{collabToDelete?.name}</span>? They will lose access immediately.</p>
            <div className="flex flex-col gap-2">
              <button 
                onClick={handleDeleteCollaborator}
                className="w-full py-3 bg-red-500 text-white rounded-xl text-xs font-black hover:bg-red-600 transition-all shadow-xl shadow-red-100 cursor-pointer"
              >
                Remove Access
              </button>
              <button 
                onClick={() => setIsCollabDeleteModalOpen(false)}
                className="w-full py-2.5 text-xs font-black text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
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

export default Settings;
