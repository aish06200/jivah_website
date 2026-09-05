import type { BlogArticle } from "@/lib/types";

export const blogArticles: BlogArticle[] = [
  {
    slug: "home-buying-tips",
    title: "Home buying tips for first-time buyers in emerging cities",
    author: "Jivah Realty",
    date: "Feb 17, 2024",
    readTime: "8 min read",
    tag: "Tips",
    image: "/images/figma/about/insight-1.png",
    excerpt:
      "First-time buying, home loans, EMI, documents and RERA — slow questions, clear answers before you book.",
    statement:
      "A first home is not a race — it is a neighbourhood, a loan and paperwork that should match how you actually live.",
    intro: [
      "A first home is not a race. Most buyers we meet already know the city they want to stay in — they are trying to understand whether the neighbourhood, the loan and the paperwork can keep up with how they actually live.",
      "This guide walks through the questions we ask on every site visit: what is registered, what is finished, and what still needs to be said slowly before you write a cheque.",
    ],
    sections: [
      { type: "heading", title: "1. Before the site visit" },
      {
        type: "paragraph",
        text: "Start with eligibility, not inventory. Banks will tell you what you can borrow; only you know what EMI still leaves room for school fees, elders and the odd medical bill.",
      },
      {
        type: "list",
        items: [
          "Get a realistic EMI figure before you shortlist projects — leave room for maintenance and life, not just the headline rate.",
          "Check MahaRERA registration number, promoter name and possession timeline before you book a site visit.",
          "Collect the homebuyer guide and read it at home — slow questions beat a fast close.",
        ],
      },
      { type: "heading", title: "2. Reading RERA before you book" },
      {
        type: "paragraph",
        text: "Match the registration number on the certificate to the number on site boards and in the allotment draft. Promoter name and project name should match exactly.",
      },
      {
        type: "list",
        items: [
          "Note declared carpet areas and phase-wise possession dates in writing.",
          "If sales talk promises an earlier handover, the certificate is the document that counts.",
          "Keep a PDF of the certificate with your booking file.",
        ],
      },
      { type: "heading", title: "3. On the walk" },
      {
        type: "paragraph",
        text: "Tuesday evening is more honest than a Sunday crowd. Grocer open? Street finished? Garden usable? Those answers matter more than a deck on slide forty-two.",
      },
      {
        type: "list",
        items: [
          "Walk the block, not only the lobby — pavements, drop-off and daily retail matter.",
          "Ask for the allotment draft and every annexure before you sign.",
          "Keep copies of everything — if it cannot be explained without pressure, pause.",
        ],
      },
      { type: "heading", title: "4. Open space that gets used" },
      {
        type: "paragraph",
        text: "Amenity decks that stay empty are liabilities. Gardens with evening light, usable lawns and shade are what families recommend when they talk about an address to friends.",
      },
      { type: "heading", title: "When the numbers line up" },
      {
        type: "paragraph",
        text: "When the numbers, the walk and the paperwork all line up, booking is simple. Until then, keep asking — that is what the guide is for. At Jivah, keeping pace with how families actually live is part of how we build well.",
      },
    ],
  },
  {
    slug: "boost-home-value",
    title: "Boost home value with mixed-use neighbourhoods",
    author: "Jivah Realty",
    date: "Feb 18, 2024",
    readTime: "6 min read",
    tag: "Guides",
    image: "/images/figma/about/insight-2.png",
    excerpt: "What to look for on a site visit — groceries downstairs, open space and finished streets.",
    intro: [
      "Resale value is not a brochure promise. It follows occupancy — families who stay, shops that open, streets that finish. Mixed-use is often marketed; less often delivered.",
      "On a site visit, look for evidence that daily life already works: a grocer with a queue on a weekday, children using the garden, retail that serves residents before investors.",
    ],
    sections: [
      { type: "heading", title: "Street and ground floor" },
      {
        type: "image",
        src: "/images/figma/about/insight-2.png",
        alt: "Ground-floor retail and residential tower at a Jivah project",
        aspect: "21/9",
      },
      {
        type: "split",
        paragraphs: [
          "Ground-floor retail only adds value when it opens. Empty shells and ‘coming soon’ boards do not create footfall — they create doubt for the next buyer.",
          "Walk the block, not only the lobby. Are pavements finished? Is there a sensible drop-off? Can you buy milk without getting into a car?",
        ],
        image: {
          src: "/images/jivah-park-card.png",
          alt: "Park and open space within a Jivah neighbourhood",
        },
        imageSide: "right",
      },
      { type: "heading", title: "Open space that gets used" },
      {
        type: "callout",
        text: "Amenity decks that stay empty are liabilities. Gardens with evening light, usable lawns and shade are what families photograph when they recommend a address to friends.",
      },
      {
        type: "imageGrid",
        images: [
          {
            src: "/images/figma/project-detail/lifestyle-park.png",
            alt: "Central park and play area",
          },
          {
            src: "/images/figma/project-detail/lifestyle-walkway.png",
            alt: "Tree-lined walkway through the project",
          },
        ],
      },
      {
        type: "split",
        paragraphs: [
          "Open space should connect to how you move through the week — school run, evening walk, weekend cricket — not only to a render from the marketing deck.",
          "Projects that finish streets and landscaping before possession tend to hold value better in emerging cities, where buyers compare what is built, not what is promised.",
        ],
        image: {
          src: "/images/figma/project-detail/lifestyle-community.png",
          alt: "Residents gathering in a community space",
        },
        imageSide: "left",
      },
      {
        type: "image",
        src: "/images/intent-families.png",
        alt: "Family enjoying a finished neighbourhood",
        aspect: "21/9",
      },
      {
        type: "paragraph",
        text: "Value follows use. If the neighbourhood works on an ordinary Tuesday, it will work for the next buyer too.",
      },
    ],
  },
  {
    slug: "mortgage-rates-update",
    title: "Mortgage rates update and what to compare",
    author: "Jivah Realty",
    date: "Feb 19, 2024",
    readTime: "5 min read",
    tag: "Updates",
    image: "/images/figma/about/insight-3.png",
    excerpt: "How to compare processing fees, prepayment rules and the true rate — not only the headline.",
    intro: [
      "Headline rates move every quarter. What you actually pay depends on processing fees, insurance bundles, prepayment penalties and how long you intend to hold the loan.",
      "Use the advertised rate as a starting point — then compare the full stack before you pick a lender.",
    ],
    sections: [
      { type: "heading", title: "Beyond the headline" },
      {
        type: "image",
        src: "/images/figma/about/insight-3.png",
        alt: "Couple reviewing loan documents at home",
        aspect: "21/9",
      },
      {
        type: "split",
        paragraphs: [
          "Ask for the annual percentage cost, not only the floating rate. Processing, legal and administrative charges add up — especially on smaller ticket sizes.",
          "Check prepayment and part-prepayment rules. If you expect a bonus or inheritance in five years, a restrictive clause can cost more than a slightly higher rate.",
        ],
        image: {
          src: "/images/figma/project-detail/insights/insight-3.png",
          alt: "EMI calculator and bank statement on a table",
        },
        imageSide: "right",
      },
      {
        type: "callout",
        text: "We do not lock you to a lender. We work with a short list so paperwork is familiar — but the loan should fit your cash flow, not the other way around.",
      },
      {
        type: "paragraph",
        text: "Run the EMI against your monthly surplus, not your gross salary. Leave room for maintenance, tax and the life you are buying the home for.",
      },
    ],
  },
  {
    slug: "reading-rera-certificate",
    title: "Reading a RERA certificate line by line",
    author: "Jivah Realty",
    date: "Mar 4, 2024",
    readTime: "7 min read",
    tag: "Guides",
    image: "/images/figma/project-detail/insights/insight-1.png",
    excerpt: "What the registration number tells you — promoter, timeline, carpet area and what is still pending.",
    intro: [
      "Every ongoing Jivah project lists its MahaRERA number on the project page, in downloads and on site boards. Upcoming projects stay marked ‘registration underway’ until the number is issued.",
      "The certificate is public. Here is what to read before you treat marketing copy as fact.",
    ],
    sections: [
      { type: "heading", title: "What to verify first" },
      {
        type: "image",
        src: "/images/figma/project-detail/insights/insight-1.png",
        alt: "RERA registration document",
        aspect: "21/9",
      },
      {
        type: "split",
        paragraphs: [
          "Match the registration number on the certificate to the number on site boards and in the allotment draft. Promoter name and project name should match exactly.",
          "Note the declared carpet areas and phase-wise possession dates. If sales talk promises an earlier handover, the certificate is the document that counts.",
        ],
        image: {
          src: "/images/figma/project-detail/site-plan.png",
          alt: "Approved site plan layout",
        },
        imageSide: "right",
      },
      {
        type: "callout",
        text: "We do not take bookings before registration on ongoing projects. If a number cannot be shown, treat that as information — not as something to rush past.",
      },
      { type: "paragraph", text: "Keep a PDF of the certificate with your booking file. It is the reference point if timelines or specifications are questioned later." },
    ],
  },
  {
    slug: "mixed-use-neighbourhoods",
    title: "What mixed-use actually means on the ground",
    author: "Jivah Realty",
    date: "Mar 12, 2024",
    readTime: "6 min read",
    tag: "Neighbourhoods",
    image: "/images/figma/project-detail/insights/insight-2.png",
    excerpt: "Ground-floor retail that opens, streets that finish, and why occupancy beats amenity decks.",
    intro: [
      "Mixed-use is on every brochure. On the ground it means groceries downstairs, clinics that stay open, and streets finished enough for strollers and school bags.",
      "Jivah plans neighbourhoods around that daily rhythm — not a podium deck that looks good in a drone shot.",
    ],
    sections: [
      { type: "heading", title: "Retail that serves residents" },
      {
        type: "image",
        src: "/images/figma/project-detail/insights/insight-2.png",
        alt: "Mixed-use street with retail and homes",
        aspect: "21/9",
      },
      {
        type: "split",
        paragraphs: [
          "We lease ground floors to operators who need resident footfall — grocers, pharmacies, tuition centres — not brands that only work in a mall.",
          "That keeps evenings busy and gives investors something beyond a vacant amenity floor.",
        ],
        image: {
          src: "/images/figma/hero-street.jpg",
          alt: "Active street frontage at a Jivah project",
        },
        imageSide: "right",
      },
      {
        type: "callout",
        text: "Occupancy over brochures. A neighbourhood people use on a weekday is the mixed-use proof that matters.",
      },
      {
        type: "imageGrid",
        images: [
          { src: "/images/figma/project-detail/lifestyle-exterior.png", alt: "Project exterior and retail" },
          { src: "/images/city-andhra.png", alt: "Emerging city skyline" },
        ],
      },
      { type: "paragraph", text: "That is the version of mixed-use we build for — finished streets, open space, and retail that opens before the last tower is sold." },
    ],
  },
  {
    slug: "documents-before-you-book",
    title: "Documents to collect before you book",
    author: "Jivah Realty",
    date: "Mar 21, 2024",
    readTime: "4 min read",
    tag: "Tips",
    image: "/images/figma/project-detail/insights/insight-3.png",
    excerpt: "Brochures, floor plans and allotment letters — what to collect and what to verify on site.",
    intro: [
      "Booking day should not be the first time you see the paperwork. Collect drafts early, read them at home, and bring questions to the site visit.",
      "These are the documents we expect every buyer to leave with — whether you book with Jivah or not.",
    ],
    sections: [
      { type: "heading", title: "Before you sign" },
      {
        type: "image",
        src: "/images/figma/project-detail/insights/insight-3.png",
        alt: "Stack of homebuying documents",
        aspect: "21/9",
      },
      {
        type: "split",
        paragraphs: [
          "Brochure and approved floor plan for the unit type you are considering. RERA certificate and latest quarterly update if the project is ongoing.",
          "Draft allotment letter with carpet area, payment schedule, possession date and list of inclusions. KYC checklist from the developer.",
        ],
        image: {
          src: "/images/figma/project-detail/floor-plan-2bhk.png",
          alt: "Approved floor plan drawing",
        },
        imageSide: "right",
      },
      {
        type: "callout",
        text: "If a clause cannot be explained without pressure, it should not be part of the decision. Slow questions are welcome.",
      },
      { type: "paragraph", text: "Store scans in one folder — loan, RERA and booking — so nothing is missing when the bank or registrar asks." },
    ],
  },
  {
    slug: "site-visit-checklist",
    title: "Site visit checklist for emerging cities",
    author: "Jivah Realty",
    date: "Apr 2, 2024",
    readTime: "5 min read",
    tag: "Tips",
    image: "/images/figma/project-detail/lifestyle-walkway.png",
    excerpt: "What to see on a weekday walk — retail, streets, open space and who is actually using them.",
    intro: [
      "Sunday site visits lie. Tuesday evening tells you whether a grocer opens, whether children use the garden, and whether the street is finished enough for daily life.",
      "Use this checklist on every project you shortlist — Jivah or otherwise.",
    ],
    sections: [
      { type: "heading", title: "Before you arrive" },
      {
        type: "list",
        items: [
          "Note the MahaRERA number and match it on site boards.",
          "Plan the visit for a weekday evening if the project is occupied or near handover.",
          "Bring the floor plan and payment schedule you already have at home.",
        ],
      },
      { type: "heading", title: "On the walk" },
      {
        type: "paragraph",
        text: "Walk the block, not only the lobby. Pavements, drop-off, daily retail and open space matter more than a polished sales office.",
      },
      {
        type: "callout",
        text: "If the neighbourhood only works on a brochure render, it will not work for resale either.",
      },
    ],
  },
  {
    slug: "comparing-possession-timelines",
    title: "How to compare possession timelines across projects",
    author: "Jivah Realty",
    date: "Apr 9, 2024",
    readTime: "4 min read",
    tag: "Guides",
    image: "/images/figma/project-detail/featured/hero.png",
    excerpt: "Certificate dates, construction progress and what sales teams promise — what actually counts.",
    intro: [
      "Possession dates differ by phase, tower and registration status. The only date that counts is the one on the RERA certificate and in your allotment letter.",
      "Here is how to compare timelines without getting lost in optimistic sales talk.",
    ],
    sections: [
      { type: "heading", title: "Read the certificate first" },
      {
        type: "paragraph",
        text: "Match the declared possession quarter on MahaRERA to the draft allotment letter. If sales promises an earlier handover, ask for it in writing — or treat the certificate as final.",
      },
      {
        type: "list",
        items: [
          "Check phase-wise dates if the project is large or multi-tower.",
          "Ask for the latest quarterly RERA update on ongoing projects.",
          "Compare construction progress photos to the timeline, not only to a render.",
        ],
      },
      {
        type: "paragraph",
        text: "A realistic timeline protects your EMI plan and your exit if circumstances change.",
      },
    ],
  },
  {
    slug: "investing-in-mixed-use",
    title: "Investing in mixed-use — occupancy over brochures",
    author: "Jivah Realty",
    date: "Apr 16, 2024",
    readTime: "6 min read",
    tag: "Investment",
    image: "/images/intent-investors.png",
    excerpt: "Yield follows footfall. What to verify before you treat ground-floor retail as an amenity deck.",
    intro: [
      "Investors often ask about rental yield before anyone asks whether the grocer opens. Mixed-use only works when residents and retail share the same weekday rhythm.",
      "These are the signals we look for in neighbourhoods we build and recommend.",
    ],
    sections: [
      { type: "heading", title: "Footfall you can verify" },
      {
        type: "paragraph",
        text: "Ground-floor units leased to daily-needs operators — grocers, pharmacies, tuition — create repeat footfall. Empty shells and ‘coming soon’ boards do not.",
      },
      {
        type: "callout",
        text: "Delivered projects with operating retail are proof. Upcoming projects should show lease intent, not only a podium render.",
      },
      {
        type: "paragraph",
        text: "Compare entry price, possession and RERA status side by side — then walk the block if you can.",
      },
    ],
  },
];

export function getBlogArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}

export function getBlogListingPosts() {
  return blogArticles.map(({ slug, title, date, readTime, tag, image, excerpt }) => ({
    slug,
    title,
    date,
    readTime,
    tag,
    image,
    excerpt,
    href: `/blog/${slug}/`,
  }));
}
