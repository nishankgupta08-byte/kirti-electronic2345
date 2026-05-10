import React from 'react'

interface MobileCategoryBarProps {
  categories: string[]
  active: string
  onChange: (slug: string) => void
}

const MobileCategoryBar: React.FC<MobileCategoryBarProps> = ({ categories, active, onChange }) => {
  return (
    <div className="px-5 mb-4 overflow-x-auto scrollbar-hide pb-1 -mx-2 px-2">
      <div className="flex gap-2.5">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`shrink-0 font-body text-xs font-semibold px-4 py-2.5 rounded-full border min-h-[36px] active:scale-95 transition-all duration-150 ${
              active === cat
                ? 'bg-violet-600 text-white border-violet-600 shadow-[0_2px_10px_rgba(124,58,237,0.3)]'
                : 'bg-white text-zinc-600 border-zinc-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileCategoryBar
