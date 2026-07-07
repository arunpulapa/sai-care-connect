import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Truck,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Zap,
  Plus,
  Minus,
  User as UserIcon,
  Wrench,
  ClipboardList,
  RefreshCw,
  Smartphone,
  Tablet,
  Cpu,
  Watch,
  ShoppingBag,
  Headphones,
  Shield,
  Package,
  BatteryCharging,
  MapPin,
  Instagram,
  Globe,
  Phone as PhoneIcon,
  CheckCircle2,
  IndianRupee,
  Play,
  Users,
  Lock,
  BadgeCheck,
  ArrowRight,
  Star,
  Navigation,
  ShieldCheck,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import garoodaLogo from "../assets/garooda_logo.jpeg";
import mobileHero from "../assets/mobile-hero.jpg";

interface IndexSearch {
  tech?: string | boolean;
  admin?: string | boolean;
}

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): IndexSearch => {
    return {
      tech: search.tech as string | boolean | undefined,
      admin: search.admin as string | boolean | undefined,
    };
  },
  component: Index,
  head: () => ({
    meta: [
      { title: "garooda Mobiles — Premium Device Repair in Tadepalligudem" },
      {
        name: "description",
        content:
          "Premium mobile and device repair in Tadepalligudem. Transparent pricing, genuine parts, doorstep pickup. Book your repair instantly via WhatsApp.",
      },
    ],
  }),
});

const SHOP_PHONE = "918125019015";

// Instagram reels (from prompt.txt), ordered to match videoItems:
// OCA Machine · iPhone Repair · TBK Machine · Before / After
const REEL_IDS = ["DRpM1chEeE6", "DZcxVnmxMjJ", "DUDzap7ATtN", "DXmYzjVEQn6"];

type Lang = "en" | "te";

const T = {
  en: {
    // Nav
    navOverview: "Home",
    navServices: "Services",
    navPricing: "Pricing",
    navReviews: "Reviews",
    navBook: "Book Repair",
    navFaq: "FAQ",
    hubOperational: "Open Now",
    techPortal: "Technician Panel",
    clientBooking: "Customer View",
    // Hero
    heroBadge: "Tadepalligudem's Most Trusted Phone Repair Shop 🔧",
    heroH1a: "Mobile Repair Experts",
    heroH1b: "in Tadepalligudem",
    heroSubtitle:
      "Same-day repairs on phones, tablets & smartwatches — with 100% genuine parts, upfront pricing, and live updates on WhatsApp. Walk in or we'll come to you!",
    heroCtaBook: "Book a Repair Now",
    heroCtaChat: "Chat on WhatsApp",
    heroCtaCall: "Call 8125019015",
    heroRatingNote: "from 5,000+ happy customers",
    heroChecks: [
      "Touch Glass",
      "iPhone Display",
      "Motherboard",
      "Original Batteries",
      "Same-Day Service",
    ],
    // Trust signals
    trustStats: [
      { value: "5,000+", label: "Repairs Completed" },
      { value: "5.0★", label: "Customer Rating" },
      { value: "3+", label: "Years Experience" },
      { value: "30-Day", label: "Repair Warranty" },
    ],
    // Floating WhatsApp
    waFloatText: "Hi Garooda Mobiles, my phone model is ______. I need repair.",
    waFloatTooltip: "Chat with us on WhatsApp",
    // Price transparency
    priceLabel: "Transparent Pricing",
    priceH2: "Honest Prices, No Surprises",
    priceSubtitle:
      "Starting prices for our most common repairs. Your exact quote is confirmed free on WhatsApp after diagnosis.",
    priceCol1: "Repair Service",
    priceCol2: "Starting From",
    priceNote:
      "💡 Prices vary by device model & part quality. We always confirm the exact cost before starting — no hidden charges, ever.",
    priceList: [
      { service: "Touch Glass Replacement", price: "₹999" },
      { service: "Battery Replacement", price: "₹799" },
      { service: "Charging Port Repair", price: "₹599" },
      { service: "Display / Screen Replacement", price: "₹1,499" },
      { service: "iPhone Display Repair", price: "₹2,499" },
      { service: "Motherboard / Chip-Level Repair", price: "₹1,999" },
      { service: "Water Damage Treatment", price: "₹899" },
      { service: "Software / OS Issues", price: "₹399" },
    ],
    // Video proof
    videoLabel: "See It To Believe It",
    videoH2: "Real Repairs, Caught on Camera",
    videoSubtitle:
      "Watch 30-second clips of our technicians at work — genuine machines, genuine results.",
    videoItems: [
      { title: "OCA Machine", desc: "Glass lamination under vacuum pressure" },
      { title: "iPhone Repair", desc: "Precision display & Face ID restoration" },
      { title: "TBK Machine", desc: "Automated screen separation process" },
      { title: "Before / After", desc: "Shattered to flawless in under an hour" },
    ],
    // Why choose us
    whyLabel: "Why Garooda Mobiles",
    whyH2: "Why Customers Trust Us",
    whyItems: [
      { title: "Professional OCA Machine Repairs", desc: "Factory-grade glass lamination for a flawless finish." },
      { title: "Genuine Spare Parts", desc: "100% original components — never cheap copies." },
      { title: "Experienced Technicians", desc: "3+ years of hands-on expertise on every brand." },
      { title: "Data Safety Priority", desc: "Your photos & files stay private and protected." },
      { title: "Fast Delivery", desc: "Most repairs done the same day you walk in." },
      { title: "Warranty Support", desc: "Every repair backed by our 30-day warranty." },
    ],
    // iPhone specialist
    iphoneLabel: "Apple Certified Care",
    iphoneH2: "iPhone Repair Specialists in Tadepalligudem",
    iphoneSubtitle:
      "From a cracked back glass to a tricky Face ID fault — we restore every iPhone to factory perfection with genuine parts.",
    iphoneServices: [
      "Back Glass",
      "Battery",
      "Display",
      "Face ID",
      "Charging Port",
      "Motherboard",
    ],
    iphoneCta: "Book iPhone Repair",
    // Reviews
    reviewsLabel: "Loved by Tadepalligudem",
    reviewsH2: "What Our Customers Say",
    reviewsSubtitle: "Real reviews from real customers across Tadepalligudem.",
    reviewsCta: "Read All Reviews on Google",
    reviewItems: [
      { name: "Ravi Teja", device: "iPhone 13 · Screen", text: "Cracked my iPhone 13 screen badly. Garooda fixed it in 2 hours with an original display. Looks brand new!" },
      { name: "Sneha P.", device: "Samsung S22 · Battery", text: "My battery was draining fast. They replaced it the same day and even did free doorstep pickup. Highly recommend!" },
      { name: "Karthik M.", device: "OnePlus 9 · Charging Port", text: "Fair price, no hidden costs, and they kept me updated on WhatsApp the whole time. Very professional." },
      { name: "Lakshmi N.", device: "iPhone 12 · Back Glass", text: "Back glass replacement looked impossible elsewhere. Garooda did it perfectly — genuine and trustworthy." },
      { name: "Anil Kumar", device: "Redmi Note 11 · Display", text: "Best mobile repair in Tadepalligudem. Professional team, and they truly care about your data safety." },
      { name: "Divya R.", device: "Apple Watch · Glass", text: "Even repaired my Apple Watch when others refused. Quick, honest, and friendly service throughout." },
    ],
    // Location / Map
    mapLabel: "Visit Our Store",
    mapH2: "Find Us in Tadepalligudem",
    mapAddress: "Opposite Chennai Shopping, Tadepalligudem, Andhra Pradesh",
    mapDirections: "Get Directions",
    // Trust builder
    trustBuilderQ: "What Happens If We Can't Repair It?",
    trustBuilderA: "No repair, no charges. We only charge after a successful repair — that's our promise to you.",
    // Device cards
    phones: "📱 Phones",
    phonesDesc: "iPhone, Samsung, OnePlus, Xiaomi & all Android brands",
    tablets: "📟 Tablets",
    tabletsDesc: "iPad, Samsung Tab & Android tablet repairs",
    motherboard: "🔩 Motherboard",
    motherboardDesc: "Chip-level repairs, micro-soldering & data recovery",
    svcRepairLabel: "Repair Services",
    svcAccessoriesLabel: "Accessories & Resell",
    smartwatch: "⌚ Smart Watches",
    smartwatchDesc: "Apple Watch, Galaxy Watch, MI Band & all wearables",
    cases: "📦 Cases & Covers",
    casesDesc: "Premium & budget covers for all phone models",
    audio: "🎧 Audio Devices",
    audioDesc: "Earphones, TWS buds, headphones & BT speakers",
    screenGuard: "🛡️ Screen Guards",
    screenGuardDesc: "Tempered glass & flexible screen protectors",
    chargers: "🔌 Chargers & Cables",
    chargersDesc: "Fast-charge adapters, USB-C, Lightning & data cables",
    // Intake form
    intakeLabel: "Quick Repair Booking",
    intakeH2: "Book Your Repair in 2 Minutes",
    intakeSubtitle:
      "Fill in your device details below and we'll send you a price quote on WhatsApp — usually within 15 minutes!",
    modelLabel: "Your Device (e.g. iPhone 14, Samsung S23, OnePlus 12)",
    issueLabel: "What's wrong with your device?",
    issuePlaceholder: "Tap to choose the issue",
    customIssuePlaceholder: "Tell us more about the problem (optional)...",
    serviceLabel: "How would you like to send it to us?",
    expressWalkin: "Walk In",
    expressWalkinSub: "Come straight to our Opp-Chennai Shopping Mall shop — we start right away",
    doorstepPickup: "Free Doorstep Pickup",
    doorstepPickupSub: "We'll pick it up from your home — free of charge, within Tadepalligudem only",
    nameLabel: "Your Name",
    phoneLabel: "Your WhatsApp Number",
    formError: "Please fill in all fields so we can prepare your repair quote.",
    submitFull: "Send My Repair Request on WhatsApp 🚀",
    submitPartial: "Fill all fields to continue",
    progressLabel: "Booking Progress",
    // Bento
    bentoTitle1: "Free Doorstep Pickup",
    bentoDesc1:
      "Can't make it to our shop? No worries! We'll come to your doorstep, pick up your device, and return it fixed — at no extra cost. Available within Tadepalligudem only.",
    bentoTitle2: "No Hidden Costs — Ever",
    bentoDesc2:
      "We give you the exact repair price before we touch your device. No nasty surprises, no last-minute add-ons. What we quote is exactly what you pay.",
    bentoTitle3: "Live Updates on WhatsApp",
    bentoDesc3:
      "No app downloads needed! Get real-time updates on your repair right on WhatsApp — just like tracking a Swiggy order, but for your phone.",
    // FAQ
    faqBadge: "Got Questions?",
    faqH2: "We've Got Answers",
    faq1q: "Is this booking form free to use?",
    faq1a:
      "100% free! Just fill in your details, and we'll send you a repair quote on WhatsApp within 15 minutes. No commitment needed.",
    faq2q: "How long does a typical repair take?",
    faq2a:
      "Most screen replacements and battery swaps are done the same day — usually within 1–2 hours of your device arriving at our shop.",
    faq3q: "Do you offer a warranty on repairs?",
    faq3a:
      "Absolutely! Every repair comes with a 30-day warranty on parts and workmanship. If anything goes wrong within that period, we fix it for free — no questions asked.",
    faq4q: "Which brands do you repair?",
    faq4a:
      "We repair all major brands — Apple iPhone, Samsung, OnePlus, Xiaomi, OPPO, vivo, Realme, Motorola, Nokia, and many more. Got a less common brand? Just ask us!",
    // Hours
    hoursLabel: "Store Hours",
    hoursH2: "When We're Open",
    hoursSubtitle: "Drop by or book online — 6 days a week at Opp-Chennai Shopping Mall",
    hoursOpenNow: "Open Right Now",
    hoursClosedNow: "Currently Closed",
    hoursHoliday: "Holiday",
    hoursToday: "Today",
    hoursTiming: "10:00 AM – 10:00 PM",
    hoursDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    // CTA Banner
    ctaTagline: "Free Pickup — Tadepalligudem Only",
    ctaH2: "Book Your Repair Today",
    ctaBody: "Call us or WhatsApp and we'll pick up your device from your doorstep — absolutely free, anywhere in Tadepalligudem.",
    ctaCall: "Call Now",
    ctaWhatsapp: "WhatsApp Us",
    // Footer
    footerCopy: `© ${new Date().getFullYear()} garooda Mobiles · Opp-Chennai Shopping Mall, Tadepalligudem. All Rights Reserved.`,
    footerDev: "Designed & Developed by",
    footerDevLink: "AK NextGen Solutions",
    footerDevTagline: "Premium Websites · Apps · AI Solutions",
    footerDevCta: "Visit Studio",
    // Issues
    issues: [
      "Cracked / Broken Screen",
      "Battery Draining Too Fast",
      "Charging Port Not Working",
      "Water / Liquid Damage",
      "Motherboard / Software Issue",
      "Smartwatch / Wearable Repair",
      "Something Else",
    ],
    // Technician
    techTitle: "Technician Dashboard",
    techSubtitle: "Manage active repair jobs and send WhatsApp updates.",
    techSystem: "Staff Panel",
    resetMock: "Reset Demo Data",
    benchMetrics: "Today's Stats",
    totalTickets: "Total Jobs",
    inProgress: "In Progress",
    slaTimeline: "Target Turnaround Times",
    slaSteps: [
      { step: "1. Check-In", time: "Within 15 mins of arrival" },
      { step: "2. Diagnosis", time: "Within 30 mins" },
      { step: "3. WhatsApp Quote", time: "Within 45 mins" },
      { step: "4. Repair", time: "Typically 60–90 mins" },
    ],
    waCrmGuide: "WhatsApp Label Guide",
    waCrmBody:
      "Use these colour labels in your free WhatsApp Business app to track every repair job at a glance:",
    noTickets: "No active repair jobs yet.",
    noTicketsSub: "New bookings from customers will appear here.",
    intakeRequestIssue: "Reported Issue",
    benchNotes: "Technician Notes",
    benchNotesPlaceholder: "Add diagnosis notes or findings...",
    costEstimate: "Repair Cost Estimate",
    costPlaceholder: "e.g. ₹4,500",
    waOps: "WhatsApp Actions",
    sendAlert: "Send Status Update",
    removeTicket: "Delete",
    client: "Customer",
    registered: "Booked on",
  },
  te: {
    // Nav
    navOverview: "హోమ్",
    navServices: "సేవలు",
    navPricing: "ధరలు",
    navReviews: "రివ్యూలు",
    navBook: "మరమ్మత్తు బుక్ చేయండి",
    navFaq: "సందేహాలు",
    hubOperational: "తెరిచి ఉంది",
    techPortal: "సాంకేతిక పేనల్",
    clientBooking: "కస్టమర్ వ్యూ",
    // Hero
    heroBadge: "తాడేపల్లిగూడెంలో అత్యంత విశ్వసనీయ ఫోన్ రిపేర్ షాప్ 🔧",
    heroH1a: "మొబైల్ రిపేర్ నిపుణులు",
    heroH1b: "తాడేపల్లిగూడెంలో",
    heroSubtitle:
      "ఫోన్లు, టాబ్లెట్లు & స్మార్ట్‌వాచ్‌లకు అదే రోజు మరమ్మత్తు — 100% అసలు విడిభాగాలు, నేరుగా ధర, మరియు WhatsApp లో లైవ్ అప్‌డేట్‌లు. నేరుగా రండి లేదా మేము వస్తాం!",
    heroCtaBook: "ఇప్పుడే బుక్ చేయండి",
    heroCtaChat: "WhatsApp లో మాట్లాడండి",
    heroCtaCall: "కాల్: 8125019015",
    heroRatingNote: "5,000+ సంతృప్త కస్టమర్ల నుండి",
    heroChecks: [
      "టచ్ గ్లాస్",
      "iPhone డిస్‌ప్లే",
      "మదర్‌బోర్డ్",
      "ఒరిజినల్ బ్యాటరీలు",
      "అదే రోజు సేవ",
    ],
    // Trust signals
    trustStats: [
      { value: "5,000+", label: "పూర్తయిన మరమ్మత్తులు" },
      { value: "5.0★", label: "కస్టమర్ రేటింగ్" },
      { value: "3+", label: "సంవత్సరాల అనుభవం" },
      { value: "30 రోజులు", label: "రిపేర్ వారంటీ" },
    ],
    // Floating WhatsApp
    waFloatText: "హాయ్ Garooda Mobiles, నా ఫోన్ మోడల్ ______. నాకు రిపేర్ కావాలి.",
    waFloatTooltip: "WhatsApp లో మాతో చాట్ చేయండి",
    // Price transparency
    priceLabel: "పారదర్శక ధరలు",
    priceH2: "నిజమైన ధరలు, ఆశ్చర్యాలు లేవు",
    priceSubtitle:
      "మా సాధారణ మరమ్మత్తులకు ప్రారంభ ధరలు. నిర్ధారణ తర్వాత మీ ఖచ్చితమైన ధర WhatsApp లో ఉచితంగా చెప్తాం.",
    priceCol1: "మరమ్మత్తు సేవ",
    priceCol2: "ప్రారంభ ధర",
    priceNote:
      "💡 ధరలు పరికరం మోడల్ & విడిభాగం నాణ్యతను బట్టి మారతాయి. మొదలుపెట్టే ముందు ఎల్లప్పుడూ ఖచ్చితమైన ధర చెప్తాం — దాచిన ఛార్జీలు లేవు.",
    priceList: [
      { service: "టచ్ గ్లాస్ మార్పిడి", price: "₹999" },
      { service: "బ్యాటరీ మార్పిడి", price: "₹799" },
      { service: "చార్జింగ్ పోర్ట్ రిపేర్", price: "₹599" },
      { service: "డిస్‌ప్లే / స్క్రీన్ మార్పిడి", price: "₹1,499" },
      { service: "iPhone డిస్‌ప్లే రిపేర్", price: "₹2,499" },
      { service: "మదర్‌బోర్డ్ / చిప్-లెవెల్ రిపేర్", price: "₹1,999" },
      { service: "నీటి నష్ట చికిత్స", price: "₹899" },
      { service: "సాఫ్ట్‌వేర్ / OS సమస్యలు", price: "₹399" },
    ],
    // Video proof
    videoLabel: "చూసి నమ్మండి",
    videoH2: "నిజమైన మరమ్మత్తులు, కెమెరాలో",
    videoSubtitle:
      "మా టెక్నీషియన్ల పనిని 30-సెకన్ల క్లిప్‌లలో చూడండి — అసలు మెషీన్లు, అసలు ఫలితాలు.",
    videoItems: [
      { title: "OCA మెషీన్", desc: "వాక్యూమ్ ప్రెజర్‌లో గ్లాస్ లామినేషన్" },
      { title: "iPhone రిపేర్", desc: "ఖచ్చితమైన డిస్‌ప్లే & Face ID పునరుద్ధరణ" },
      { title: "TBK మెషీన్", desc: "ఆటోమేటిక్ స్క్రీన్ సెపరేషన్ ప్రాసెస్" },
      { title: "ముందు / తర్వాత", desc: "గంటలోపే పగిలినది నుండి పరిపూర్ణం" },
    ],
    // Why choose us
    whyLabel: "ఎందుకు Garooda Mobiles",
    whyH2: "కస్టమర్లు మమ్మల్ని ఎందుకు నమ్ముతారు",
    whyItems: [
      { title: "ప్రొఫెషనల్ OCA మెషీన్ రిపేర్లు", desc: "పరిపూర్ణ ఫినిష్ కోసం ఫ్యాక్టరీ-గ్రేడ్ గ్లాస్ లామినేషన్." },
      { title: "అసలు విడిభాగాలు", desc: "100% ఒరిజినల్ భాగాలు — చౌక కాపీలు ఎప్పటికీ కాదు." },
      { title: "అనుభవజ్ఞులైన టెక్నీషియన్లు", desc: "ప్రతి బ్రాండ్‌పై 3+ సంవత్సరాల అనుభవం." },
      { title: "డేటా భద్రత ప్రాధాన్యం", desc: "మీ ఫోటోలు & ఫైళ్ళు సురక్షితంగా, గోప్యంగా ఉంటాయి." },
      { title: "వేగవంతమైన డెలివరీ", desc: "చాలా మరమ్మత్తులు మీరు వచ్చిన రోజే పూర్తి." },
      { title: "వారంటీ మద్దతు", desc: "ప్రతి మరమ్మత్తుకు 30-రోజుల వారంటీ." },
    ],
    // iPhone specialist
    iphoneLabel: "Apple సర్టిఫైడ్ కేర్",
    iphoneH2: "తాడేపల్లిగూడెంలో iPhone రిపేర్ నిపుణులు",
    iphoneSubtitle:
      "పగిలిన బ్యాక్ గ్లాస్ నుండి కష్టమైన Face ID సమస్య వరకు — అసలు విడిభాగాలతో ప్రతి iPhone ను పరిపూర్ణంగా సరిచేస్తాం.",
    iphoneServices: [
      "బ్యాక్ గ్లాస్",
      "బ్యాటరీ",
      "డిస్‌ప్లే",
      "Face ID",
      "చార్జింగ్ పోర్ట్",
      "మదర్‌బోర్డ్",
    ],
    iphoneCta: "iPhone రిపేర్ బుక్ చేయండి",
    // Reviews
    reviewsLabel: "తాడేపల్లిగూడెం ప్రేమ",
    reviewsH2: "మా కస్టమర్లు ఏమంటున్నారు",
    reviewsSubtitle: "తాడేపల్లిగూడెం అంతటా నిజమైన కస్టమర్ల నిజమైన రివ్యూలు.",
    reviewsCta: "Google లో అన్ని రివ్యూలు చదవండి",
    reviewItems: [
      { name: "రవి తేజ", device: "iPhone 13 · స్క్రీన్", text: "నా iPhone 13 స్క్రీన్ బాగా పగిలింది. Garooda 2 గంటల్లో ఒరిజినల్ డిస్‌ప్లేతో సరిచేశారు. కొత్తదానిలా ఉంది!" },
      { name: "స్నేహ పి.", device: "Samsung S22 · బ్యాటరీ", text: "నా బ్యాటరీ వేగంగా అయిపోతోంది. అదే రోజు మార్చారు, ఉచిత డోర్‌స్టెప్ పికప్ కూడా చేశారు. తప్పక సిఫార్సు చేస్తాను!" },
      { name: "కార్తీక్ ఎం.", device: "OnePlus 9 · చార్జింగ్ పోర్ట్", text: "న్యాయమైన ధర, దాచిన ఖర్చులు లేవు, WhatsApp లో అప్‌డేట్‌లు ఇచ్చారు. చాలా ప్రొఫెషనల్." },
      { name: "లక్ష్మి ఎన్.", device: "iPhone 12 · బ్యాక్ గ్లాస్", text: "బ్యాక్ గ్లాస్ మార్పిడి వేరే చోట అసాధ్యంగా అనిపించింది. Garooda పరిపూర్ణంగా చేశారు — నమ్మదగినవారు." },
      { name: "అనిల్ కుమార్", device: "Redmi Note 11 · డిస్‌ప్లే", text: "తాడేపల్లిగూడెంలో అత్యుత్తమ మొబైల్ రిపేర్. ప్రొఫెషనల్ టీం, డేటా భద్రత గురించి నిజంగా శ్రద్ధ చూపుతారు." },
      { name: "దివ్య ఆర్.", device: "Apple Watch · గ్లాస్", text: "ఇతరులు తిరస్కరించినా నా Apple Watch ను కూడా సరిచేశారు. వేగంగా, నిజాయితీగా, స్నేహపూర్వకంగా." },
    ],
    // Location / Map
    mapLabel: "మా షాప్‌ను సందర్శించండి",
    mapH2: "తాడేపల్లిగూడెంలో మమ్మల్ని కనుగొనండి",
    mapAddress: "ఛెన్నై షాపింగ్ ఎదురుగా, తాడేపల్లిగూడెం, ఆంధ్రప్రదేశ్",
    mapDirections: "దిశలు పొందండి",
    // Trust builder
    trustBuilderQ: "మేము సరిచేయలేకపోతే ఏమవుతుంది?",
    trustBuilderA: "మరమ్మత్తు లేదు, ఛార్జీ లేదు. విజయవంతమైన మరమ్మత్తు తర్వాతే మేము ఛార్జ్ చేస్తాం — ఇది మీకు మా వాగ్దానం.",
    // Device cards
    phones: "📱 ఫోన్లు",
    phonesDesc: "iPhone, Samsung, OnePlus, Xiaomi & అన్ని Android బ్రాండ్లు",
    tablets: "📟 టాబ్లెట్లు",
    tabletsDesc: "iPad, Samsung Tab & Android టాబ్లెట్ మరమ్మత్తులు",
    motherboard: "🔩 మదర్‌బోర్డ్",
    motherboardDesc: "చిప్ లెవెల్ మరమ్మత్తు, మైక్రో-సోల్డరింగ్ & డేటా రికవరీ",
    svcRepairLabel: "మరమ్మత్తు సేవలు",
    svcAccessoriesLabel: "యాక్సెసరీలు & రీసెల్",
    smartwatch: "⌚ స్మార్ట్‌వాచ్‌లు",
    smartwatchDesc: "Apple Watch, Galaxy Watch, MI Band & అన్ని వేరబుల్స్",
    cases: "📦 కవర్లు & కేసులు",
    casesDesc: "అన్ని ఫోన్ మోడల్‌లకు ప్రీమియం & బడ్జెట్ కవర్లు",
    audio: "🎧 ఆడియో డివైజ్‌లు",
    audioDesc: "ఇయర్‌ఫోన్లు, TWS బడ్స్, హెడ్‌ఫోన్లు & BT స్పీకర్లు",
    screenGuard: "🛡️ స్క్రీన్ గార్డ్లు",
    screenGuardDesc: "టెంపర్డ్ గ్లాస్ & ఫ్లెక్సిబుల్ స్క్రీన్ ప్రొటెక్టర్లు",
    chargers: "🔌 చార్జర్లు & కేబుల్స్",
    chargersDesc: "ఫాస్ట్-చార్జ్ అడాప్టర్లు, USB-C, Lightning & డేటా కేబుల్స్",
    // Intake form
    intakeLabel: "త్వరిత రిపేర్ బుకింగ్",
    intakeH2: "2 నిమిషాల్లో బుక్ చేయండి",
    intakeSubtitle:
      "మీ పరికర వివరాలు నమోదు చేయండి, మేము 15 నిమిషాల్లో WhatsApp లో ధర పంపుతాం!",
    modelLabel: "మీ పరికరం (ఉదా: iPhone 14, Samsung S23, OnePlus 12)",
    issueLabel: "మీ పరికరానికి ఏమి సమస్య?",
    issuePlaceholder: "సమస్యను ఎంచుకోండి",
    customIssuePlaceholder: "సమస్య గురించి మరింత చెప్పండి (ఐచ్ఛికం)...",
    serviceLabel: "మీరు ఎలా పంపాలనుకుంటున్నారు?",
    expressWalkin: "నేరుగా రండి",
    expressWalkinSub: "మా Opp-Chennai Shopping Mall షాప్‌కు నేరుగా రండి — వెంటనే మొదలుపెడతాం",
    doorstepPickup: "ఉచిత డోర్‌స్టెప్ పికప్",
    doorstepPickupSub: "మేము మీ ఇంటికి వచ్చి పరికరాన్ని తీసుకెళ్తాం — తాడేపల్లిగూడెం లో మాత్రమే ఉచితం",
    nameLabel: "మీ పేరు",
    phoneLabel: "మీ WhatsApp నంబర్",
    formError: "రిపేర్ కోట్ పంపడానికి అన్ని వివరాలు నమోదు చేయండి.",
    submitFull: "WhatsApp లో రిపేర్ రిక్వెస్ట్ పంపండి 🚀",
    submitPartial: "అన్ని ఫీల్డ్‌లు పూర్తి చేయండి",
    progressLabel: "బుకింగ్ పురోగతి",
    // Bento
    bentoTitle1: "ఉచిత డోర్‌స్టెప్ పికప్",
    bentoDesc1:
      "షాప్‌కు రాలేరా? ఫర్వాలేదు! మేము మీ ఇంటికి వచ్చి పరికరాన్ని తీసుకెళ్తాం — అదనపు చార్జ్ లేదు. తాడేపల్లిగూడెం లో మాత్రమే అందుబాటులో ఉంది.",
    bentoTitle2: "దాచిన ఖర్చులు లేవు — ఎప్పటికీ",
    bentoDesc2:
      "మేము పనిచేయడానికి ముందే ఖచ్చితమైన ధరను చెప్తాం. చివరకు అదనపు ఛార్జీలు లేవు — మేము చెప్పింది అదే చెల్లిస్తారు.",
    bentoTitle3: "WhatsApp లో లైవ్ అప్‌డేట్‌లు",
    bentoDesc3:
      "అదనపు యాప్ అవసరం లేదు! మీ రిపేర్ స్థితి WhatsApp లోనే నేరుగా వస్తుంది — Swiggy ఆర్డర్ ట్రాక్ లాగే!",
    // FAQ
    faqBadge: "సందేహాలున్నాయా?",
    faqH2: "మేము సమాధానం చెప్తాం",
    faq1q: "ఈ బుకింగ్ ఫామ్ వాడటానికి ఖర్చవుతుందా?",
    faq1a:
      "పూర్తిగా ఉచితం! వివరాలు నమోదు చేయండి, 15 నిమిషాల్లో WhatsApp లో ధర పంపుతాం. ఎలాంటి నిబద్ధత అవసరం లేదు.",
    faq2q: "మరమ్మత్తుకు ఎంత సమయం పడుతుంది?",
    faq2a:
      "చాలా స్క్రీన్ మార్పిడులు మరియు బ్యాటరీ మార్పులు అదే రోజు అవుతాయి — సాధారణంగా పరికరం వచ్చిన 1–2 గంటల్లో.",
    faq3q: "మరమ్మత్తుపై వారంటీ ఉంటుందా?",
    faq3a:
      "తప్పకుండా! ప్రతి మరమ్మత్తుపై 30 రోజుల వారంటీ ఇస్తాం — విడిభాగాలు మరియు పనిపై. ఆ వ్యవధిలో ఏదైనా సమస్య వస్తే ఉచితంగా సరిచేస్తాం.",
    faq4q: "మీరు ఏ బ్రాండ్‌లు రిపేర్ చేస్తారు?",
    faq4a:
      "Apple iPhone, Samsung, OnePlus, Xiaomi, OPPO, vivo, Realme, Motorola, Nokia తో సహా అన్ని ప్రధాన బ్రాండ్‌లు రిపేర్ చేస్తాం. తక్కువ సాధారణ బ్రాండ్ అయినా అడగండి!",
    // Hours
    hoursLabel: "షాప్ సమయాలు",
    hoursH2: "మేము ఎప్పుడు తెరిచి ఉంటాం",
    hoursSubtitle: "వారానికి 6 రోజులు Opp-Chennai Shopping Mall వద్ద సేవలో ఉన్నాం",
    hoursOpenNow: "ఇప్పుడు తెరిచి ఉంది",
    hoursClosedNow: "ప్రస్తుతం మూసి ఉంది",
    hoursHoliday: "సెలవు",
    hoursToday: "నేడు",
    hoursTiming: "10:00 AM – 10:00 PM",
    hoursDays: ["సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం", "ఆదివారం"],
    // CTA Banner
    ctaTagline: "ఉచిత పికప్ — తాడేపల్లిగూడెం మాత్రమే",
    ctaH2: "ఈరోజే మీ రిపేర్ బుక్ చేయండి",
    ctaBody: "కాల్ చేయండి లేదా WhatsApp చేయండి — మేము తాడేపల్లిగూడెంలో ఎక్కడైనా మీ ఇంటికి వచ్చి పరికరాన్ని ఉచితంగా తీసుకెళ్తాం.",
    ctaCall: "ఇప్పుడు కాల్ చేయండి",
    ctaWhatsapp: "WhatsApp చేయండి",
    // Footer
    footerCopy: `© ${new Date().getFullYear()} garooda Mobiles · Opp-Chennai Shopping Mall, తాడేపల్లిగూడెం. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.`,
    footerDev: "డిజైన్ & డెవలప్ చేసింది",
    footerDevLink: "AK NextGen Solutions",
    footerDevTagline: "ప్రీమియం వెబ్‌సైట్లు · యాప్‌లు · AI పరిష్కారాలు",
    footerDevCta: "స్టూడియో సందర్శించండి",
    // Issues
    issues: [
      "విరిగిన / పగిలిన స్క్రీన్",
      "బ్యాటరీ వేగంగా అయిపోతోంది",
      "చార్జింగ్ పోర్ట్ పని చేయడం లేదు",
      "నీటి / లిక్విడ్ నష్టం",
      "మదర్‌బోర్డ్ / సాఫ్ట్‌వేర్ సమస్య",
      "స్మార్ట్‌వాచ్ / వేరబుల్ రిపేర్",
      "వేరే సమస్య",
    ],
    // Technician
    techTitle: "టెక్నీషియన్ డాష్‌బోర్డ్",
    techSubtitle: "క్రియాశీల మరమ్మత్తు జాబ్‌లు నిర్వహించండి మరియు WhatsApp అప్‌డేట్‌లు పంపండి.",
    techSystem: "స్టాఫ్ పేనల్",
    resetMock: "డెమో డేటా రీసెట్",
    benchMetrics: "నేటి గణాంకాలు",
    totalTickets: "మొత్తం జాబ్‌లు",
    inProgress: "పురోగతిలో",
    slaTimeline: "లక్ష్య సమయాలు",
    slaSteps: [
      { step: "1. చెక్-ఇన్", time: "రాకలోపు 15 నిమిషాలు" },
      { step: "2. నిర్ధారణ", time: "30 నిమిషాల్లో" },
      { step: "3. WhatsApp కోట్", time: "45 నిమిషాల్లో" },
      { step: "4. మరమ్మత్తు", time: "సాధారణంగా 60–90 నిమిషాలు" },
    ],
    waCrmGuide: "WhatsApp లేబుల్ గైడ్",
    waCrmBody:
      "మీ ఉచిత WhatsApp Business యాప్‌లో ఈ రంగు లేబుళ్ళు వాడి ప్రతి జాబ్ ట్రాక్ చేయండి:",
    noTickets: "ఇంకా యాక్టివ్ జాబ్‌లు లేవు.",
    noTicketsSub: "కస్టమర్ల నుండి కొత్త బుకింగ్‌లు ఇక్కడ కనిపిస్తాయి.",
    intakeRequestIssue: "రిపోర్ట్ చేసిన సమస్య",
    benchNotes: "టెక్నీషియన్ నోట్స్",
    benchNotesPlaceholder: "నిర్ధారణ నోట్స్ లేదా ఫలితాలు జోడించండి...",
    costEstimate: "రిపేర్ ఖర్చు అంచనా",
    costPlaceholder: "ఉదా: ₹4,500",
    waOps: "WhatsApp చర్యలు",
    sendAlert: "స్థితి అప్‌డేట్ పంపండి",
    removeTicket: "తొలగించు",
    client: "కస్టమర్",
    registered: "బుక్ చేసిన తేదీ",
  },
};

const STEPS = [
  { name: "Intake Confirmed", desc: "Ticket registered at Tadepalligudem Hub" },
  { name: "Diagnostics Bench", desc: "Technician conducting 12-point calibration check" },
  { name: "Restoration Phase", desc: "Careful installation of genuine OEM components" },
  { name: "Quality Check", desc: "Comprehensive screen, battery, and safety tests" },
  { name: "Ready for Delivery", desc: "Restoration complete. Ready for courier or pickup" },
];

interface Ticket {
  id: string;
  model: string;
  issue: string;
  service: string;
  name: string;
  status: typeof STEPS[number]["name"];
  cost: string;
  notes: string;
  createdAt: string;
}

const MOCK_TICKETS: Ticket[] = [
  {
    id: "GR-7910",
    model: "iPhone 14 Pro",
    issue: "Broken Screen / Display Repair",
    service: "Express Walk-In",
    name: "Anand K.",
    status: "Restoration Phase",
    cost: "₹14,500",
    notes: "Replacing display panel with verified OEM unit. Front glass intact.",
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toLocaleString(),
  },
  {
    id: "GR-8442",
    model: "OnePlus 11",
    issue: "Charging Port / Interface Failure",
    service: "Doorstep Pickup",
    name: "Priya M.",
    status: "Ready for Delivery",
    cost: "₹3,200",
    notes: "Interface module replaced. Fast charge test completed successfully.",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toLocaleString(),
  },
];

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.747.46 3.45 1.328 4.946L2 22l5.27-1.382a9.86 9.86 0 0 0 4.765 1.213h.004c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 19.05 4.91 9.85 9.85 0 0 0 12.04 2z" />
    </svg>
  );
}

function Index() {
  const search = Route.useSearch() as IndexSearch;
  const isAuthorized =
    search.tech === "true" ||
    search.tech === true ||
    search.admin === "true" ||
    search.admin === true;

  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];

  const [model, setModel] = useState("");
  const [issue, setIssue] = useState("");
  const [issueOpen, setIssueOpen] = useState(false);
  const [customIssue, setCustomIssue] = useState("");
  const [service, setService] = useState<"" | "Express Walk-In" | "Doorstep Pickup">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeReel, setActiveReel] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!activeReel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveReel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeReel]);

  // Instagram's embed player does NOT play reels inline in mobile browsers, so on
  // small/touch screens open the reel directly (Instagram app / site); use the
  // on-site lightbox only on larger screens where inline playback works.
  const openReel = (i: number) => {
    const id = REEL_IDS[i];
    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia("(max-width: 820px)").matches ||
        window.matchMedia("(pointer: coarse)").matches);
    if (isMobile) {
      window.open(`https://www.instagram.com/reel/${id}/`, "_blank", "noopener,noreferrer");
    } else {
      setActiveReel(id);
    }
  };

  const navLinks = [
    { label: t.navOverview, id: "top" },
    { label: t.navServices, id: "services" },
    { label: t.navPricing, id: "pricing" },
    { label: t.navReviews, id: "reviews" },
    { label: t.navBook, id: "intake-form" },
    { label: t.navFaq, id: "faq" },
  ];

  const goToSection = (id: string) => {
    setMenuOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [viewMode, setViewMode] = useState<"client" | "technician">("client");

  useEffect(() => {
    if (!isAuthorized && viewMode === "technician") setViewMode("client");
  }, [isAuthorized, viewMode]);

  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("garooda_tickets");
    if (saved) {
      setTickets(JSON.parse(saved));
    } else {
      localStorage.setItem("garooda_tickets", JSON.stringify(MOCK_TICKETS));
      setTickets(MOCK_TICKETS);
    }
  }, []);

  const isOther = issue === t.issues[6];

  const finalIssue = useMemo(
    () => (isOther && customIssue.trim() ? `${issue} — ${customIssue.trim()}` : issue),
    [isOther, issue, customIssue],
  );

  const progress = useMemo(() => {
    let p = 0;
    if (model.trim()) p += 20;
    if (issue) p += 20;
    if (service) p += 20;
    if (name.trim()) p += 20;
    if (phone.trim()) p += 20;
    return p;
  }, [model, issue, service, name, phone]);

  const handleSubmit = () => {
    if (!model.trim() || !name.trim() || !issue || !service || !phone.trim()) {
      setError(t.formError);
      return;
    }
    setError("");

    const newTicketId = `GR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: Ticket = {
      id: newTicketId,
      model,
      issue: finalIssue,
      service,
      name,
      status: "Intake Confirmed",
      cost: "Pending Diagnosis",
      notes: "Awaiting physical evaluation on bench.",
      createdAt: new Date().toLocaleString(),
    };

    const updated = [newTicket, ...tickets];
    setTickets(updated);
    localStorage.setItem("garooda_tickets", JSON.stringify(updated));

    const textPayload =
      `🦅 *garooda Mobiles* 🦅\n` +
      `_*Tadepalligudem's Premier Service Hub*_\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `🎫 *TICKET ID*  ➜  \`\`\`${newTicketId}\`\`\`\n` +
      `👤 *CLIENT*       ➜  *${name}*\n` +
      `📞 *WHATSAPP*  ➜  *${phone}*\n` +
      `📱 *DEVICE*       ➜  *${model}*\n` +
      `🔧 *ISSUE*        ➜  _${finalIssue}_\n` +
      `📦 *SERVICE*    ➜  *${service}*\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `⏱️ *Hub Status:*  🟢 _Active Bench_\n` +
      `📅 *Registered:*  _${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} | ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}_\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `💬 _Sent via TPD Digital Network. Please reply with a price quotation estimate to authorize our certified bench technicians to begin diagnostic assessment._\n\n` +
      `🛡️ _Powered by TPD Digital Secure Gateway_`;

    const url = `https://wa.me/${SHOP_PHONE}?text=${encodeURIComponent(textPayload)}`;
    window.open(url, "_blank");

    setModel("");
    setIssue("");
    setCustomIssue("");
    setService("");
    setName("");
    setPhone("");
  };

  const handleUpdateTicket = (id: string, updates: Partial<Ticket>) => {
    const updated = tickets.map((tk) => (tk.id === id ? { ...tk, ...updates } : tk));
    setTickets(updated);
    localStorage.setItem("garooda_tickets", JSON.stringify(updated));
  };

  const handleSendWhatsAppUpdate = (ticket: Ticket) => {
    let updateMessage = "";
    if (ticket.status === "Diagnostics Bench") {
      updateMessage =
        `🔧 *garooda Mobiles Diagnostic Update* 🔧\n` +
        `_*Tadepalligudem's Premier Service Hub*_\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `🎫 *TICKET ID*  ➜  \`\`\`${ticket.id}\`\`\`\n` +
        `👤 *CLIENT*       ➜  *${ticket.name}*\n` +
        `📱 *DEVICE*       ➜  *${ticket.model}*\n` +
        `📝 *FINDINGS*   ➜  _${ticket.notes}_\n` +
        `💰 *ESTIMATE*   ➜  *${ticket.cost || "Awaiting quote"}*\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `⏱️ *Hub Status:*  🛠️ _Diagnostics Bench Completed_\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `💬 _Hi ${ticket.name}, our certified bench technician has completed physical evaluation of your device. Please reply with *APPROVED* to authorize our technicians to begin restoration._\n\n` +
        `🛡️ _Powered by TPD Digital Secure Gateway_`;
    } else if (ticket.status === "Ready for Delivery") {
      updateMessage =
        `🎉 *garooda Mobiles Restoration Complete* 🎉\n` +
        `_*Tadepalligudem's Premier Service Hub*_\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `🎫 *TICKET ID*  ➜  \`\`\`${ticket.id}\`\`\`\n` +
        `👤 *CLIENT*       ➜  *${ticket.name}*\n` +
        `📱 *DEVICE*       ➜  *${ticket.model}*\n` +
        `📦 *SERVICE*    ➜  *${ticket.service}*\n` +
        `💵 *FINAL BILL*  ➜  *${ticket.cost || "To be calculated"}*\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `⏱️ *Hub Status:*  ✅ _Passed 12-Point QA Check_\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `💬 _Great news ${ticket.name}! Your device has been fully restored to factory specifications. Ready for secure doorstep delivery or in-store collection at our Opp-Chennai Shopping Mall center._\n\n` +
        `🛡️ _Powered by TPD Digital Secure Gateway_`;
    } else {
      updateMessage =
        `⚡ *garooda Mobiles Status Update* ⚡\n` +
        `_*Tadepalligudem's Premier Service Hub*_\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `🎫 *TICKET ID*  ➜  \`\`\`${ticket.id}\`\`\`\n` +
        `👤 *CLIENT*       ➜  *${ticket.name}*\n` +
        `📱 *DEVICE*       ➜  *${ticket.model}*\n` +
        `📊 *NEW STAGE*  ➜  *${ticket.status}*\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `💬 _Hi ${ticket.name}, your device has successfully transitioned to the next restoration stage. You can track real-time progress live on our web portal!_\n\n` +
        `🛡️ _Powered by TPD Digital Secure Gateway_`;
    }
    const url = `https://wa.me/${SHOP_PHONE}?text=${encodeURIComponent(updateMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-orange-500/20 relative overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-50 w-full">
        {/* ── Tier 1: utility strip ── */}
        <div className="hidden md:block bg-slate-900 text-slate-300">
          <div className="section-shell flex items-center justify-between gap-6 px-6 h-9 text-[11.5px] font-medium">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Garooda+Mobiles+Tadepalligudem"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-orange-400 shrink-0" />
              <span>Opp-Chennai Shopping Mall, Tadepalligudem</span>
            </a>
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
                </span>
                <span className="font-semibold text-orange-300">{t.hubOperational}</span>
                <span className="text-slate-500">· 10 AM – 10 PM</span>
              </span>
              <span className="h-3.5 w-px bg-white/10" />
              <a href="tel:+918125019015" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                <PhoneIcon className="h-3.5 w-3.5 text-orange-400" /> +91 81250 19015
              </a>
              <span className="h-3.5 w-px bg-white/10" />
              <button
                onClick={() => setLang(lang === "en" ? "te" : "en")}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                title="Switch language"
              >
                <Globe className="h-3.5 w-3.5" />
                {lang === "en" ? "తెలుగు" : "English"}
              </button>
              <a
                href="https://www.instagram.com/garoodamobiles_tadepalligudem/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:text-white transition-colors"
                title="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Tier 2: main bar ── */}
        <div className="backdrop-blur-xl bg-white/90 border-b border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="section-shell flex items-center justify-between gap-4 px-4 sm:px-6 h-16">
            {/* Brand */}
            <button
              onClick={() => { setViewMode("client"); goToSection("top"); }}
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
              aria-label="garooda Mobiles — home"
            >
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl blur-md opacity-20 group-hover:opacity-35 transition duration-300" />
                <img src={garoodaLogo} alt="garooda Mobiles Logo" className="relative h-10 w-auto object-contain rounded-xl mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
              </div>
            </button>

            {/* Desktop nav */}
            {viewMode === "client" && (
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => goToSection(link.id)}
                    className="text-[13px] font-semibold text-slate-600 hover:text-orange-600 transition-all duration-300 cursor-pointer relative py-1.5 group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-500 rounded-full transition-all duration-300 group-hover:w-full" />
                  </button>
                ))}
              </nav>
            )}

            {/* Right cluster */}
            <div className="flex items-center gap-2 sm:gap-3">
              {isAuthorized && (
                <button
                  onClick={() => setViewMode(viewMode === "client" ? "technician" : "client")}
                  className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-50 hover:bg-orange-100 px-3.5 py-2.5 text-xs font-bold tracking-wide text-orange-700 transition-all duration-300 cursor-pointer"
                >
                  {viewMode === "client" ? (
                    <><Wrench className="h-3.5 w-3.5" /><span className="hidden lg:inline">{t.techPortal}</span></>
                  ) : (
                    <><ClipboardList className="h-3.5 w-3.5" /><span className="hidden lg:inline">{t.clientBooking}</span></>
                  )}
                </button>
              )}

              {/* Call — mobile only (number lives in the strip on desktop) */}
              <a
                href="tel:+918125019015"
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-orange-600 shadow-sm transition active:scale-95"
                aria-label="Call garooda Mobiles"
              >
                <PhoneIcon className="h-4.5 w-4.5" />
              </a>

              {/* Primary CTA — Book */}
              {viewMode === "client" && (
                <button
                  onClick={() => { setViewMode("client"); goToSection("intake-form"); }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm px-4 sm:px-5 py-2.5 shadow-[0_8px_20px_-6px_rgba(249,115,22,0.55)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                >
                  <Zap className="h-4 w-4 fill-current" />
                  <span className="hidden sm:inline">{t.navBook}</span>
                  <span className="sm:hidden">Book</span>
                </button>
              )}

              {/* Mobile menu toggle */}
              {viewMode === "client" && (
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile dropdown menu ── */}
        {viewMode === "client" && menuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="section-shell px-4 sm:px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => goToSection(link.id)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  onClick={() => goToSection("intake-form")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm px-4 py-3 shadow-sm transition active:scale-[0.98]"
                >
                  <Zap className="h-4 w-4 fill-current" />{t.navBook}
                </button>
                <a
                  href={`https://wa.me/${SHOP_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-bold text-sm px-4 py-3 shadow-sm transition active:scale-[0.98]"
                >
                  <WhatsAppIcon className="h-4 w-4" />WhatsApp
                </a>
              </div>
              {/* utility row */}
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                <a href="tel:+918125019015" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <PhoneIcon className="h-4 w-4 text-orange-500" /> +91 81250 19015
                </a>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLang(lang === "en" ? "te" : "en")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 cursor-pointer"
                  >
                    <Globe className="h-3.5 w-3.5" />{lang === "en" ? "తెలుగు" : "English"}
                  </button>
                  <a
                    href="https://www.instagram.com/garoodamobiles_tadepalligudem/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10 px-4 sm:px-6">
        {viewMode === "client" ? (
          <>
            {/* HERO */}
            <section className="relative pb-10">
              {/* ── Full-bleed light gradient hero (flush to top & screen edges) ── */}
              <div className="relative overflow-hidden -mx-4 sm:-mx-6 min-h-[600px] sm:min-h-[680px] flex items-center border-b border-slate-200 bg-gradient-to-br from-white via-white to-orange-50">
                {/* warm brand glows */}
                <div className="absolute -top-28 -right-24 w-[34rem] h-[34rem] rounded-full bg-orange-200/45 blur-[130px] pointer-events-none" />
                <div className="absolute -bottom-32 -left-24 w-[30rem] h-[30rem] rounded-full bg-amber-200/40 blur-[130px] pointer-events-none" />
                {/* fade into page background at the bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-slate-50 pointer-events-none" />

                {/* content — two-column: copy + phone visual */}
                <div className="section-shell relative z-10 w-full px-4 sm:px-6 py-16 sm:py-20">
                  <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-6 items-center">

                    {/* ── LEFT: copy ── */}
                    <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start">
                      <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[11px] sm:text-xs text-orange-700 font-semibold tracking-wide mb-7 shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-500">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
                        </span>
                        {t.heroBadge}
                      </div>

                      <h1 className="font-display text-[2.6rem] sm:text-6xl xl:text-[4.2rem] font-bold tracking-[-0.03em] text-slate-900 leading-[1.03] mb-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        {t.heroH1a}
                        <br />
                        <span className="text-gradient-orange">{t.heroH1b}</span>
                      </h1>

                      <p className="text-base sm:text-lg text-slate-500 max-w-lg leading-relaxed mb-8 animate-in fade-in slide-in-from-bottom-5 duration-600">
                        {t.heroSubtitle}
                      </p>

                      {/* Rating credibility row */}
                      <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-bottom-5 duration-600">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} className="h-[18px] w-[18px] text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-slate-500">
                          <span className="font-bold text-slate-900">5.0</span> {t.heroRatingNote}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-3 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <button
                          onClick={() => {
                            const el = document.getElementById("intake-form");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-base px-8 py-4 shadow-[0_10px_40px_-8px_rgba(249,115,22,0.55)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                          <Zap className="h-5 w-5 fill-current" />
                          {t.heroCtaBook}
                        </button>
                        <a
                          href="tel:+918125019015"
                          className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/50 text-slate-700 font-semibold text-base px-6 py-4 shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <PhoneIcon className="h-5 w-5 text-orange-500" />
                          {t.heroCtaCall}
                        </a>
                        <a
                          href={`https://wa.me/${SHOP_PHONE}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/50 text-slate-700 font-semibold text-base px-6 py-4 shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                          {t.heroCtaChat}
                        </a>
                      </div>

                      {/* Specialty chips */}
                      <div className="mt-9 flex flex-wrap justify-center lg:justify-start gap-2.5 animate-in fade-in slide-in-from-bottom-5 duration-800">
                        {t.heroChecks.map((label) => (
                          <span
                            key={label}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0" />
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* ── RIGHT: workshop photo ── */}
                    <div className="relative flex items-center justify-center mt-2 lg:mt-0 lg:min-h-[560px] animate-in fade-in slide-in-from-bottom-8 duration-700">
                      {/* glow */}
                      <div className="absolute w-80 h-80 rounded-full bg-orange-300/40 blur-[110px] pointer-events-none" />

                      {/* floating rating card (desktop) */}
                      <div className="hidden lg:flex absolute top-6 -left-3 z-20 rounded-2xl bg-white border border-slate-200 shadow-xl px-4 py-3 items-center gap-3 animate-float-y-slow">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-500">
                          <Star className="h-5 w-5 fill-current" />
                        </span>
                        <div className="leading-tight text-left">
                          <p className="font-display text-lg font-bold text-slate-900">5.0</p>
                          <p className="text-[10px] text-slate-500 font-medium">Google rating</p>
                        </div>
                      </div>

                      {/* floating warranty card (desktop) */}
                      <div className="hidden lg:flex absolute bottom-10 -right-3 z-20 rounded-2xl bg-white border border-slate-200 shadow-xl px-4 py-3 items-center gap-3 animate-float-y">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-600">
                          <ShieldCheck className="h-5 w-5" />
                        </span>
                        <div className="leading-tight text-left">
                          <p className="text-sm font-bold text-slate-900">30-Day Warranty</p>
                          <p className="text-[10px] text-slate-500 font-medium">On every repair</p>
                        </div>
                      </div>

                      {/* framed photo */}
                      <div className="relative w-full max-w-[420px] lg:max-w-[440px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/70 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.45)] ring-1 ring-black/5 lg:animate-float-y">
                        <img
                          src={mobileHero}
                          alt="Technician performing micro-soldering repair at garooda Mobiles, Tadepalligudem"
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="eager"
                        />
                        {/* legibility + warm brand tint */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 to-transparent mix-blend-overlay" />
                        {/* caption chip */}
                        <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/12 backdrop-blur-md border border-white/20 px-4 py-3">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow">
                            <Cpu className="h-4.5 w-4.5" />
                          </span>
                          <div className="leading-tight">
                            <p className="text-sm font-bold text-white">Chip-level experts</p>
                            <p className="text-[11px] text-white/70">Micro-soldering &amp; board repair</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Device category cards — below hero split */}
              <div id="services" className="section-shell section-anchor mt-16 sm:mt-20 space-y-16 animate-in fade-in slide-in-from-bottom-5 duration-800">

                {/* ── Repair Services ── */}
                <div>
                  <div className="flex items-center gap-3.5 mb-8">
                    <span className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25">
                      <Wrench className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{t.svcRepairLabel}</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {[
                      { Icon: Smartphone, title: t.phones, desc: t.phonesDesc, tags: ["Screen", "Battery", "Charging", "Water Damage"] },
                      { Icon: Tablet, title: t.tablets, desc: t.tabletsDesc, tags: ["Display", "Battery", "Software"] },
                      { Icon: Cpu, title: t.motherboard, desc: t.motherboardDesc, tags: ["Chip-level", "Micro-solder", "Data Recovery"] },
                    ].map((card, i) => (
                      <button
                        type="button"
                        key={card.title}
                        onClick={() => document.getElementById("intake-form")?.scrollIntoView({ behavior: "smooth" })}
                        className="group relative flex flex-col items-start text-left overflow-hidden rounded-2xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-[0_30px_60px_-28px_rgba(249,115,22,0.45)] hover:border-orange-300 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                      >
                        <div className="absolute -top-14 -right-14 h-36 w-36 rounded-full bg-orange-100/70 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <span className="section-index absolute top-6 right-7 text-5xl select-none pointer-events-none">0{i + 1}</span>
                        <span className="relative inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                          <card.Icon className="h-7 w-7" />
                        </span>
                        <h4 className="relative mt-5 font-display text-xl font-bold text-slate-900 tracking-tight">{card.title.replace(/^[^\p{L}]+/u, "")}</h4>
                        <p className="relative mt-2 text-sm text-slate-500 leading-relaxed">{card.desc}</p>
                        <div className="relative mt-4 flex flex-wrap gap-1.5">
                          {card.tags.map((tag) => (
                            <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="relative mt-6 pt-4 w-full border-t border-slate-100">
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600">
                            {t.navBook}
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Accessories & Resell ── */}
                <div>
                  <div className="flex items-center gap-3.5 mb-8">
                    <span className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-900 text-orange-400 shadow-lg shadow-slate-900/15">
                      <ShoppingBag className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{t.svcAccessoriesLabel}</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-2">
                      {[
                        { Icon: Package, title: t.cases, desc: t.casesDesc },
                        { Icon: Headphones, title: t.audio, desc: t.audioDesc },
                        { Icon: Watch, title: t.smartwatch, desc: t.smartwatchDesc },
                        { Icon: Shield, title: t.screenGuard, desc: t.screenGuardDesc },
                        { Icon: BatteryCharging, title: t.chargers, desc: t.chargersDesc },
                      ].map((card) => (
                        <div
                          key={card.title}
                          className="group flex flex-col items-start rounded-2xl p-4 transition-colors duration-300 hover:bg-orange-50/70"
                        >
                          <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white transition-all duration-300 group-hover:scale-105">
                            <card.Icon className="h-5.5 w-5.5" />
                          </span>
                          <h4 className="mt-3.5 font-bold text-slate-900 text-sm tracking-tight">{card.title.replace(/^[^\p{L}]+/u, "")}</h4>
                          <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">{card.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* BRANDS WE REPAIR */}
            <section className="section-shell py-12">
              <div className="space-y-6">
                <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                  Trusted with every major brand
                </p>
                <BrandMarquee />
              </div>
            </section>

            {/* INTAKE FORM — moved right after hero */}
            <section className="section-shell section-anchor py-16 sm:py-24" id="intake-form">
              <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-14 items-start">
                {/* ── Left: value panel ── */}
                <div className="lg:sticky lg:top-24">
                  <span className="eyebrow">{t.intakeLabel}</span>
                  <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.04]">
                    {t.intakeH2}
                  </h2>
                  <p className="mt-4 text-neutral-500 text-base leading-relaxed max-w-md">{t.intakeSubtitle}</p>

                  <div className="mt-8 space-y-3">
                    {t.trustStats.map((s, i) => {
                      const Icon = [Wrench, Star, Users, ShieldCheck][i];
                      return (
                        <div key={s.label} className="flex items-center gap-3.5 rounded-2xl border border-neutral-200 bg-white p-3.5 shadow-sm">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-600">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="leading-tight">
                            <p className="font-display text-lg font-bold text-neutral-900">{s.value}</p>
                            <p className="text-xs text-neutral-500 font-medium">{s.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a href="tel:+918125019015" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white hover:border-orange-300 text-neutral-700 font-semibold text-sm px-5 py-3 transition">
                      <PhoneIcon className="h-4.5 w-4.5 text-orange-500" />{t.heroCtaCall}
                    </a>
                    <a href={`https://wa.me/${SHOP_PHONE}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white hover:border-orange-300 text-neutral-700 font-semibold text-sm px-5 py-3 transition">
                      <WhatsAppIcon className="h-4.5 w-4.5 text-[#25D366]" />{t.heroCtaChat}
                    </a>
                  </div>
                </div>

                {/* ── Right: form ── */}
                <div className="relative rounded-3xl bg-white border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 sm:p-10">
                <FloatingInput
                  id="model"
                  label={t.modelLabel}
                  value={model}
                  onChange={setModel}
                />

                <div className="mt-6 relative">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2.5 font-bold">
                    {t.issueLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => setIssueOpen((v) => !v)}
                    className="w-full flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-slate-800 hover:border-orange-400 focus:border-orange-500 transition duration-300 font-medium"
                  >
                    <span className={issue ? "text-slate-800" : "text-slate-400"}>
                      {issue || t.issuePlaceholder}
                    </span>
                    <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${issueOpen ? "rotate-180 text-orange-500" : ""}`} />
                  </button>
                  {issueOpen && (
                    <div className="absolute left-0 right-0 z-30 mt-2 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                      {t.issues.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setIssue(opt); setIssueOpen(false); }}
                          className={`w-full text-left px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                            issue === opt
                              ? "bg-orange-50 text-orange-700"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={`grid transition-all duration-300 ease-out ${isOther ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <textarea
                        value={customIssue}
                        onChange={(e) => setCustomIssue(e.target.value)}
                        rows={3}
                        placeholder={t.customIssuePlaceholder}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-800 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 resize-none font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2.5 font-bold">
                    {t.serviceLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { v: "Express Walk-In" as const, label: t.expressWalkin, sub: t.expressWalkinSub },
                      { v: "Doorstep Pickup" as const, label: t.doorstepPickup, sub: t.doorstepPickupSub },
                    ].map((o) => {
                      const active = service === o.v;
                      return (
                        <button
                          key={o.v}
                          type="button"
                          onClick={() => setService(o.v)}
                          className={`group rounded-2xl border px-5 py-5 text-left transition-all duration-300 ${
                            active
                              ? "border-orange-400 bg-orange-50 shadow-sm"
                              : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-semibold text-base transition-colors ${active ? "text-orange-700" : "text-slate-700"}`}>
                              {o.label}
                            </span>
                            <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${active ? "border-orange-500" : "border-slate-300"}`}>
                              {active && <span className="h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse" />}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{o.sub}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <FloatingInput
                    id="name"
                    label={t.nameLabel}
                    value={name}
                    onChange={setName}
                    icon={<UserIcon className="h-5 w-5" />}
                  />
                </div>

                <div className="mt-6">
                  <FloatingInput
                    id="phone"
                    label={t.phoneLabel}
                    value={phone}
                    onChange={setPhone}
                    icon={<PhoneIcon className="h-5 w-5" />}
                    type="tel"
                  />
                </div>

                {error && (
                  <p className="mt-4 text-xs text-red-500 animate-fade-in font-medium flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    {error}
                  </p>
                )}

                {/* Progress + submit — lives inside the form */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs text-slate-500 font-medium mb-2">
                    <span>{t.progressLabel}</span>
                    <span className={progress === 100 ? "text-orange-600 font-semibold" : "text-slate-500 font-semibold"}>
                      {progress}% Complete
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className={`mt-5 w-full inline-flex items-center justify-center gap-3 rounded-2xl transition-all duration-300 px-7 py-4 font-bold text-sm select-none active:scale-[0.98] ${
                      progress === 100
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-[0_10px_30px_-8px_rgba(249,115,22,0.5)] cursor-pointer"
                        : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <WhatsAppIcon className="h-4.5 w-4.5" />
                    {progress === 100 ? t.submitFull : t.submitPartial}
                  </button>
                </div>
                </div>
              </div>
            </section>

            {/* BENTO */}
            <section className="section-shell grid md:grid-cols-3 gap-6 py-12">
              {[
                { icon: Truck, title: t.bentoTitle1, desc: t.bentoDesc1 },
                { icon: ShieldAlert, title: t.bentoTitle2, desc: t.bentoDesc2 },
                { icon: WhatsAppIcon, title: t.bentoTitle3, desc: t.bentoDesc3 },
              ].map((c) => (
                <div
                  key={c.title}
                  className="group relative rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-orange-200 p-6 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-12 w-12 rounded-xl bg-orange-50 border border-orange-100 grid place-items-center mb-5 transition-transform duration-300 group-hover:scale-110">
                    <c.icon className="h-5.5 w-5.5 text-orange-600" />
                  </div>
                  <h3 className="text-slate-800 font-bold text-base tracking-tight mb-2">{c.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </section>

            {/* PRICE TRANSPARENCY */}
            <section className="section-shell section-anchor py-16 sm:py-24" id="pricing">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-14 items-start">
                {/* ── Left: intro + reassurance ── */}
                <div className="lg:sticky lg:top-24">
                  <span className="eyebrow">{t.priceLabel}</span>
                  <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.04]">{t.priceH2}</h2>
                  <p className="mt-4 text-neutral-500 text-base leading-relaxed max-w-md">{t.priceSubtitle}</p>

                  <div className="mt-7 flex items-start gap-3.5 rounded-2xl border border-orange-100 bg-orange-50/70 p-5">
                    <ShieldCheck className="h-6 w-6 text-orange-500 shrink-0" />
                    <p className="text-sm text-neutral-700 leading-relaxed font-medium">{t.priceNote}</p>
                  </div>

                  <button
                    onClick={() => document.getElementById("intake-form")?.scrollIntoView({ behavior: "smooth" })}
                    className="mt-6 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-base px-7 py-3.5 shadow-[0_10px_30px_-8px_rgba(249,115,22,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <Zap className="h-5 w-5 fill-current" />{t.heroCtaBook}
                  </button>
                </div>

                {/* ── Right: price list ── */}
                <div className="rounded-3xl bg-white border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className="hidden sm:flex items-center justify-between px-8 py-4 bg-slate-50 border-b border-slate-100">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{t.priceCol1}</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{t.priceCol2}</span>
                </div>
                <ul className="divide-y divide-slate-100">
                  {t.priceList.map((row) => (
                    <li
                      key={row.service}
                      className="flex items-center justify-between gap-4 px-6 sm:px-8 py-4 hover:bg-orange-50/40 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 shrink-0 rounded-xl bg-orange-50 border border-orange-100 grid place-items-center">
                          <IndianRupee className="h-4 w-4 text-orange-600" />
                        </span>
                        <span className="text-sm font-semibold text-slate-700">{row.service}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900 whitespace-nowrap">
                        <span className="text-[10px] font-normal text-slate-400 mr-1 uppercase tracking-wide hidden sm:inline">from</span>
                        {row.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="section-shell section-anchor py-16 sm:py-24" id="why">
              <SectionHeader eyebrow={t.whyLabel} title={t.whyH2} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {t.whyItems.map((item, i) => {
                  const Icon = [Cpu, Package, Users, Lock, Truck, BadgeCheck][i];
                  return (
                    <div
                      key={item.title}
                      className="group rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-orange-200 p-6 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="h-12 w-12 rounded-xl bg-orange-50 border border-orange-100 grid place-items-center mb-5 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5.5 w-5.5 text-orange-600" />
                      </div>
                      <h3 className="text-slate-800 font-bold text-base tracking-tight mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* VIDEO PROOF */}
            <section className="section-shell section-anchor py-16 sm:py-24" id="videos">
              {/* header with Instagram follow */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                  <span className="eyebrow">{t.videoLabel}</span>
                  <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.04]">{t.videoH2}</h2>
                  <p className="mt-4 text-slate-500 text-base leading-relaxed">{t.videoSubtitle}</p>
                </div>
                <a
                  href="https://www.instagram.com/garoodamobiles_tadepalligudem/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-500 text-white font-bold text-sm px-5 py-3 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 self-start lg:self-auto shrink-0"
                >
                  <Instagram className="h-4.5 w-4.5" />
                  Follow on Instagram
                </a>
              </div>

              {/* featured gallery */}
              <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5">
                {/* ── Featured reel ── */}
                <button
                  type="button"
                  onClick={() => openReel(0)}
                  className="group relative overflow-hidden rounded-3xl min-h-[380px] lg:min-h-[540px] text-left bg-gradient-to-br from-[#1c1c1c] to-[#0e0e0e] shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 to-orange-700/10 opacity-55 group-hover:opacity-70 transition-opacity duration-300" />
                  <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                  <Cpu className="absolute -bottom-6 -right-4 h-56 w-56 text-white/5" />
                  <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1.5 text-[11px] font-bold text-white">
                    <Instagram className="h-3.5 w-3.5" /> Reel
                  </span>
                  <span className="absolute top-4 right-4 z-10 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-white/90 tracking-wide">0:30</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-orange-600 shadow-xl transition-transform duration-300 group-hover:scale-110">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-white/40 animate-ping" />
                      <Play className="relative h-8 w-8 fill-current ml-1" />
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent p-6 pt-16">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400">Featured</span>
                    <h4 className="mt-1 text-white font-display font-bold text-2xl tracking-tight">{t.videoItems[0].title}</h4>
                    <p className="text-white/60 text-sm mt-1 max-w-md">{t.videoItems[0].desc}</p>
                  </div>
                </button>

                {/* ── Playlist ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 content-between">
                  {t.videoItems.slice(1).map((vid, j) => {
                    const i = j + 1;
                    const Icon = [Cpu, Smartphone, Wrench, Sparkles][i];
                    const accent = [
                      "from-orange-500/45 to-orange-700/10",
                      "from-amber-500/45 to-orange-600/10",
                      "from-orange-600/45 to-red-600/10",
                      "from-neutral-600/50 to-orange-600/15",
                    ][i];
                    return (
                      <button
                        type="button"
                        key={vid.title}
                        onClick={() => openReel(i)}
                        className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:border-orange-300 hover:shadow-lg transition-all duration-300 text-left cursor-pointer lg:flex-1"
                      >
                        <span className="relative grid h-20 w-20 shrink-0 place-items-center rounded-xl overflow-hidden bg-gradient-to-br from-[#262626] to-[#141414]">
                          <div className={`absolute inset-0 bg-gradient-to-br opacity-55 ${accent}`} />
                          <Icon className="absolute h-9 w-9 text-white/10" />
                          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-white/90 text-orange-600 shadow transition-transform duration-300 group-hover:scale-110">
                            <Play className="h-4 w-4 fill-current ml-0.5" />
                          </span>
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm tracking-tight truncate">{vid.title}</h4>
                            <span className="text-[10px] font-bold text-slate-400 shrink-0">0:30</span>
                          </div>
                          <p className="text-xs text-slate-500 leading-snug mt-0.5">{vid.desc}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* CUSTOMER REVIEWS */}
            <section className="section-shell section-anchor py-16 sm:py-24" id="reviews">
              <SectionHeader eyebrow={t.reviewsLabel} title={t.reviewsH2} subtitle={t.reviewsSubtitle} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {t.reviewItems.map((r, i) => {
                  const grad = [
                    "from-orange-500 to-amber-500",
                    "from-neutral-800 to-neutral-900",
                    "from-amber-500 to-orange-600",
                    "from-orange-600 to-red-500",
                    "from-neutral-700 to-neutral-900",
                    "from-amber-600 to-orange-500",
                  ][i % 6];
                  const initials = r.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                  return (
                    <div
                      key={r.name}
                      className="flex flex-col rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-orange-200 p-6 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`h-12 w-12 shrink-0 rounded-full bg-gradient-to-br ${grad} grid place-items-center text-white font-bold text-sm shadow-sm`}>
                          {initials}
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm tracking-tight">{r.name}</h4>
                          <p className="text-[11px] text-slate-400 font-medium">{r.device}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className="h-4 w-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed flex-1">"{r.text}"</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center mt-10">
                <a
                  href="https://share.google/dp6nABqjAmOy54AL7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-orange-300 text-slate-700 font-semibold text-sm px-7 py-3.5 shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Star className="h-4.5 w-4.5 text-amber-400 fill-amber-400" />
                  {t.reviewsCta}
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </a>
              </div>
            </section>

            {/* ULTIMATE TRUST BUILDER */}
            <section className="section-shell py-12">
              <div className="relative rounded-3xl overflow-hidden bg-white border-2 border-orange-200 shadow-[0_20px_60px_-20px_rgba(249, 115, 22,0.25)] px-8 py-10 sm:px-14 sm:py-12">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />
                <div className="relative flex flex-col sm:flex-row items-center gap-7 text-center sm:text-left">
                  <div className="h-20 w-20 shrink-0 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 grid place-items-center shadow-lg shadow-orange-500/30">
                    <ShieldCheck className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-2">
                      {t.trustBuilderQ}
                    </h2>
                    <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-medium">
                      {t.trustBuilderA}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA BANNER */}
            <section className="section-shell py-12">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 shadow-[0_20px_60px_-15px_rgba(249, 115, 22,0.4)] px-8 py-12 sm:px-16 sm:py-14">
                {/* subtle pattern overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-4 py-1.5 text-xs font-bold text-white tracking-widest uppercase mb-5">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      {t.ctaTagline}
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                      {t.ctaH2}
                    </h2>
                    <p className="text-white/80 text-sm sm:text-base max-w-lg leading-relaxed">
                      {t.ctaBody}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                    <a
                      href="tel:+918125019015"
                      className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white text-orange-700 font-bold text-base px-8 py-4 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                      <PhoneIcon className="h-5 w-5" />
                      {t.ctaCall} · 8125019015
                    </a>
                    <a
                      href={`https://wa.me/${SHOP_PHONE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white font-bold text-base px-8 py-4 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      {t.ctaWhatsapp}
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="section-shell section-anchor py-16 sm:py-24" id="faq">
              <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-14 items-start">
                {/* ── Left: intro + contact ── */}
                <div className="lg:sticky lg:top-24">
                  <span className="eyebrow">{t.faqBadge}</span>
                  <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.04]">{t.faqH2}</h2>
                  <p className="mt-4 text-neutral-500 text-base leading-relaxed max-w-sm">
                    {lang === "te"
                      ? "మీ సందేహానికి సమాధానం దొరకలేదా? WhatsApp లో మెసేజ్ చేయండి — నిమిషాల్లో స్పందిస్తాం."
                      : "Can't find your answer? Message us on WhatsApp and we'll reply within minutes."}
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a href={`https://wa.me/${SHOP_PHONE}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-5 py-3 transition">
                      <WhatsAppIcon className="h-4.5 w-4.5" />{t.heroCtaChat}
                    </a>
                    <a href="tel:+918125019015" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white hover:border-orange-300 text-neutral-700 font-semibold text-sm px-5 py-3 transition">
                      <PhoneIcon className="h-4.5 w-4.5 text-orange-500" />{t.heroCtaCall}
                    </a>
                  </div>
                </div>

                {/* ── Right: accordion ── */}
                <div className="space-y-3">
                {[
                  { q: t.faq1q, a: t.faq1a },
                  { q: t.faq2q, a: t.faq2a },
                  { q: t.faq3q, a: t.faq3a },
                  { q: t.faq4q, a: t.faq4a },
                ].map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div
                      key={f.q}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:border-slate-300 shadow-sm"
                    >
                      <button
                        onClick={() => setOpenFaq(open ? null : i)}
                        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-semibold text-slate-800 text-[15px]">{f.q}</span>
                        {open ? (
                          <Minus className="h-4 w-4 text-orange-500 transition-transform duration-300" />
                        ) : (
                          <Plus className="h-4 w-4 text-slate-400 transition-transform duration-300" />
                        )}
                      </button>
                      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <p className="px-6 pb-6 text-sm text-slate-500 leading-relaxed">{f.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            </section>

            {/* LOCATION / MAP */}
            <section className="section-shell section-anchor py-16 sm:py-24" id="location">
              <div className="mb-12 max-w-2xl">
                <span className="eyebrow">{t.mapLabel}</span>
                <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.04]">
                  {t.mapH2}
                </h2>
                <p className="mt-4 inline-flex items-center gap-2 text-neutral-500 text-base font-medium">
                  <MapPin className="h-4 w-4 text-orange-500 shrink-0" />
                  {t.mapAddress}
                </p>
              </div>
              <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] bg-white">
                <iframe
                  title="Garooda Mobiles location map"
                  src="https://www.google.com/maps?q=Garooda+Mobiles+Tadepalligudem&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[360px] sm:h-[440px] border-0"
                />
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Garooda+Mobiles+Tadepalligudem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm px-7 py-3.5 shadow-[0_8px_30px_rgba(249, 115, 22,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Navigation className="h-4.5 w-4.5 fill-current" />
                    {t.mapDirections}
                  </a>
                </div>
              </div>
            </section>

            <footer className="-mx-4 sm:-mx-6 mt-10">
              <div className="section-dark text-neutral-300">
                <div className="section-shell px-6 sm:px-10 py-12 sm:py-14">
                <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1.2fr]">
                  {/* ── Brand column ── */}
                  <div>
                    <img src={garoodaLogo} alt="garooda Mobiles" className="h-11 w-auto rounded-lg" />
                    <p className="mt-5 text-sm leading-relaxed text-neutral-400 max-w-xs">
                      Tadepalligudem's most trusted mobile & device repair shop — genuine parts,
                      transparent pricing, and same-day service you can count on.
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <a
                        href="https://www.instagram.com/garoodamobiles_tadepalligudem/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Follow us on Instagram"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300"
                      >
                        <Instagram className="h-4.5 w-4.5" />
                      </a>
                      <a
                        href={`https://wa.me/${SHOP_PHONE}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="WhatsApp"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300"
                      >
                        <WhatsAppIcon className="h-4.5 w-4.5" />
                      </a>
                      <a
                        href="tel:+918125019015"
                        title="Call"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300"
                      >
                        <PhoneIcon className="h-4.5 w-4.5" />
                      </a>
                    </div>
                  </div>

                  {/* ── Quick links ── */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-5">Explore</h4>
                    <ul className="space-y-3">
                      {[
                        { label: t.navServices, id: "services" },
                        { label: t.navPricing, id: "pricing" },
                        { label: t.navReviews, id: "reviews" },
                        { label: t.navBook, id: "intake-form" },
                        { label: t.navFaq, id: "faq" },
                      ].map((link) => (
                        <li key={link.id}>
                          <button
                            onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })}
                            className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200"
                          >
                            {link.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ── Contact ── */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-5">Visit Us</h4>
                    <ul className="space-y-4 text-sm text-neutral-400">
                      <li className="flex items-start gap-3">
                        <MapPin className="h-4.5 w-4.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>Opp-Chennai Shopping Mall,<br />Tadepalligudem, Andhra Pradesh</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <PhoneIcon className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                        <a href="tel:+918125019015" className="hover:text-orange-400 transition-colors">+91 81250 19015</a>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="grid place-items-center h-4.5 w-4.5 shrink-0"><span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" /></span>
                        <span>Mon–Sun · 10:00 AM – 10:00 PM <span className="text-neutral-600">(Tue closed)</span></span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
                  <span className="text-xs text-neutral-500 text-center sm:text-left">{t.footerCopy}</span>

                  {/* AK NextGen Solutions studio card */}
                  <a
                    href="https://aknextgensolutions.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] pl-2.5 pr-4 py-2.5 hover:border-orange-400/40 hover:bg-white/[0.07] transition-all duration-300"
                  >
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-extrabold text-sm tracking-tight shadow-lg shadow-orange-500/25">
                      AK
                      <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 text-amber-300 fill-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </span>
                    <span className="flex flex-col items-start text-left">
                      <span className="text-[9px] uppercase tracking-[0.22em] font-bold text-neutral-500">{t.footerDev}</span>
                      <span className="text-sm font-extrabold tracking-tight text-orange-300 leading-tight">{t.footerDevLink}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-orange-400 transition-all duration-300 group-hover:translate-x-0.5" />
                  </a>
                </div>
                </div>
              </div>
            </footer>

            {/* VIDEO LIGHTBOX — plays the Instagram reel on-site */}
            {activeReel && (
              <div
                className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                onClick={() => setActiveReel(null)}
                role="dialog"
                aria-modal="true"
              >
                <div className="relative w-[400px] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold">
                      <Instagram className="h-4 w-4" /> garooda Mobiles
                    </span>
                    <button
                      onClick={() => setActiveReel(null)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                      aria-label="Close video"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="rounded-2xl overflow-hidden bg-black shadow-2xl h-[72vh] max-h-[720px]">
                    <iframe
                      key={activeReel}
                      src={`https://www.instagram.com/reel/${activeReel}/embed/`}
                      title="garooda Mobiles Instagram reel"
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                      allowFullScreen
                      scrolling="no"
                    />
                  </div>
                  <a
                    href={`https://www.instagram.com/reel/${activeReel}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 text-white/70 hover:text-white text-xs font-medium transition"
                  >
                    Open on Instagram <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* SCROLL TO TOP */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className={`fixed bottom-24 right-5 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-orange-600 border border-slate-200 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.28)] hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
                showScrollTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
              }`}
            >
              <ChevronUp className="h-5 w-5" />
            </button>

            {/* FLOATING WHATSAPP CHAT BUBBLE */}
            <a
              href={`https://wa.me/${SHOP_PHONE}?text=${encodeURIComponent(t.waFloatText)}`}
              target="_blank"
              rel="noopener noreferrer"
              title={t.waFloatTooltip}
              aria-label={t.waFloatTooltip}
              className="group fixed bottom-6 right-5 z-[60] flex items-center gap-3"
            >
              <span className="hidden sm:block max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-white text-slate-700 text-sm font-semibold shadow-lg border border-slate-100 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:px-4 group-hover:py-2.5 transition-all duration-300">
                {t.waFloatTooltip}
              </span>
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition-transform duration-300 group-hover:scale-110 active:scale-95">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60 animate-ping" />
                <WhatsAppIcon className="relative h-7 w-7" />
              </span>
            </a>

          </>
        ) : (
          /* TECHNICIAN PORTAL */
          <section className="section-shell pt-16 pb-20 animate-in fade-in duration-400">
            {/* ── Dashboard header ── */}
            <div className="section-dark rounded-3xl px-7 py-8 sm:px-10 sm:py-9 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
              <div>
                <span className="eyebrow" style={{ color: "#fb923c" }}>{t.techSystem}</span>
                <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">{t.techTitle}</h1>
                <p className="text-neutral-400 text-sm mt-2">{t.techSubtitle}</p>
              </div>
              <button
                onClick={() => {
                  localStorage.setItem("garooda_tickets", JSON.stringify(MOCK_TICKETS));
                  setTickets(MOCK_TICKETS);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-2.5 text-xs font-semibold text-neutral-200 hover:text-white transition duration-200"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                {t.resetMock}
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="space-y-6">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)]">
                  <h3 className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-bold mb-4">{t.benchMetrics}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-neutral-900 p-5 text-center">
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">{t.totalTickets}</span>
                      <span className="font-display font-bold text-white text-4xl mt-1.5 block">{tickets.length}</span>
                    </div>
                    <div className="rounded-xl bg-orange-500 p-5 text-center">
                      <span className="text-[10px] text-white/80 uppercase tracking-wider font-bold">{t.inProgress}</span>
                      <span className="font-display font-bold text-white text-4xl mt-1.5 block">
                        {tickets.filter((tk) => tk.status !== "Ready for Delivery").length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)]">
                  <h3 className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-bold mb-4">{t.slaTimeline}</h3>
                  <ul className="space-y-1">
                    {t.slaSteps.map((sla, i) => (
                      <li key={sla.step} className="flex justify-between items-center gap-3 text-sm py-2.5 border-b border-neutral-100 last:border-0">
                        <span className="flex items-center gap-2.5 text-neutral-700 font-medium">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold">{i + 1}</span>
                          {sla.step.replace(/^\d+\.\s*/, "")}
                        </span>
                        <span className="text-xs text-neutral-400 font-medium text-right">{sla.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-6">
                  <h3 className="text-[11px] uppercase tracking-[0.18em] text-orange-700 font-bold mb-2.5">{t.waCrmGuide}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-4">{t.waCrmBody}</p>
                  <ul className="space-y-2.5 text-xs text-neutral-700">
                    {[
                      { color: "bg-blue-500", label: "1. New Intake" },
                      { color: "bg-yellow-500", label: "2. Diagnostics" },
                      { color: "bg-orange-500", label: "3. Awaiting Approval" },
                      { color: "bg-red-500", label: "4. Active Repair" },
                      { color: "bg-green-500", label: "5. Ready for Delivery" },
                    ].map((item) => (
                      <li key={item.label} className="flex items-center gap-2.5">
                        <span className={`h-3 w-3 rounded-full shrink-0 ${item.color}`} />
                        <span className="font-semibold">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                {tickets.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-14 text-center shadow-sm">
                    <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-orange-50 border border-orange-100">
                      <ClipboardList className="h-8 w-8 text-orange-500" />
                    </div>
                    <p className="font-display font-bold text-neutral-800 text-lg">{t.noTickets}</p>
                    <p className="text-sm mt-1 text-neutral-400">{t.noTicketsSub}</p>
                  </div>
                ) : (
                  tickets.map((tk) => {
                    const isDone = tk.status === "Ready for Delivery";
                    return (
                    <div key={tk.id} className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)]">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-5 mb-5">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="text-[10px] uppercase tracking-wider bg-neutral-900 px-2.5 py-1 rounded-md text-white font-bold font-display">
                              {tk.id}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${isDone ? "bg-green-50 text-green-600 border border-green-200" : "bg-orange-50 text-orange-600 border border-orange-200"}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${isDone ? "bg-green-500" : "bg-orange-500 animate-pulse"}`} />
                              {tk.status}
                            </span>
                          </div>
                          <h3 className="font-display text-xl font-bold mt-2.5 text-neutral-900">{tk.model}</h3>
                          <p className="text-xs text-neutral-400 mt-1">
                            {t.client}: <span className="font-semibold text-neutral-600">{tk.name}</span> · {t.registered}: {tk.createdAt}
                          </p>
                        </div>
                      </div>

                      {/* status stepper */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {STEPS.map((step) => {
                          const isCurrent = tk.status === step.name;
                          return (
                            <button
                              key={step.name}
                              onClick={() => handleUpdateTicket(tk.id, { status: step.name })}
                              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wide uppercase transition-all duration-200 ${
                                isCurrent
                                  ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                                  : "bg-neutral-100 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200"
                              }`}
                            >
                              {step.name.split(" ")[0]}
                            </button>
                          );
                        })}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <span className="text-[10px] text-neutral-400 uppercase block font-bold tracking-widest mb-1.5">{t.intakeRequestIssue}</span>
                            <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4 text-sm text-neutral-700 font-medium">
                              {tk.issue}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 uppercase block font-bold tracking-widest mb-1.5">{t.benchNotes}</span>
                            <textarea
                              value={tk.notes}
                              onChange={(e) => handleUpdateTicket(tk.id, { notes: e.target.value })}
                              placeholder={t.benchNotesPlaceholder}
                              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700 placeholder:text-neutral-300 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition resize-none h-24"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-[10px] text-neutral-400 uppercase block font-bold tracking-widest mb-1.5">{t.costEstimate}</span>
                            <input
                              type="text"
                              value={tk.cost}
                              onChange={(e) => handleUpdateTicket(tk.id, { cost: e.target.value })}
                              placeholder={t.costPlaceholder}
                              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-300 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition"
                            />
                          </div>

                          <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
                            <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-widest mb-2.5">{t.waOps}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSendWhatsAppUpdate(tk)}
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs py-3 px-4 transition active:scale-[0.98]"
                              >
                                <WhatsAppIcon className="h-4 w-4" />
                                {t.sendAlert}
                              </button>
                              <button
                                onClick={() => {
                                  const updated = tickets.filter((x) => x.id !== tk.id);
                                  setTickets(updated);
                                  localStorage.setItem("garooda_tickets", JSON.stringify(updated));
                                }}
                                className="rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-500 font-bold text-xs py-3 px-4.5 transition"
                              >
                                {t.removeTicket}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-12 ${align === "center" ? "mx-auto max-w-2xl text-center flex flex-col items-center" : "max-w-2xl"}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.04]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-neutral-500 text-base leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

const REPAIR_BRANDS = [
  "Apple", "Samsung", "OnePlus", "Xiaomi", "OPPO", "vivo",
  "Realme", "Motorola", "Google Pixel", "Nothing", "iQOO", "Nokia",
];

function BrandMarquee() {
  return (
    <div className="marquee-mask overflow-hidden">
      <div className="flex w-max animate-marquee gap-x-14">
        {[...REPAIR_BRANDS, ...REPAIR_BRANDS].map((brand, i) => (
          <span
            key={i}
            className="shrink-0 font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-300 select-none"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}

function FloatingInput({
  id,
  label,
  value,
  onChange,
  icon,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  type?: string;
}) {
  return (
    <div className="relative group">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 pt-6 pb-2.5 text-slate-800 placeholder-transparent focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 font-medium"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-2 text-[10px] uppercase tracking-widest text-slate-400 transition-all duration-300 peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-orange-600"
      >
        {label}
      </label>
      {icon && (
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors duration-300">
          {icon}
        </span>
      )}
    </div>
  );
}
