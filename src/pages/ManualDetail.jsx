import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  Home,
  ChevronRight,
  Edit3,
  Trash2,
  FileText,
  Download,
  History,
  ShoppingCart,
  User,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  Tag,
  X,
  CloudUpload,
  AlertTriangle,
  Archive,
  ChevronDown,
  Globe,
  Hash,
  Search,
  Type,
  Image as ImageIcon,
  Eye,
} from "lucide-react";

const StatCard = ({ icon: Icon, label, value, subValue, color = "red" }) => {
  const colors = {
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div
        className={`w-10 h-10 ${colors[color]} rounded-xl flex items-center justify-center mb-4`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-lg font-black text-gray-900 mb-0.5">{value}</p>
      <p className="text-xs text-gray-500 font-semibold">{subValue}</p>
    </div>
  );
};

const PurchaseItem = ({ name, orderId, price, oldPrice, time }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 group">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
        <User className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">{name}</p>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          {orderId}
        </p>
      </div>
    </div>
    <div className="text-right">
      <div className="flex items-center gap-1.5 justify-end">
        {oldPrice && (
          <span className="text-[10px] text-gray-400 line-through font-bold">
            ₹{oldPrice}
          </span>
        )}
        <p className="text-sm font-black text-gray-900">₹{price}</p>
      </div>
      <p className="text-[10px] text-gray-500 font-bold mt-0.5 uppercase tracking-wider">
        {time}
      </p>
    </div>
  </div>
);

const ManualModal = ({ isOpen, onClose, manual, onSave }) => {
  const [formData, setFormData] = React.useState({
    title: "",
    category: "",
    subCategory: "",
    subSubCategory: "",
    brand: "",
    model: "",
    price: "",
    year: "",
    language: "",
    partNumber: "",
    tags: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });
  const [coverImage, setCoverImage] = React.useState(null);
  const coverInputRef = React.useRef(null);

  React.useEffect(() => {
    if (manual) {
      setFormData({
        title: manual.title || "",
        category: manual.category || "",
        subCategory: manual.subCategory || "",
        subSubCategory: manual.subSubCategory || "",
        brand: manual.brand || "",
        model: manual.model || "",
        price: manual.price || "",
        year: manual.year || "",
        language: manual.language || "",
        partNumber: manual.partNumber || "",
        tags: manual.tags || "",
        seoTitle: manual.seoTitle || "",
        seoDescription: manual.seoDescription || "",
        seoKeywords: manual.seoKeywords || "",
      });
      setCoverImage(manual.coverImage || null);
    } else {
      setFormData({
        title: "",
        category: "",
        subCategory: "",
        subSubCategory: "",
        brand: "",
        model: "",
        price: "",
        year: "",
        language: "",
        partNumber: "",
        tags: "",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
      });
      setCoverImage(null);
    }
  }, [manual, isOpen]);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-black text-gray-900">
              {manual ? "Edit Manual" : "Add New Manual"}
            </h2>
            <p className="text-sm text-gray-400 font-medium mt-0.5">
              {manual
                ? "Update manual details."
                : "Fill in the details to create a new manual."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-8">
              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <div className="w-1 h-3 bg-red-500 rounded-full"></div>
                  Basic Information
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                      Manual Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="e.g. CAT 320D Excavator Service Manual"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 appearance-none focus:bg-white focus:border-red-500 transition-all outline-none cursor-pointer"
                        >
                          <option value="">Category</option>
                          <option value="Excavators">Excavators</option>
                          <option value="Loaders">Loaders</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                        Sub Category
                      </label>
                      <div className="relative">
                        <select
                          value={formData.subCategory}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subCategory: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 appearance-none focus:bg-white focus:border-red-500 transition-all outline-none cursor-pointer"
                        >
                          <option value="">Subcategory</option>
                          <option value="Service">Service</option>
                          <option value="Parts">Parts</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                        Sub-Sub Category
                      </label>
                      <div className="relative">
                        <select
                          value={formData.subSubCategory}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subSubCategory: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 appearance-none focus:bg-white focus:border-red-500 transition-all outline-none cursor-pointer"
                        >
                          <option value="">Third Level</option>
                          <option value="Standard">Standard</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                        Brand
                      </label>
                      <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) =>
                          setFormData({ ...formData, brand: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                        Model
                      </label>
                      <input
                        type="text"
                        value={formData.model}
                        onChange={(e) =>
                          setFormData({ ...formData, model: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                        Price (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                          ₹
                        </span>
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                          className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <div className="w-1 h-3 bg-purple-500 rounded-full"></div>
                  Additional Details
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                      Year / Edition
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.year}
                        onChange={(e) =>
                          setFormData({ ...formData, year: e.target.value })
                        }
                        placeholder="e.g. 2023"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                      Language
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.language}
                        onChange={(e) =>
                          setFormData({ ...formData, language: e.target.value })
                        }
                        placeholder="e.g. English"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                      Part Number / OEM
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.partNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            partNumber: e.target.value,
                          })
                        }
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
                      Tags
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) =>
                          setFormData({ ...formData, tags: e.target.value })
                        }
                        placeholder="tag1, tag2..."
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-red-50/50 p-6 rounded-2xl border border-red-100/50">
                <h3 className="text-xs font-black text-red-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  SEO Optimization
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">
                      SEO Title
                    </label>
                    <div className="relative">
                      <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-300" />
                      <input
                        type="text"
                        value={formData.seoTitle}
                        onChange={(e) =>
                          setFormData({ ...formData, seoTitle: e.target.value })
                        }
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-red-100 rounded-xl text-sm font-bold text-gray-900 focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">
                      SEO Description
                    </label>
                    <textarea
                      value={formData.seoDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seoDescription: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-4 py-2.5 bg-white border border-red-100 rounded-xl text-sm font-bold text-gray-900 focus:border-red-500 transition-all outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">
                      SEO Keywords
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-300" />
                      <input
                        type="text"
                        value={formData.seoKeywords}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            seoKeywords: e.target.value,
                          })
                        }
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-red-100 rounded-xl text-sm font-bold text-gray-900 focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
                  Cover Image
                </h3>
                <div
                  onClick={() => coverInputRef.current?.click()}
                  className="group relative w-full aspect-[3/4] border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden cursor-pointer hover:border-red-400 hover:bg-red-50/30 transition-all flex flex-col items-center justify-center bg-gray-50/50"
                >
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
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

              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
                  Manual File
                </h3>
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                    <CloudUpload className="w-6 h-6 text-red-500" />
                  </div>
                  <p className="text-xs font-black text-gray-900 mb-1">
                    {manual ? "Replace PDF File" : "Upload PDF File"}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold">
                    Max file size 500MB
                  </p>
                  <button className="mt-4 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                    Choose File
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-3 z-10">
          <button
            onClick={onClose}
            className="px-6 py-3 text-sm font-black text-gray-500 hover:text-gray-900 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-8 py-3 bg-red-600 text-white rounded-2xl text-sm font-black hover:bg-red-700 transition-all shadow-xl shadow-red-100 cursor-pointer"
          >
            {manual ? "Update Manual" : "Save Manual"}
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  onArchive,
  manualTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-black text-gray-900 mb-2">
          Delete Manual?
        </h2>
        <p className="text-sm text-gray-500 font-medium mb-8">
          Are you sure you want to delete{" "}
          <span className="font-bold text-gray-900">"{manualTitle}"</span>? This
          action cannot be undone.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full py-3.5 bg-red-600 text-white rounded-2xl text-sm font-black hover:bg-red-700 hover:-translate-y-0.5 transition-all shadow-xl shadow-red-100 cursor-pointer"
          >
            Yes, Delete Permanently
          </button>
          <button
            onClick={onArchive}
            className="w-full py-3.5 bg-gray-900 text-white rounded-2xl text-sm font-black hover:bg-gray-800 hover:-translate-y-0.5 transition-all shadow-xl shadow-gray-100 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Archive className="w-4 h-4" /> Archive Manual
          </button>
          <button
            onClick={onClose}
            className="w-full py-3.5 text-sm font-black text-gray-500 hover:text-gray-900 transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ManualDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [manual, setManual] = React.useState({
    id: "SM-81794MT",
    title: "CAT 320D Excavator Service Manual",
    description:
      "Comprehensive service and repair manual for Caterpillar 320D Excavator. Includes detailed diagrams, troubleshooting guides, and maintenance schedules for all systems including engine, hydraulics, and electrical components.",
    category: "Excavators",
    subCategory: "Service",
    subSubCategory: "Standard",
    brand: "Caterpillar",
    model: "320D",
    price: "2,500",
    year: "2023",
    language: "English",
    partNumber: "PN-81794MT",
    tags: "service, repair, CAT",
    seoTitle: "CAT 320D Excavator Service Manual - Sykes Manuals",
    seoDescription:
      "Get the complete service manual for CAT 320D Excavator. Detailed PDF guide for repair and maintenance.",
    seoKeywords: "CAT, Excavator, 320D, Service Manual, Repair",
    date: "12 Oct 2023",
    time: "14:30 PM",
    status: "ACTIVE",
    coverImage: null,
    file: {
      name: "cat_320d_service_manual_full.pdf",
      size: "45.2 MB",
      type: "PDF Document",
      pages: "450 Pages",
    },
    audit: {
      createdBy: {
        name: "Admin User",
        date: "12 Oct 2023, 14:30 PM",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      },
      lastUpdatedBy: {
        name: "System Admin",
        date: "15 Nov 2023, 09:15 AM",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
      },
    },
    purchases: [
      {
        name: "John Smith",
        orderId: "ORD-2023-8921",
        price: "2,500",
        time: "2 hrs ago",
      },
      {
        name: "David Wilson",
        orderId: "ORD-2023-8915",
        price: "2,500",
        time: "Yesterday",
      },
      {
        name: "Michael Brown",
        orderId: "ORD-2023-8890",
        price: "2,000",
        oldPrice: "2,500",
        time: "3 days ago",
      },
      {
        name: "Robert Taylor",
        orderId: "ORD-2023-8842",
        price: "2,500",
        time: "5 days ago",
      },
    ],
  });

  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (formData) => {
    setManual((prev) => ({ ...prev, ...formData }));
    setIsEditModalOpen(false);
    showToast("Manual updated successfully");
  };

  const confirmDelete = () => {
    setIsDeleteModalOpen(false);
    showToast("Manual deleted permanently");
    setTimeout(() => navigate("/manuals"), 1000);
  };

  const confirmArchive = () => {
    setIsDeleteModalOpen(false);
    showToast("Manual archived successfully");
    setTimeout(() => navigate("/manuals"), 1000);
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[200] animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-800">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold tracking-tight">{toast}</span>
          </div>
        </div>
      )}

      <ManualModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        manual={manual}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        onArchive={confirmArchive}
        manualTitle={manual.title}
      />

      <div className="flex-1 ml-72">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-gray-400">
            <Home className="w-4 h-4 cursor-pointer hover:text-red-600 transition-colors" />
            <ChevronRight className="w-4 h-4" />
            <span
              className="text-xs font-bold cursor-pointer hover:text-gray-900"
              onClick={() => navigate("/manuals")}
            >
              Manuals
            </span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-xs font-black text-red-600">
              {manual.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all cursor-pointer shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </header>

        <main className="p-8 max-w-7xl mx-auto space-y-6">
          {/* Hero Section */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex items-start gap-8">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 shrink-0">
              <div className="relative">
                <FileText className="w-10 h-10 text-red-500" />
                <span className="absolute -bottom-0.5 -right-0.5 text-[7px] font-black bg-white text-black px-1 rounded border border-gray-100 shadow-sm">
                  PDF
                </span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-[9px] font-black tracking-widest uppercase">
                  {manual.status}
                </span>
              </div>
              <h1 className="text-2xl font-black text-gray-900 mb-2 leading-tight">
                {manual.title}
              </h1>
              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-3xl">
                {manual.description}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <StatCard
                icon={Layers}
                label="Category"
                value={manual.category}
                subValue={manual.subCategory}
                color="purple"
              />
              <StatCard
                icon={ShoppingCart}
                label="Brand / Model"
                value={manual.brand}
                subValue={manual.model}
                color="red"
              />
              <StatCard
                icon={Tag}
                label="Price"
                value={`₹${manual.price}`}
                subValue="Selling Price"
                color="green"
              />
              <StatCard
                icon={Calendar}
                label="Upload Date"
                value={manual.date}
                subValue={manual.time}
                color="orange"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Total Views
                    </p>
                    <p className="text-3xl font-black text-gray-900 mb-1">
                      1,284
                    </p>
                    <p className="text-xs text-red-600 font-bold flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 -rotate-45" /> +12% from
                      last week
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                    <Eye className="w-8 h-8" />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Total Downloads
                    </p>
                    <p className="text-3xl font-black text-gray-900 mb-1">
                      456
                    </p>
                    <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 85% conversion rate
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                    <Download className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* File Details */}
              <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-widest">
                  <div className="w-1 h-4 bg-red-600 rounded-full"></div>
                  File Details
                </h3>

                <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                      <FileText className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        {manual.file.name}
                      </p>
                      <div className="flex items-center gap-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" /> {manual.file.size}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" /> {manual.file.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <History className="w-3 h-3" /> {manual.file.pages}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-all shadow-md shadow-red-100 cursor-pointer">
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </section>

              {/* Audit Information */}
              <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-widest">
                  <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
                  Audit Info
                </h3>

                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">
                      Created By
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src={manual.audit.createdBy.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full border border-gray-100"
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {manual.audit.createdBy.name}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">
                          {manual.audit.createdBy.date}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">
                      Last Updated
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src={manual.audit.lastUpdatedBy.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full border border-gray-100"
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {manual.audit.lastUpdatedBy.name}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">
                          {manual.audit.lastUpdatedBy.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Purchases Sidebar */}
            <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-gray-900 flex items-center gap-2 uppercase tracking-widest">
                  <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                  Purchases
                </h3>
                <button className="text-[9px] font-black text-red-600 uppercase tracking-widest flex items-center gap-1 hover:gap-1.5 transition-all cursor-pointer">
                  All <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex-1 space-y-1">
                {manual.purchases.map((purchase, idx) => (
                  <PurchaseItem key={idx} {...purchase} />
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-50 text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <span className="text-gray-900 font-black">45 Sales</span>{" "}
                  recorded
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManualDetail;
