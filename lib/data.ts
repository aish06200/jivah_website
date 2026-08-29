import type { LifePillar, Project, Story } from "./types";

export const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/#stories", label: "Stories" },
] as const;

export const menuItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "Philosophy" },
  { href: "/stories", label: "Stories" },
  { href: "/life", label: "The Jivah Life" },
  { href: "/locations", label: "Locations" },
  { href: "/guide", label: "Homebuyer Guide" },
  { href: "/contact", label: "Contact" },
] as const;

export const u = (id: string, extras = "") =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80${extras}`;

export const projects: Project[] = [
  {
    slug: "jivah-greens-nashik",
    name: "Jivah Greens",
    location: "Gangapur Road, Nashik",
    city: "Nashik",
    status: "ongoing",
    typology: "2 & 3 BHK residences",
    units: "312 homes",
    startingPrice: "₹68 L",
    possession: "Dec 2027",
    rera: "P51700012345",
    excerpt:
      "A mixed-use neighbourhood where groceries, greenery and family life share the same address.",
    overview:
      "Jivah Greens is planned around the way families in Nashik already live — close to work, close to grandparents, and close to everyday errands. Ground-floor conveniences sit beneath residences that open onto gardens, not parking decks. The masterplan keeps cars to the edge so children, elders and evening walks can occupy the centre.",
    image: "/images/greens.png",
    gallery: [
      "/images/greens.png",
      u("photo-1600585154340-be6161a56a0c"),
      u("photo-1600566753190-17f0baa2a6c3"),
      u("photo-1416879595882-3373a0480b5b"),
      u("photo-1511895426328-dc8714191300"),
      u("photo-1600585154526-990dced4db0d"),
    ],
    residences: [
      { type: "2 BHK", size: "745–890 sq.ft", note: "Efficient family homes with a winter balcony." },
      { type: "3 BHK", size: "1,120–1,340 sq.ft", note: "A third room that can be study, guest or grandparent." },
      { type: "3 BHK + deck", size: "1,480 sq.ft", note: "Corner residences with a garden-facing deck." },
    ],
    amenities: [
      { group: "Everyday", items: ["Freshmart grocery", "WellLife pharmacy", "Crèche", "Concierge"] },
      { group: "Wellness", items: ["Yoga lawn", "Jogging circuit", "Clinic", "Meditation court"] },
      { group: "Play", items: ["Children’s park", "Indoor games", "Skating rink", "Community hall"] },
    ],
    connectivity: [
      { place: "Nashik Road station", time: "18 min" },
      { place: "Gangapur dam & ghats", time: "12 min" },
      { place: "College Road", time: "10 min" },
      { place: "Mumbai–Agra highway", time: "8 min" },
    ],
    updates: [
      { date: "Aug 2026", title: "Tower A structure complete", body: "Slab work on Tower A has reached terrace level. Façade sampling begins next month." },
      { date: "Jun 2026", title: "Clubhouse raft completed", body: "The wellness wing foundation is cast. Landscape contours around the central lawn are underway." },
      { date: "Mar 2026", title: "Sample apartment open", body: "The 3 BHK show apartment is now available for weekend walkthroughs by appointment." },
    ],
    downloads: [
      { title: "Brochure", type: "PDF · 8.4 MB" },
      { title: "Floor plans", type: "PDF · 3.1 MB" },
      { title: "RERA certificate", type: "PDF · 0.4 MB" },
    ],
  },
  {
    slug: "jivah-courtyard-nagpur",
    name: "Jivah Courtyard",
    location: "Wardha Road, Nagpur",
    city: "Nagpur",
    status: "ongoing",
    typology: "1.5, 2 & 3 BHK",
    units: "248 homes",
    startingPrice: "₹54 L",
    possession: "Mar 2028",
    rera: "P50500023456",
    excerpt: "Courtyard living for a city that still walks — shade, water and neighbours in one frame.",
    overview:
      "Nagpur’s heat asks for shade before spectacle. Jivah Courtyard is organised around a planted inner court, with residences looking inward to trees and outward to a quiet street. The ground plane holds a clinic, a grocer and a senior sit-out so daily life does not require a car.",
    image: "/images/courtyard.png",
    gallery: [
      "/images/courtyard.png",
      u("photo-1600585154526-990dced4db0d"),
      u("photo-1416879595882-3373a0480b5b"),
      u("photo-1479839672679-a46483c0e7c8"),
    ],
    residences: [
      { type: "1.5 BHK", size: "580–640 sq.ft", note: "A first home with a real kitchen and a study nook." },
      { type: "2 BHK", size: "790–910 sq.ft", note: "Cross-ventilated, courtyard-facing living." },
      { type: "3 BHK", size: "1,180 sq.ft", note: "A family plan with a utility and a quiet third bedroom." },
    ],
    amenities: [
      { group: "Everyday", items: ["Neighbourhood grocer", "Clinic", "Laundry", "Parcel room"] },
      { group: "Community", items: ["Central courtyard", "Senior sit-out", "Library nook", "Festival lawn"] },
      { group: "Active", items: ["Badminton", "Kids’ play", "Cycling loop", "Open gym"] },
    ],
    connectivity: [
      { place: "MIHAN", time: "20 min" },
      { place: "Nagpur airport", time: "22 min" },
      { place: "Sitabuldi", time: "18 min" },
      { place: "AIIMS Nagpur", time: "15 min" },
    ],
    updates: [
      { date: "Jul 2026", title: "Podium landscape started", body: "Soil and irrigation for the inner court are in place. Native species planting follows the monsoon." },
    ],
    downloads: [
      { title: "Brochure", type: "PDF · 6.2 MB" },
      { title: "RERA certificate", type: "PDF · 0.4 MB" },
    ],
  },
  {
    slug: "jivah-orchard-kolhapur",
    name: "Jivah Orchard",
    location: "Kawala Naka, Kolhapur",
    city: "Kolhapur",
    status: "upcoming",
    typology: "2, 3 BHK & villas",
    units: "186 homes",
    startingPrice: "₹72 L",
    possession: "2029",
    rera: "Registration underway",
    excerpt: "Homes set among mango and coconut — a slower register of mixed-use living.",
    overview:
      "Jivah Orchard keeps the agricultural memory of the plot visible. Residences step back from a retained orchard, with a small high street of daily shops along the public edge. It is designed for families who want more room, more trees, and no reason to leave Kolhapur for a ‘better’ address.",
    image: "/images/orchard.png",
    gallery: [
      "/images/orchard.png",
      u("photo-1416879595882-3373a0480b5b"),
      u("photo-1613490493576-7fde63acd811"),
      u("photo-1441974231531-c6227db76b6e"),
    ],
    residences: [
      { type: "2 BHK", size: "860 sq.ft", note: "Garden-facing with a deep verandah." },
      { type: "3 BHK", size: "1,260–1,410 sq.ft", note: "A family plan organised around a dining court." },
      { type: "Garden villa", size: "1,820 sq.ft", note: "Two-storey homes with a private orchard edge." },
    ],
    amenities: [
      { group: "Landscape", items: ["Retained orchard", "Walking trails", "Community farm", "Seasonal market"] },
      { group: "Wellness", items: ["Pool", "Yoga shala", "Cycling", "Pet lawn"] },
    ],
    connectivity: [
      { place: "Mahalaxmi Temple", time: "14 min" },
      { place: "Kolhapur airport", time: "16 min" },
      { place: "IT Park", time: "11 min" },
    ],
    updates: [
      { date: "Aug 2026", title: "Pre-launch briefings", body: "Priority registration is open for channel partners and early homebuyers." },
    ],
    downloads: [
      { title: "Teaser brochure", type: "PDF · 2.8 MB" },
    ],
  },
  {
    slug: "jivah-ghat-aurangabad",
    name: "Jivah Ghat",
    location: "Cidco, Chhatrapati Sambhajinagar",
    city: "Chhatrapati Sambhajinagar",
    status: "upcoming",
    typology: "2 & 3 BHK",
    units: "220 homes",
    startingPrice: "₹61 L",
    possession: "2029",
    rera: "Registration underway",
    excerpt: "A compact urban block with a public ground floor and quiet homes above.",
    overview:
      "Jivah Ghat treats the street as part of the home. Shops, a pharmacy and a café occupy the base; residences begin at a lifted garden deck. The project is sized for first-time buyers who work in Cidco and still want grandparents nearby.",
    image: "/images/philosophy-lake.png",
    gallery: [
      "/images/philosophy-lake.png",
      u("photo-1545324418-cc1a3fa10c00"),
      u("photo-1487958449943-2429e8be8625"),
    ],
    residences: [
      { type: "2 BHK", size: "720–810 sq.ft", note: "A practical first home with storage that actually works." },
      { type: "3 BHK", size: "1,050–1,190 sq.ft", note: "An extra room for joint families without wasting carpet." },
    ],
    amenities: [
      { group: "Street", items: ["Café", "Pharmacy", "Tuition rooms", "ATM"] },
      { group: "Deck", items: ["Play court", "Reading room", "Festival terrace"] },
    ],
    connectivity: [
      { place: "Cidco bus hub", time: "6 min" },
      { place: "Airport", time: "25 min" },
      { place: "Prozone Mall", time: "12 min" },
    ],
    updates: [],
    downloads: [{ title: "Expression of interest", type: "PDF · 1.1 MB" }],
  },
  {
    slug: "jivah-park-solapur",
    name: "Jivah Park",
    location: "Hotgi Road, Solapur",
    city: "Solapur",
    status: "completed",
    typology: "2 & 3 BHK",
    units: "164 homes",
    startingPrice: "Sold out",
    possession: "Handed over 2025",
    rera: "P52800011220",
    excerpt: "Our first completed neighbourhood — still the clearest proof of how Jivah is meant to be lived.",
    overview:
      "Jivah Park was designed as a test of a simple idea: if daily needs sit on the ground floor, and the garden is not an afterthought, people stay. The community is fully occupied, the grocer is independently run, and the courtyard is used every evening.",
    image: "/images/park.png",
    gallery: [
      "/images/park.png",
      "/images/park.png",
      u("photo-1605276374104-dee2a0ed3cd6"),
    ],
    residences: [
      { type: "2 BHK", size: "760 sq.ft", note: "Occupied. Reference layouts available at the sales office." },
      { type: "3 BHK", size: "1,110 sq.ft", note: "Occupied. A handful of resales are facilitated on request." },
    ],
    amenities: [
      { group: "Lived-in", items: ["Operating grocery", "Clinic", "Park", "Society hall"] },
    ],
    connectivity: [
      { place: "Solapur station", time: "12 min" },
      { place: "Akkalkot Road", time: "8 min" },
    ],
    updates: [
      { date: "Nov 2025", title: "Handover complete", body: "All 164 homes have been handed over. Society formation is complete." },
    ],
    downloads: [
      { title: "As-built brochure", type: "PDF · 4.6 MB" },
      { title: "RERA certificate", type: "PDF · 0.4 MB" },
    ],
  },
  {
    slug: "jivah-ridge-pune",
    name: "Jivah Ridge",
    location: "Wagholi, Pune",
    city: "Pune",
    status: "ongoing",
    typology: "2 & 3 BHK",
    units: "420 homes",
    startingPrice: "₹89 L",
    possession: "Jun 2028",
    rera: "P52100044512",
    excerpt: "For families who work in Pune but refuse a life lived entirely in traffic.",
    overview:
      "Jivah Ridge sits on the eastern edge of Pune, planned as a complete weekday — school run, grocer, pharmacy, a walk, a meal at home. Residences are sized for first-time Pune buyers who still want a parent’s room and a balcony that is not a leftover.",
    image: "/images/ridge.png",
    gallery: [
      "/images/ridge.png",
      u("photo-1487958449943-2429e8be8625"),
      u("photo-1600585154526-990dced4db0d"),
      u("photo-1512917774080-9991f1c4c750"),
    ],
    residences: [
      { type: "2 BHK", size: "810–940 sq.ft", note: "East-facing living with a utility." },
      { type: "3 BHK", size: "1,210–1,380 sq.ft", note: "A flexible third room and a family balcony." },
    ],
    amenities: [
      { group: "Everyday", items: ["Grocery", "Pharmacy", "Crèche", "Co-working loft"] },
      { group: "Active", items: ["Pool", "Badminton", "Gym", "Jogging trail"] },
      { group: "Quiet", items: ["Library", "Senior lounge", "Pet park", "Roof garden"] },
    ],
    connectivity: [
      { place: "Kharadi IT parks", time: "18 min" },
      { place: "Pune airport", time: "28 min" },
      { place: "Wagholi school belt", time: "6 min" },
    ],
    updates: [
      { date: "Aug 2026", title: "Tower B at 12th slab", body: "Structure is on programme. Sample apartment opens in September." },
    ],
    downloads: [
      { title: "Brochure", type: "PDF · 9.1 MB" },
      { title: "Floor plans", type: "PDF · 4.0 MB" },
      { title: "RERA certificate", type: "PDF · 0.5 MB" },
    ],
  },
];

export const lifePillars: LifePillar[] = [
  {
    slug: "community",
    title: "Community living",
    kicker: "01",
    body: "Evenings that spill into the courtyard. Festivals that do not need a booking. Neighbours you actually know — because the architecture keeps putting you in the same shade.",
    image: u("photo-1511895426328-dc8714191300"),
  },
  {
    slug: "wellness",
    title: "Health & wellness",
    kicker: "02",
    body: "A clinic on the ground floor. A yoga lawn that is used at dawn. Circulation that prefers stairs and walking paths over basement lifts.",
    image: u("photo-1544367567-0f2fcb009e0b"),
  },
  {
    slug: "sports",
    title: "Sports & recreation",
    kicker: "03",
    body: "Courts and loops sized for after-work, not for a brochure. Places children occupy without a permission slip.",
    image: u("photo-1506126613408-eca07ce68773"),
  },
  {
    slug: "families",
    title: "Children & families",
    kicker: "04",
    body: "Play that is visible from the kitchen window. Tuition rooms downstairs. A third bedroom that can be a grandparent’s, not a leftover store.",
    image: u("photo-1606092195730-5d7b9af1efc5"),
  },
  {
    slug: "seniors",
    title: "Senior-friendly living",
    kicker: "05",
    body: "Benches with backs. Lifts that face the garden. Clinics, pharmacies and sit-outs on the same level as the grocer — so ageing in place is a plan, not a hope.",
    image: u("photo-1511895426328-dc8714191300"),
  },
  {
    slug: "pets",
    title: "Pet-friendly living",
    kicker: "06",
    body: "A lawn that is meant for paws. A wash point. A rulebook that assumes animals are part of the household, not an exception.",
    image: u("photo-1601758228041-f3b2795255f1"),
  },
  {
    slug: "green",
    title: "Green & open spaces",
    kicker: "07",
    body: "Trees first, then buildings. Shade in April. A central lawn that is a room, not a leftover setback.",
    image: u("photo-1441974231531-c6227db76b6e"),
  },
  {
    slug: "conveniences",
    title: "Everyday conveniences",
    kicker: "08",
    body: "Grocery. Pharmacy. Milk. Parcels. The errands that used to steal an evening, now a walk downstairs with a paper bag in hand.",
    image: u("photo-1529156069898-49953e39b3ac"),
  },
];

export const stories: Story[] = [
  {
    slug: "inside-jivah-greens-nashik",
    title: "Jivah Greens: 312 homes around a courtyard, not a parking deck",
    category: "Jivah Greens · Nashik",
    date: "12 Aug 2026",
    readTime: "5 min",
    excerpt:
      "Gangapur Road’s mixed-use neighbourhood — 2 & 3 BHK residences, a grocer on the ground floor, and a garden the cars are kept out of.",
    image: "/images/greens.png",
    projectSlug: "jivah-greens-nashik",
    body: [
      "Jivah Greens is planned around how families in Nashik already live — close to work, grandparents, and the evening errand. Residences look onto a courtyard, not a podium of parked cars.",
      "The mix is practical: 2 BHKs from 745 sq.ft, 3 BHKs that can take a grandparent, and corner decks for those who want more garden. Tower A is at terrace level; the sample apartment is open on weekends.",
      "RERA P51700012345. Possession December 2027. From ₹68 L.",
    ],
  },
  {
    slug: "jivah-courtyard-nagpur",
    title: "Jivah Courtyard: shade first, then the city",
    category: "Jivah Courtyard · Nagpur",
    date: "28 Jul 2026",
    readTime: "4 min",
    excerpt:
      "A planted inner court on Wardha Road — 1.5, 2 & 3 BHK homes sized for first-time buyers who still want neighbours, not a highway.",
    image: "/images/courtyard.png",
    projectSlug: "jivah-courtyard-nagpur",
    body: [
      "Nagpur’s heat asks for shade before spectacle. Jivah Courtyard turns inward to trees, with a clinic, grocer and senior sit-out on the same ground as the homes.",
      "Plans run from a 580 sq.ft first home to a 1,180 sq.ft family 3 BHK. The podium landscape is in soil; native planting follows the monsoon.",
      "RERA P50500023456. Possession March 2028. From ₹54 L.",
    ],
  },
  {
    slug: "jivah-park-one-year-on",
    title: "Jivah Park, Solapur: 164 homes, one year after handover",
    category: "Jivah Park · Solapur",
    date: "02 Jun 2026",
    readTime: "4 min",
    excerpt:
      "Our first completed neighbourhood — grocer independently run, courtyard in daily use, society already formed.",
    image: "/images/park.png",
    projectSlug: "jivah-park-solapur",
    body: [
      "Jivah Park was the test: if daily needs sit on the ground floor and the garden is not an afterthought, people stay. A year on, all 164 homes are handed over.",
      "The grocer asked for a second refrigerator. The senior sit-out needed more shade — we added it. Scuffed benches are the brief for every project that follows.",
      "RERA P52800011220. Handed over 2025. Sold out — a handful of resales are facilitated on request.",
    ],
  },
  {
    slug: "jivah-ridge-wagholi",
    title: "Jivah Ridge: east Pune without a life lived in traffic",
    category: "Jivah Ridge · Pune",
    date: "19 Jun 2026",
    readTime: "5 min",
    excerpt:
      "420 homes in Wagholi — school run, grocer, pharmacy and a walk, sized for people who work in Pune but refuse the commute as a lifestyle.",
    image: "/images/ridge.png",
    projectSlug: "jivah-ridge-pune",
    body: [
      "Jivah Ridge sits on Pune’s eastern edge as a complete weekday: crèche, grocery, a trail, a third room that is not leftover storage. Tower B is at the 12th slab; the sample opens in September.",
      "2 BHKs from 810 sq.ft, 3 BHKs to 1,380 sq.ft. Kharadi is 18 minutes. The school belt is six.",
      "RERA P52100044512. Possession June 2028. From ₹89 L.",
    ],
  },
  {
    slug: "jivah-orchard-kolhapur",
    title: "Jivah Orchard: villas along a retained mango edge",
    category: "Jivah Orchard · Kolhapur",
    date: "04 Jul 2026",
    readTime: "4 min",
    excerpt:
      "186 homes in Kawala Naka — 2 & 3 BHK apartments and garden villas that keep the orchard visible.",
    image: "/images/orchard.png",
    projectSlug: "jivah-orchard-kolhapur",
    body: [
      "Jivah Orchard steps residences back from mango and coconut that were already on the plot. A small high street of daily shops sits on the public edge.",
      "Garden villas at 1,820 sq.ft share the orchard line; 3 BHKs organise around a dining court. Pre-launch briefings are open.",
      "RERA registration underway. Possession 2029. From ₹72 L.",
    ],
  },
  {
    slug: "jivah-ghat-cidco",
    title: "Jivah Ghat: a compact block in Cidco, with a public ground floor",
    category: "Jivah Ghat · Sambhajinagar",
    date: "15 May 2026",
    readTime: "4 min",
    excerpt:
      "220 homes above shops, a pharmacy and a café — sized for first-time buyers who work in Cidco and still want grandparents nearby.",
    image: "/images/philosophy-lake.png",
    projectSlug: "jivah-ghat-aurangabad",
    body: [
      "Jivah Ghat treats the street as part of the home. Retail occupies the base; residences begin at a lifted garden deck.",
      "2 BHKs from 720 sq.ft, 3 BHKs that fit a joint family without wasting carpet. The bus hub is six minutes.",
      "RERA registration underway. Possession 2029. From ₹61 L.",
    ],
  },
];

export const faqs = [
  {
    q: "How do I know a Jivah project is RERA registered?",
    a: "Every ongoing project lists its MahaRERA number on the project page, in downloads, and on site boards. Upcoming projects are marked as ‘registration underway’ until the number is issued — we do not take bookings before registration.",
  },
  {
    q: "Can I visit before I enquire?",
    a: "Yes. Schedule a site visit from the project page or the Contact section. Weekends are the busiest; weekday mornings are quieter if you want time with the sample apartment.",
  },
  {
    q: "Do you help with home loans?",
    a: "We work with a short list of banks and HFCs so the paperwork is familiar. We do not lock you to a lender. Our homebuyer guide walks through eligibility, EMI and documents in plain language.",
  },
  {
    q: "Are ground-floor shops only for residents?",
    a: "They are sized and leased for residents first. Some frontage may serve the immediate street — that is how a neighbourhood stays alive during the day.",
  },
  {
    q: "Is pet ownership allowed?",
    a: "Yes, with society guidelines that assume pets are part of family life: designated lawns, wash points, and clear waste rules. Breed or size bans are not our starting point.",
  },
  {
    q: "What if I am a first-time buyer?",
    a: "Start with the Homebuyer Guide — buying process, documentation, RERA and the EMI calculator. Then visit. We would rather you arrive with questions than with pressure.",
  },
];

export const values = [
  {
    title: "Stay where you belong",
    body: "Better homes should not require a better city. We build in the places people already call home.",
  },
  {
    title: "Everyday before spectacle",
    body: "A grocer beats a unused ballroom. We spend the budget on the Tuesday, not the brochure.",
  },
  {
    title: "Family is a brief",
    body: "Children, elders, pets and shift workers are not edge cases. They are the people we draw for.",
  },
  {
    title: "Clarity over urgency",
    body: "RERA numbers, timelines and prices are published. If it cannot be said slowly, it should not be said.",
  },
];

export const leaders = [
  {
    name: "Meera Kulkarni",
    role: "Founder & Managing Director",
    bio: "A developer’s daughter who left the metro model behind — Meera started Jivah to prove that emerging cities deserve finished neighbourhoods, not leftover planning.",
  },
  {
    name: "Arjun Deshpande",
    role: "Head of Design",
    bio: "Architect. Obsessed with kitchens, shade and the width of a corridor. Holds the line between what looks good in a render and what works in April heat.",
  },
  {
    name: "Sana Qureshi",
    role: "Head of Customer Experience",
    bio: "The person who reads every site-visit note. Builds the homebuyer path so first-time buyers are never the last to understand the paperwork.",
  },
];

export const offices = [
  {
    city: "Nashik",
    name: "Head office & sales",
    address: "Ground floor, Jivah Greens, Gangapur Road, Nashik 422013",
    hours: "Mon–Sun · 10:00–7:00",
    phone: "+91 253 660 2100",
  },
  {
    city: "Nagpur",
    name: "Sales office",
    address: "Jivah Courtyard site office, Wardha Road, Nagpur 440015",
    hours: "Tue–Sun · 10:00–7:00",
    phone: "+91 712 660 2100",
  },
  {
    city: "Pune",
    name: "Sales office",
    address: "Jivah Ridge site office, Wagholi, Pune 412207",
    hours: "Mon–Sun · 10:00–7:00",
    phone: "+91 20 6602 1000",
  },
];

export const locations = [
  {
    slug: "nashik",
    name: "Nashik",
    line: "Wine country, river evenings, a city that still walks.",
    image: u("photo-1470071459604-3b5ec3a7fe05"),
  },
  {
    slug: "nagpur",
    name: "Nagpur",
    line: "The country’s centre — and a climate that demands shade.",
    image: u("photo-1441974231531-c6227db76b6e"),
  },
  {
    slug: "pune",
    name: "Pune",
    line: "Work on the eastern edge, life that does not dissolve into traffic.",
    image: u("photo-1515263487990-61b07816b324"),
  },
  {
    slug: "kolhapur",
    name: "Kolhapur",
    line: "A slower register. Orchards, temples, room to grow a family.",
    image: u("photo-1416879595882-3373a0480b5b"),
  },
  {
    slug: "chhatrapati-sambhajinagar",
    name: "Chhatrapati Sambhajinagar",
    line: "Cidco’s urban grain — compact, connected, ready for a first home.",
    image: u("photo-1479839672679-a46483c0e7c8"),
  },
  {
    slug: "solapur",
    name: "Solapur",
    line: "Where we finished first — a lived-in proof of the Jivah idea.",
    image: "/images/park.png",
  },
];

export const whyJivah = [
  {
    n: "01",
    title: "Mixed-use as a daily habit",
    body: "Grocery, pharmacy and services on the ground floor — so errands are a walk, not a drive.",
  },
  {
    n: "02",
    title: "Homes drawn around families",
    body: "A third room that can be a grandparent’s. Play that is visible from the kitchen. Storage that is not an afterthought.",
  },
  {
    n: "03",
    title: "Cities people already love",
    body: "We build in Nashik, Nagpur, Kolhapur, Solapur — not as catchments of a metro, but as homes in their own right.",
  },
  {
    n: "04",
    title: "A slower, clearer sale",
    body: "Published RERA, published timelines, a homebuyer guide written for first-time buyers. Urgency is not a strategy.",
  },
];

export const featuredListings = [
  {
    slug: "jivah-greens-nashik",
    n: "01.",
    title: "Garden 3 BHK at Jivah Greens",
    body: "A family residence opening onto the courtyard, with a kitchen that faces the lawn and a third room ready for grandparents.",
    specs: "3 Bed | 2 Bath | 1,240 sq.ft",
    image: "/images/greens.png",
  },
  {
    slug: "jivah-courtyard-nagpur",
    n: "02.",
    title: "Courtyard 2 BHK in Nagpur",
    body: "Cross-ventilated living around a planted inner court — shade first, then the city, in a home sized for first-time buyers.",
    specs: "2 Bed | 2 Bath | 860 sq.ft",
    image: "/images/courtyard.png",
  },
  {
    slug: "jivah-ridge-pune",
    n: "03.",
    title: "Parkside apartment at Jivah Ridge",
    body: "An east-facing 2 BHK on Pune’s eastern edge, planned around the school run, the grocer downstairs, and an evening walk.",
    specs: "2 Bed | 2 Bath | 890 sq.ft",
    image: "/images/ridge.png",
  },
  {
    slug: "jivah-orchard-kolhapur",
    n: "04.",
    title: "Orchard villa in Kolhapur",
    body: "A two-storey garden home along a retained mango edge — slower living, more trees, no reason to leave the city you already love.",
    specs: "3 Bed | 3 Bath | 1,820 sq.ft",
    image: "/images/orchard.png",
  },
];

export const audiences = [
  {
    n: "01.",
    title: "Buying",
    body: "Skip endless site visits. We help first-time buyers read RERA, size an EMI, and walk a home that is already planned around how families live — grocery downstairs, garden in the middle.",
  },
  {
    n: "02.",
    title: "Selling",
    body: "Moving into a Jivah home often means leaving one behind. We coordinate timelines, documentation and a clear handover so the move is a chapter, not a scramble.",
  },
  {
    n: "03.",
    title: "Investing",
    body: "Emerging cities, finished neighbourhoods, ground-floor retail that actually opens. For investors who want yield next to real occupancy — not a brochure of amenities that never run.",
  },
  {
    n: "04.",
    title: "Leasing",
    body: "Pharmacy, grocer, clinic, café — the mixed-use base is leased to operators who serve residents first. Channel partners and retailers can enquire for available bays.",
  },
];

export const processSteps = [
  {
    title: "Vision & Strategy Session",
    body: "We start with a focused conversation to understand how you live, what you can borrow, and which Jivah neighbourhood fits — then a direct plan, without delay.",
  },
  {
    title: "Targeted Action",
    body: "We use local access to set up site visits, sample apartments and loan introductions, and walk you through RERA, timelines and what is actually included.",
  },
  {
    title: "Close & Live!",
    body: "With documents and handover managed precisely, we get you into your home — grocer downstairs, garden in the middle — so you can truly start living.",
  },
];

export const recentSales = [
  {
    title: "Jivah Park, Solapur",
    body: "Our first completed neighbourhood — 164 homes handed over, grocer independently run, courtyard in daily use.",
    specs: "2 & 3 BHK | Handed over 2025",
    image: "/images/park.png",
  },
  {
    title: "Jivah Greens show apartment",
    body: "The 3 BHK sample is open — a kitchen that faces the garden, and a third room that is not a leftover store.",
    specs: "3 Bed | 2 Bath | 1,240 sq.ft",
    image: u("photo-1600585154526-990dced4db0d"),
  },
  {
    title: "Jivah Ridge, Wagholi",
    body: "East-facing family plans for people who work in Pune but refuse a life lived entirely in traffic.",
    specs: "2 & 3 BHK | From ₹89 L",
    image: "/images/ridge.png",
  },
];

export const testimonials = [
  {
    quote:
      "We did not want to leave Nashik for a ‘better’ address. Jivah Greens is the first place that felt like the city we already had — only easier.",
    name: "Anaya & Rohan Kulkarni",
    place: "Jivah Greens, Nashik",
  },
  {
    quote:
      "The homebuyer guide was slower than every other sales office. That is why we trusted it. EMI, RERA, documents — all in language we could check.",
    name: "Sneha Patil",
    place: "First-time buyer, Nagpur",
  },
  {
    quote:
      "I bought for yield and stayed for the courtyard. The grocer is open. The benches are used. That is the whole investment thesis.",
    name: "Vikram Shah",
    place: "Investor, Jivah Park",
  },
];
