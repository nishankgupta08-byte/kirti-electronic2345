import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Phone, ShoppingBag, Hash, MapPin, MessageSquare, Loader2, ArrowRight } from 'lucide-react';

interface OrderFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, loading }) => {
  const { user, retailerData } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: retailerData?.phone || '',
    shopName: retailerData?.shopName || '',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.match(/^[6-9]\d{9}$/)) newErrors.phone = "Enter valid 10-digit mobile";
    if (!formData.shopName.trim()) newErrors.shopName = "Shop name is required";
    if (!formData.address.trim() || formData.address.trim().length < 20)
      newErrors.address = "Enter complete shipping address (min 20 chars)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        retailerId: retailerData?.retailerId || 'PENDING'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-zinc-200 p-8 space-y-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="font-body text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Merchant Contact Name *</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-zinc-50 border ${errors.name ? 'border-rose-300' : 'border-zinc-200'} rounded-xl py-4 pl-12 pr-4 text-zinc-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all font-medium`}
              placeholder="e.g. Rahul Sharma"
            />
            {errors.name && <p className="text-[10px] text-rose-500 mt-1 ml-1 font-body">{errors.name}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="font-body text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Verified Email</label>
          <div className="relative opacity-60">
            <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              name="email"
              value={formData.email}
              disabled
              className="w-full bg-zinc-50 border border-zinc-100 rounded-xl py-4 pl-12 pr-4 text-zinc-700 outline-none font-medium cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="font-body text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Direct Mobile Number *</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full bg-zinc-50 border ${errors.phone ? 'border-rose-300' : 'border-zinc-200'} rounded-xl py-4 pl-12 pr-4 text-zinc-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all font-medium`}
              placeholder="10-digit mobile"
            />
            {errors.phone && <p className="text-[10px] text-rose-500 mt-1 ml-1 font-body">{errors.phone}</p>}
          </div>
        </div>

        {/* Shop Name */}
        <div className="space-y-2">
          <label className="font-body text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Retail Outlet Name *</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className={`w-full bg-zinc-50 border ${errors.shopName ? 'border-rose-300' : 'border-zinc-200'} rounded-xl py-4 pl-12 pr-4 text-zinc-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all font-medium`}
              placeholder="e.g. Kirti Electronics South Delhi"
            />
            {errors.shopName && <p className="text-[10px] text-rose-500 mt-1 ml-1 font-body">{errors.shopName}</p>}
          </div>
        </div>
      </div>

      {/* Retailer ID */}
      <div className="space-y-2">
        <label className="font-body text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Dealer Allocation ID</label>
        <div className="relative opacity-60">
          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            value={retailerData?.retailerId || 'PENDING_INIT'}
            disabled
            className="w-full bg-zinc-50 border border-zinc-100 rounded-xl py-4 pl-12 pr-4 text-zinc-700 outline-none font-mono text-sm cursor-not-allowed"
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="font-body text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Warehouse Delivery Address *</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-5 text-zinc-400" size={18} />
          <textarea
            name="address"
            rows={4}
            value={formData.address}
            onChange={handleChange}
            className={`w-full bg-zinc-50 border ${errors.address ? 'border-rose-300' : 'border-zinc-200'} rounded-xl py-4 pl-12 pr-4 text-zinc-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all font-medium resize-none`}
            placeholder="Detailed shipping address with Pincode and Landmark"
          />
          {errors.address && <p className="text-[10px] text-rose-500 mt-1 ml-1 font-body">{errors.address}</p>}
        </div>
      </div>

      {/* Special Notes */}
      <div className="space-y-2">
        <label className="font-body text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Consignment Instructions</label>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-5 text-zinc-400" size={18} />
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-4 pl-12 pr-4 text-zinc-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all font-medium resize-none"
            placeholder="Specific packaging or delivery time requirements..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-violet-600/25 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" size={24} /> : (
          <>
            Complete Pre-Booking Request
            <ArrowRight size={20} />
          </>
        )}
      </button>
    </form>
  );
};

export default OrderForm;
