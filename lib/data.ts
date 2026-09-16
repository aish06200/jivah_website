import type { LifePillar, Project, Story } from "./types";

export const navItems = [
  { href: "/#projects", label: "Projects", match: ["/projects"] },
  { href: "/why-jivah", label: "Why Jivah", match: ["/why-jivah", "/about"] },
  {
    href: "/resources",
    label: "Buyer Resources",
    match: ["/resources", "/guide", "/downloads", "/rera", "/blog", "/buying-for-investment"],
  },
  {
    href: "/contact",
    label: "Contact Us",
    match: ["/contact", "/channel-partner", "/partners"],
  },
] as const;

export const u = (id: string, extras = "") =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80${extras}`;

export const pexels = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

function deliveredListing(
  slug: string,
  name: string,
  location: string,
  city: string,
  typology: string,
  possessionYear: string,
  excerpt: string,
  image: string,
  catalogCategory: Project["catalogCategory"] = "Residential",
): Project {
  return {
    slug,
    name,
    location,
    city,
    status: "completed",
    catalogCategory,
    typology,
    units: "220 homes",
    startingPrice: "Sold out",
    possession: `Handed over ${possessionYear}`,
    rera: "P50500000000",
    excerpt,
    overview: excerpt,
    image,
    gallery: [image],
    residences: [{ type: "2 BHK", size: "—", note: "Handed over to residents." }],
    amenities: [{ group: "Everyday", items: ["Neighbourhood grocer", "Clinic"] }],
    connectivity: [{ place: city, time: "—" }],
    updates: [
      {
        date: `Jun ${possessionYear}`,
        title: "Handover complete",
        body: excerpt,
        image,
      },
    ],
    downloads: [{ title: "As-built brochure", type: "PDF · 4 MB" }],
  };
}

function upcomingListing(
  slug: string,
  name: string,
  location: string,
  city: string,
  typology: string,
  possessionYear: string,
  excerpt: string,
  image: string,
  catalogCategory: Project["catalogCategory"] = "Mixed-use",
): Project {
  return {
    slug,
    name,
    location,
    city,
    status: "upcoming",
    catalogCategory,
    typology,
    units: "260 homes",
    startingPrice: "To be announced",
    possession: possessionYear,
    rera: "Registration underway",
    excerpt,
    overview: excerpt,
    image,
    gallery: [image],
    residences: [{ type: "2 BHK", size: "—", note: "Plans subject to final approval." }],
    amenities: [{ group: "Everyday", items: ["Neighbourhood grocer", "Clinic"] }],
    connectivity: [{ place: city, time: "—" }],
    updates: [
      {
        date: "Sep 2026",
        title: "Registration underway",
        body: excerpt,
        image,
      },
    ],
    downloads: [{ title: "Concept brief", type: "PDF · 2 MB" }],
  };
}

export const projects: Project[] = [
  {
    slug: "jivah-greens-nashik",
    name: "Jivah Ganges",
    location: "55, GT Road, Konnagar, West Bengal 712235",
    city: "Konnagar",
    status: "ongoing",
    catalogCategory: "Mixed-use",
    typology: "2 & 3 BHK residences",
    units: "312 homes",
    startingPrice: "₹68 L",
    possession: "Dec 2027",
    rera: "P51700012345",
    excerpt:
      "Mixed-use homes on GT Road, Konnagar — everyday retail downstairs and family life above.",
    overview:
      "Jivah Ganges is planned for Konnagar families who want a better address without leaving the Hooghly corridor. Developed under M/S Ecospace Developers Pvt Ltd, the neighbourhood pairs ground-floor conveniences with residences that open onto gardens, not parking decks. Cars stay at the edge so children, elders and evening walks can occupy the centre.",
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
      {
        place: "Nashik Road railway station",
        mapLabel: "Station",
        time: "18 min",
        distance: "6.8 km",
        icon: "station",
        coordinates: [73.8421, 19.9472],
      },
      {
        place: "Criticare Hospital, City Centre",
        mapLabel: "Hospital",
        time: "12 min",
        distance: "4.2 km",
        icon: "hospital",
        coordinates: [73.8055, 19.9678],
      },
      {
        place: "College Road",
        mapLabel: "College Road",
        time: "10 min",
        distance: "3.1 km",
        icon: "market",
        coordinates: [73.760559, 20.003805],
      },
      {
        place: "DPS Nashik, Gangapur Road",
        mapLabel: "DPS Nashik",
        time: "8 min",
        distance: "2.6 km",
        icon: "school",
        coordinates: [73.7862, 20.0112],
      },
    ],
    locationSection: {
      headline: "Everything important, within reach.",
      description:
        "Jivah Ganges sits on GT Road, Konnagar with easy access to Kolkata, local markets, healthcare and rail links along the corridor.",
      coordinates: [88.3284, 22.8268],
      zoom: 13.2,
    },
    constructionProgress: {
      percent: 38,
      phase: "Superstructure & landscape",
    },
    updates: [
      {
        date: "Aug 2026",
        title: "Tower A structure complete",
        body: "Slab work on Tower A has reached terrace level. Façade sampling begins next month.",
        image: "/images/figma/project-detail/lifestyle-exterior.png",
      },
      {
        date: "Jun 2026",
        title: "Clubhouse raft completed",
        body: "The wellness wing foundation is cast. Landscape contours around the central lawn are underway.",
        image: "/images/figma/project-detail/lifestyle-pool.png",
      },
      {
        date: "Mar 2026",
        title: "Sample apartment open",
        body: "The 3 BHK show apartment is now available for weekend walkthroughs by appointment.",
        image: "/images/banner-interior.jpg",
      },
    ],
    floorPlans: [
      {
        id: "2bhk",
        label: "2 BHK",
        title: "2 BHK Classic",
        summary: "Efficient family homes with a winter balcony — cross-ventilated living that opens onto greenery.",
        image: "/images/figma/project-detail/floor-plan-2bhk.png",
        carpetArea: "825 sq ft",
        saleableArea: "1,110 sq ft",
        includes: [
          { icon: "bed", label: "2 Bedrooms" },
          { icon: "bath", label: "2 Bathrooms" },
          { icon: "living", label: "Living & Dining" },
          { icon: "balcony", label: "1 Balcony" },
          { icon: "kitchen", label: "Kitchen" },
          { icon: "utility", label: "Utility" },
        ],
      },
      {
        id: "3bhk",
        label: "3 BHK",
        title: "3 BHK Classic",
        summary: "A third room ready for grandparents, study, or guest — with space that actually gets used.",
        image: "/images/figma/project-detail/floor-plan-3bhk.png",
        carpetArea: "1,050 sq ft",
        saleableArea: "1,340 sq ft",
        includes: [
          { icon: "bed", label: "3 Bedrooms" },
          { icon: "bath", label: "3 Bathrooms" },
          { icon: "living", label: "Living & Dining" },
          { icon: "balcony", label: "1 Balcony" },
          { icon: "kitchen", label: "Kitchen" },
          { icon: "utility", label: "Utility" },
        ],
      },
    ],
    downloads: [
      { title: "Brochure", type: "PDF · 8.4 MB" },
      { title: "Floor plans", type: "PDF · 3.1 MB" },
      { title: "RERA certificate", type: "PDF · 0.4 MB" },
    ],
    featured: {
      eyebrow: "Amenities",
      headline: "World-class amenities",
      intro: "Park, pool, gym and clubhouse — everyday life on one campus.",
      highlights: [
        {
          title: "Park",
          body: "A central lawn with shaded paths — space for evening walks, children at play and neighbours catching up outdoors.",
          icon: "/images/figma/project-detail/featured/icon-energy.svg",
          image: "/images/figma/project-detail/lifestyle-park.png",
        },
        {
          title: "Gymnasium",
          body: "A fully equipped indoor fitness centre for cardio, strength training and daily workouts without leaving the neighbourhood.",
          icon: "/images/figma/project-detail/featured/icon-energy.svg",
          image: "/images/figma/project-detail/lifestyle-gym.png",
        },
        {
          title: "Swimming pool",
          body: "A landscaped pool deck for laps, leisure swims and family time on weekends — with loungers and shade around the water.",
          icon: "/images/figma/project-detail/featured/icon-pool.svg",
          image: "/images/figma/project-detail/lifestyle-pool.png",
        },
        {
          title: "Clubhouse",
          body: "A community hall for festivals, gatherings and everyday social life — the shared room when home needs company.",
          icon: "/images/figma/project-detail/featured/icon-smart.svg",
          image: "/images/figma/project-detail/lifestyle-community.png",
        },
      ],
      images: [
        "/images/figma/project-detail/lifestyle-park.png",
        "/images/figma/project-detail/lifestyle-gym.png",
        "/images/figma/project-detail/lifestyle-pool.png",
        "/images/figma/project-detail/lifestyle-community.png",
      ],
      priceNote: "Starting price",
    },
  },
  {
    slug: "jivah-gardens-nagpur",
    name: "Jivah Gardens",
    location: "Wardha Road, Nagpur",
    city: "Nagpur",
    status: "completed",
    catalogCategory: "Residential",
    typology: "1.5, 2 & 3 BHK",
    units: "248 homes",
    startingPrice: "Sold out",
    possession: "Handed over 2026",
    rera: "P50500023456",
    excerpt: "Courtyard living for a city that still walks — shade, water and neighbours in one frame.",
    overview:
      "Nagpur’s heat asks for shade before spectacle. Jivah Gardens is organised around a planted inner court, with residences looking inward to trees and outward to a quiet street. The ground plane holds a clinic, a grocer and a senior sit-out so daily life does not require a car.",
    image: "/images/jivah-gardens-hero.jpg",
    imageClass: "object-bottom",
    gallery: [
      "/images/jivah-gardens-hero.jpg",
      "/images/jivah-gardens-lifestyle-yoga.jpg",
      "/images/jivah-gardens-lifestyle-courtyard.jpg",
      "/images/jivah-gardens-lifestyle-amenities.jpg",
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
      {
        date: "Jun 2026",
        title: "Handover complete",
        body: "All 248 homes have been handed over. The inner courtyard, grocer and clinic are in daily use.",
        image: "/images/jivah-gardens-handover.jpg",
      },
      {
        date: "Apr 2026",
        title: "Ground-floor retail opens",
        body: "The neighbourhood grocer and clinic have completed fit-out. Residents are using both daily.",
        image: "/images/figma/project-detail/lifestyle-community.png",
      },
      {
        date: "Jan 2026",
        title: "Courtyard landscaping complete",
        body: "The inner court is fully planted — shade trees, seating and the senior sit-out are ready for use.",
        image: "/images/courtyard.png",
      },
      {
        date: "Oct 2025",
        title: "Common areas & MEP complete",
        body: "Lift cores, lobbies and services are finished across all towers. Sample flats are open for walkthroughs.",
        image: "/images/banner-interior.jpg",
      },
      {
        date: "Jul 2025",
        title: "Structure complete",
        body: "All residential towers have reached full height. Façade work and waterproofing are underway.",
        image: "/images/figma/project-detail/lifestyle-exterior.png",
      },
    ],
    featured: {
      eyebrow: "Amenities",
      headline: "Courtyard-first living",
      intro: "Shade, wellness and recreation — everyday amenities organised around the inner court.",
      highlights: [
        {
          title: "Inner courtyard",
          body: "A planted central court with shade trees, seating and paths — the neighbourhood room Nagpur heat asks for first.",
          icon: "/images/figma/project-detail/featured/icon-energy.svg",
          image: "/images/jivah-gardens-lifestyle-courtyard.jpg",
        },
        {
          title: "Yoga studio",
          body: "A quiet indoor studio opening to the courtyard — for morning practice, meditation and resident wellness programmes.",
          icon: "/images/figma/project-detail/featured/icon-smart.svg",
          image: "/images/jivah-gardens-lifestyle-yoga.jpg",
        },
        {
          title: "Swimming pool",
          body: "A landscaped pool deck for laps, leisure swims and family time at dusk — with loungers and shade around the water.",
          icon: "/images/figma/project-detail/featured/icon-pool.svg",
          image: "/images/jivah-gardens-pool.jpg",
        },
        {
          title: "Festival lawn",
          body: "A central lawn for community gatherings, children at play and the festivals that still happen in the same city.",
          icon: "/images/figma/project-detail/featured/icon-energy.svg",
          image: "/images/figma/project-detail/lifestyle-park.png",
        },
      ],
      images: [
        "/images/jivah-gardens-lifestyle-courtyard.jpg",
        "/images/jivah-gardens-lifestyle-yoga.jpg",
        "/images/jivah-gardens-pool.jpg",
        "/images/figma/project-detail/lifestyle-park.png",
      ],
    },
    downloads: [
      { title: "As-built brochure", type: "PDF · 5.1 MB" },
      { title: "RERA certificate", type: "PDF · 0.4 MB" },
    ],
  },
  deliveredListing(
    "jivah-courtyard-pune",
    "The Signature",
    "4-Roy Bahadur Road, Ajoy Nagar Tara Park, Behala, Kolkata-700034",
    "Kolkata",
    "2 & 3 BHK",
    "2025",
    "Inner-court homes with ground-floor conveniences — handed over with the grocer already open.",
    "/images/courtyard.png",
    "Mixed-use",
  ),
  deliveredListing(
    "jivah-grove-nashik",
    "The 46 by Jivah",
    "46, Southend Park, Kolkata-700090",
    "Kolkata",
    "2 & 3 BHK",
    "2024",
    "Tree-lined walks and family homes — delivered and occupied.",
    "/images/greens.png",
  ),
  deliveredListing(
    "jivah-terrace-solapur",
    "Aspira Joy",
    "137/F B.T. Road, Panihati, Kolkata-700114",
    "Kolkata",
    "2 BHK",
    "2024",
    "Compact neighbourhood for first-time buyers — shade, play lawns and everyday retail at the podium.",
    "/images/banner-interior.jpg",
  ),
  deliveredListing(
    "jivah-haven-kolhapur",
    "Aashiyana",
    "Sri Ramesh Mitra Road, 91 Bus Route, Beraberi, Shikherbagan, Near Rajarhat, East Kolkata",
    "Kolkata",
    "2 & 3 BHK",
    "2023",
    "Courtyard-facing residences with a clinic and grocer on the ground floor — life without the car for every errand.",
    "/images/jivah-gardens-lifestyle-courtyard.jpg",
  ),
  deliveredListing(
    "jivah-shade-nagpur",
    "Bangavilla",
    "7, G.C. Bhattacharjee Lane, Serampore, Hooghly-712201",
    "Serampore",
    "1.5 & 2 BHK",
    "2023",
    "Shade-first planning — senior sit-outs, festival lawn and homes already in daily use.",
    "/images/jivah-gardens-hero.jpg",
    "Mixed-use",
  ),
  deliveredListing(
    "jivah-lattice-aurangabad",
    "Bonganiketan",
    "40, Asutosh Chatterjee Lane, Serampore, Hooghly-712202",
    "Serampore",
    "2 BHK",
    "2022",
    "Walkable streets and a central lawn — a completed pocket where neighbours already know each other.",
    "/images/figma/project-detail/lifestyle-park.png",
  ),
  deliveredListing(
    "jivah-breeze-goa",
    "Aditya Apartment",
    "North Mouri, Khotir Bajar, Ankurhati, Andul Mouri, Domjur, Howrah-711302",
    "Howrah",
    "2 & 3 BHK",
    "2022",
    "Mixed-use homes with cross ventilation and everyday retail — sold out and handed over.",
    "/images/figma/project-detail/lifestyle-pool.png",
    "Mixed-use",
  ),
  deliveredListing(
    "jivah-commons-thane",
    "Anandam Apartment",
    "Andul, Mouri, Duillya, Howrah, West Bengal-711302",
    "Howrah",
    "2 & 3 BHK",
    "2021",
    "Neighbourhood living with operating retail and a community hall in daily use since handover.",
    "/images/figma/project-detail/lifestyle-exterior.png",
  ),
  deliveredListing(
    "jivah-orchard-jalgaon",
    "Jivah Orchard",
    "Civil Lines, Jalgaon",
    "Jalgaon",
    "2 BHK",
    "2020",
    "A smaller delivered neighbourhood — orchard edges, grocer downstairs, families already rooted.",
    "/images/figma/project-detail/lifestyle-community.png",
  ),
  upcomingListing(
    "jivah-meadows-bhubaneswar",
    "Jivah Meadows",
    "Patia, Bhubaneswar",
    "Bhubaneswar",
    "2 & 3 BHK residences",
    "2029",
    "Mixed-use neighbourhood on the east coast — grocer, clinic and courtyard life before the towers rise.",
    "/images/courtyard.png",
  ),
  upcomingListing(
    "jivah-delta-bhubaneswar",
    "Jivah Delta",
    "Chandrasekharpur, Bhubaneswar",
    "Bhubaneswar",
    "2 & 3 BHK residences",
    "2030",
    "Second Bhubaneswar pocket — shade courts, ground-floor retail and homes planned around family life.",
    "/images/banner-interior.jpg",
  ),
  upcomingListing(
    "jivah-coast-visakhapatnam",
    "Jivah Coast",
    "Madhurawada, Visakhapatnam",
    "Visakhapatnam",
    "2 & 3 BHK residences",
    "2030",
    "Coastal-corridor mixed-use — everyday retail, breezeways and residences tuned for Vizag’s light and heat.",
    "/images/figma/project-detail/lifestyle-exterior.png",
  ),
  upcomingListing(
    "jivah-junction-kharagpur",
    "Jivah Junction",
    "Kharagpur Town, Kharagpur",
    "Kharagpur",
    "2 & 3 BHK residences",
    "2031",
    "Rail-town mixed-use — grocer, clinic and homes within walking distance of daily life in Kharagpur.",
    "/images/greens.png",
  ),
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
    slug: "anaya-rohan-kulkarni-nashik",
    person: "Anaya & Rohan Kulkarni",
    title: "We did not want to leave Nashik for a ‘better’ address",
    category: "Jivah Greens · Nashik",
    date: "12 Aug 2026",
    readTime: "4 min",
    excerpt:
      "The children go downstairs after homework. Grandparents still live ten minutes away. We wanted a better week — not a different city.",
    image: pexels("37453850"),
    projectSlug: "jivah-greens-nashik",
    body: [
      "Rohan’s office is still on College Road. My parents are still in that same Gangapur house. Every ‘upgrade’ we were shown assumed we would leave both. We did not want a better city. We wanted Tuesday to be easier.",
      "Jivah Greens put the grocer under the building and the cars at the edge. The children go down after homework. We can see them from the kitchen. That is the whole brief, said out loud.",
      "We took a 3 BHK because the third room is for when my mother stays, not for storage we never unpack. Possession is still ahead. The sample apartment was enough to know the courtyard would be used.",
    ],
  },
  {
    slug: "sneha-patil-nagpur",
    person: "Sneha Patil",
    title: "The homebuyer guide was slower than every other sales office",
    category: "Jivah Gardens · Nagpur",
    date: "28 Jul 2026",
    readTime: "4 min",
    excerpt:
      "First home, same city. I needed paperwork I could actually check, a clinic downstairs, and time to decide — not a faster close.",
    image: pexels("10450563"),
    projectSlug: "jivah-gardens-nagpur",
    body: [
      "I walked into three sales offices in one weekend. Each one had a faster close. Jivah handed me a guide and told me to come back with questions. That is why I trusted it.",
      "Nagpur in April is not a glass façade problem. It is a shade problem. The inner court, the clinic and the grocer on the same ground — that is what I could explain to my father without a brochure.",
      "I bought a 2 BHK. First home. Wardha Road is still my city. I did not need a highway address to feel I had arrived.",
    ],
  },
  {
    slug: "vikram-shah-solapur",
    person: "Vikram Shah",
    title: "I bought for yield and stayed for the courtyard",
    category: "Jivah Park · Solapur",
    date: "02 Jun 2026",
    readTime: "4 min",
    excerpt:
      "A year after handover, the grocer is still open and the benches are still used. That is how I know the neighbourhood works.",
    image: "/images/story-vikram-shah.png",
    video: true,
    projectSlug: "jivah-park-solapur",
    body: [
      "I did not plan to live here. Solapur was a yield calculation — completed stock, a society already formed, a grocer that was not a showpiece. Then I sat in the courtyard on a Saturday and did not leave.",
      "A year on, the benches are scuffed. The grocer asked for a second refrigerator. Someone’s parents occupy the sit-out every evening. Occupied buildings keep their value. Empty amenities do not.",
      "If you are buying to rent, look at whether people actually use the ground floor. If they do, the rest of the spreadsheet follows.",
    ],
  },
  {
    slug: "meera-joshi-pune",
    person: "Meera Joshi",
    title: "East Pune, without a life lived in traffic",
    category: "Jivah Ridge · Pune",
    date: "19 Jun 2026",
    readTime: "4 min",
    excerpt:
      "School run, grocer, pharmacy, a walk. I work in the city. I refused to make the commute a personality.",
    image: pexels("15602469"),
    projectSlug: "jivah-ridge-pune",
    body: [
      "Wagholi is where a lot of us landed because Kharadi filled up. The mistake is treating that as a waiting room for a ‘real’ neighbourhood. I wanted the weekday to finish at the building, not in a car.",
      "The crèche, the grocer and the trail are why we signed. The third room is my mother’s when she visits, not a dumping ground for cartons. Kharadi is eighteen minutes when I need it. Most days I do not.",
      "I am not waiting for the city to come to us. The errands already live downstairs.",
    ],
  },
  {
    slug: "aditya-more-kolhapur",
    person: "Aditya More",
    title: "The mango trees were already here. The house had to fit around them",
    category: "Jivah Orchard · Kolhapur",
    date: "04 Jul 2026",
    readTime: "4 min",
    excerpt:
      "Kawala Naka is still home. We wanted a garden villa that did not pretend the orchard was landscaping.",
    image: pexels("5746790"),
    projectSlug: "jivah-orchard-kolhapur",
    body: [
      "My parents still measure distance in temples and market days, not in kilometres to a ring road. Kolhapur did not need replacing. The house did.",
      "Jivah Orchard kept the mango and coconut line. The shops sit on the public edge so the inside stays a court. We are looking at a garden villa because the dining room should see trees, not a parking deck.",
      "Pre-launch meant more conversation than pressure. That suited a family that already knows the street.",
    ],
  },
  {
    slug: "asha-pawar-sambhajinagar",
    person: "Asha Pawar",
    title: "Cidco is where we work. The ground floor is where the week happens",
    category: "Jivah Ghat · Sambhajinagar",
    date: "15 May 2026",
    readTime: "4 min",
    excerpt:
      "A compact home above a pharmacy and a café — sized for a first salary, and for grandparents who still live in the same city.",
    image: pexels("37607665"),
    projectSlug: "jivah-ghat-aurangabad",
    body: [
      "I did not want a far suburb and a story about the future. I work in Cidco. My in-laws are twenty minutes away. The home had to sit in that triangle.",
      "Jivah Ghat puts shops on the street and the residences on a lifted garden. I can send my father for milk without a two-wheeler. That sounds small until you live it.",
      "We took a 2 BHK we can actually furnish. The bus hub is six minutes. First home, same city — that was the requirement.",
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
  {
    title: "Vastu-aware planning",
    body: "Orientation, light and ventilation planned for how families actually live — not sticker claims on a brochure.",
  },
  {
    title: "Open space by design",
    body: "Lawns, walkways and play areas are drawn first. We do not fill a site and call the gaps green.",
  },
  {
    title: "Mixed-use downstairs",
    body: "Grocer, pharmacy and clinic on the ground floor — leased to operators who serve residents first.",
  },
  {
    title: "Quality that lasts",
    body: "Structure, waterproofing and common areas built for daily use — occupied buildings keep their value.",
  },
];

export const leaders = [
  {
    name: "Meera Kulkarni",
    role: "Founder & Managing Director",
    bio: "A developer’s daughter who left the metro model behind — Meera started Jivah to prove that emerging cities deserve finished neighbourhoods, not leftover planning.",
    image: pexels("1181690"),
  },
  {
    name: "Arjun Deshpande",
    role: "Head of Design",
    bio: "Architect. Obsessed with kitchens, shade and the width of a corridor. Holds the line between what looks good in a render and what works in April heat.",
    image: pexels("2182970"),
  },
  {
    name: "Sana Qureshi",
    role: "Head of Customer Experience",
    bio: "The person who reads every site-visit note. Builds the homebuyer path so first-time buyers are never the last to understand the paperwork.",
    image: pexels("3777943"),
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
    address: "Jivah Gardens site office, Wardha Road, Nagpur 440015",
    hours: "Tue–Sun · 10:00–7:00",
    phone: "+91 712 660 2100",
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
    body: "We build in Nashik and Nagpur — not as catchments of a metro, but as homes in their own right.",
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
    slug: "jivah-gardens-nagpur",
    n: "02.",
    title: "Garden 2 BHK at Jivah Gardens",
    body: "Cross-ventilated living around a planted inner court — shade first, then the city, in a home sized for first-time buyers.",
    specs: "2 Bed | 2 Bath | 860 sq.ft",
    image: "/images/courtyard.png",
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
    title: "Jivah Greens show apartment",
    body: "The 3 BHK sample is open — a kitchen that faces the garden, and a third room that is not a leftover store.",
    specs: "3 Bed | 2 Bath | 1,240 sq.ft",
    image: u("photo-1600585154526-990dced4db0d"),
  },
  {
    title: "Jivah Gardens sample home",
    body: "A 2 BHK around the inner court — shade first, then the city, sized for first-time buyers in Nagpur.",
    specs: "2 Bed | 2 Bath | 860 sq.ft",
    image: "/images/courtyard.png",
  },
];

export const testimonials = [
  {
    quote:
      "We did not want to leave Nashik for a ‘better’ address. Jivah Ganges is the first place that felt like the city we already had — only easier.",
    name: "Anaya & Rohan Kulkarni",
    place: "Jivah Ganges, Nashik",
    image: pexels("21319609"),
  },
  {
    quote:
      "The homebuyer guide was slower than every other sales office. That is why we trusted it. EMI, RERA, documents — all in language we could check.",
    name: "Sneha Patil",
    place: "First-time buyer, Nagpur",
    image: u("photo-1573497019940-1c28c88b4f3e", "&crop=faces"),
  },
];

function parseHomeCount(units: string): number {
  const match = units.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

const totalHomes = projects.reduce((total, project) => total + parseHomeCount(project.units), 0);
const handedOverHomes = projects
  .filter((project) => project.status === "completed")
  .reduce((total, project) => total + parseHomeCount(project.units), 0);
const liveProjects = projects.filter((project) => project.status !== "upcoming").length;

export const heroMetrics = [
  { label: "Live projects", value: String(liveProjects) },
  { label: "Homes planned", value: totalHomes.toLocaleString("en-IN"), suffix: "+" },
  { label: "Keys handed over", value: handedOverHomes.toLocaleString("en-IN") },
  { label: "RERA registered", value: "100", suffix: "%" },
] as const;
