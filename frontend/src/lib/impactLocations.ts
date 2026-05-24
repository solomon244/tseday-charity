export type ImpactLocation = {
  id: string;
  name: string;
  district: string;
  programs: string[];
  /** Position within map bbox (percent, 0–100) */
  x: number;
  y: number;
  lat: number;
  lng: number;
};

/** North Shewa / Amhara program areas — bbox ~38.2–40.0°E, 8.8–10.2°N */
export const IMPACT_MAP_BBOX = {
  west: 38.2,
  east: 40.0,
  south: 8.8,
  north: 10.2,
};

export const impactLocations: ImpactLocation[] = [
  {
    id: "debre-birhan",
    name: "Debre Birhan",
    district: "North Shewa Zone",
    programs: ["Headquarters", "Livelihoods", "Education", "Emergency relief"],
    lat: 9.684,
    lng: 39.532,
    x: 73,
    y: 37,
  },
  {
    id: "efrata-gidim",
    name: "Efrata Gidim",
    district: "North Shewa Zone",
    programs: ["Youth skills", "Agriculture training", "Nutrition outreach"],
    lat: 9.55,
    lng: 39.35,
    x: 64,
    y: 46,
  },
  {
    id: "antsokiya",
    name: "Antsokiya",
    district: "North Shewa Zone",
    programs: ["Maternal nutrition", "Community health", "WASH"],
    lat: 9.78,
    lng: 39.68,
    x: 82,
    y: 30,
  },
  {
    id: "shewa-robitt",
    name: "Shewa Robit",
    district: "North Shewa Zone",
    programs: ["IDP support", "Livelihood recovery", "Peace building"],
    lat: 9.62,
    lng: 39.9,
    x: 94,
    y: 41,
  },
  {
    id: "mehal-meda",
    name: "Mehal Meda",
    district: "North Shewa Zone",
    programs: ["Farmer cooperatives", "Water access", "Gender protection"],
    lat: 9.72,
    lng: 39.15,
    x: 53,
    y: 34,
  },
];

export function locationMapUrl(loc: ImpactLocation): string {
  return `https://www.openstreetmap.org/?mlat=${loc.lat}&mlon=${loc.lng}#map=12/${loc.lat}/${loc.lng}`;
}

export function regionEmbedUrl(): string {
  const { west, south, east, north } = IMPACT_MAP_BBOX;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${west}%2C${south}%2C${east}%2C${north}&layer=mapnik&marker=9.684%2C39.532`;
}
