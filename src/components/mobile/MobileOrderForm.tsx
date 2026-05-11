import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../hooks/useCart'
import { Loader2, ChevronDown, User, Phone, Mail, Hash, MessageSquare, Store, ShoppingBag, AlertTriangle } from 'lucide-react'

interface MobileOrderFormProps {
  onSubmit: (data: any) => void
  loading: boolean
}

const MobileOrderForm: React.FC<MobileOrderFormProps> = ({ onSubmit, loading }) => {
  const { user, retailerData } = useAuth()
  const { items, total } = useCart()
  const [summaryOpen, setSummaryOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: retailerData?.phone || '',
    shopName: retailerData?.shop_name || '',
    address: '',
    notes: '',
  })
  const [errors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      retailerId: retailerData?.retailer_id || 'PENDING',
    })
  }

  return (
    <div className="min-h-screen bg-white px-5 pt-4 pb-24">
      {/* Collapsible order summary */}
      <button
        onClick={() => setSummaryOpen(!summaryOpen)}
        className="w-full bg-violet-50 border border-violet-100 rounded-2xl px-4 py-3.5 flex items-center justify-between mb-6 active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-2">
          <ShoppingBag size={16} className="text-violet-600" />
          <span className="font-body text-sm font-semibold text-violet-700">
            Order Summary — ₹{total.toLocaleString('en-IN')}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`text-violet-500 transition-transform duration-200 ${summaryOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded summary */}
      {summaryOpen && (
        <div className="bg-zinc-50 rounded-2xl p-4 mb-6 space-y-3 border border-zinc-100">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-body text-xs font-semibold text-zinc-800">{item.name}</p>
                <p className="font-body text-[11px] text-zinc-400">×{item.quantity} units</p>
              </div>
              <p className="font-heading text-sm font-bold text-violet-600">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
            </div>
          ))}
          <div className="border-t border-zinc-200 pt-3 flex justify-between">
            <span className="font-body text-sm font-semibold text-zinc-700">Total</span>
            <span className="font-heading font-bold text-zinc-900">₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      {/* Form heading */}
      <h1 className="font-heading font-bold text-2xl text-zinc-900 mb-6">
        Complete Your<br />
        <span className="gradient-text">Pre-Booking</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Full Name', type: 'text', name: 'name', icon: User, readOnly: true },
          { label: 'Email Address', type: 'email', name: 'email', icon: Mail, readOnly: true },
          { label: 'Phone Number', type: 'tel', name: 'phone', icon: Phone, readOnly: false },
          { label: 'Shop / Company', type: 'text', name: 'shopName', icon: Store, readOnly: false },
        ].map((field) => (
          <div key={field.name}>
            <label className="font-body text-xs font-semibold text-zinc-500 mb-1.5 block uppercase tracking-wide">{field.label} *</label>
            <div className="relative">
              <field.icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type={field.type}
                name={field.name}
                value={String(formData[field.name as keyof typeof formData])}
                onChange={field.readOnly ? undefined : handleChange}
                readOnly={field.readOnly}
                className="w-full pl-10 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl font-body text-sm text-zinc-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200 min-h-[52px]"
              />
            </div>
            {errors[field.name] && <p className="text-[10px] text-rose-500 mt-1 ml-1 font-body">{errors[field.name]}</p>}
          </div>
        ))}

        {/* Retailer ID */}
        <div>
          <label className="font-body text-xs font-semibold text-zinc-500 mb-1.5 block uppercase tracking-wide">Retailer ID</label>
          <div className="relative">
            <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={retailerData?.retailer_id || 'PENDING'}
              readOnly
              className="w-full pl-10 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-body text-sm text-zinc-700 outline-none cursor-not-allowed"
            />
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <label className="font-body text-xs font-semibold text-zinc-500 mb-1.5 block uppercase tracking-wide">Shipping Address *</label>
          <textarea
            name="address"
            rows={4}
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl font-body text-sm text-zinc-900 outline-none resize-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
            placeholder="Full delivery address with city, state, pincode"
          />
        </div>

        {/* Special Instructions */}
        <div>
          <label className="font-body text-xs font-semibold text-zinc-500 mb-1.5 block uppercase tracking-wide">
            Special Instructions <span className="text-zinc-300 ml-1 normal-case">(optional)</span>
          </label>
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl font-body text-sm text-zinc-900 outline-none resize-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
          />
        </div>
      </form>

      {/* Fixed bottom submit bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-100 px-5 py-4 pb-safe">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-violet-600 text-white font-body font-semibold text-sm py-4 rounded-2xl active:scale-95 transition-all duration-150 shadow-[0_4px_20px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Placing Order...
            </>
          ) : (
            <>Confirm Pre-Booking →</>
          )}
        </button>
      </div>
    </div>
  )
}

export default MobileOrderForm
