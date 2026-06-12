import { Product, ProductReview } from '../types'

const reviewsByProductId: Record<string, { rating: number; reviews: ProductReview[] }> = {
  'demo-laptop-001': {
    rating: 4.8,
    reviews: [
      { id: 'r1', author: 'Rajesh Electronics', rating: 5, comment: 'Excellent build quality. Our retail partners love the lightweight chassis for business customers.', date: '2026-02-12' },
      { id: 'r2', author: 'TechMart Delhi', rating: 5, comment: 'Fast allocation turnaround. Keyboard and trackpad are best-in-class for enterprise buyers.', date: '2026-01-28' },
      { id: 'r3', author: 'Digital Hub Noida', rating: 4, comment: 'Solid seller in our store. Battery life meets spec claims. Minor premium on price.', date: '2026-01-15' },
    ],
  },
  'demo-laptop-002': {
    rating: 4.9,
    reviews: [
      { id: 'r1', author: 'Apple Zone Mumbai', rating: 5, comment: 'Highest demand SKU in our catalog. M3 performance is unmatched at this weight.', date: '2026-02-08' },
      { id: 'r2', author: 'Smart Devices Pune', rating: 5, comment: 'Consistent stock from Kirti warehouse. Retail margins are healthy on bulk orders.', date: '2026-01-22' },
    ],
  },
  'demo-laptop-003': {
    rating: 4.3,
    reviews: [
      { id: 'r1', author: 'Value Tech Jaipur', rating: 4, comment: 'Great mid-range option for volume sales. Ryzen 5 handles everyday workloads well.', date: '2026-02-01' },
      { id: 'r2', author: 'Laptop World', rating: 4, comment: 'Good for student and SMB segments. Display quality is decent for the price point.', date: '2026-01-18' },
      { id: 'r3', author: 'Electro Bazaar', rating: 5, comment: 'Moved 40 units in first month. Reliable allocation from warehouse.', date: '2026-01-05' },
    ],
  },
  'demo-phone-001': {
    rating: 4.7,
    reviews: [
      { id: 'r1', author: 'Mobile Planet', rating: 5, comment: 'S Pen and camera are major selling points. Flagship demand remains strong.', date: '2026-02-10' },
      { id: 'r2', author: 'Galaxy Store Chennai', rating: 5, comment: 'Premium SKU with excellent turnover. Kirti pre-booking process is seamless.', date: '2026-01-30' },
      { id: 'r3', author: 'Phone Hub', rating: 4, comment: 'High price point but justified by features. Good for flagship retail channels.', date: '2026-01-12' },
    ],
  },
  'demo-phone-002': {
    rating: 4.9,
    reviews: [
      { id: 'r1', author: 'iStore Partner', rating: 5, comment: 'Titanium build and A17 Pro chip drive premium sales. Always in demand.', date: '2026-02-14' },
      { id: 'r2', author: 'Mobile Junction', rating: 5, comment: 'Top allocation priority for us. USB-C was a welcome upgrade for customers.', date: '2026-02-02' },
    ],
  },
  'demo-phone-003': {
    rating: 4.5,
    reviews: [
      { id: 'r1', author: 'OnePlus Zone', rating: 5, comment: '100W charging is a killer feature at this price. Fast-moving inventory.', date: '2026-02-06' },
      { id: 'r2', author: 'SmartPhone Hub', rating: 4, comment: 'Hasselblad camera marketing helps sales. Good value proposition for retailers.', date: '2026-01-20' },
      { id: 'r3', author: 'Tech Retail Co.', rating: 4, comment: 'Solid mid-flagship option. OxygenOS updates keep customers satisfied.', date: '2026-01-08' },
    ],
  },
  'demo-audio-001': {
    rating: 4.8,
    reviews: [
      { id: 'r1', author: 'Audio Pro Delhi', rating: 5, comment: 'Industry standard for ANC headphones. Retailers report zero return rate.', date: '2026-02-11' },
      { id: 'r2', author: 'Sound Systems', rating: 5, comment: '30-hour battery life is a verified selling point. Premium audio allocation.', date: '2026-01-25' },
    ],
  },
  'demo-audio-002': {
    rating: 4.4,
    reviews: [
      { id: 'r1', author: 'Gadget Store', rating: 4, comment: 'IP67 rating drives outdoor segment sales. Compact form factor is popular.', date: '2026-02-03' },
      { id: 'r2', author: 'Electronics Plus', rating: 5, comment: 'Volume SKU with strong margins. JBL brand recognition helps move units.', date: '2026-01-16' },
    ],
  },
  'demo-audio-003': {
    rating: 4.2,
    reviews: [
      { id: 'r1', author: 'boAt Partner', rating: 4, comment: 'Budget-friendly TWS with good feature set. High volume, low margin but fast turnover.', date: '2026-02-07' },
      { id: 'r2', author: 'Accessories Hub', rating: 4, comment: 'ENx ANC works well for the price. Popular with younger demographics.', date: '2026-01-19' },
      { id: 'r3', author: 'Retail Audio', rating: 5, comment: '50h battery claim holds up. Great add-on sale with smartphones.', date: '2026-01-02' },
    ],
  },
  'demo-acc-001': {
    rating: 4.6,
    reviews: [
      { id: 'r1', author: 'Charger World', rating: 5, comment: 'GaN II tech in compact form. Essential bundle item for laptop sales.', date: '2026-02-09' },
      { id: 'r2', author: 'Accessory Mart', rating: 4, comment: 'Dual USB-C is practical. Anker brand trust reduces customer hesitation.', date: '2026-01-24' },
    ],
  },
  'demo-acc-002': {
    rating: 4.3,
    reviews: [
      { id: 'r1', author: 'Hub Central', rating: 4, comment: '7-in-1 covers most laptop user needs. Aluminum build feels premium.', date: '2026-02-04' },
      { id: 'r2', author: 'Tech Accessories', rating: 4, comment: '100W PD pass-through works as advertised. Good cross-sell with laptops.', date: '2026-01-17' },
    ],
  },
  'demo-acc-003': {
    rating: 4.7,
    reviews: [
      { id: 'r1', author: 'Peripheral Pro', rating: 5, comment: 'MX Master 3S is the gold standard for productivity mice. Worth the premium.', date: '2026-01-29' },
      { id: 'r2', author: 'Office Supplies Co.', rating: 4, comment: 'Quiet clicks and 8K DPI sensor impress business buyers. Currently depleted.', date: '2026-01-10' },
    ],
  },
}

const fallbackReviews = (product: Product): { rating: number; reviews: ProductReview[] } => ({
  rating: product.rating ?? 4.5,
  reviews: product.reviews ?? [
    {
      id: 'fb1',
      author: 'Verified Retailer',
      rating: 5,
      comment: `Reliable ${product.category.toLowerCase()} allocation from Kirti warehouse. Product quality meets wholesale specifications.`,
      date: '2026-01-20',
    },
    {
      id: 'fb2',
      author: 'Partner Store',
      rating: 4,
      comment: 'Smooth pre-booking process and timely confirmation. Recommended for bulk retailer orders.',
      date: '2026-01-08',
    },
  ],
})

export const enrichProduct = (product: Product): Product => {
  const meta = reviewsByProductId[product.id] ?? fallbackReviews(product)
  return {
    ...product,
    rating: meta.rating,
    reviewCount: meta.reviews.length,
    reviews: meta.reviews,
    overview: product.overview ?? product.description,
  }
}

export const getProductImages = (product: Product): string[] => {
  if (product.images.length > 0) return product.images
  return ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800']
}
