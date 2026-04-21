import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, BookOpen, Shield, HelpCircle, FileText, Globe } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (email === "admin@skyes.com" && password === "Admin") {
            setError("");
            navigate("/dashboard");
        } else {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2">
            {/* Left Section - Blue Branding */}
            <div className="hidden lg:flex flex-col bg-blue-600 p-12 text-white relative overflow-hidden">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-16 z-10">
                    <div className="bg-white p-2 rounded-lg">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-xl font-semibold tracking-tight">Sykes Manuals</span>
                </div>

                {/* Content */}
                <div className="max-w-lg z-10">
                    <h1 className="text-5xl font-bold leading-[1.1] mb-6">
                        Manage your digital manuals with ease.
                    </h1>
                    <p className="text-blue-100 text-lg leading-relaxed mb-10">
                        Access the complete admin dashboard to oversee sales, manage inventory, and track customer analytics all in one secure place.
                    </p>

                    {/* Trusted Badge */}
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 w-fit mb-12">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-600 overflow-hidden bg-gray-200">
                                    <img 
                                        src={`https://i.pravatar.cc/100?img=${10+i}`} 
                                        alt="Avatar" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="text-sm font-medium">Trusted by</p>
                            <p className="text-xs text-blue-200">1,000+ Admins</p>
                        </div>
                    </div>
                </div>

                {/* Dashboard Preview Overlay */}
                <div className="absolute bottom-0 right-[-10%] left-70 top-[60%] bg-white/70 opacity-90 rotate-355 rounded-tl-3xl border-t border-l border-white/20 p-6 shadow-2xl overflow-hidden">
                    <div className="flex gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-red-400 opacity-80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400 opacity-80"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-8 w-32 bg-gray-200/20 rounded-md"></div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-24 bg-gray-200/10 rounded-lg"></div>
                            <div className="h-24 bg-gray-200/10 rounded-lg"></div>
                            <div className="h-24 bg-gray-200/10 rounded-lg"></div>
                        </div>
                        <div className="h-32 bg-gray-200/10 rounded-lg w-full"></div>
                    </div>
                </div>

                {/* Footer Links (Left Side) */}
                <div className="mt-auto flex gap-6 text-sm text-blue-100 z-10">
                    <a href="#" className="hover:text-white transition-colors">Help Center</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
                <div className="max-w-md w-full">
                    {/* Header */}
                    <div className="mb-10 text-left">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                        <p className="text-gray-500">
                            Please enter your admin credentials to access the dashboard.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </span>
                                <input 
                                    type="email" 
                                    placeholder="admin@skyes.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-gray-900 bg-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none text-gray-900 bg-white font-mono"
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-500">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                Forgot password?
                            </a>
                        </div>

                        {/* Sign In Button */}
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98]"
                        >
                            Sign In to Dashboard
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-12 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-gray-400 font-semibold tracking-widest">
                                Secure Admin Access
                            </span>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="mt-10 flex justify-center">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span>Protected by enterprise-grade security</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;