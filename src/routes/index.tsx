import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Truck,
  ShieldAlert,
  MessageSquareCode,
  ChevronDown,
  Zap,
  ShieldCheck,
  MapPin,
  Star,
  Plus,
  Minus,
  User as UserIcon,
  Wrench,
  ClipboardList,
  RefreshCw,
  Smartphone,
  Laptop,
  Tablet,
  Cpu,
  MessageSquare,
  Instagram,
} from "lucide-react";
import garoodaLogo from "../assets/garooda_logo.jpeg";

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

const ISSUES = [
  "Broken Screen / Display Repair",
  "Battery Degradation / Fast Draining",
  "Charging Port / Interface Failure",
  "Liquid / Water Damage Recovery",
  "Motherboard / Software Malfunction",
  "Other Complex Diagnostic",
];

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
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
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

  const [model, setModel] = useState("");
  const [issue, setIssue] = useState("");
  const [issueOpen, setIssueOpen] = useState(false);
  const [customIssue, setCustomIssue] = useState("");
  const [service, setService] = useState<"" | "Express Walk-In" | "Doorstep Pickup">("");
  const [name, setName] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [error, setError] = useState("");

  // Portal view management
  const [viewMode, setViewMode] = useState<"client" | "technician">("client");

  // Force client mode if not authorized
  useEffect(() => {
    if (!isAuthorized && viewMode === "technician") {
      setViewMode("client");
    }
  }, [isAuthorized, viewMode]);

  // CRM State
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeClientTicketId, setActiveClientTicketId] = useState<string | null>(null);

  // Initialize CRM and check active client status
  useEffect(() => {
    const savedTickets = localStorage.getItem("garooda_tickets");
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    } else {
      localStorage.setItem("garooda_tickets", JSON.stringify(MOCK_TICKETS));
      setTickets(MOCK_TICKETS);
    }

    const activeId = localStorage.getItem("garooda_active_ticket_id");
    if (activeId) {
      setActiveClientTicketId(activeId);
    }
  }, []);

  const isOther = issue === "Other Complex Diagnostic";

  const finalIssue = useMemo(
    () => (isOther && customIssue.trim() ? `${issue} — ${customIssue.trim()}` : issue),
    [isOther, issue, customIssue],
  );

  const progress = useMemo(() => {
    let p = 0;
    if (model.trim()) p += 25;
    if (issue) p += 25;
    if (service) p += 25;
    if (name.trim()) p += 25;
    return p;
  }, [model, issue, service, name]);

  const handleSubmit = () => {
    if (!model.trim() || !name.trim() || !issue || !service) {
      setError("Please complete all sections to generate your repair ticket.");
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

    localStorage.setItem("garooda_active_ticket_id", newTicketId);
    setActiveClientTicketId(newTicketId);

    const textPayload =
      `🦅 *garooda Mobiles* 🦅\n` +
      `_*Tadepalligudem's Premier Service Hub*_\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `🎫 *TICKET ID*  ➜  \`\`\`${newTicketId}\`\`\`\n` +
      `👤 *CLIENT*       ➜  *${name}*\n` +
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

    // Clear form
    setModel("");
    setIssue("");
    setCustomIssue("");
    setService("");
    setName("");
  };

  // Get active client tracking ticket
  const currentClientTicket = useMemo(() => {
    return tickets.find((t) => t.id === activeClientTicketId) || null;
  }, [tickets, activeClientTicketId]);

  // Update a ticket's status or details
  const handleUpdateTicket = (id: string, updates: Partial<Ticket>) => {
    const updated = tickets.map((t) => (t.id === id ? { ...t, ...updates } : t));
    setTickets(updated);
    localStorage.setItem("garooda_tickets", JSON.stringify(updated));
  };

  // Send a preformatted WhatsApp update from technician to client
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
        `💬 _Great news ${ticket.name}! Your device has been fully restored to factory specifications. Ready for secure doorstep delivery or in-store collection at our K.N. Road center._\n\n` +
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
    <div className="min-h-screen bg-[#060A13] bg-grid-pattern text-white antialiased selection:bg-emerald-500/30 pb-36 relative overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl backdrop-blur-xl bg-slate-950/65 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl transition-all duration-300">
        <div className="px-6 h-18 flex items-center justify-between">
          <div className="flex items-center cursor-pointer gap-2" onClick={() => setViewMode("client")}>
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg blur-md opacity-25 group-hover:opacity-40 transition duration-300" />
              <img src={garoodaLogo} alt="garooda Mobiles Logo" className="relative h-9 w-auto object-contain rounded-md transition-transform duration-300 hover:scale-102" />
            </div>
          </div>

          {/* Navigation Links for Client Mode */}
          {viewMode === "client" && (
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { label: "Overview", id: "top" },
                { label: "Services", id: "services" },
                { label: "Book Repair", id: "intake-form" },
                { label: "Reviews", id: "testimonials" },
                { label: "FAQ", id: "faq" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.id === "top") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      const el = document.getElementById(link.id);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-emerald-400 transition-all duration-300 cursor-pointer relative py-1.5 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-3">
            {isAuthorized && (
              <button
                onClick={() => setViewMode(viewMode === "client" ? "technician" : "client")}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 px-4 py-2 text-xs font-bold tracking-wide text-emerald-400 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.05)]"
              >
                {viewMode === "client" ? (
                  <>
                    <Wrench className="h-3.5 w-3.5" />
                    <span>Technician Portal</span>
                  </>
                ) : (
                  <>
                    <ClipboardList className="h-3.5 w-3.5" />
                    <span>Client Booking</span>
                  </>
                )}
              </button>
            )}

            <div className="hidden sm:flex items-center gap-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/15 px-3.5 py-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Hub Operational</span>
            </div>

            <a
              href="https://www.instagram.com/garoodamobiles"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-500 hover:to-yellow-500 hover:border-transparent text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.02)] cursor-pointer"
              title="Follow us on Instagram"
            >
              <Instagram className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6">
        {viewMode === "client" ? (
          <>
            {/* HERO */}
            <section className="relative pt-28 pb-20 text-center max-w-5xl mx-auto overflow-hidden">
              {/* Soft ambient background glows */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/5 blur-[120px] pointer-events-none -z-10" />

              {/* Tag/Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs text-emerald-400 font-semibold tracking-wide mb-8 shadow-[0_0_20px_rgba(16,185,129,0.08)] animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Tadepalligudem's Premier Device Restoration Hub
              </div>
              
              {/* Main Heading */}
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
                Your Premium Devices.
                <br />
                <span className="text-gradient-emerald">Restored to Perfection.</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-base sm:text-lg text-white/65 max-w-3xl mx-auto leading-relaxed mb-10 font-normal px-4 animate-in fade-in slide-in-from-bottom-5 duration-600">
                Expert repairs you can trust. Get 100% genuine parts, transparent honest pricing, and real-time updates directly on WhatsApp. Visit our modern K.N. Road center or request a secure doorstep pickup.
              </p>

              {/* Call-to-actions */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 px-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <button
                  onClick={() => {
                    const el = document.getElementById("intake-form");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base px-8 py-4 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Zap className="h-5 w-5 fill-current" />
                  Start Repair Request
                </button>
                <a
                  href={`https://wa.me/${SHOP_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md text-white font-semibold text-base px-8 py-4 transition-all duration-300 hover:border-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageSquare className="h-5 w-5 text-emerald-400" />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Supported Devices Cards Grid */}
              <div id="services" className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto px-4 mt-8 animate-in fade-in slide-in-from-bottom-5 duration-800">
                {[
                  {
                    icon: <Smartphone className="h-6 w-6 text-emerald-400" />,
                    title: "Phones",
                    desc: "iPhone & Android expert screen & battery swaps",
                  },
                  {
                    icon: <Tablet className="h-6 w-6 text-emerald-400" />,
                    title: "Tablets",
                    desc: "iPad & Android glass and charging port fixes",
                  },
                  {
                    icon: <Laptop className="h-6 w-6 text-emerald-400" />,
                    title: "Laptops",
                    desc: "MacBook & Windows display and liquid recovery",
                  },
                  {
                    icon: <Cpu className="h-6 w-6 text-emerald-400" />,
                    title: "Motherboard",
                    desc: "Advanced micro-soldering and chip restoration",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="group rounded-2xl premium-glass premium-glass-hover p-5 text-left flex flex-col justify-between h-40"
                  >
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/5 border border-emerald-500/10 grid place-items-center mb-3 shadow-[0_0_15px_rgba(16,185,129,0.05)] transition-transform duration-300 group-hover:scale-110">
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base tracking-tight mb-1">{card.title}</h4>
                      <p className="text-[11px] text-white/40 leading-normal">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* LIVE CLIENT TRACKING VIEW IF APPLICABLE */}
            {currentClientTicket && (
              <section className="py-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
                <div className="max-w-4xl mx-auto rounded-3xl border border-emerald-500/20 bg-[#0c1223]/80 p-8 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
                  <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-emerald-500/5 blur-3xl -z-10" />
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6 mb-8">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-bold">Active Live Tracking</span>
                      <h3 className="text-2xl font-bold mt-1 text-white flex items-center gap-2.5">
                        Ticket: <span className="text-gradient-emerald">{currentClientTicket.id}</span>
                      </h3>
                      <p className="text-xs text-white/40 mt-1">Registered: {currentClientTicket.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
                        {currentClientTicket.status}
                      </span>
                      <button
                        onClick={() => {
                          localStorage.removeItem("garooda_active_ticket_id");
                          setActiveClientTicketId(null);
                        }}
                        className="text-xs text-white/40 hover:text-white transition duration-200"
                      >
                        New Intake Ticket
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 items-start mb-8">
                    <div className="md:col-span-2">
                      <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-3">Device Detail Spectrum</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4">
                          <span className="text-[10px] text-white/45 block uppercase">Device Model</span>
                          <span className="font-semibold text-white mt-1 block">{currentClientTicket.model}</span>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4">
                          <span className="text-[10px] text-white/45 block uppercase">Diagnostic Issue</span>
                          <span className="font-semibold text-white mt-1 block truncate">{currentClientTicket.issue}</span>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4">
                          <span className="text-[10px] text-white/45 block uppercase">Service Allocation</span>
                          <span className="font-semibold text-white mt-1 block">{currentClientTicket.service}</span>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4">
                          <span className="text-[10px] text-white/45 block uppercase">Restoration Cost</span>
                          <span className="font-semibold text-emerald-400 mt-1 block">{currentClientTicket.cost}</span>
                        </div>
                      </div>

                      {currentClientTicket.notes && (
                        <div className="rounded-2xl border border-white/5 bg-slate-950/30 p-5 mt-4">
                          <span className="text-[10px] text-white/40 block uppercase font-bold tracking-widest mb-1.5">Bench Notes</span>
                          <p className="text-sm text-white/70 leading-relaxed font-light">{currentClientTicket.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-5">
                      <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-4">Benchmark Checklist</h4>
                      <ul className="space-y-3.5">
                        {[
                          "Safety Disassembly",
                          "OEM Screen Verification",
                          "Calibrated Charge Testing",
                          "Thermal Safety Checked",
                          "12-point Touch Matrix Pass",
                        ].map((c, i) => {
                          const isDone = 
                            currentClientTicket.status === "Ready for Delivery" ||
                            (currentClientTicket.status === "Quality Check" && i < 4) ||
                            (currentClientTicket.status === "Restoration Phase" && i < 2) ||
                            (currentClientTicket.status === "Diagnostics Bench" && i === 0);
                          return (
                            <li key={c} className="flex items-center gap-3 text-sm">
                              <span className={`h-4.5 w-4.5 rounded-full flex items-center justify-center border text-[9px] ${
                                isDone 
                                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                                  : "border-white/10 bg-slate-950/40 text-white/20"
                              }`}>
                                ✓
                              </span>
                              <span className={isDone ? "text-white/80 font-medium" : "text-white/30"}>{c}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* Visual Step Tracker Map */}
                  <div className="relative mt-10">
                    <div className="absolute top-4 left-4 right-4 h-0.5 bg-white/10 -z-10 hidden md:block" />
                    <div className="grid md:grid-cols-5 gap-6 md:gap-4">
                      {STEPS.map((s, idx) => {
                        const currentIdx = STEPS.findIndex((step) => step.name === currentClientTicket.status);
                        const isCompleted = idx < currentIdx;
                        const isActive = idx === currentIdx;
                        
                        return (
                          <div key={s.name} className="flex md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-3">
                            <div className={`h-8.5 w-8.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                              isActive
                                ? "border-emerald-500 bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.5)] font-bold scale-110"
                                : isCompleted
                                ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-400"
                                : "border-white/15 bg-[#090D16] text-white/30"
                            }`}>
                              {idx + 1}
                            </div>
                            <div>
                              <p className={`text-sm font-semibold ${isActive ? "text-emerald-400" : isCompleted ? "text-white/80" : "text-white/30"}`}>
                                {s.name}
                              </p>
                              <p className="text-[11px] text-white/40 mt-0.5 leading-tight hidden md:block">{s.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* BENTO */}
            <section className="grid md:grid-cols-3 gap-6 py-12">
              {[
                {
                  icon: Truck,
                  title: "White-Glove Doorstep Pickup",
                  desc: "Seamless secure courier dispatch and collection from any location in Tadepalligudem directly to our technical bench.",
                },
                {
                  icon: ShieldAlert,
                  title: "Zero Upcharge Guarantee",
                  desc: "No surprises or hidden fees. Receive a precise billing estimate via text before our technicians turn a single screw.",
                },
                {
                  icon: MessageSquareCode,
                  title: "WhatsApp Lifecycle Automation",
                  desc: "Zero additional apps. Watch your diagnostic evaluation and progress states via native WhatsApp Business Labels.",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="group relative rounded-2xl premium-glass premium-glass-hover p-8 shadow-xl"
                >
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 grid place-items-center mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <c.icon className="h-5.5 w-5.5 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg tracking-tight mb-2.5">{c.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light">{c.desc}</p>
                </div>
              ))}
            </section>

            {/* DIAGNOSTIC ENGINE */}
            <section className="py-16" id="intake-form">
              <div className="text-center mb-12">
                <span className="text-emerald-400 text-xs uppercase tracking-[0.3em] font-semibold">
                  Intake Terminal v2.4
                </span>
                <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                  Initiate Digital Intake Ticket
                </h2>
                <p className="mt-4 text-white/40 text-sm max-w-md mx-auto">
                  Configure your device model and diagnostic issues below to generate your direct service request.
                </p>
              </div>

              <div className="relative max-w-3xl mx-auto rounded-3xl premium-glass p-8 sm:p-12 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)] border-white/[0.08]">
                {/* Model */}
                <FloatingInput
                  id="model"
                  label="Device Model (e.g., iPhone 15 Pro, OnePlus 12)"
                  value={model}
                  onChange={setModel}
                />

                {/* Issue Dropdown */}
                <div className="mt-6 relative">
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2.5 font-bold">
                    Core Hardware / Software Issue
                  </label>
                  <button
                    type="button"
                    onClick={() => setIssueOpen((v) => !v)}
                    className="w-full flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 text-left text-white hover:border-emerald-500/40 focus:border-emerald-500 transition duration-300 font-medium"
                  >
                    <span className={issue ? "text-white" : "text-white/40"}>
                      {issue || "Select a diagnostic category"}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-white/40 transition-transform duration-300 ${issueOpen ? "rotate-180 text-emerald-400" : ""}`}
                    />
                  </button>
                  {issueOpen && (
                    <div className="absolute left-0 right-0 z-30 mt-2 rounded-2xl border border-white/10 bg-[#0d1323]/95 backdrop-blur-xl overflow-hidden shadow-2xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                      {ISSUES.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setIssue(opt);
                            setIssueOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                            issue === opt
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOther ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <textarea
                        value={customIssue}
                        onChange={(e) => setCustomIssue(e.target.value)}
                        rows={3}
                        placeholder="Briefly describe your hardware/software issues in detail..."
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 text-white placeholder:text-white/30 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all duration-300 resize-none font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Allocation */}
                <div className="mt-6">
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2.5 font-bold">
                    Service Allocation Mode
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { v: "Express Walk-In", sub: "Priority diagnostic at our K.N. Road shop bench" },
                      { v: "Doorstep Pickup", sub: "Secure courier dispatch & collection from your home" },
                    ].map((o) => {
                      const active = service === o.v;
                      return (
                        <button
                          key={o.v}
                          type="button"
                          onClick={() => setService(o.v as typeof service)}
                          className={`group rounded-2xl border px-5 py-5 text-left transition-all duration-300 ${
                            active
                              ? "border-emerald-500/60 bg-emerald-500/[0.06] shadow-[0_0_25px_rgba(16,185,129,0.05)]"
                              : "border-white/10 bg-slate-950/40 hover:border-white/20 hover:bg-slate-950/60"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-semibold text-base transition-colors ${
                                active ? "text-emerald-400" : "text-white/90"
                              }`}
                            >
                              {o.v}
                            </span>
                            <span
                              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                active
                                  ? "border-emerald-500 bg-transparent"
                                  : "border-white/20"
                              }`}
                            >
                              {active && (
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                              )}
                            </span>
                          </div>
                          <p className="text-xs text-white/40 mt-2 leading-relaxed transition-colors group-hover:text-white/50">{o.sub}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name */}
                <div className="mt-6">
                  <FloatingInput
                    id="name"
                    label="Your Full Name"
                    value={name}
                    onChange={setName}
                    icon={<UserIcon className="h-5 w-5" />}
                  />
                </div>

                {error && (
                  <p className="mt-4 text-xs text-red-400 animate-fade-in font-medium flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    {error}
                  </p>
                )}
              </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-16" id="testimonials">
              <div className="text-center mb-12">
                <p className="text-emerald-400 text-xs uppercase tracking-[0.25em] font-medium">
                  Client Service Assessments
                </p>
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white font-display">
                  Operational Compliance & Feedback
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    q: "Display assembly replaced successfully in 90 minutes. Verified pricing transparency and adherence to SLA targets.",
                    a: "Anand K.",
                  },
                  {
                    q: "Secure courier dispatch logistics operated seamlessly, eliminating transit overhead. Professional technical execution.",
                    a: "Priya M.",
                  },
                ].map((r) => (
                  <div
                    key={r.a}
                    className="rounded-2xl premium-glass p-8 shadow-lg transition-transform duration-300 hover:scale-[1.01]"
                  >
                    <div className="flex gap-1 text-amber-400 mb-5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                      ))}
                    </div>
                    <p className="text-white/80 text-[15px] leading-relaxed italic">"{r.q}"</p>
                    <p className="mt-4 text-sm font-semibold text-emerald-400 tracking-wide">— {r.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="py-16 max-w-3xl mx-auto" id="faq">
              <div className="text-center mb-12">
                <p className="text-emerald-400 text-xs uppercase tracking-[0.25em] font-medium">
                  FAQ
                </p>
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white font-display">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  {
                    q: "How much does it cost to use this digital intake?",
                    a: "Completely free. Our digital intake routes specifications and estimates instantly directly to our technician's bench.",
                  },
                  {
                    q: "How long does a typical mobile repair take?",
                    a: "Express repairs like display replacements or battery swaps are typically finalized within 2 hours of device arrival.",
                  },
                ].map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div
                      key={f.q}
                      className="rounded-2xl border border-white/5 bg-slate-950/20 overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-white/10"
                    >
                      <button
                        onClick={() => setOpenFaq(open ? null : i)}
                        className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.01]"
                      >
                        <span className="font-semibold text-white/90 text-[15px]">{f.q}</span>
                        {open ? (
                          <Minus className="h-4 w-4 text-emerald-400 transition-transform duration-300" />
                        ) : (
                          <Plus className="h-4 w-4 text-white/30 transition-transform duration-300" />
                        )}
                      </button>
                      <div
                        className={`grid transition-all duration-300 ${
                          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-6 pb-6 text-sm text-white/50 leading-relaxed">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <footer className="py-16 flex flex-col items-center justify-center gap-4 text-xs text-white/30 border-t border-white/[0.06] mt-12">
              <a
                href="https://www.instagram.com/garoodamobiles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-500 hover:to-yellow-500 hover:border-transparent text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.02)] cursor-pointer"
                title="Follow us on Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span>© {new Date().getFullYear()} garooda Mobiles · K.N. Road, Tadepalligudem. All Rights Reserved.</span>
                <span className="text-white/20">
                  Developed with ⚡ by{" "}
                  <a
                    href="https://aknextgen.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400/60 hover:text-emerald-400 font-semibold transition-colors duration-300"
                  >
                    AK NextGen Solution
                  </a>
                </span>
              </div>
            </footer>

            {/* FLOATING GLASS SUBMIT BAR */}
            <div className="fixed bottom-6 inset-x-0 z-50 px-6 pointer-events-none">
              <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[#090D16]/85 backdrop-blur-lg px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(16,185,129,0.03)] transition-all duration-500">
                <div className="flex flex-col gap-1 w-full md:w-auto">
                  <div className="flex justify-between items-center text-xs text-white/50 font-medium">
                    <span>Intake Ticket Progress</span>
                    <span className={progress === 100 ? "text-emerald-400" : "text-white/60 font-semibold"}>
                      {progress}% Complete
                    </span>
                  </div>
                  <div className="h-1.5 w-full md:w-64 bg-white/10 rounded-full overflow-hidden mt-1.5">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className={`w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-xl transition-all duration-300 px-7 py-3.5 font-bold text-sm select-none active:scale-[0.98] ${
                    progress === 100
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer"
                      : "bg-white/10 border border-white/5 text-white/40 cursor-not-allowed"
                  }`}
                >
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                  {progress === 100 ? "Submit Intake Ticket to WhatsApp" : "Complete Ticket to Generate"}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* TECHNICIAN PORTAL VIEW */
          <section className="pt-24 pb-20 animate-in fade-in duration-400">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div>
                <span className="text-emerald-400 text-xs uppercase tracking-[0.3em] font-semibold">Hub Operator System</span>
                <h1 className="text-4xl font-extrabold text-white mt-1">Technician Bench Dashboard</h1>
                <p className="text-white/40 text-sm mt-1">Active repair queues & diagnostic management terminal.</p>
              </div>
              <button
                onClick={() => {
                  localStorage.setItem("garooda_tickets", JSON.stringify(MOCK_TICKETS));
                  setTickets(MOCK_TICKETS);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/80 px-4.5 py-2.5 text-xs text-white/60 hover:text-white transition duration-200"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset Mock Database
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Queue sidebar metrics */}
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-6">
                  <h3 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-4">Bench Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4 text-center">
                      <span className="text-[10px] text-white/40 uppercase">Total Tickets</span>
                      <span className="font-extrabold text-white text-3xl mt-1 block font-display">{tickets.length}</span>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-emerald-950/20 p-4 text-center">
                      <span className="text-[10px] text-emerald-400/80 uppercase">In Progress</span>
                      <span className="font-extrabold text-emerald-400 text-3xl mt-1 block font-display">
                        {tickets.filter((t) => t.status !== "Ready for Delivery").length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-6">
                  <h3 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-3.5">Standard SLA Timeline</h3>
                  <ul className="space-y-3.5">
                    {[
                      { step: "1. Bench Intake", time: "Within 15 mins of arrival" },
                      { step: "2. Diagnostics", time: "Within 30 mins" },
                      { step: "3. WhatsApp Quote", time: "Within 45 mins" },
                      { step: "4. Repair Cycle", time: "Typically 60-90 mins" },
                    ].map((sla) => (
                      <li key={sla.step} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                        <span className="text-white/60 font-medium">{sla.step}</span>
                        <span className="text-xs text-emerald-400/85 font-mono">{sla.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WhatsApp CRM Guide */}
                <div className="rounded-2xl border border-emerald-500/10 bg-emerald-950/5 p-6">
                  <h3 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3.5 font-display">WhatsApp CRM Guide</h3>
                  <p className="text-xs text-white/50 leading-relaxed mb-4 font-light">
                    For zero database costs, set up these color labels inside your free <strong>WhatsApp Business App</strong> to manage your ticket cycles:
                  </p>
                  <ul className="space-y-2.5 text-xs text-white/70">
                    <li className="flex items-center gap-2.5">
                      <span className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      <span><strong>🔵 1. New Intake</strong> (status: intake)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="h-3 w-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                      <span><strong>🟡 2. Diagnostics</strong> (status: diagnostic)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                      <span><strong>🟠 3. Awaiting Approval</strong> (pending quote)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                      <span><strong>🔴 4. Active Repair</strong> (status: in_repair)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      <span><strong>🟢 5. Ready for Delivery</strong> (status: ready)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tickets list */}
              <div className="lg:col-span-2 space-y-6">
                {tickets.length === 0 ? (
                  <div className="rounded-3xl border border-white/5 bg-slate-950/20 p-12 text-center text-white/30">
                    <ClipboardList className="h-12 w-12 mx-auto mb-4 text-white/20" />
                    <p className="font-semibold text-lg">No tickets active in the database.</p>
                    <p className="text-sm mt-1">Please configure tickets on the client intake side.</p>
                  </div>
                ) : (
                  tickets.map((t) => (
                    <div key={t.id} className="rounded-2xl border border-white/10 bg-[#0d1323]/80 p-6 sm:p-8 shadow-xl relative overflow-hidden backdrop-blur-md">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5 mb-5">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider bg-slate-900 border border-white/10 px-2.5 py-1 rounded-md text-white/50 font-bold">
                            {t.id}
                          </span>
                          <h3 className="text-xl font-bold mt-2 text-white">{t.model}</h3>
                          <p className="text-xs text-white/40 mt-1">Client: <span className="font-semibold text-white/60">{t.name}</span> · Registered: {t.createdAt}</p>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                          {STEPS.map((step) => {
                            const isCurrent = t.status === step.name;
                            return (
                              <button
                                key={step.name}
                                onClick={() => handleUpdateTicket(t.id, { status: step.name })}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide uppercase transition-all duration-200 ${
                                  isCurrent
                                    ? "bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                                    : "bg-white/[0.03] text-white/40 hover:text-white hover:bg-white/[0.08]"
                                }`}
                              >
                                {step.name.split(" ")[0]}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                          <div>
                            <span className="text-[10px] text-white/40 uppercase block font-bold tracking-widest mb-1.5">Intake Request Issue</span>
                            <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4 text-sm text-white/80 font-medium">
                              {t.issue}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-white/40 uppercase block font-bold tracking-widest mb-1.5">Bench Notes & Status Details</span>
                            <textarea
                              value={t.notes}
                              onChange={(e) => handleUpdateTicket(t.id, { notes: e.target.value })}
                              placeholder="Update diagnostics notes here..."
                              className="w-full rounded-xl border border-white/5 bg-slate-950/60 p-4 text-sm text-white placeholder:text-white/20 focus:border-emerald-500 focus:outline-none transition resize-none h-24"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-[10px] text-white/40 uppercase block font-bold tracking-widest mb-1.5">Restoration Cost Estimate</span>
                            <input
                              type="text"
                              value={t.cost}
                              onChange={(e) => handleUpdateTicket(t.id, { cost: e.target.value })}
                              placeholder="e.g. ₹4,500"
                              className="w-full rounded-xl border border-white/5 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-emerald-500 focus:outline-none transition"
                            />
                          </div>

                          <div className="rounded-xl border border-white/5 bg-slate-950/30 p-4">
                            <span className="text-[10px] text-white/40 block font-bold uppercase tracking-widest mb-2.5">WhatsApp Operations</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSendWhatsAppUpdate(t)}
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-3 px-4 transition active:scale-[0.98]"
                              >
                                <WhatsAppIcon className="h-4 w-4" />
                                Send Live Status Alert
                              </button>
                              <button
                                onClick={() => {
                                  const updated = tickets.filter((tk) => tk.id !== t.id);
                                  setTickets(updated);
                                  localStorage.setItem("garooda_tickets", JSON.stringify(updated));
                                }}
                                className="rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-bold text-xs py-3 px-4.5 transition"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function FloatingInput({
  id,
  label,
  value,
  onChange,
  icon,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative group">
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full rounded-2xl border border-white/10 bg-slate-950/40 px-5 pt-6 pb-2.5 text-white placeholder-transparent focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all duration-300 font-medium"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-2 text-[10px] uppercase tracking-widest text-white/45 transition-all duration-300 peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-emerald-400"
      >
        {label}
      </label>
      {icon && (
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-emerald-400 transition-colors duration-300">
          {icon}
        </span>
      )}
    </div>
  );
}
