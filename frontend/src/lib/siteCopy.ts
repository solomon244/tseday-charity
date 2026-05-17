import type { Lang } from "@/lib/i18n";

/** Navbar top-level link labels */
export function navLabels(lang: Lang): Record<string, string> {
  const isAm = lang === "am";
  if (!isAm) {
    return {
      Home: "Home",
      About: "About",
      Programs: "Programs",
      Impact: "Impact",
      News: "News",
      "Get Involved": "Get Involved",
      Contact: "Contact",
      Donate: "Donate Now",
      Volunteer: "Volunteer",
    };
  }
  return {
    Home: "መነሻ",
    About: "ስለ እኛ",
    Programs: "ፕሮግራሞች",
    Impact: "ተፅዕኖ",
    News: "ዜና",
    "Get Involved": "ተሳትፉ",
    Contact: "ያግኙን",
    Donate: "ይለግሙ",
    Volunteer: "ልምድ አጋር",
  };
}

export function heroCopy(lang: Lang) {
  const isAm = lang === "am";
  if (!isAm) {
    return {
      badge: "North Shewa • Livelihoods, nutrition & resilience",
      headline: "Dignity and lasting opportunity for North Shewa's most vulnerable neighbors",
      sub:
        "Tseday Charity pairs emergency humanitarian support with sustainable livelihoods, better nutrition, and community-led resilience—for displaced persons, women, and youth. Together we move families from crisis toward self-reliance.",
      etbLinePrefix: "",
      etbLineBold: "100 ETB",
      etbLineSuffix: " can fuel a day of relief and recovery for a household.",
      donate: "Support our mission",
      seeYourImpact: "See where gifts go",
      statLives: "Lives Impacted",
      statVolunteers: "Active Volunteers",
      trusted: "Trusted",
      trustedBy: "By Communities",
      trustFootnote: "Registered Charity in Ethiopia • Secure Donations • Transparent Impact Reporting",
      totalRaised: "Total Raised",
      impactCardCaption: "Community gifts • Transparent reporting",
      scrollExplore: "Scroll to explore",
    };
  }
  return {
    badge: "ሰሜን ሸዋ • የምግብ ዋስትና፣ ተፅዕኖ እና ጥንካሬ",
    headline: "ለተጋለጡ ጎረቤቶች ክብር እና የዘላለም እድል በሰሜን ሸዋ",
    sub:
      "ጽድ ቻሪቲ አስቸኳይ ሰብዓዊ እርዳታን ከዘላለም የምግብ ዋስትና እና በማህበረሰብ ጥንካሬ ፕሮግራሞች ጋር ያገናዝባል ለተፈናቃዮች፣ ለሴቶች እና ለወጣቶች። በጋራ ከችግር ወደ ራስ መተማመን እንመርቃለን።",
    etbLinePrefix: "",
    etbLineBold: "100 ብር",
    etbLineSuffix: " ለአንድ ቤተሰብ የአንድ ቀን አስቸኳይ እና የመልካም መነሻ ድጋፍ ሊሆን ይችላል።",
    donate: "ድርጅታችንን ይደግፉ",
    seeYourImpact: "ስጦታ የሚሄድበትን ይመልከቱ",
    statLives: "የተደረሱ ሕይወቶች",
    statVolunteers: "ንቁ ልምድ አጋሮች",
    trusted: "የታመነ",
    trustedBy: "በማህበረሰቦች",
    trustFootnote: "በኢትዮጵያ የተመዘገበ • አስተማማኝ ለግስ • ግልጽ ሪፖርት",
    totalRaised: "ጠቅላላ የተሰበሰበ",
    impactCardCaption: "የማህበረሰብ ስጦታ • ግልጽ ሪፖርት",
    scrollExplore: "ለመመልከት ይሸብልሉ",
  };
}

export function newsSectionCopy(lang: Lang) {
  const isAm = lang === "am";
  if (!isAm) {
    return {
      title: "Latest Updates",
      subtitle: "News and stories from our work in North Shewa",
      viewAll: "View all updates",
    };
  }
  return {
    title: "የቅርብ ጊዜ ዝመናዎች",
    subtitle: "የሰሜን ሸዋ ስራችን ዜና እና ታሪኮች",
    viewAll: "ሁሉንም ይመልከቱ",
  };
}

export function getInvolvedCopy(lang: Lang) {
  const isAm = lang === "am";
  if (!isAm) {
    return {
      title: "Get Involved",
      subtitle: "Humanity First means action. Choose how you want to contribute to resilient communities.",
      bannerTitle: "Ready to Make a Difference?",
      bannerSubtitle:
        "Every contribution, whether time, resources, or advocacy, helps us build self-reliant communities in North Shewa.",
      bannerDonate: "Donate Today",
      bannerVolunteer: "Volunteer Now",
      actions: [
        {
          title: "Make a Donation",
          desc: "Your donation delivers immediate food support, education essentials, and livelihood recovery for families in need.",
          cta: "Donate Now",
        },
        {
          title: "Volunteer With Us",
          desc: "Contribute your time and skills to community projects that create practical and lasting change.",
          cta: "Apply to Volunteer",
        },
        {
          title: "Partner & Advocate",
          desc: "Partner with Tseday Charity to expand impact, fund local initiatives, and amplify vulnerable voices.",
          cta: "Partner With Us",
        },
      ],
    };
  }
  return {
    title: "ተሳትፉ",
    subtitle: "«የሰው ልጅ በመጀመሪያ» ተግባር ማለት ነው። ለጠንካራ ማህበረሰቦች እንዴት መዋል እንደሚችሉ ይምረጡ።",
    bannerTitle: "ለውጥ ለመፍጠር ዝግጁ ነዎት?",
    bannerSubtitle:
      "ጊዜ፣ ሀብት ወይም አምባ አድራጊነት እያንዳንዱ አስተዋጽኦ በሰሜን ሸዋ ራስን ተቻይ ማህበረሰቦችን ለመገንባት ይረዳል።",
    bannerDonate: "ዛሬ ይለግሙ",
    bannerVolunteer: "አሁን ልምድ ይስጡ",
    actions: [
      {
        title: "ለግስ ያድርጉ",
        desc: "ለግስዎ ለድሆች ቤተሰቦች አስቸኳይ የምግብ ድጋፍ፣ የትምህርት እቃዎች እና የምግብ ዋስትና እድል ያመጣል።",
        cta: "አሁን ይለግሙ",
      },
      {
        title: "ልምድ ተባባሪ ይሁኑ",
        desc: "ጊዜዎን እና ክህሎትዎን ለማህበረሰብ ፕሮጀክቶች ያስተውሉ።",
        cta: "ልምድ ይመዝገቡ",
      },
      {
        title: "አጋር እና አምባ አድርጉ",
        desc: "ተፅዕኖ ለማሳደግ እና የተጋለጡ ድምፆችን ለማሳየት ከእኛ ጋር ይስሩ።",
        cta: "አጋር ይሁኑ",
      },
    ],
  };
}

export function programsMenuCopy(lang: Lang) {
  return lang === "am"
    ? { areas: "የፕሮግራም ዘርፎች", viewAll: "ሁሉንም ይመልከቱ" }
    : { areas: "Program Areas", viewAll: "View all programs" };
}
