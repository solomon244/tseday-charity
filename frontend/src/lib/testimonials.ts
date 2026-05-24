export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  photo: string;
};

/** Community voices — photos from Tseday field programs in North Shewa. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "When drought hit our area, Tsedey arrived with food and school support. They did not just visit once, they stayed with us.",
    name: "Meseret A.",
    role: "Mother & farmer",
    location: "Debre Birhan, North Shewa",
    photo: "/gallery/food-distribution.jpg",
  },
  {
    quote:
      "Our youth training group gained skills and confidence to earn income. Families now believe in tomorrow again.",
    name: "Abebe T.",
    role: "Youth program graduate",
    location: "Efrata Gidim District",
    photo: "/gallery/volunteers-planting.jpg",
  },
  {
    quote:
      "The nutrition sessions helped mothers in our kebele understand how to feed children well, even when harvests are short.",
    name: "Hanna M.",
    role: "Community health volunteer",
    location: "Antsokiya, North Shewa",
    photo: "/gallery/photo2.jpg",
  },
];
