import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import {
  ChevronDown,
  Image as ImageIcon,
  Tag,
  Globe,
  Calendar,
  Hash,
  Search,
  Type,
  CloudUpload,
  Bell,
  Home,
  ChevronRight,
} from "lucide-react";

const FormInput = ({
  label,
  required,
  placeholder,
  type = "text",
  half = false,
  icon: Icon,
}) => (
  <div className={half ? "flex-1" : "w-full"}>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full ${Icon ? "pl-11" : "px-4"} py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all`}
      />
    </div>
  </div>
);

const FormTextarea = ({ label, required, placeholder, rows = 3 }) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      rows={rows}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all resize-none"
    />
  </div>
);

const FormSelect = ({ label, required, placeholder }) => (
  <div className="flex-1">
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select className="w-full appearance-none px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all bg-white cursor-pointer">
        <option value="" disabled selected>
          {placeholder}
        </option>
        <option>Excavators</option>
        <option>Loaders</option>
        <option>Cranes</option>
        <option>Tractors</option>
      </select>
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

const UploadManuals = () => {
  const [uploadMode, setUploadMode] = useState("single");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 ml-72">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="text-base font-bold text-gray-900">Upload Manual</h2>
          <button className="relative p-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </header>

        <main className="p-8 max-w-4xl mx-auto">
          {/* Sub-header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-medium text-gray-500">
              Add new manuals to the platform
            </p>
            <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setUploadMode("single")}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  uploadMode === "single"
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Single Upload
              </button>
              <button
                onClick={() => setUploadMode("bulk")}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  uploadMode === "bulk"
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Bulk Upload
              </button>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            {/* Basic Information */}
            <section className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Basic Information
              </h3>
              <div className="space-y-5">
                {/* Manual Title */}
                <FormInput
                  label="Manual Title"
                  required
                  placeholder="e.g., CAT 320D Excavator Service Manual"
                />

                {/* Category + Subcategory + Sub-subcategory */}
                <div className="flex gap-5">
                  <FormSelect
                    label="Category"
                    required
                    placeholder="Select Category"
                  />
                  <FormSelect
                    label="Subcategory"
                    required
                    placeholder="Select Subcategory"
                  />
                  <FormSelect
                    label="Sub-Subcategory"
                    required
                    placeholder="Third level Category"
                  />
                </div>

                {/* Brand + Model + Price */}
                <div className="flex gap-5 items-end">
                  <FormInput
                    label="Brand"
                    required
                    placeholder="e.g., Caterpillar"
                    half
                  />
                  <FormInput
                    label="Model"
                    required
                    placeholder="e.g., 320D"
                    half
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional Details */}
            <section className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                Additional Details
              </h3>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <FormInput
                  label="Year / Edition"
                  placeholder="e.g., 2023 Edition"
                  icon={Calendar}
                />
                <FormInput
                  label="Language"
                  placeholder="e.g., English, Spanish"
                  icon={Globe}
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <FormInput
                  label="Part Number / OEM Reference"
                  placeholder="e.g., PN-81794MT"
                  icon={Hash}
                />
                <FormInput
                  label="Tags"
                  placeholder="e.g., service, repair, CAT"
                  icon={Tag}
                />
              </div>
            </section>

            {/* Cover Image Upload */}
            <section className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Cover Image
              </h3>
              <div
                onClick={() => coverInputRef.current?.click()}
                className="group relative w-48 h-64 border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:border-red-400 hover:bg-red-50/30 transition-all flex flex-col items-center justify-center bg-gray-50/50"
              >
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Cover Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Upload Cover
                    </p>
                  </>
                )}
                <input
                  type="file"
                  ref={coverInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleCoverChange}
                />
              </div>
            </section>

            {/* SEO Section */}
            <section className="mb-10 bg-gray-50/30 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Search className="w-5 h-5 text-red-600" />
                SEO Optimization
              </h3>
              <div className="space-y-5">
                <FormInput
                  label="SEO Title"
                  placeholder="Enter optimized title for search engines"
                  icon={Type}
                />
                <FormTextarea
                  label="SEO Description"
                  placeholder="Brief description for search results..."
                />
                <FormInput
                  label="SEO Keywords"
                  placeholder="keyword1, keyword2, keyword3..."
                  icon={Tag}
                />
              </div>
            </section>

            {/* Upload File */}
            <section className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Upload File
              </h3>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isDragging
                    ? "border-red-500 bg-red-50"
                    : uploadedFile
                      ? "border-green-400 bg-green-50"
                      : "border-gray-200 bg-gray-50/50 hover:border-red-300 hover:bg-red-50/30"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                    uploadedFile ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <CloudUpload
                    className={`w-7 h-7 ${uploadedFile ? "text-green-600" : "text-red-600"}`}
                  />
                </div>
                {uploadedFile ? (
                  <>
                    <p className="text-sm font-bold text-green-700 mb-1">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-green-500 font-medium">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB — click
                      to change
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-bold text-gray-700 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                      PDF, ZIP, or RAR (Max. 500MB)
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.zip,.rar"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-100">
              <button className="px-6 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                Save as Draft
              </button>
              <button className="px-6 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-100 cursor-pointer">
                Submit Manual
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadManuals;
