import React from 'react'
import MobileHeader from './MobileHeader'
import MobileBottomNav from './MobileBottomNav'

interface MobileLayoutProps {
  children: React.ReactNode
  onOpenCart: () => void
  cartCount: number
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, onOpenCart, cartCount }) => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col relative overflow-x-hidden">
      {/* Decorative blobs — CSS only, fixed position */}
      <div className="fixed top-[-120px] right-[-80px] w-72 h-72 rounded-full bg-gradient-to-br from-violet-200/40 to-sky-200/30 blur-3xl pointer-events-none z-2" />
      <div className="fixed bottom-[80px] left-[-60px] w-56 h-56 rounded-full bg-gradient-to-tr from-sky-200/30 to-violet-200/20 blur-3xl pointer-events-none z-2" />

      {/* Mobile top bar */}
      <MobileHeader onOpenCart={onOpenCart} cartCount={cartCount} />

      {/* Page content — padded for bottom nav */}
      <main className="flex-1 relative z-10 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Bottom navigation — fixed */}
      <MobileBottomNav onOpenCart={onOpenCart} cartCount={cartCount} />
    </div>
  )
}

export default MobileLayout
