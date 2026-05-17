export interface ImpactMetric {
  name: string;
  households: number;
  youths: number;
  women: number;
}

export interface SuccessStory {
  slug: string;
  title: string;
  summary: string;
  beneficiary: string;
  location: string;
  program: string;
  image: string;
  outcome: string[];
}

export interface ProgramDetail {
  slug: string;
  title: string;
  shortDescription: string;
  location: string;
  mapQuery: string;
  image: string;
  goals: string[];
  updates: { date: string; title: string; note: string }[];
}

export const impactMetrics: ImpactMetric[] = [
  { name: "Q1", households: 320, youths: 140, women: 220 },
  { name: "Q2", households: 460, youths: 210, women: 310 },
  { name: "Q3", households: 590, youths: 320, women: 420 },
  { name: "Q4", households: 740, youths: 390, women: 510 },
];

export const successStories: SuccessStory[] = [
  {
    slug: "hana-produce-stand",
    title: "Hana Rebuilt Her Income Through Produce Trading",
    summary: "After displacement, Hana joined a livelihood training cycle and launched a small produce stand.",
    beneficiary: "Hana M.",
    location: "Debre Birhan, North Shewa",
    program: "Livelihood Support",
    image: "/gallery/photo3.jpg",
    outcome: [
      "Children returned to school with supplies.",
      "Household meals stabilized from one to three daily.",
      "Business savings started for emergency resilience.",
    ],
  },
  {
    slug: "community-water-point",
    title: "A New Water Point Reduced Disease Risk",
    summary: "A community-led WASH intervention established a reliable safe-water point for 200+ households.",
    beneficiary: "Kebele 04 Community",
    location: "Shewa Robit, North Shewa",
    program: "Water, Sanitation & Hygiene",
    image: "/gallery/volunteers-planting.jpg",
    outcome: [
      "Walking time to water source reduced by 60%.",
      "Improved hygiene behavior in schools and households.",
      "Reported diarrhea cases dropped at local health post.",
    ],
  },
];

export const programDetails: ProgramDetail[] = [
  {
    slug: "sustainable-agriculture",
    title: "Sustainable Agriculture",
    shortDescription: "Climate-smart agriculture, inputs, and coaching that improve long-term food security.",
    location: "Menz Gera Midir, North Shewa",
    mapQuery: "Menz Gera Midir, North Shewa, Ethiopia",
    image: "/gallery/agriculture-demo.mp4",
    goals: [
      "Improve household food production through climate-smart practices.",
      "Increase farmer resilience through seed and soil management support.",
      "Strengthen market access for smallholder producers.",
    ],
    updates: [
      { date: "2026-02-14", title: "Farmer Field School Launched", note: "48 lead farmers began hands-on seasonal learning." },
      { date: "2026-03-21", title: "Compost and Soil Session", note: "Community trainers demonstrated low-cost soil restoration methods." },
      { date: "2026-04-30", title: "First Harvest Tracking", note: "Pilot sites reported yield improvements versus baseline." },
    ],
  },
  {
    slug: "livelihood-support",
    title: "Livelihood Support",
    shortDescription: "Skills and enterprise coaching for women and youth to build stable income pathways.",
    location: "Debre Sina, North Shewa",
    mapQuery: "Debre Sina, North Shewa, Ethiopia",
    image: "/gallery/training-session.mp4",
    goals: [
      "Deliver market-oriented vocational and enterprise training.",
      "Provide coaching and starter support for micro businesses.",
      "Connect youth and women to local employers and buyers.",
    ],
    updates: [
      { date: "2026-01-28", title: "Skills Cohort Graduation", note: "92 youth completed practical vocational modules." },
      { date: "2026-03-06", title: "Women Enterprise Clinic", note: "Business planning and pricing workshops completed." },
      { date: "2026-04-18", title: "Mentorship Network", note: "Local mentors matched with first-time entrepreneurs." },
    ],
  },
];

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  imageEmoji: string;
  body: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "agricultural-training-program-launched",
    title: "New Agricultural Training Program Launched",
    excerpt:
      "Five hundred smallholder farmers in North Shewa receive training on climate-resilient farming techniques.",
    date: "2026-04-15",
    category: "Program Update",
    tags: ["agriculture", "training", "climate"],
    imageEmoji: "🌾",
    body: [
      "Tseday Charity has expanded its farmer field school network with a new cohort focused on drought-resilient crops and soil conservation.",
      "Participants receive practical coaching on composting, integrated pest management, and water-efficient irrigation tailored to local conditions.",
      "Early monitoring shows strong attendance and peer learning between lead farmers and neighboring households.",
    ],
  },
  {
    slug: "partnership-local-health-centers",
    title: "Partnership with Local Health Centers",
    excerpt:
      "Expanding nutrition support services to reach more mothers and children in remote communities.",
    date: "2026-03-28",
    category: "Partnership",
    tags: ["health", "nutrition", "partners"],
    imageEmoji: "🏥",
    body: [
      "We formalized collaboration with district health centers to align nutrition screening with livelihood programming.",
      "Community health workers now refer at-risk families to Tsedey-supported food assistance and skills programs.",
      "The partnership strengthens referrals, reduces duplication, and improves follow-up for mothers and young children.",
    ],
  },
  {
    slug: "youth-skills-training-graduation",
    title: "Youth Skills Training Graduation",
    excerpt:
      "One hundred twenty young women complete vocational training in tailoring, catering, and digital literacy.",
    date: "2026-03-10",
    category: "Success Story",
    tags: ["youth", "women", "skills"],
    imageEmoji: "🎓",
    body: [
      "Graduates completed hands-on modules combining technical skills with financial literacy and workplace readiness.",
      "Local enterprises joined a mentorship day to interview graduates and explore apprenticeship placements.",
      "Tsedey continues alumni coaching to support income tracking and business stability through the next season.",
    ],
  },
];

export const newsTagList = Array.from(
  new Set(newsArticles.flatMap((a) => a.tags)),
).sort();

export interface AnnualReport {
  year: number;
  title: string;
  summary: string;
  /** Place PDFs in `public/reports/` and reference here, e.g. `/reports/tsedey-annual-2025.pdf` */
  fileUrl: string;
  fileLabel: string;
}

export const annualReports: AnnualReport[] = [
  {
    year: 2025,
    title: "Annual Report 2025",
    summary: "Program reach, finances overview, and stories of resilience across North Shewa.",
    fileUrl: "/reports/tsedey-annual-2025.pdf",
    fileLabel: "PDF download",
  },
  {
    year: 2024,
    title: "Annual Report 2024",
    summary: "Livelihoods, nutrition, and WASH milestones with community-led highlights.",
    fileUrl: "/reports/tsedey-annual-2024.pdf",
    fileLabel: "PDF download",
  },
];

export interface Partner {
  id: string;
  name: string;
  type: string;
  description: string;
}

export const partners: Partner[] = [
  {
    id: "shewa-zonal-admin",
    name: "North Shewa Zonal Administration",
    type: "Government",
    description: "Coordination on community priorities, displacement response planning, and local implementation partnerships.",
  },
  {
    id: "district-health",
    name: "District Health Offices",
    type: "Health",
    description: "Joint outreach on maternal and child nutrition alongside primary care referrals.",
  },
  {
    id: "farmer-coops",
    name: "Farmer Cooperatives",
    type: "Community",
    description: "Market linkage support and peer learning networks for smallholder producers.",
  },
  {
    id: "youth-networks",
    name: "Youth Employment Networks",
    type: "Civil Society",
    description: "Skills fairs, mentorship matching, and workplace readiness workshops.",
  },
];
