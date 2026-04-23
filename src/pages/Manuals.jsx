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
  MoreVertical,
  Pencil,
  Trash2,
  Copy,
  Link,
  X,
  CloudUpload,
  AlertTriangle,
  Archive,
  Eye,
  Calendar,
  Globe,
  Hash,
  Search as SearchIcon,
  Type,
  Tag,
  Image as ImageIcon
} from 'lucide-react';

const ManualRow = ({ title, id, category, subCategory, brand, model, price, date, selected, onToggle, onDelete, onDuplicate, onEdit, onCopyLink }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${selected ? 'bg-red-50/30' : ''}`}>
      <td className="py-4 px-4">
        <input 
          type="checkbox" 
          checked={selected} 
          onChange={onToggle}
          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
        />
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-50 p-2 rounded-lg">
            <FileText className="w-5 h-5 text-red-600" />
          </div>
          <div 
            onClick={() => window.location.href = `/manual-detail/${id}`}
            className="cursor-pointer group"
          >
            <p className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">{title}</p>
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
      <td className="py-4 px-4 text-right whitespace-nowrap relative">
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors p-1 rounded-md hover:bg-gray-100"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {showMenu && (
          <div 
            ref={menuRef}
            className="absolute right-12 top-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-50 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
          >
            <button 
              onClick={() => { window.location.href = `/manual-detail/${id}`; setShowMenu(false); }}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              View Details
            </button>
            <button 
              onClick={() => { onEdit(); setShowMenu(false); }}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit Manual
            </button>
            <button 
              onClick={() => { onDuplicate(); setShowMenu(false); }}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              Duplicate
            </button>
            <button 
              onClick={() => { onCopyLink(); setShowMenu(false); }}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer text-left"
            >
              <Link className="w-3.5 h-3.5" />
              Copy Download Link
            </button>
            <div className="h-px bg-gray-100 my-1 mx-2"></div>
            <button 
              onClick={() => { onDelete(); setShowMenu(false); }}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Manual
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

const ManualModal = ({ isOpen, onClose, manual, onSave }) => {
  const [formData, setFormData] = React.useState({
    title: '',
    category: '',
    subCategory: '',
    subSubCategory: '',
    brand: '',
    model: '',
    price: '',
    year: '',
    language: '',
    partNumber: '',
    tags: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });
  const [coverImage, setCoverImage] = React.useState(null);
  const coverInputRef = React.useRef(null);

  React.useEffect(() => {
    if (manual) {
      setFormData({
        title: manual.title || '',
        category: manual.category || '',
        subCategory: manual.subCategory || '',
        subSubCategory: manual.subSubCategory || '',
        brand: manual.brand || '',
        model: manual.model || '',
        price: manual.price || '',
        year: manual.year || '',
        language: manual.language || '',
        partNumber: manual.partNumber || '',
        tags: manual.tags || '',
        seoTitle: manual.seoTitle || '',
        seoDescription: manual.seoDescription || '',
        seoKeywords: manual.seoKeywords || ''
      });
      setCoverImage(manual.coverImage || null);
    } else {
      setFormData({
        title: '', category: '', subCategory: '', subSubCategory: '', brand: '', model: '', price: '',
        year: '', language: '', partNumber: '', tags: '', seoTitle: '', seoDescription: '', seoKeywords: ''
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
            <h2 className="text-xl font-black text-gray-900">{manual ? 'Edit Manual' : 'Add New Manual'}</h2>
            <p className="text-sm text-gray-400 font-medium mt-0.5">{manual ? 'Update manual details.' : 'Fill in the details to create a new manual.'}</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
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
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Manual Title</label>
                    <input 
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g. CAT 320D Excavator Service Manual"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Category</label>
                      <div className="relative">
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
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
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Sub Category</label>
                      <div className="relative">
                        <select 
                          value={formData.subCategory}
                          onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
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
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Sub-Sub Category</label>
                      <div className="relative">
                        <select 
                          value={formData.subSubCategory}
                          onChange={(e) => setFormData({...formData, subSubCategory: e.target.value})}
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
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Brand</label>
                      <input 
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Model</label>
                      <input 
                        type="text"
                        value={formData.model}
                        onChange={(e) => setFormData({...formData, model: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Price (₹)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">₹</span>
                        <input 
                          type="text"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
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
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Year / Edition</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text"
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        placeholder="e.g. 2023"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Language</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text"
                        value={formData.language}
                        onChange={(e) => setFormData({...formData, language: e.target.value})}
                        placeholder="e.g. English"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Part Number / OEM</label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text"
                        value={formData.partNumber}
                        onChange={(e) => setFormData({...formData, partNumber: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Tags</label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        placeholder="tag1, tag2..."
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-red-50/50 p-6 rounded-2xl border border-red-100/50">
                <h3 className="text-xs font-black text-red-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <SearchIcon className="w-4 h-4" />
                  SEO Optimization
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">SEO Title</label>
                    <div className="relative">
                      <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-300" />
                      <input 
                        type="text"
                        value={formData.seoTitle}
                        onChange={(e) => setFormData({...formData, seoTitle: e.target.value})}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-red-100 rounded-xl text-sm font-bold text-gray-900 focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">SEO Description</label>
                    <textarea 
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({...formData, seoDescription: e.target.value})}
                      rows={2}
                      className="w-full px-4 py-2.5 bg-white border border-red-100 rounded-xl text-sm font-bold text-gray-900 focus:border-red-500 transition-all outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">SEO Keywords</label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-300" />
                      <input 
                        type="text"
                        value={formData.seoKeywords}
                        onChange={(e) => setFormData({...formData, seoKeywords: e.target.value})}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-red-100 rounded-xl text-sm font-bold text-gray-900 focus:border-red-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Cover Image</h3>
                <div 
                  onClick={() => coverInputRef.current?.click()}
                  className="group relative w-full aspect-[3/4] border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden cursor-pointer hover:border-red-400 hover:bg-red-50/30 transition-all flex flex-col items-center justify-center bg-gray-50/50"
                >
                  {coverImage ? (
                    <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Upload Cover</p>
                    </>
                  )}
                  <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} />
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Manual File</h3>
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                    <CloudUpload className="w-6 h-6 text-red-500" />
                  </div>
                  <p className="text-xs font-black text-gray-900 mb-1">{manual ? 'Replace PDF File' : 'Upload PDF File'}</p>
                  <p className="text-[10px] text-gray-400 font-bold">Max file size 500MB</p>
                  <button className="mt-4 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                    Choose File
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-3 z-10">
          <button onClick={onClose} className="px-6 py-3 text-sm font-black text-gray-500 hover:text-gray-900 transition-all cursor-pointer">
            Cancel
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="px-8 py-3 bg-red-600 text-white rounded-2xl text-sm font-black hover:bg-red-700 transition-all shadow-xl shadow-red-100 cursor-pointer"
          >
            {manual ? 'Update Manual' : 'Save Manual'}
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, onArchive, manualTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <h2 className="text-xl font-black text-gray-900 mb-2">Delete Manual?</h2>
        <p className="text-sm text-gray-500 font-medium mb-8">
          Are you sure you want to delete <span className="font-bold text-gray-900">"{manualTitle}"</span>? This action cannot be undone.
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

const Manuals = () => {
  const [manuals, setManuals] = React.useState([
    { id: "SM-81794MT", title: "CAT 320D Excavator Service Manual", category: "Excavators", subCategory: "Service", brand: "Caterpillar", model: "320D", price: "2,500", date: "12 Oct 2023" },
    { id: "SM-07642MS", title: "Komatsu PC200-8 Shop Manual", category: "Excavators", subCategory: "Shop", brand: "Komatsu", model: "PC200-8", price: "3,200", date: "10 Oct 2023" },
    { id: "SM-06473MB", title: "John Deere 310G Backhoe Loader", category: "Loaders", subCategory: "Parts", brand: "John Deere", model: "310G", price: "1,800", date: "08 Oct 2023" },
    { id: "SM-081794MS", title: "Volvo L120F Wheel Loader Manual", category: "Loaders", subCategory: "Service", brand: "Volvo", model: "L120F", price: "2,100", date: "05 Oct 2023" },
    { id: "SM-03261WS", title: "Hitachi ZX200-3 Excavator Parts", id: "SM-03261WS", category: "Excavators", subCategory: "Parts", brand: "Hitachi", model: "ZX200-3", price: "1,500", date: "01 Oct 2023" },
  ]);

  const [selectedIds, setSelectedIds] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [currentManual, setCurrentManual] = React.useState(null);
  const [manualToDelete, setManualToDelete] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

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

  const handleDelete = (id) => {
    const manual = manuals.find(m => m.id === id);
    setManualToDelete(manual);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setManuals(prev => prev.filter(m => m.id !== manualToDelete.id));
    setIsDeleteModalOpen(false);
    showToast("Manual deleted permanently");
  };

  const confirmArchive = () => {
    setManuals(prev => prev.filter(m => m.id !== manualToDelete.id));
    setIsDeleteModalOpen(false);
    showToast("Manual moved to archive");
  };

  const handleDuplicate = (id) => {
    const manual = manuals.find(m => m.id === id);
    const duplicatedData = { 
      ...manual, 
      id: null,
      title: `Copy of ${manual.title}`
    };
    setCurrentManual(duplicatedData);
    setIsModalOpen(true);
  };

  const handleCopyLink = (id) => {
    navigator.clipboard.writeText(`https://skyes.com/download/${id}`);
    showToast("Download link copied to clipboard");
  };

  const handleEdit = (id) => {
    const manual = manuals.find(m => m.id === id);
    setCurrentManual(manual);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    if (currentManual && currentManual.id) {
      setManuals(prev => prev.map(m => 
        m.id === currentManual.id ? { ...m, ...formData } : m
      ));
      showToast("Manual updated successfully");
    } else {
      const newManual = {
        ...formData,
        id: `SM-${Math.floor(Math.random() * 900000) + 100000}MS`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      setManuals(prev => [newManual, ...prev]);
      showToast(currentManual ? "Manual duplicated successfully" : "New manual added successfully");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar />
      
      {toast && (
        <div className="fixed bottom-8 right-8 z-[200] animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-800">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold tracking-tight">{toast}</span>
          </div>
        </div>
      )}

      <ManualModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        manual={currentManual}
        onSave={handleSave}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        onArchive={confirmArchive}
        manualTitle={manualToDelete?.title}
      />

      <div className="flex-1 ml-72">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-8 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-gray-400">
            <Home className="w-4 h-4 cursor-pointer hover:text-red-600 transition-colors" />
            <ChevronRight className="w-4 h-4" />
            <span className="text-sm font-semibold text-gray-600">Manuals</span>
          </div>
        </header>

        <main className="p-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex shrink-0 bg-gray-50 p-0.5 rounded-lg border border-gray-100">
                  <button className="p-1.5 bg-white rounded-md shadow-sm text-red-600 cursor-pointer">
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
                    className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg outline-none text-xs font-medium text-gray-600 placeholder-gray-400 focus:border-red-400"
                  />
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {[["Category: All"], ["Brand: All"], ["Sort by: Newest"]].map(([label]) => (
                    <div key={label} className="relative">
                      <select className="appearance-none pl-2.5 pr-7 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[11px] font-bold text-gray-600 outline-none cursor-pointer hover:border-red-300">
                        <option>{label}</option>
                      </select>
                      <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-red-600 text-red-600 rounded-lg font-bold text-[11px] hover:bg-red-50 transition-colors cursor-pointer">
                  <Filter className="w-3.5 h-3.5" />
                  Filter
                </button>
                <button 
                  onClick={() => { setCurrentManual(null); setIsModalOpen(true); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg font-bold text-[11px] hover:bg-red-700 transition-all shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add new manual
                </button>
              </div>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 border-b border-gray-100 uppercase tracking-wider text-[11px] font-bold text-gray-400">
                  <tr>
                    <th className="py-4 px-4 w-10">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.length === manuals.length}
                        onChange={toggleAll}
                        className="w-4 h-4 border-gray-300 rounded cursor-pointer accent-red-600" 
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
                      onDelete={() => handleDelete(manual.id)}
                      onDuplicate={() => handleDuplicate(manual.id)}
                      onEdit={() => handleEdit(manual.id)}
                      onCopyLink={() => handleCopyLink(manual.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

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
                        page === 1 ? 'bg-red-600 text-white shadow-md shadow-red-100' : 'text-gray-500 hover:bg-gray-50'
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
