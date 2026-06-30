export type Execution = { title: string; body: string }
export type Result    = { value: string; label: string }

export type Project = {
  slug: string
  index: number
  name: string
  industry: string
  year: string
  tagline: string
  services: string[]
  description: string
  challenge: string
  strategy: string
  execution: Execution[]
  results: Result[]
}

export const projects: Project[] = [
  {
    slug: 'queen-vert',
    index: 1,
    name: 'Queen Vert',
    industry: 'Luxury Flower Boutique',
    year: '2025',
    tagline: 'Where flowers become language.',
    services: ['Social Media', 'Content Creation', 'Meta Ads', 'Branding'],
    description: 'A Beirut flower boutique elevated into a luxury brand that sells emotion, not arrangements.',
    challenge:
      'Queen Vert had exceptional product quality but no visual language to match. Their online presence felt identical to every local florist — no differentiation, no gravity, no reason to choose them over a competitor.',
    strategy:
      'We repositioned Queen Vert from "flower shop" to "luxury emotion brand." Every piece of content had to communicate that flowers are not decoration — they are a gesture of presence. The brand needed to make people feel something before they decided to spend.',
    execution: [
      {
        title: 'Brand Identity',
        body: 'Refined visual language: deep tones, thin amber lines, and a restrained typographic system that whispers luxury without announcing it.',
      },
      {
        title: 'Content Direction',
        body: '12 monthly content calendars. Every post art-directed — lighting, composition, copy — nothing left to chance. Each image earned its place.',
      },
      {
        title: 'Meta Advertising',
        body: 'Conversion-focused campaigns targeting high-income demographics across Beirut and the diaspora. Custom audience retargeting and seasonal creatives built around gifting moments.',
      },
      {
        title: 'Social Media',
        body: 'Consistent presence across Instagram and TikTok. Engagement built through storytelling, not product pushing. Followers became an audience. The audience became a community.',
      },
    ],
    results: [
      { value: '340%', label: 'Instagram growth in 4 months' },
      { value: '2.8×', label: 'ROAS on Meta campaigns' },
      { value: '62%', label: 'Increase in DM inquiries' },
      { value: '4.2×', label: 'Average order value increase' },
    ],
  },
  {
    slug: 'horse-head-tea',
    index: 2,
    name: 'Horse Head Tea',
    industry: 'Lebanese Tea Brand',
    year: '2025',
    tagline: 'The ritual of the Lebanese afternoon, elevated.',
    services: ['Campaign Strategy', 'Social Media', 'Launch Campaign', 'Activations'],
    description: 'A heritage Lebanese tea brand launched into the modern consciousness — cultural pride turned into premium positioning.',
    challenge:
      'Horse Head Tea had loyal customers but zero brand story. The product carried decades of cultural meaning, but that meaning was invisible to younger audiences and the diaspora market. They were selling a commodity when they should have been selling identity.',
    strategy:
      'We built a launch campaign rooted in nostalgia and identity. Lebanese tea is ritual. We made that ritual cinematic — and gave a new generation a reason to choose authenticity over imported alternatives. The strategy: make people remember before you make them buy.',
    execution: [
      {
        title: 'Campaign Strategy',
        body: 'Six-week launch strategy across digital and physical touchpoints. Message: this is your grandmother\'s tea, made for who you are now.',
      },
      {
        title: 'Launch Campaign',
        body: 'A three-part content series: "The Afternoon," "The Gathering," "The Inheritance." Each told a story, none sold a product. The product sold itself.',
      },
      {
        title: 'Social Media',
        body: 'Bi-weekly posts with cultural reference points — food, family, music, place. Built an engaged community around identity, not just flavour.',
      },
      {
        title: 'Activations',
        body: 'Pop-up experiences at two Beirut markets. Custom branded teaware, live content capture, micro-influencer partnerships with writers and chefs.',
      },
    ],
    results: [
      { value: '18K', label: 'New followers in launch month' },
      { value: '89%', label: 'Sell-through at market activations' },
      { value: '4.1M', label: 'Campaign content impressions' },
      { value: '3.4×', label: 'Website sessions increase' },
    ],
  },
  {
    slug: 'restaurant-concept',
    index: 3,
    name: 'Restaurant Concept',
    industry: 'Premium Restaurant / Café',
    year: '2024',
    tagline: 'Every table, a stage.',
    services: ['Website', 'Branding', 'Content', 'Meta Ads'],
    description: 'A dining experience that needed to be felt before the first visit — built to make reservations feel like acquiring something rare.',
    challenge:
      'The restaurant had an extraordinary dining experience but a digital presence that gave no indication of it. Walk-ins were unpredictable, online reservations were scarce, and their brand had no hierarchy — they looked like everyone else on the street.',
    strategy:
      'We treated the restaurant like a luxury brand, not a hospitality business. The brief was clear: before anyone tastes the food, they must feel the atmosphere. Every digital touchpoint had to carry the weight of the room.',
    execution: [
      {
        title: 'Website',
        body: 'A dark, cinematic website — full-screen visuals, choreographed scroll animations, reservation CTA above the fold. Sub-2 second load time. Designed to convert, not impress.',
      },
      {
        title: 'Branding',
        body: 'A refined identity system: wordmark, color palette, menu typography, staff card design, and a complete brand guide for every surface.',
      },
      {
        title: 'Content Direction',
        body: 'Monthly content series — plating detail shots, kitchen stories, ambient evening sequences. Art-directed, never just photographed.',
      },
      {
        title: 'Meta Advertising',
        body: 'Location-based campaigns targeting Beirut\'s upper-income demographics. Seasonal menus became high-converting ad creative.',
      },
    ],
    results: [
      { value: '91%', label: 'Tables booked in advance (peak)' },
      { value: '3.1×', label: 'Website conversion rate improvement' },
      { value: '220%', label: 'Social following growth (6 months)' },
      { value: '1.9×', label: 'Average check size increase' },
    ],
  },
  {
    slug: 'real-estate-concept',
    index: 4,
    name: 'Real Estate Concept',
    industry: 'Luxury Property Brand',
    year: '2024',
    tagline: 'Property is not sold. It is coveted.',
    services: ['Website', 'Lead Generation', 'Meta Ads', 'Visual Identity'],
    description: 'A luxury property brand repositioned from transaction-driven to desire-driven — creating demand before supply.',
    challenge:
      'The market was flooded with look-alike real estate brands: the same fonts, the same urgency, the same desperation. The brand needed to communicate exclusivity, not availability. It needed to pull, not push.',
    strategy:
      'We built a brand that whispers, never shouts. The strategy was aspirational lifestyle positioning — sell the life that comes with the property, not the square meters. Lead quality over lead volume.',
    execution: [
      {
        title: 'Visual Identity',
        body: 'A refined mark, dark palette with gold accents, and a visual system that reads like a private members\' club, not a real estate agency.',
      },
      {
        title: 'Website',
        body: 'Property listings presented as editorial features. Each space given a story, not a spec sheet. Scroll-driven animations, no generic gallery sliders.',
      },
      {
        title: 'Lead Generation',
        body: 'Multi-step lead funnels with high-intent audience segmentation. Quality over volume — 23 qualified leads in month one from a minimal spend.',
      },
      {
        title: 'Meta Advertising',
        body: 'Premium creative in carousel and video formats. Targeting: high-net-worth individuals, ages 30–55, with interests in luxury travel, finance, and architecture.',
      },
    ],
    results: [
      { value: '23', label: 'Qualified leads in month one' },
      { value: '4.8×', label: 'Lead quality vs. previous agency' },
      { value: '68%', label: 'Reduction in cost-per-lead' },
      { value: '2', label: 'Properties sold via social attribution' },
    ],
  },
  {
    slug: 'fashion-beauty-concept',
    index: 5,
    name: 'Fashion & Beauty',
    industry: 'Luxury Lifestyle Brand',
    year: '2025',
    tagline: 'The brand is the product.',
    services: ['Content Creation', 'Branding', 'Social Media', 'Campaigns'],
    description: 'A fashion and beauty brand built from silence — no announcement, no explanation, just a visual world that pulled people in.',
    challenge:
      'The founders had an extraordinary aesthetic vision but no framework to translate it into brand strategy. What existed was a mood board. What was needed was a world — one that could attract without explaining itself.',
    strategy:
      'We started with silence. No product push, no price, no urgency. Three weeks of pure visual storytelling to establish a presence before the first product reveal. The goal: make people feel they discovered something, not that they were sold to.',
    execution: [
      {
        title: 'Brand World',
        body: 'A complete visual and verbal identity — tone of voice, content pillars, visual references, and a brand manifesto written to attract, not convince.',
      },
      {
        title: 'Content Creation',
        body: 'Art-directed photo and video content. Every frame intentional. Every caption minimal. The brand speaks in imagery. Words are used only when they earn it.',
      },
      {
        title: 'Social Media',
        body: 'A posting cadence built on scarcity: fewer posts, higher impact. Each drop treated as an event. Followers experienced anticipation, not a feed.',
      },
      {
        title: 'Campaign',
        body: 'Launch campaign themed around presence — "The ones who notice, know." Seeded with three micro-influencers in fashion and contemporary art.',
      },
    ],
    results: [
      { value: '12K', label: 'Followers before first product drop' },
      { value: '100%', label: 'First-drop sell-through in 4 hours' },
      { value: '6.2×', label: 'Average content engagement rate' },
      { value: '8', label: 'Press mentions in launch month' },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string): Project | undefined {
  const idx = projects.findIndex((p) => p.slug === slug)
  if (idx === -1) return undefined
  return projects[(idx + 1) % projects.length]
}
