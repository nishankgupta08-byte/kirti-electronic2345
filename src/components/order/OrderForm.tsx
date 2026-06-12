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
    shopName: retailerData?.shop_name || '',
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
        retailerId: retailerData?.retailer_id || 'PENDING'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-kirti-cobalt rounded-lg p-6 md:p-8 space-y-6 shadow-[3px_3px_0px_rgba(15,29,54,0.05)] relative overflow-hidden">
      {/* Decorative Blueprint Corner Mark */}
      <div className="absolute top-2 left-2 font-mono text-[8px] text-kirti-muted select-none">[FORM_NODE: CHECKOUT]</div>
      <div className="absolute top-2 right-2 font-mono text-[8px] text-kirti-muted select-none">NODE_SYS::SECURE</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Name */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-kirti-muted block">// Merchant Contact Name *</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kirti-muted" size={15} />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-kirti-surface border ${errors.name ? 'border-kirti-rose' : 'border-kirti-border'} rounded-sm py-3.5 pl-9 pr-4 text-xs text-kirti-cobalt focus:border-kirti-orange focus:ring-1 focus:ring-kirti-orange/20 outline-none transition-all font-medium`}
              placeholder="Full Name"
            />
            {errors.name && <p className="text-[9px] text-kirti-rose mt-1 ml-1 font-mono">{errors.name}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-kirti-muted block">// Verified Email</label>
          <div className="relative opacity-60">
            <ShoppingBag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kirti-muted" size={15} />
            <input
              name="email"
              value={formData.email}
              disabled
              className="w-full bg-kirti-surface border border-kirti-border rounded-sm py-3.5 pl-9 pr-4 text-xs text-kirti-muted outline-none font-medium cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-kirti-muted block">// Direct Mobile Number *</label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kirti-muted" size={15} />
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full bg-kirti-surface border ${errors.phone ? 'border-kirti-rose' : 'border-kirti-border'} rounded-sm py-3.5 pl-9 pr-4 text-xs text-kirti-cobalt focus:border-kirti-orange focus:ring-1 focus:ring-kirti-orange/20 outline-none transition-all font-medium`}
              placeholder="10-digit mobile"
            />
            {errors.phone && <p className="text-[9px] text-kirti-rose mt-1 ml-1 font-mono">{errors.phone}</p>}
          </div>
        </div>

        {/* Shop Name */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-kirti-muted block">// Retail Outlet Name *</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kirti-muted" size={15} />
            <input
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className={`w-full bg-kirti-surface border ${errors.shopName ? 'border-kirti-rose' : 'border-kirti-border'} rounded-sm py-3.5 pl-9 pr-4 text-xs text-kirti-cobalt focus:border-kirti-orange focus:ring-1 focus:ring-kirti-orange/20 outline-none transition-all font-medium`}
              placeholder="Business Showroom Name"
            />
            {errors.shopName && <p className="text-[9px] text-kirti-rose mt-1 ml-1 font-mono">{errors.shopName}</p>}
          </div>
        </div>
      </div>

      {/* Retailer ID */}
      <div className="space-y-2">
        <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-kirti-muted block">// Dealer Allocation ID</label>
        <div className="relative opacity-60">
          <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kirti-muted" size={15} />
          <input
            value={retailerData?.retailer_id || 'PENDING_INIT'}
            disabled
            className="w-full bg-kirti-surface border border-kirti-border rounded-sm py-3.5 pl-9 pr-4 text-xs text-kirti-muted outline-none font-mono cursor-not-allowed"
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-kirti-muted block">// Warehouse Delivery Address *</label>
        <div className="relative">
          <MapPin className="absolute left-3.5 top-4 text-kirti-muted" size={15} />
          <textarea
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            className={`w-full bg-kirti-surface border ${errors.address ? 'border-kirti-rose' : 'border-kirti-border'} rounded-sm py-3.5 pl-9 pr-4 text-xs text-kirti-cobalt focus:border-kirti-orange focus:ring-1 focus:ring-kirti-orange/20 outline-none transition-all font-medium resize-none`}
            placeholder="Detailed physical shipping address with pincode"
          />
          {errors.address && <p className="text-[9px] text-kirti-rose mt-1 ml-1 font-mono">{errors.address}</p>}
        </div>
      </div>

      {/* Special Notes */}
      <div className="space-y-2">
        <label className="font-mono text-[10px] font-bold uppercase tracking-wider text-kirti-muted block">// Special Consignment Instructions</label>
        <div className="relative">
          <MessageSquare className="absolute left-3.5 top-4 text-kirti-muted" size={15} />
          <textarea
            name="notes"
            rows={2}
            value={formData.notes}
            onChange={handleChange}
            className="w-full bg-kirti-surface border border-kirti-border rounded-sm py-3.5 pl-9 pr-4 text-xs text-kirti-cobalt focus:border-kirti-orange focus:ring-1 focus:ring-kirti-orange/20 outline-none transition-all font-medium resize-none"
            placeholder="Optional notes: e.g. palletizing specifications, dispatch schedule..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-kirti-orange hover:bg-kirti-orange-hover text-white font-mono text-xs font-bold tracking-wider uppercase py-4 rounded-sm shadow-[2px_2px_0px_rgba(15,29,54,1)] active:translate-y-[1px] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" size={15} /> : (
          <>
            SEND SECURE PRE-BOOKING DISPATCH
            <ArrowRight size={14} />
          </>
        )}
      </button>
    </form>
  );
};

export default OrderForm;
