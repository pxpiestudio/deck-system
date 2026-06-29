import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Panel } from "@/components/ui/panel"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { InboxRow } from "@/components/ui/inbox-row"
import { StatTile } from "@/components/ui/stat-tile"
import { Chip } from "@/components/ui/chip"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Input } from "@/components/ui/input"
import { AnimateIn, ClosablePanel } from "@/components/motion"
import { Search, Moon, Sun } from "lucide-react"

function Swatch({ name, token, style }: { name: string; token: string; style?: React.CSSProperties }) {
  return (
    <div className="rounded-lg overflow-hidden bg-surface border border-border">
      <div className="h-20 w-full" style={style} />
      <div className="p-3">
        <div className="font-heading font-bold text-[13px] text-text">{name}</div>
        <div className="font-mono text-[11px] text-muted mt-0.5">{token}</div>
      </div>
    </div>
  )
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <AnimateIn className="mb-7">
      <span className="eyebrow block mb-2">{eyebrow}</span>
      <h2 className="h2">{title}</h2>
      {description && <p className="lead mt-2 max-w-[64ch]">{description}</p>}
    </AnimateIn>
  )
}

function Canvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg-2 border border-border rounded-lg p-7">
      {children}
    </div>
  )
}

const DEMO_CARDS = [
  { name: "Charizard ex", set: "151", num: "199/165", price: 412.50, listings: 41, delta: 6.2, hue: 8, chip: "Special" },
  { name: "Pikachu", set: "151", num: "173/165", price: 134.00, listings: 28, delta: 11.4, hue: 48, chip: "Illustration" },
  { name: "Miraidon ex", set: "Paldea Evolved", num: "253/193", price: 64.25, listings: 52, delta: -3.8, hue: 280, chip: "Special" },
]

const DEMO_TABLE = [
  { store: "TCGplayer", price: 458.00, over: "+$45.50", market: true },
  { store: "CardMarket", price: 441.00, over: "+$28.50", market: false },
  { store: "eBay (avg)", price: 472.00, over: "+$59.50", market: true },
]

const DEMO_INBOX = [
  { id: 1, title: "Charizard ex", subtitle: "Obsidian Flames · Seller: PokeVault", status: "✅ Collected", statusColor: "success" as const, price: 89.99, date: "Jun 18", hue: 22 },
  { id: 2, title: "Umbreon VMAX", subtitle: "Evolving Skies · Seller: CardDen", status: "📍 At store · Ready", statusColor: "accent" as const, price: 44.50, date: "Jun 20", hue: 260 },
  { id: 3, title: "Pikachu V", subtitle: "Vivid Voltage · Seller: MintCards", status: "✓ Confirmed", statusColor: "info" as const, price: 12.00, date: "Jun 22", hue: 48 },
]

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [segmentValue, setSegmentValue] = useState("buyer")
  const [chips, setChips] = useState<string[]>(["all"])
  const [closableOpen, setClosableOpen] = useState(true)
  const [searchValue, setSearchValue] = useState("")

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    document.documentElement.dataset.theme = next
  }

  const toggleChip = (id: string) => {
    setChips((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 flex items-center justify-between px-7 h-16 border-b border-border bg-bg/80 backdrop-blur-xl saturate-150">
        <div className="flex items-center gap-2.5 font-heading font-bold text-xl tracking-tight text-text">
          <img src="/assets/deckcenter-mark.svg" alt="Deckcenter" className="h-7 w-auto" />
          <span className="hidden sm:inline">Deckcenter</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleTheme}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-strong bg-surface text-text font-heading font-semibold text-xs cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
            {theme === "light" ? "Dark" : "Light"}
          </motion.button>
        </div>
      </nav>

      <main className="max-w-[1100px] mx-auto px-6 md:px-12 pb-32">
        {/* Hero */}
        <section className="pt-16 pb-10">
          <AnimateIn>
            <div className="relative overflow-hidden rounded-2xl p-12 md:p-14 mb-10 bg-navy-surface">
              <div className="absolute inset-0 opacity-80"
                style={{
                  background: "radial-gradient(600px 360px at 88% 120%, color-mix(in oklch, var(--magenta) 55%, transparent), transparent 60%), radial-gradient(520px 320px at 6% -20%, color-mix(in oklch, var(--purple) 50%, transparent), transparent 60%)",
                }}
              />
              <div className="relative z-[2] max-w-[640px]">
                <img src="/assets/deckcenter-logo-light.svg" alt="Deckcenter" className="h-14 w-auto mb-5" />
                <h1 className="text-white mb-3.5">Sleeve</h1>
                <p className="text-on-navy/75 text-base leading-relaxed mb-6 max-w-[52ch]">
                  A complete, themeable foundation for the Pokémon TCG marketplace. Every surface, token, component, and pattern — light and dark.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { color: "#de0e7f", label: "Magenta" },
                    { color: "#8a2bb8", label: "Purple" },
                    { color: "#121427", label: "Navy", outline: true },
                  ].map((chip) => (
                    <span key={chip.label} className="inline-flex items-center gap-2 bg-white/10 border border-white/[0.16] rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-white">
                      <span className="w-2.5 h-2.5 rounded-[3px] block" style={{ background: chip.color, outline: chip.outline ? "1px solid rgba(255,255,255,.3)" : undefined }} />
                      {chip.label}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-2 bg-white/10 border border-white/[0.16] rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-white">
                    Saira · Geist
                  </span>
                </div>
              </div>
            </div>
          </AnimateIn>
        </section>

        {/* Color */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Foundations"
            title="Color"
            description="Semantic tokens resolve per-theme — flip data-theme and everything follows."
          />
          <AnimateIn delay={0.1}>
            <h3 className="h3 text-[15.5px] mb-3.5">Brand</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
              <Swatch name="Magenta" token="#de0e7f" style={{ background: "#de0e7f" }} />
              <Swatch name="Purple" token="#8a2bb8" style={{ background: "#8a2bb8" }} />
              <Swatch name="Navy" token="#121427" style={{ background: "#121427" }} />
              <Swatch name="Lavender" token="#e8edf9" style={{ background: "#e8edf9", borderBottom: "1px solid var(--border)" }} />
            </div>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <h3 className="h3 text-[15.5px] mb-3.5">Surfaces <span className="font-medium text-faint text-xs ml-1">— theme-reactive</span></h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              <Swatch name="Background" token="--bg" style={{ background: "var(--bg)" }} />
              <Swatch name="Background 2" token="--bg-2" style={{ background: "var(--bg-2)" }} />
              <Swatch name="Surface" token="--surface" style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--border)" }} />
              <Swatch name="Surface 2" token="--surface-2" style={{ background: "var(--surface-2)" }} />
              <Swatch name="Navy surface" token="--navy-surface" style={{ background: "var(--navy-surface)" }} />
            </div>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <h3 className="h3 text-[15.5px] mb-3.5">Status &amp; signal</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Swatch name="Success / Up" token="#1fad66" style={{ background: "#1fad66" }} />
              <Swatch name="Down / Alert" token="#e0466b" style={{ background: "#e0466b" }} />
              <Swatch name="Amber / Pending" token="#f0a030" style={{ background: "#f0a030" }} />
              <Swatch name="Blue / Confirmed" token="#2a6fdb" style={{ background: "#2a6fdb" }} />
            </div>
          </AnimateIn>
        </section>

        {/* Typography */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Foundations"
            title="Typography"
            description="Saira ExtraBold carries headings with tight tracking. Geist handles body copy and inputs."
          />
          <AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-surface border border-border rounded-lg p-6 shadow">
                <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-faint">Display / Headings</div>
                <div className="font-heading font-extrabold text-[56px] leading-none tracking-[-0.03em] my-2.5">Aa</div>
                <div className="font-heading font-bold text-base text-text">Saira 800</div>
                <div className="text-muted text-xs mt-1">400 · 500 · 600 · 700 · 800</div>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6 shadow">
                <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-faint">Body / Inputs</div>
                <div className="font-sans font-medium text-[56px] leading-none tracking-[-0.01em] my-2.5">Aa</div>
                <div className="font-heading font-bold text-base text-text">Geist</div>
                <div className="text-muted text-xs mt-1">400 · 500 · 600 · 700</div>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              {[
                { label: "Display", spec: "Saira 800 · clamp→96 / -.035em", size: "46px", tracking: "-0.035em" },
                { label: "Heading 1", spec: "Saira 800 · clamp→44", size: "36px", tracking: "-0.02em" },
                { label: "Heading 2", spec: "Saira 700 · 26–30", size: "26px", tracking: "-0.02em" },
                { label: "Heading 3 · card titles", spec: "Saira 700 · 15–19", size: "18px" },
                { label: "Lead paragraph", spec: "Geist 500 · 16–17", size: "16px", muted: true },
                { label: "Body — default UI text", spec: "Geist 400 · 14–15", size: "14.5px" },
                { label: "Small — meta, captions", spec: "Geist 400 · 12–13", size: "12.5px", muted: true },
                { label: "EYEBROW LABEL", spec: "Saira 500 · 11.5 · .14em caps", size: "11.5px", eyebrow: true },
              ].map((t, i) => (
                <div key={i} className="flex items-baseline justify-between gap-4 px-5 md:px-6 py-4 border-b border-border last:border-0">
                  <span
                    className="font-heading font-extrabold"
                    style={{
                      fontSize: t.size,
                      letterSpacing: t.tracking || (t.eyebrow ? "0.14em" : undefined),
                      textTransform: t.eyebrow ? "uppercase" : undefined,
                      color: t.eyebrow ? "var(--accent)" : t.muted ? "var(--muted)" : "var(--text)",
                    }}
                  >
                    {t.label}
                  </span>
                  <span className="font-mono text-[11px] text-faint whitespace-nowrap">{t.spec}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </section>

        {/* Spacing */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Foundations"
            title="Spacing &amp; Radius"
            description="Radius is driven by --radius (18px) and derived tokens."
          />
          <AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="font-heading font-bold text-sm mb-3.5 text-text">Spacing scale</div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { px: 8, label: "inline gaps, chip padding" },
                    { px: 12, label: "card inner padding" },
                    { px: 16, label: "section gutters" },
                    { px: 24, label: "card padding" },
                    { px: 48, label: "section side padding" },
                    { px: 96, label: "section vertical rhythm" },
                  ].map((s) => (
                    <div key={s.px} className="flex items-center gap-3">
                      <div className="h-3 bg-accent rounded-sm flex-shrink-0" style={{ width: s.px / 2 }} />
                      <code className="text-xs w-8 text-text">{s.px}</code>
                      <span className="text-xs text-faint">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="font-heading font-bold text-sm mb-3.5 text-text">Radius scale</div>
                <div className="flex flex-col gap-3.5">
                  {[
                    { label: "rounded-sm", radius: "10px" },
                    { label: "rounded-md", radius: "14px" },
                    { label: "rounded-lg", radius: "18px" },
                    { label: "rounded-xl", radius: "26px" },
                    { label: "rounded-2xl", radius: "32px" },
                    { label: "rounded-full", radius: "9999px" },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center gap-3">
                      <div
                        className="w-14 h-8 border-[1.5px] border-accent"
                        style={{ borderRadius: r.radius, background: "var(--accent-soft)" }}
                      />
                      <code className="text-xs text-text">{r.label} · {r.radius}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        </section>

        {/* Buttons */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Buttons"
            description="Three intent levels — primary, ghost, quiet — in multiple sizes. Hover with Framer Motion lift. Loading state built-in."
          />
          <AnimateIn>
            <Canvas>
              <h3 className="h3 text-[15.5px] mt-0 mb-4">Variants</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                <Button variant="primary">Primary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="quiet">Quiet</Button>
                <Button variant="dark">Dark</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>

              <h3 className="h3 text-[15.5px] mb-4">Sizes</h3>
              <div className="flex flex-wrap items-end gap-3 mb-6">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </div>

              <h3 className="h3 text-[15.5px] mb-4">Loading states</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                <Button loading>Loading</Button>
                <Button variant="ghost" loading>Loading</Button>
                <Button variant="primary" loading={loadingBtn} onClick={() => { setLoadingBtn(true); setTimeout(() => setLoadingBtn(false), 2000) }}>
                  {loadingBtn ? "Saving…" : "Click to load"}
                </Button>
              </div>

              <h3 className="h3 text-[15.5px] mb-4">States</h3>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button variant="ghost" disabled>Disabled Ghost</Button>
              </div>
            </Canvas>
          </AnimateIn>
        </section>

        {/* Badges */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Badges &amp; Chips"
            description="Badges communicate grade and rarity. Status chips communicate order lifecycle."
          />
          <AnimateIn>
            <Canvas>
              <h3 className="h3 text-[15.5px] mt-0 mb-4">Variants</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge>Default</Badge>
                <Badge variant="grade">PSA 10</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="accentGhost">Accent Ghost</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="successGhost">Success Ghost</Badge>
                <Badge variant="warningGhost">Warning Ghost</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="destructiveGhost">Destructive Ghost</Badge>
                <Badge variant="brandGhost">Brand Ghost</Badge>
              </div>

              <h3 className="h3 text-[15.5px] mb-4">Pill shape</h3>
              <div className="flex flex-wrap gap-2">
                <Badge shape="pill">Default</Badge>
                <Badge variant="accent" shape="pill">Accent</Badge>
                <Badge variant="success" shape="pill">Success</Badge>
                <Badge variant="info" shape="pill">Info</Badge>
                <Badge variant="grade" shape="pill">PSA 10</Badge>
              </div>
            </Canvas>
          </AnimateIn>
        </section>

        {/* Cards */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Product Cards"
            description="The core marketplace surface. Each card pairs a hue-tinted art placeholder with a heading-font title, monospace meta and a magenta price. Hover uses Framer Motion."
          />
          <AnimateIn>
            <Canvas>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {DEMO_CARDS.map((card) => (
                  <Card key={card.name} {...card} />
                ))}
              </div>
            </Canvas>
          </AnimateIn>
        </section>

        {/* Panels */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Panels"
            description="Surface containers with hoverable states and Framer Motion transitions."
          />
          <AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Panel hoverable className="p-6">
                <div className="font-heading font-bold text-text mb-2">Hoverable Panel</div>
                <p className="text-muted">Hover to see lift and shadow transition with Framer Motion.</p>
              </Panel>
              <Panel className="p-6">
                <div className="font-heading font-bold text-text mb-2">Static Panel</div>
                <p className="text-muted">No hover interaction — just a clean surface container.</p>
              </Panel>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.1} className="mt-6">
            <Canvas>
              <div className="flex items-center justify-between mb-4">
                <h3 className="h3 text-[15.5px] m-0">Closable Panel with AnimatePresence</h3>
                <Button size="sm" variant="ghost" onClick={() => setClosableOpen(!closableOpen)}>
                  {closableOpen ? "Close" : "Open"}
                </Button>
              </div>
              <ClosablePanel
                isOpen={closableOpen}
                onClose={() => setClosableOpen(false)}
                className="relative bg-surface border border-border rounded-lg p-6"
              >
                <div className="font-heading font-bold text-text mb-2">Animated Close</div>
                <p className="text-muted">This panel uses AnimatePresence for smooth enter/exit animations. Click the ✕ or the Close button to dismiss.</p>
              </ClosablePanel>
            </Canvas>
          </AnimateIn>
        </section>

        {/* Tables */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Tables"
            description="Dense tabular data with interactive rows and Framer Motion hover states."
          />
          <AnimateIn>
            <Canvas>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Diff</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DEMO_TABLE.map((row, i) => (
                    <TableRow key={i} interactive>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {row.market && (
                            <Badge variant="default" shape="pill" className="!text-[9px] !px-1.5 !py-0.5">Mkt avg</Badge>
                          )}
                          <span className="font-medium text-text">{row.store}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-heading font-bold text-text">
                        ${row.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-faint">{row.over}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Canvas>
          </AnimateIn>
        </section>

        {/* Inbox Rows */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Inbox Rows"
            description="Dense list pattern used in Purchases and Selling tabs. Framer Motion hover states."
          />
          <AnimateIn>
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              {DEMO_INBOX.map((item) => (
                <InboxRow
                  key={item.id}
                  image={
                    <div
                      className="w-8 h-11 rounded-md flex-shrink-0"
                      style={{
                        background: `linear-gradient(160deg, color-mix(in oklch, hsl(${item.hue} 70% 55%) 90%, white) 0%, hsl(${item.hue} 72% 42%) 55%, color-mix(in oklch, hsl(${item.hue} 70% 40%) 80%, #121427) 100%)`,
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,.18)",
                      }}
                    />
                  }
                  title={item.title}
                  subtitle={item.subtitle}
                  status={item.status}
                  statusColor={item.statusColor}
                  price={item.price}
                  date={item.date}
                />
              ))}
            </div>
          </AnimateIn>
        </section>

        {/* Stat Tiles */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Stat Tiles"
            description="Key metric surfaces with appear animations and hover lift."
          />
          <AnimateIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <StatTile label="Active listings" value="142" delta={12} />
              <StatTile label="Total sales" value="$8,420" delta={8.4} />
              <StatTile label="Cards purchased" value="34" delta={-2.1} />
              <StatTile label="Avg. rating" value="4.8" />
            </div>
          </AnimateIn>
        </section>

        {/* Chips & Filters */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Chips &amp; Filters"
            description="Toggleable filter chips with Framer Motion scale on interaction."
          />
          <AnimateIn>
            <Canvas>
              <div className="flex flex-wrap gap-2">
                {["all", "special", "ultra", "illustration", "hyper", "secret"].map((id) => (
                  <Chip
                    key={id}
                    active={chips.includes(id)}
                    onClick={() => toggleChip(id)}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </Chip>
                ))}
              </div>
            </Canvas>
          </AnimateIn>
        </section>

        {/* Segmented Control */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Segmented Control"
            description="Role switcher with animated sliding pill using Framer Motion layoutId."
          />
          <AnimateIn>
            <Canvas>
              <div className="flex items-center gap-4 flex-wrap">
                <SegmentedControl
                  options={[
                    { label: "Buyer", value: "buyer" },
                    { label: "Seller", value: "seller" },
                  ]}
                  value={segmentValue}
                  onChange={setSegmentValue}
                />
                <span className="text-sm text-muted">
                  Current role: <span className="font-heading font-bold text-text">{segmentValue}</span>
                </span>
              </div>
            </Canvas>
          </AnimateIn>
        </section>

        {/* Inputs */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Forms &amp; Search"
            description="Inputs with focus states handled at the container level. Search icon support."
          />
          <AnimateIn>
            <Canvas>
              <div className="flex flex-col gap-5 max-w-[560px]">
                <div>
                  <label className="text-[10.5px] font-bold tracking-[0.08em] uppercase text-faint mb-2 block">
                    Search
                  </label>
                  <Input
                    icon={<Search size={18} />}
                    placeholder="Search Charizard ex, sets, sealed product…"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10.5px] font-bold tracking-[0.08em] uppercase text-faint mb-2 block">
                      Small
                    </label>
                    <Input inputSize="sm" placeholder="Small input" />
                  </div>
                  <div>
                    <label className="text-[10.5px] font-bold tracking-[0.08em] uppercase text-faint mb-2 block">
                      Large
                    </label>
                    <Input inputSize="lg" placeholder="Large input" />
                  </div>
                </div>
              </div>
            </Canvas>
          </AnimateIn>
        </section>

        {/* Status System */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Status System"
            description="Purchase lifecycle (buyer view) with animated step transitions."
          />
          <AnimateIn>
            <Canvas>
              <div className="flex flex-wrap items-center gap-0">
                {[
                  { label: "⏳ Pending", color: "#f0a030", text: "#b07018" },
                  { label: "✓ Confirmed", color: "#2a6fdb", text: "#2a6fdb" },
                  { label: "📍 At store · Ready", color: "#8a2bb8", text: "#8a2bb8" },
                  { label: "✅ Collected", color: "#1fad66", text: "#1fad66" },
                ].map((s, i, arr) => (
                  <div key={s.label} className="flex items-center">
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2.5 rounded-[10px]"
                      style={{ background: `${s.color}1f` }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="w-2 h-2 rounded-full block" style={{ background: s.color }} />
                      <span className="font-heading font-bold text-[13px]" style={{ color: s.text }}>{s.label}</span>
                    </motion.div>
                    {i < arr.length - 1 && (
                      <motion.div
                        className="w-6 h-0.5 bg-border-strong"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Canvas>
          </AnimateIn>
        </section>

        {/* Motion Gallery */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Motion"
            title="Animation Showcase"
            description="Framer Motion interactions — hover, appear, stagger, and close."
          />
          <AnimateIn>
            <Canvas>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="h-24 rounded-lg bg-surface-2 border border-border flex items-center justify-center font-heading font-bold text-text"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.05, backgroundColor: "var(--accent-soft)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Hover me
                  </motion.div>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="h3 text-[15.5px] mb-3">Staggered list entrance</h3>
                <div className="flex flex-col gap-2">
                  <AnimatePresence>
                    {[1, 2, 3, 4, 5].map((n, i) => (
                      <motion.div
                        key={n}
                        className="h-10 rounded-md bg-surface border border-border flex items-center px-4 text-sm text-text"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        Item {n}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </Canvas>
          </AnimateIn>
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-10 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <img src="/assets/deckcenter-logo.svg" alt="Deckcenter" className="h-8 w-auto opacity-60" />
          </div>
          <p className="text-xs text-faint font-semibold">
            Deckcenter Sleeve · v2.0 · 2026 · DC Design
          </p>
        </footer>
      </main>
    </div>
  )
}
