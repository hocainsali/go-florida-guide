export type GuideContentBlock =
  | { type: "heading2" | "heading3"; text: string }
  | { type: "paragraph"; text?: string; segments?: GuideTextSegment[] }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type GuideTextSegment = {
  text: string;
  bold?: boolean;
  href?: string;
};

export type GuideArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateISO: string;
  readingTime: string;
  featuredImage: string;
  imageAlt: string;
  imagePosition?: string;
  author: { name: string; role: string; bio: string };
  content: GuideContentBlock[];
};

const defaultAuthor = {
  name: "Go Florida Guide",
  role: "Independent Florida planning team",
  bio: "Practical, honest Florida advice created for UK families planning with confidence.",
};

export const guideArticles: GuideArticle[] = [
  {
    slug: "beat-the-florida-heat-with-young-kids",
    title: "How to Beat the Florida Heat with Young Kids",
    excerpt: "A realistic family plan for cooler park days, smarter breaks and fewer afternoon meltdowns.",
    category: "Family travel",
    date: "28 August 2026",
    dateISO: "2026-08-28",
    readingTime: "6 min read",
    featuredImage: "/images/featured-beat-florida-heat.webp",
    imageAlt: "Young children enjoying a sunny Florida splash park with their family",
    author: defaultAuthor,
    content: [
      { type: "paragraph", segments: [
        { text: "Florida heat feels very different from a warm summer day in the UK. " },
        { text: "Humidity builds quickly", bold: true },
        { text: ", shade can be limited and a full theme park itinerary asks a lot of young children. A few deliberate choices—and a flexible " },
        { text: "Florida plan", href: "/guide/realistic-florida-family-budget" },
        { text: "—can protect the best parts of the day." },
      ] },
      { type: "heading2", text: "Build your day around the coolest hours" },
      { type: "paragraph", text: "Arrive before opening, prioritise outdoor attractions first and plan a proper indoor break after lunch. Returning later is usually more enjoyable than forcing everyone through the hottest part of the afternoon." },
      { type: "list", items: ["Freeze water bottles overnight and refill them often.", "Pack light, breathable clothing and a spare top for each child.", "Use mobile ordering so nobody waits in the sun for food.", "Choose one air-conditioned reset point before the day begins."] },
      { type: "quote", text: "A shorter day with happy children will create better memories than a perfect itinerary completed in the heat." },
      { type: "heading2", text: "Recognise when the plan needs to change" },
      { type: "paragraph", text: "Tiredness, flushed skin and sudden irritability are useful signals. Stop, cool down and hydrate early. Florida will still be there tomorrow, and flexible plans are often the ones families remember most fondly." },
      { type: "image", src: "/images/contact-park-day-splash.webp", alt: "A family cooling down beside a Florida splash area", caption: "Plan water and shade breaks before the temperature peaks." },
      { type: "heading3", text: "The simple rule" },
      { type: "paragraph", text: "Do less between midday and late afternoon, then enjoy the evening when the light is softer and everyone has more energy." },
    ],
  },
  {
    slug: "booking-flights-from-the-uk",
    title: "Booking Florida Flights from the UK: A Calm, Practical Guide",
    excerpt: "When to book, what to compare and where families can avoid paying for the wrong kind of convenience.",
    category: "Flights",
    date: "22 August 2026",
    dateISO: "2026-08-22",
    readingTime: "8 min read",
    featuredImage: "/images/featured-book-flights-uk.webp",
    imageAlt: "A passenger aircraft flying above soft clouds on the way to Florida",
    author: defaultAuthor,
    content: [
      { type: "paragraph", text: "The cheapest headline fare is rarely the full price for a family. Baggage, seat selection, airport transfers and the timing of your first hotel night can change the real cost considerably." },
      { type: "heading2", text: "Compare the whole journey" },
      { type: "paragraph", text: "Check direct and one-stop flights alongside arrival airport, luggage allowances and realistic transfer times. Orlando International is convenient for the theme parks, while Miami or Tampa can make more sense for a wider road trip." },
      { type: "list", items: ["Price checked luggage for every traveller who needs it.", "Compare seat fees before choosing a fare family.", "Allow generous connection time when clearing US immigration.", "Check the cost of parking or rail travel to the UK departure airport."] },
      { type: "quote", text: "The best-value flight is the one that keeps the first and last day of your holiday manageable." },
      { type: "heading2", text: "Book when the numbers make sense" },
      { type: "paragraph", text: "Set a realistic total budget, track a small group of suitable flights and book when the complete journey fits. Waiting for an imagined perfect price can remove the schedules that work best for your family." },
    ],
  },
  {
    slug: "theme-park-day-packing-list",
    title: "The Florida Theme Park Packing List You Will Actually Use",
    excerpt: "A lighter bag with the essentials for heat, rain, queues and comfortable family days.",
    category: "Theme parks",
    date: "16 August 2026",
    dateISO: "2026-08-16",
    readingTime: "5 min read",
    featuredImage: "/images/featured-theme-park-packing.webp",
    imageAlt: "A family preparing a practical day bag for a Florida theme park",
    author: defaultAuthor,
    content: [
      { type: "paragraph", text: "A useful park bag solves common problems without becoming another burden. Pack for comfort, quick weather changes and the moments when a child needs an easy reset." },
      { type: "heading2", text: "The essentials" },
      { type: "list", items: ["Refillable water bottles", "High-factor sunscreen", "Compact ponchos", "Portable battery and charging cable", "A dry change of clothes for young children", "A few familiar snacks"] },
      { type: "heading2", text: "Keep important items easy to reach" },
      { type: "paragraph", text: "Use one small pouch for tickets, medication and charging cables. Keep rain protection near the top, and avoid carrying valuables that you do not expect to use." },
      { type: "quote", text: "If an item does not solve a likely problem, it probably does not need to spend twelve hours on your shoulder." },
    ],
  },
  {
    slug: "realistic-florida-family-budget",
    title: "A Realistic Florida Holiday Budget for UK Families",
    excerpt: "Plan the costs beyond flights and accommodation, with room for the moments that matter.",
    category: "Budget & planning",
    date: "9 August 2026",
    dateISO: "2026-08-09",
    readingTime: "9 min read",
    featuredImage: "/images/featured-plan-florida-budget.webp",
    imageAlt: "A family planning their Florida holiday budget together",
    author: defaultAuthor,
    content: [
      { type: "paragraph", text: "A Florida budget works best when it reflects how your family actually travels. Build it from major fixed costs, then add realistic daily spending and a separate buffer for changes." },
      { type: "heading2", text: "Start with five clear groups" },
      { type: "list", items: ["Flights and airport travel", "Accommodation and resort fees", "Theme park and attraction tickets", "Car hire, fuel, tolls and parking", "Food, shopping and contingency money"] },
      { type: "heading2", text: "Protect a contingency fund" },
      { type: "paragraph", text: "Keep part of the budget unassigned. Weather, tired children and last-minute changes are normal. A buffer lets you adapt without turning every decision into a stressful calculation." },
      { type: "quote", text: "A good budget gives your family permission to enjoy the holiday because the important decisions were made before you travelled." },
    ],
  },
  {
    slug: "orlando-villa-or-hotel",
    title: "Orlando Villa or Hotel? Choose the Right Family Base",
    excerpt: "Compare space, location, resort facilities and the daily rhythm each option creates.",
    category: "Accommodation",
    date: "2 August 2026",
    dateISO: "2026-08-02",
    readingTime: "7 min read",
    featuredImage: "/images/accommodation.webp",
    imageAlt: "Bright Florida accommodation surrounded by palm trees",
    author: defaultAuthor,
    content: [
      { type: "paragraph", text: "A villa offers space, privacy and an easy home routine. A hotel can reduce driving and place pools, restaurants and transport close at hand. The best choice depends on how your family wants each day to feel." },
      { type: "heading2", text: "Choose a villa for space and flexibility" },
      { type: "paragraph", text: "Separate bedrooms, laundry facilities and a kitchen are valuable on a longer trip. Remember to include driving, parking, cleaning fees and the time needed for supermarket stops." },
      { type: "heading2", text: "Choose a hotel for a simpler routine" },
      { type: "paragraph", text: "Hotels can make short trips and park-heavy itineraries easier. Compare room size, transport frequency, resort fees and the true journey from your room to the attractions." },
      { type: "quote", text: "Choose the base that supports your everyday routine, because that is where much of the holiday experience is shaped." },
    ],
  },
  {
    slug: "florida-beyond-the-theme-parks",
    title: "Florida Beyond the Theme Parks: Five Family Detours",
    excerpt: "Clear springs, coastal roads and wildlife experiences that add breathing room to a busy trip.",
    category: "Beyond the parks",
    date: "26 July 2026",
    dateISO: "2026-07-26",
    readingTime: "7 min read",
    featuredImage: "/images/beyond-the-parks.webp",
    imageAlt: "A family exploring clear water and green woodland in natural Florida",
    author: defaultAuthor,
    content: [
      { type: "paragraph", text: "Florida becomes much easier to understand when you spend time away from the major attractions. Natural springs, quiet beaches and small coastal towns give families a slower view of the state." },
      { type: "heading2", text: "Add one different kind of day" },
      { type: "list", items: ["Paddle or swim at a clear freshwater spring.", "Watch sunset on the Gulf Coast.", "Drive a short section of the Overseas Highway.", "Explore a wildlife refuge with an early start.", "Spend a simple beach morning with no fixed schedule."] },
      { type: "image", src: "/images/crystal-river.webp", alt: "A manatee swimming through clear water at a Florida spring", caption: "Natural Florida brings a completely different pace to the trip." },
      { type: "quote", text: "The unplanned space between the big attractions is often where a family holiday begins to feel personal." },
    ],
  },
  {
    slug: "first-time-miami-with-family",
    title: "First-Time Miami with a Family: What to Prioritise",
    excerpt: "A simple plan for beach time, Art Deco colour and comfortable city exploring.",
    category: "Miami",
    date: "19 July 2026",
    dateISO: "2026-07-19",
    readingTime: "6 min read",
    featuredImage: "/images/hero-south-beach.webp",
    imageAlt: "Sunny Art Deco buildings and palm trees in Miami Beach",
    author: defaultAuthor,
    content: [
      { type: "paragraph", text: "Miami works well for families when the itinerary stays focused. Choose one neighbourhood, plan around the heat and leave enough time for the beach to feel relaxing rather than squeezed between activities." },
      { type: "heading2", text: "Keep the first visit simple" },
      { type: "paragraph", text: "Combine an early walk through the Art Deco district with a beach morning, then use the afternoon for a long lunch or an indoor attraction. Save wider city exploration for a separate day." },
      { type: "list", items: ["Stay within an easy walk of food and the beach.", "Use mornings for outdoor sightseeing.", "Check parking costs before choosing accommodation.", "Carry water even for short walks."] },
      { type: "quote", text: "Miami is at its best when you give its colour, food and coastline enough room in the schedule." },
    ],
  },
  {
    slug: "florida-keys-family-road-trip",
    title: "Planning a Florida Keys Road Trip with Children",
    excerpt: "Break the drive into memorable stops and make the journey part of the holiday.",
    category: "Road trips",
    date: "12 July 2026",
    dateISO: "2026-07-12",
    readingTime: "8 min read",
    featuredImage: "/images/keys-aerial.webp",
    imageAlt: "Aerial view of turquoise water and green islands in the Florida Keys",
    author: defaultAuthor,
    content: [
      { type: "paragraph", text: "The Overseas Highway is far more enjoyable when it is treated as a chain of small experiences rather than a road to finish. Build in water views, easy food stops and time for children to move." },
      { type: "heading2", text: "Plan fewer miles each day" },
      { type: "paragraph", text: "Traffic can be slow and the best stops deserve time. Choose one or two priorities between overnight bases and keep arrival expectations flexible." },
      { type: "list", items: ["Start with a full tank and downloaded maps.", "Keep swimwear and towels in an easy-access bag.", "Avoid scheduling a fixed activity immediately after a long drive.", "Stop before everyone needs a break."] },
      { type: "quote", text: "In the Keys, the road itself is part of the destination. Give your family time to notice it." },
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return guideArticles.find((article) => article.slug === slug);
}
