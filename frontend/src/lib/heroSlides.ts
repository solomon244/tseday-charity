import type { Lang } from "@/lib/i18n";

export interface HeroSlide {
  id: string;
  image: string;
  kicker: string;
  title: string;
  subtitle: string;
}

export function getHeroSlides(lang: Lang): HeroSlide[] {
  if (lang === "am") {
    return [
      {
        id: "humanity-first",
        image: "/gallery/hero.jpg",
        kicker: "ጽድ ቻሪቲ ማህበር",
        title: "ሰው በመጀመሪያ — በሰሜን ሸዋ ክብር እና ተስፋ",
        subtitle: "ለተፈናቃዮች፣ ለሴቶች እና ለወጣቶች የተዋሃደ ሰብዓዊ እርዳታ እና የምግብ ዋስትና።",
      },
      {
        id: "relief",
        image: "/gallery/food-distribution.jpg",
        kicker: "አስቸኳይ እርዳታ",
        title: "በችግር ጊዜ መድረስ፣ በጥንካሬ ጊዜ መቆም",
        subtitle: "የምግብ ድጋፍ፣ የጤና አገልግሎት እና የአካባቢ ጥንካሬ ፕሮግራሞች።",
      },
      {
        id: "livelihoods",
        image: "/gallery/volunteers-planting.jpg",
        kicker: "የምግብ ዋስትና",
        title: "ከአስቸኳይ ወደ ራስ መተማመን",
        subtitle: "የእርሻ ስልጠና፣ የክህሎት ማሳደጊያ እና የሰራት እድሎች።",
      },
      {
        id: "community",
        image: "/gallery/photo3.jpg",
        kicker: "አጋርነት",
        title: "ከማህበረሰብ ጋር ለዘላለም ተፅዕኖ",
        subtitle: "ከመንግስት፣ ከኢንዱስትሪ እና ከሰብዓዊ አጋሮች ጋር በመተባበር።",
      },
    ];
  }

  return [
    {
      id: "humanity-first",
      image: "/gallery/hero.jpg",
      kicker: "Tseday Charity Association",
      title: "Humanity First — Dignity and hope in North Shewa",
      subtitle:
        "Integrated humanitarian and development support for IDPs, women, youth, and disadvantaged households.",
    },
    {
      id: "relief",
      image: "/gallery/food-distribution.jpg",
      kicker: "Emergency Relief",
      title: "There when crisis strikes, staying for recovery",
      subtitle: "Food assistance, health and psychosocial services, and community resilience programs.",
    },
    {
      id: "livelihoods",
      image: "/gallery/volunteers-planting.jpg",
      kicker: "Livelihoods & Agriculture",
      title: "From urgent needs to sustainable self-reliance",
      subtitle: "Skills training, agriculture initiatives, and employment facilitation across the Amhara Region.",
    },
    {
      id: "community",
      image: "/gallery/photo2.jpg",
      kicker: "Partnership",
      title: "Working with communities for lasting impact",
      subtitle:
        "Collaborating with government, industry, and humanitarian partners to build resilient futures.",
    },
  ];
}
