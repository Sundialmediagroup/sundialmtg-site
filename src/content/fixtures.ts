/**
 * Seed content copied from the prototype. Used by the fixture CMS adapter
 * until the independent Nova instance (SUN-1125) is serving real data.
 * Copy marked PLACEHOLDER still needs sign-off.
 */
import type {
  Brand,
  BrandCategory,
  CaseStudy,
  Experience,
  ExperienceFormat,
  Partner,
  Product,
  SiteSettings,
  Stat,
  Value,
} from "@/types/content";

const media = (key: string, alt = "", focalPoint = "50% 30%") => ({
  src: `/media/${key}.jpg`,
  alt,
  focalPoint,
});
const logo = (key: string, alt: string) => ({ src: `/logos/${key}.png`, alt });
const stats = (...pairs: [string, string][]): Stat[] => pairs.map(([value, label]) => ({ value, label }));

/* ------------------------------------------------------------------ */
/* Brands                                                              */
/* ------------------------------------------------------------------ */

type BrandRow = [string, string, BrandCategory, string, string, string, [string, string][], string, string];

const BRAND_ROWS: BrandRow[] = [
  ["essence", "ESSENCE", "Media", "We Love Us", "p14", "Culture, celebration, and collective experience.", [["8.5M", "Readership"], ["7.9M", "Social followers"], ["600+", "Bi-monthly issues"]], "For over 50 years, ESSENCE Magazine has celebrated, educated, and empowered Black women. Through content that captures the heart, intellect, and spirit of Black womanhood, ESSENCE reaches over 23 million globally each month.", "https://essence.com"],
  ["efoc", "ESSENCE Festival of Culture", "Festival", "Made Like This", "p15", "The largest celebration of Black music and culture.", [["3.5M", "Attendees"], ["$316M+", "Economic impact"], ["1.1M", "Social followers"]], "The nation’s largest annual celebration of Black music and culture, featuring ESSENCE Empowerment Seminars and performances by legends like Prince, Beyoncé, and Diana Ross. Since 1995 it has drawn crowds to New Orleans each July 4th weekend.", "https://essencefestival.com"],
  ["studios", "ESSENCE Studios", "Studios", "All Things Black Entertainment", "p10", "The creative lab for Black entertainment.", [["20+", "Original productions"], ["100+", "Episodes and mini-series"], ["2M", "Monthly video plays"]], "The creative lab for Black entertainment, delivering exclusive content across film, TV, live, and streaming, with hits like No Filter with Naomi and Black Women in Hollywood.", "https://essencestudios.com"],
  ["gu", "ESSENCE Girls United", "Community", "The Next Era", "p02", "Emerging voices and next-generation culture.", [["326K", "Monthly engagements"], ["3.9M", "Monthly impressions"], ["247K", "Social followers"]], "ESSENCE Girls United helps the next generation of young Black girls turn beautiful possibilities into their reality. Tailored for Gen Z, it offers the tools for beauty, education, and success through mentorship and resources.", "https://girlsunited.essence.com"],
  ["r29", "Refinery29", "Media", "The Creative Global Platform for All Young People", "p01", "Discovery, perspective, and personal expression.", [["37.5M", "Engagements"], ["50M", "Global reach"], ["18M", "Social followers"]], "For nearly 20 years, Refinery29 has redefined how content represents women and underrepresented communities, reflecting today’s audiences and anticipating tomorrow’s cultural shifts.", "https://refinery29.com"],
  ["unbothered", "Unbothered", "Media", "Celebrating Black Womanhood and Folx", "p04", "Identity, joy, and shared experience.", [["37.5M", "Platform engagements"], ["50M", "Platform reach"], ["18M", "Platform followers"]], "Refinery29’s Unbothered is made by and for vibrant Black folx, celebrating our strength, power, and beauty while seeking to elevate our culture, a safe space where Black folx can feel seen and be heard.", "https://www.refinery29.com/unbothered"],
  ["somos", "Somos", "Media", "Empowering the Future of Latine Voices", "p05", "Heritage, cultural pride, and expression.", [["37.5M", "Platform engagements"], ["50M", "Platform reach"], ["18M", "Platform followers"]], "Somos elevates, educates, and inspires the next generation of Latine changemakers, championing visibility and celebrating our diverse cultural experiences.", "https://www.refinery29.com/latinx-somos"],
  ["afropunk", "AFROPUNK", "Festival", "Lifting Voices, Leading Revolutions", "p12", "Creative freedom and cultural expression.", [["10K", "In-person attendees"], ["3M", "Monthly impressions"], ["3.3M", "Social followers"]], "A global platform celebrating Black creativity, diversity, and freedom of expression. From its Brooklyn roots to Bahia, Paris, Johannesburg, and Dakar, AFROPUNK amplifies voices of change.", "https://afropunk.com"],
  ["beautycon", "Beautycon", "Beauty", "The Future of Beauty", "p07", "Beauty obsession, creativity, and community.", [["6K", "In-person attendees"], ["1.27M", "Unique global attendees"], ["793K", "Social followers"]], "A convening beacon for the beauty community: enthusiasts, experts, brands, and thought leaders, through its annual conference and multi-platform coverage since 2012.", "https://beautycon.com"],
  ["curly", "NaturallyCurly", "Beauty", "Empowering Everyone Through Every Kind of Curl", "p09", "Every kind of curl, every kind of community.", [["2.4M", "Monthly impressions"], ["293K", "Monthly video views"], ["236K", "Social followers"]], "The leading resource for the natural and textured hair community for the past 20 years, uniting people of all ages, ethnicities and textures.", "https://www.naturallycurly.com"],
];

export const brands: Brand[] = BRAND_ROWS.map(([id, name, category, tagline, img, territory, s, description, url], order) => ({
  id,
  slug: id,
  name,
  category,
  tagline,
  territory,
  description,
  logo: logo(id, name),
  hero: media(img, "", "50% 25%"),
  stats: stats(...s),
  website: { label: `Visit ${url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}`, href: url, external: true },
  order,
}));

/* ------------------------------------------------------------------ */
/* Experiences                                                         */
/* ------------------------------------------------------------------ */

type ExpRow = [string, string, string, string, ExperienceFormat, string];

const EXP_ROWS: ExpRow[] = [
  ["ESSENCE Festival of Culture", "efoc", "New Orleans", "p15", "Festival", "The nation’s largest annual celebration of Black music and culture. More than a concert: 20+ all-weekend experiences, from the ESSENCE Stage to Wellness House, Hollywood House and the Food & Wine Festival."],
  ["AFROPUNK Brooklyn", "afropunk", "Brooklyn", "p12", "Festival", "A haven for artists, thinkers, and dreamers. AFROPUNK’s flagship festival celebrates Black creativity, diversity, and freedom of expression."],
  ["Black Women In Hollywood", "essence", "ESSENCE", "p10", "Franchise", "ESSENCE’s annual celebration of the Black women shaping film and television, presented with ESSENCE Studios."],
  ["Beautycon™ LA", "beautycon", "Los Angeles", "p07", "Festival", "The industry’s largest multi-day beauty event: a hub for trends and iconic voices, celebrating uniqueness as beauty."],
  ["29Rooms", "r29", "Refinery29", "p01", "Live experience", "Refinery29’s immersive playground of culture and creativity, built room by room with artists and partners."],
  ["Black Women In Sports", "essence", "ESSENCE", "p13", "Franchise", "Honoring the Black women redefining the game, on and off the field."],
  ["GU® Creators House", "gu", "New Orleans", "p02", "Live experience", "A home base for Gen Z creators during ESSENCE Fest, from Girls United."],
  ["Hollywood House", "essence", "ESSENCE", "p11", "Live experience", "Conversations, screenings and celebrations with the people behind Black film and television."],
  ["Beautycon™ @EssenceFest", "beautycon", "New Orleans", "p06", "Activation", "Beautycon’s edition inside the ESSENCE Festival of Culture."],
  ["Fashion House", "essence", "ESSENCE", "p14", "Live experience", "ESSENCE’s celebration of Black designers, stylists and fashion creatives."],
  ["GU® Disruptor Summit", "gu", "Essence GU", "p08", "Summit", "Gen Z changemakers and the leaders investing in them, together for a day of ideas."],
  ["AFROPUNK Bahia", "afropunk", "Salvador, Brazil", "p03", "Festival", "AFROPUNK’s festival in Bahia, celebrating the global Black experience."],
  ["Texture On The Runway", "curly", "NaturallyCurly", "p09", "Franchise", "A runway celebration of natural and textured hair from NaturallyCurly."],
  ["Holiday Festival of Joy", "essence", "ESSENCE", "p04", "Festival", "ESSENCE’s seasonal gathering of music, shopping and community."],
  ["GU® Holiday Party", "gu", "Essence GU", "p05", "Party series", "Girls United’s end-of-year celebration with its community."],
];

const ALL_IMAGES = Array.from({ length: 15 }, (_, i) => `p${String(i + 1).padStart(2, "0")}`);
const slugify = (s: string) => s.toLowerCase().replace(/[™®@]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const experiences: Experience[] = EXP_ROWS.map(([name, brand, location, img, format, summary], i) => ({
  id: slugify(name),
  slug: slugify(name),
  name,
  brand,
  location,
  format,
  status: "upcoming",
  summary,
  hero: media(img, name),
  gallery: [img, ...ALL_IMAGES.filter((p) => p !== img).slice((i * 2) % 9, ((i * 2) % 9) + 5)].map((k) => media(k)),
}));

/* ------------------------------------------------------------------ */
/* Products. Sitemap names; copy comes from the prototype's "What we bring". */
/* ------------------------------------------------------------------ */

export const products: Product[] = [
  { id: "experiential", slug: "experiential", name: "Experiential", tagline: "Bring brands into culture.", summary: "Our festivals, franchises, and cultural experiences invite brands to participate in the moments and communities people care about, rather than simply sponsor them.", offerings: ["ESSENCE Festival of Culture", "Black Women In", "Beautycon"], order: 0 },
  { id: "media-advertising", slug: "media-advertising", name: "Media & Advertising", tagline: "Extend connection at scale.", summary: "Our media solutions help brands reach culturally relevant audiences across trusted environments, powered by technology and informed by cultural understanding.", offerings: ["Sundial One", "Programmatic", "Run-of-network"], order: 1 },
  { id: "research-insights", slug: "research-cultural-insights", name: "Research & Cultural Insights", tagline: "Turn cultural understanding into proprietary intelligence.", summary: "Our insights and technology help brands understand where culture is moving, identify meaningful opportunities, and make more informed decisions about how to participate.", offerings: ["Culture Codes", "Understand → Identify → Activate → Measure"], order: 2 },
  { id: "branded-content", slug: "branded-content-production", name: "Branded Content & Production", tagline: "Create what culture needs next.", summary: "Our creative capabilities help brands turn cultural understanding into original ideas, content, and experiences that people want to be part of.", offerings: ["Creative strategy & ideation", "Event & content production", "Branded content"], order: 3 },
  // PLACEHOLDER copy — THEIA is not in the prototype yet.
  { id: "theia", slug: "theia", name: "THEIA — Creator & Talent", tagline: "Partner with the voices culture follows.", summary: "Creator and talent partnerships that connect brands with the people shaping culture across our communities.", offerings: ["Talent & creator partnerships"], order: 4 },
];

/* ------------------------------------------------------------------ */
/* Case studies. PLACEHOLDER copy from the prototype's highlights.    */
/* ------------------------------------------------------------------ */

export const caseStudies: CaseStudy[] = [
  { id: "efoc-recap", slug: "essence-festival-recap", title: "Three days in New Orleans: inside the ESSENCE Festival of Culture", client: "ESSENCE", kicker: "Festival · Recap", excerpt: "From the main stage to Wellness House, a look at the moments that turned one weekend into a homecoming for Black music, culture and community.", hero: media("p15", "", "50% 30%"), brands: ["efoc"], products: ["experiential"], publishedAt: "2026-07-10", featured: true },
  { id: "bwih", slug: "black-women-in-hollywood", title: "Black Women in Hollywood celebrates the women shaping what we watch", client: "ESSENCE", kicker: "Franchise · Highlight", excerpt: "ESSENCE’s annual gathering honors the storytellers, stars and executives redefining film and television, and the community that lifts them up.", hero: media("p10", "", "50% 25%"), brands: ["essence", "studios"], products: ["experiential", "branded-content"], publishedAt: "2026-03-12", featured: true },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const partners: Partner[] = [
  { id: "gbef", name: "Global Black Economic Forum", logo: logo("gbef", "Global Black Economic Forum"), url: "http://www.gbef.com/", kind: "forum" },
  { id: "nvf", name: "New Voices Foundation", logo: logo("nvf", "New Voices Foundation"), url: "http://www.newvoicesfoundation.org/", kind: "foundation" },
  { id: "nvfund", name: "New Voices Fund", logo: logo("nvfund", "New Voices Fund"), url: "http://www.newvoicesfund.com/", kind: "fund" },
  { id: "soko", name: "ESSENCE SokoMrkt", logo: logo("soko", "ESSENCE SokoMrkt"), url: "https://www.essence.com/sokomrkt/", kind: "marketplace" },
];

export const values: Value[] = [
  { title: "Forever Authentic", description: "Trusting the power of lived experiences, shared, and committing to understanding the original expressions of the communities we cultivate." },
  { title: "Purposeful Connection", description: "Pushing the boundaries of culture with fresh, honest stories. True connection is driven by quality, not quantity." },
  { title: "Sacred Spaces", description: "Nurturing vibrant communities where people are invited to connect, share, and participate, and feel heard, affirmed, and ignited by passion." },
  { title: "Individual Power", description: "Uplifting every person as an individual, providing a platform for the voices, talent, and experiences that inspire them to grow." },
];

/* ------------------------------------------------------------------ */
/* Home-only collections                                               */
/* ------------------------------------------------------------------ */

export const formats = [
  { label: "Festivals & Mega Events", href: "/experiences", media: media("p12") },
  { label: "Summits & Live Experiences", href: "/experiences", media: media("p02") },
  { label: "Dinner & Awards", href: "/experiences", media: media("p10") },
  { label: "Print", href: "/brands", media: media("p14") },
  { label: "Branded Experiences", href: "/products", media: media("p03") },
];

export const carouselBrandOrder = ["essence", "r29", "beautycon", "afropunk", "unbothered", "gu", "somos", "efoc", "studios", "curly"];

/* ------------------------------------------------------------------ */
/* Site settings                                                       */
/* ------------------------------------------------------------------ */

export const settings: SiteSettings = {
  name: "Sundial Media & Technology Group",
  tagline: "Belonging begins here",
  nav: [
    { label: "Products", href: "/products" },
    { label: "Brands", href: "/brands" },
    { label: "Experiences", href: "/experiences" },
    { label: "Our Work", href: "/our-work" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
  ],
  primaryAction: { label: "Partner with us", href: "/partner" },
  socials: [
    { label: "Instagram", href: "https://instagram.com/", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/", external: true },
    { label: "YouTube", href: "https://youtube.com/", external: true },
  ],
  footer: {
    company: [
      { label: "Careers", href: "/careers" },
      { label: "Press & contact", href: "/partner" },
    ],
    brandSites: brands.slice(0, 6).map((b) => ({ label: b.name, href: b.website.href, external: true })),
    legal: [
      { label: "Legal", href: "https://sundialmg.com/privacy", external: true },
      { label: "Privacy", href: "https://sundialmg.com/privacy", external: true },
      { label: "Accessibility", href: "/accessibility" },
    ],
    copyright: "© 2026 Sundial Media Group",
  },
  contactEmail: "sundialmg.com/contact",
};
