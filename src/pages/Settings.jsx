import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Bell,
  ChevronRight,
  Pencil,
  ShieldCheck,
} from "lucide-react";

const SettingsTab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
      active
        ? "bg-[#EFF6FF] text-[#2563EB]"
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
  const [activeTab, setActiveTab] = useState("Security");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

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
              <div className="w-72 border-r border-slate-50 p-8 flex flex-col">
                <h3 className="text-base font-bold text-slate-800 mb-6 px-4">Account Settings</h3>
                <nav className="space-y-1.5 flex-">
                  <SettingsTab label="My Profile" active={activeTab === "Profile"} onClick={() => setActiveTab("Profile")} />
                  <SettingsTab label="Organization" active={activeTab === "Organization"} onClick={() => setActiveTab("Organization")} />
                  <SettingsTab label="Payments & Tax" active={activeTab === "Payments"} onClick={() => setActiveTab("Payments")} />
                  <SettingsTab label="Security" active={activeTab === "Security"} onClick={() => setActiveTab("Security")} />
                  <SettingsTab label="Notifications" active={activeTab === "Notifications"} onClick={() => setActiveTab("Notifications")} />
                </nav>
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <button className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer">
                    Delete Account
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 p-10 flex flex-col">
                {activeTab === "Security" && (
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl font-black text-slate-800 mb-2">Security</h3>
                      <p className="text-sm text-slate-400 font-medium">Manage your account security and authentication methods.</p>
                    </div>

                    <div className="space-y-2">
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
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        }
                      >
                        <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-md text-[10px] font-bold border border-green-100 uppercase ml-2">Enabled</span>
                      </SecuritySection>
                    </div>
                  </div>
                )}

                {activeTab !== "Security" && (
                  <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                    <p className="italic font-bold text-slate-400">{activeTab} settings coming soon...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="px-10 py-5 bg-white border-t border-slate-50 flex items-center justify-end gap-3">
              <button className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-all cursor-pointer">
                Cancel
              </button>
              <button className="px-8 py-2.5 bg-[#3B82F6] text-white rounded-xl text-sm font-bold hover:bg-[#2563EB] transition-all shadow-lg shadow-blue-100 cursor-pointer">
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
