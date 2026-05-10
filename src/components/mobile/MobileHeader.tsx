import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { useLocation } from 'react-router-dom'

interface MobileHeaderProps {
  onOpenCart: () => void
  cartCount: number
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onOpenCart, cartCount }) => {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) return null

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-zinc-100 h-14 px-4 flex items-center justify-between">
      {/* Logo */}
      <span className="font-heading font-extrabold text-base tracking-tight">
        <span className="gradient-text">KIRTI</span>
        <span className="text-zinc-900 ml-1">ELECTRONIC</span>
      </span>

      {/* Cart icon */}
      <button
        onClick={onOpenCart}
        className="relative p-2 rounded-xl active:bg-zinc-100 transition-colors"
      >
        <ShoppingCart size={22} className="text-zinc-700" />
        {cartCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] font-bold font-body flex items-center justify-center">
            {cartCount > 9 ? '9+' : cartCount}
          </span>
        )}
      </button>
    </header>
  )
}

export default MobileHeader
