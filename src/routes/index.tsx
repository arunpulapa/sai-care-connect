import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
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
  Smartphone,
  User as UserIcon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sri Sai Mobile Care — Premium Device Repair in Tadepalligudem" },
      {
        name: "description",
        content:
          "Premium mobile and device repair in Tadepalligudem. Transparent pricing, genuine parts, doorstep pickup. Book your repair instantly via WhatsApp.",
      },
    ],
  }),
});

const SHOP_PHONE = "919999999999";

const ISSUES = [
  "Broken Screen / Display Repair",
  "Battery Degradation / Fast Draining",
  "Charging Port / Interface Failure",
  "Liquid / Water Damage Recovery",
  "Motherboard / Software Malfunction",
  "Other Complex Diagnostic",
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
  const [model, setModel] = useState("");
  const [issue, setIssue] = useState("");
  const [issueOpen, setIssueOpen] = useState(false);
  const [customIssue, setCustomIssue] = useState("");
  const [service, setService] = useState<"" | "Express Walk-In" | "Doorstep Pickup">("");
  const [name, setName] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [error, setError] = useState("");

  const isOther = issue === "Other Complex Diagnostic";

  const finalIssue = useMemo(
    () => (isOther && customIssue.trim() ? `${issue} — ${customIssue.trim()}` : issue),
    [isOther, issue, customIssue],
  );

  const handleSubmit = () => {
    if (!model.trim() || !name.trim() || !issue || !service) {
      setError("Please fill Device Model, Diagnostic Issue, Service Allocation and Name.");
      return;
    }
    setError("");
    const ticket =
      `⚡ *SRI SAI MOBILE CARE* ⚡\n` +
      `_Premium Digital Service Ticket_\n` +
      `----------------------------------\n` +
      `📱 *Device Model:* ${model}\n` +
      `🔧 *Diagnostic Issue:* ${finalIssue}\n` +
      `📦 *Service Allocation:* ${service}\n` +
      `👤 *Client Identity:* ${name}\n` +
      `----------------------------------\n` +
      `_Sent via TPD Digital Network. Please reply with price quotation estimate._`;
    const url = `https://wa.me/${SHOP_PHONE}?text=${encodeURIComponent(ticket)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-white antialiased selection:bg-emerald-500/30 pb-32">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090D16]/70 border-b border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-emerald-400 to-emerald-600 grid place-items-center">
              <Smartphone className="h-4 w-4 text-[#090D16]" />
            </div>
            <span className="font-bold uppercase tracking-[0.22em] text-xs sm:text-sm">
              Sri Sai Mobile Care
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="hidden sm:inline">Tadepalligudem Hub Connected</span>
            <span className="sm:hidden">Hub Online</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HERO */}
        <section className="pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1F2937] bg-[#111827]/60 px-3 py-1 text-xs text-[#9CA3AF] mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Now serving K.N. Road, Tadepalligudem
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white max-w-4xl mx-auto leading-[1.05]">
            Premium Device Restoration.
            <br />
            <span className="text-[#9CA3AF]">Transparent Pricing.</span>
          </h1>
          <p className="mt-6 text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            Skip the lines. Get honest diagnostics and track your device repair cycle natively
            inside WhatsApp. From doorstep to drop-off.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              { icon: <Zap className="h-3.5 w-3.5" />, label: "2-Hour Express Service" },
              { icon: <ShieldCheck className="h-3.5 w-3.5" />, label: "100% Genuine Parts" },
              { icon: <MapPin className="h-3.5 w-3.5" />, label: "K.N. Road Service Hub" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 rounded-full border border-[#1F2937] bg-[#111827] px-4 py-2 text-sm text-white"
              >
                <span className="text-emerald-400">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </section>

        {/* BENTO */}
        <section className="grid md:grid-cols-3 gap-4 py-12">
          {[
            {
              icon: Truck,
              title: "White-Glove Doorstep Pickup",
              desc: "Seamless courier dispatch from any location in Tadepalligudem directly to our bench.",
            },
            {
              icon: ShieldAlert,
              title: "Zero Upcharge Guarantee",
              desc: "No hidden costs. Receive a detailed estimate via text before our technicians turn a single screw.",
            },
            {
              icon: MessageSquareCode,
              title: "WhatsApp Lifecycle Automation",
              desc: "No apps to download. Monitor diagnostic progress phases using native WhatsApp Business Labels.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="group relative rounded-2xl border border-[#1F2937] bg-[#111827] p-6 transition hover:border-emerald-500/40"
            >
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 grid place-items-center mb-5">
                <c.icon className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold text-lg tracking-tight">{c.title}</h3>
              <p className="mt-2 text-sm text-[#9CA3AF] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </section>

        {/* DIAGNOSTIC ENGINE */}
        <section className="py-16">
          <div className="text-center mb-10">
            <p className="text-emerald-400 text-xs uppercase tracking-[0.25em] font-medium">
              Instant Diagnostic Tool
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              Build your repair ticket in seconds
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto rounded-3xl border border-[#1F2937] bg-[#111827]/80 backdrop-blur p-6 sm:p-10 shadow-2xl shadow-emerald-500/5">
            {/* Model */}
            <FloatingInput
              id="model"
              label="Device Model (e.g., iPhone 15 Pro, OnePlus 12)"
              value={model}
              onChange={setModel}
            />

            {/* Issue Dropdown */}
            <div className="mt-5">
              <label className="block text-xs uppercase tracking-widest text-[#9CA3AF] mb-2">
                Core Issue
              </label>
              <button
                type="button"
                onClick={() => setIssueOpen((v) => !v)}
                className="w-full flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#090D16] px-4 py-4 text-left text-white hover:border-emerald-500/40 transition"
              >
                <span className={issue ? "text-white" : "text-[#9CA3AF]"}>
                  {issue || "Select a diagnostic category"}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-[#9CA3AF] transition-transform ${issueOpen ? "rotate-180" : ""}`}
                />
              </button>
              {issueOpen && (
                <div className="mt-2 rounded-xl border border-[#1F2937] bg-[#090D16] overflow-hidden animate-fade-in">
                  {ISSUES.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setIssue(opt);
                        setIssueOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition ${
                        issue === opt
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "text-white hover:bg-[#111827]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOther ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <textarea
                    value={customIssue}
                    onChange={(e) => setCustomIssue(e.target.value)}
                    rows={3}
                    placeholder="Describe your issue in detail..."
                    className="w-full rounded-xl border border-[#1F2937] bg-[#090D16] px-4 py-3 text-white placeholder:text-[#9CA3AF] focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Service Allocation */}
            <div className="mt-6">
              <label className="block text-xs uppercase tracking-widest text-[#9CA3AF] mb-2">
                Service Allocation
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { v: "Express Walk-In", sub: "In-store diagnosis" },
                  { v: "Doorstep Pickup", sub: "Courier home dispatch" },
                ].map((o) => {
                  const active = service === o.v;
                  return (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => setService(o.v as typeof service)}
                      className={`group rounded-xl border px-4 py-4 text-left transition ${
                        active
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-[#1F2937] bg-[#090D16] hover:border-[#374151]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-medium ${
                            active ? "text-emerald-300" : "text-white"
                          }`}
                        >
                          {o.v}
                        </span>
                        <span
                          className={`h-4 w-4 rounded-full border ${
                            active
                              ? "border-emerald-400 bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400/50"
                              : "border-[#374151]"
                          }`}
                        />
                      </div>
                      <p className="text-xs text-[#9CA3AF] mt-1">{o.sub}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name */}
            <div className="mt-5">
              <FloatingInput
                id="name"
                label="Your Full Name"
                value={name}
                onChange={setName}
                icon={<UserIcon className="h-4 w-4" />}
              />
            </div>

            {error && (
              <p className="mt-4 text-xs text-red-400 animate-fade-in">{error}</p>
            )}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16">
          <div className="text-center mb-10">
            <p className="text-emerald-400 text-xs uppercase tracking-[0.25em] font-medium">
              Voices from Tadepalligudem
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              Trusted by locals, validated by results
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                q: "Got my phone display replaced here in 90 minutes. Absolute pricing honesty compared to shops near Subbarao Peta.",
                a: "Anand K.",
              },
              {
                q: "The white-glove collection option saved me an absolute trip to the commercial market. Highly professional execution.",
                a: "Priya M.",
              },
            ].map((r) => (
              <div
                key={r.a}
                className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6"
              >
                <div className="flex gap-1 text-emerald-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-white leading-relaxed">"{r.q}"</p>
                <p className="mt-4 text-sm text-[#9CA3AF]">— {r.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-emerald-400 text-xs uppercase tracking-[0.25em] font-medium">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              Friction-free answers
            </h2>
          </div>
          <div className="space-y-2">
            {[
              {
                q: "How much does it cost to use this tool?",
                a: "Completely free. Our digital intake routes estimates instantly with no hidden markups.",
              },
              {
                q: "How long does a typical mobile repair take?",
                a: "Express repairs like display screens or battery swaps are completed within 2 hours of device arrival.",
              },
            ].map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  className="rounded-xl border border-[#1F2937] bg-[#111827] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-medium text-white">{f.q}</span>
                    {open ? (
                      <Minus className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Plus className="h-4 w-4 text-[#9CA3AF]" />
                    )}
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-[#9CA3AF] leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <footer className="py-12 text-center text-xs text-[#9CA3AF] border-t border-[#1F2937]">
          © {new Date().getFullYear()} Sri Sai Mobile Care · K.N. Road, Tadepalligudem
        </footer>
      </main>

      {/* STICKY SUBMIT BAR */}
      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-[#1F2937] bg-[#090D16]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#9CA3AF] hidden sm:block">
            Your ticket is generated locally and sent directly to our owner's WhatsApp.
          </div>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] transition px-6 py-4 font-semibold text-[#090D16] shadow-[0_10px_40px_-10px] shadow-emerald-500/60"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Generate Repair Ticket via WhatsApp
          </button>
        </div>
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
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full rounded-xl border border-[#1F2937] bg-[#090D16] px-4 pt-6 pb-2 text-white placeholder-transparent focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-widest text-[#9CA3AF] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-emerald-400"
      >
        {label}
      </label>
      {icon && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
          {icon}
        </span>
      )}
    </div>
  );
}
