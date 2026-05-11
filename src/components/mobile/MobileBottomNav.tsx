import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, ShoppingBag, ShoppingCart, User, type LucideIcon } from 'lucide-react'

interface MobileBottomNavProps {
  onOpenCart: () => void
  cartCount: number
}

interface Tab {
  icon: LucideIcon
  label: string
  href?: string
  action?: 'cart'
}

const tabs: Tab[] = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: ShoppingBag, label: 'Products', href: '/products' },
  { icon: ShoppingCart, label: 'Cart', action: 'cart' },
  { icon: User, label: 'Account', href: '/login' },
]

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenCart, cartCount }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-zinc-100 h-16 grid grid-cols-4 pb-safe">
      {tabs.map((tab) => {
        const isActive = tab.href ? pathname === tab.href : false
        const isCart = tab.action === 'cart'

        return (
          <button
            key={tab.label}
            onClick={() => (isCart ? onOpenCart() : tab.href ? navigate(tab.href) : null)}
            className="flex flex-col items-center justify-center gap-0.5 active:scale-90 transition-transform duration-100 relative h-full"
          >
            {/* Cart badge */}
            {isCart && cartCount > 0 && (
              <span className="absolute top-1 right-[calc(50%-12px)] w-4 h-4 rounded-full bg-violet-600 text-white text-[9px] font-bold flex items-center justify-center z-10">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}

            {/* Icon */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
                isActive ? 'text-violet-600' : 'text-zinc-400'
              }`}
            >
              <tab.icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            </div>

            {/* Label */}
            <span
              className={`font-body text-[10px] font-medium transition-colors duration-200 ${
                isActive ? 'text-violet-600' : 'text-zinc-400'
              }`}
            >
              {tab.label}
            </span>

            {/* Active dot indicator */}
            {isActive && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-violet-600" />
            )}
          </button>
        )
      })}
    </nav>
  )
}

export default MobileBottomNav
