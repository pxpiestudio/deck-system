import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Panel } from "@/components/ui/panel"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { InboxRow } from "@/components/ui/inbox-row"
import { StatTile } from "@/components/ui/stat-tile"
import { Chip } from "@/components/ui/chip"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Input } from "@/components/ui/input"
import { Nav } from "@/components/ui/nav"
import { ProductCard } from "@/components/ui/product-card"
import { SearchBar } from "@/components/ui/search-bar"
import { Skeleton, SkeletonGrid } from "@/components/ui/skeleton"
import { Hero } from "@/components/ui/hero"
import { Footer } from "@/components/ui/footer"
import { AnimateIn, ClosablePanel } from "@/components/motion"
import { Search, Globe, Mail, MessageCircle } from "lucide-react"

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

const DEMO_SEARCH_RESULTS = [
  { id: "1", name: "Charizard ex", set: "Obsidian Flames", num: "125/197", price: 89.99, hue: 22 },
  { id: "2", name: "Umbreon VMAX", set: "Evolving Skies", num: "215/203", price: 44.50, hue: 260 },
  { id: "3", name: "Pikachu V", set: "Vivid Voltage", num: "043/185", price: 12.00, hue: 48 },
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

const FOOTER_COLUMNS = [
  {
    title: "Marketplace",
    links: [
      { label: "Browse cards" },
      { label: "Browse sets" },
      { label: "Price guide" },
      { label: "Sealed product" },
    ],
  },
  {
    title: "Sell",
    links: [
      { label: "List a card" },
      { label: "Seller portal" },
      { label: "How it works" },
      { label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About" },
      { label: "Blog" },
      { label: "Careers" },
      { label: "Contact" },
    ],
  },
]

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [segmentValue, setSegmentValue] = useState("buyer")
  const [chips, setChips] = useState<string[]>(["all"])
  const [closableOpen, setClosableOpen] = useState(true)
  const [searchValue, setSearchValue] = useState("")
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof DEMO_SEARCH_RESULTS | undefined>(undefined)

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

  const handleSearch = (query: string) => {
    setSearchValue(query)
    if (query.length > 0) {
      setSearchLoading(true)
      setTimeout(() => {
        setSearchResults(
          DEMO_SEARCH_RESULTS.filter((r) =>
            r.name.toLowerCase().includes(query.toLowerCase())
          )
        )
        setSearchLoading(false)
      }, 600)
    } else {
      setSearchResults(undefined)
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Nav */}
      <Nav
        links={[
          { label: "Browse", active: true },
          { label: "Sets" },
          { label: "Price guide" },
          { label: "Sell" },
        ]}
        user={{ name: "Ash Ketchum", initials: "AK" }}
        cartCount={6}
        onThemeToggle={toggleTheme}
        theme={theme}
      />

      {/* Hero */}
      <Hero
        variant="clean"
        badge={{ dot: true, text: "Live marketplace" }}
        title={<>The best place to buy & sell <span className="text-accent">Pokémon cards</span></>}
        subtitle="Connect directly with local sellers. No shipping, no hassle — just walk in and collect your cards."
        stats={[
          { value: "12k+", label: "Active listings" },
          { value: "3.2k", label: "Trainers" },
          { value: "$840k", label: "Cards sold" },
        ]}
      >
        <Button>Start browsing</Button>
        <Button variant="ghost">How it works</Button>
      </Hero>

      <main className="max-w-[1100px] mx-auto px-6 md:px-12 pb-32">
        {/* Search Bar */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Search"
            description="Main search with autocomplete dropdown, loading shimmer, and keyboard-navigable results."
          />
          <AnimateIn>
            <Canvas>
              <SearchBar
                placeholder="Search Charizard ex, sets, sealed product…"
                results={searchResults}
                loading={searchLoading}
                onSearch={handleSearch}
              />
            </Canvas>
          </AnimateIn>
        </section>

        {/* Product Cards with 3D Tilt */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Product Cards"
            description="The core marketplace surface with 3D perspective tilt on hover. Move your mouse over the cards."
          />
          <AnimateIn>
            <Canvas>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {DEMO_CARDS.map((card) => (
                  <ProductCard key={card.name} {...card} />
                ))}
              </div>
            </Canvas>
          </AnimateIn>
        </section>

        {/* Skeleton */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Skeleton"
            description="Loading shimmer placeholders for cards, rows, and grids."
          />
          <AnimateIn>
            <Canvas>
              <h3 className="h3 text-[15.5px] mb-4">Card skeletons</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
                <Skeleton variant="card" />
                <Skeleton variant="card" />
                <Skeleton variant="card" />
              </div>

              <h3 className="h3 text-[15.5px] mb-4">Row skeletons</h3>
              <div className="flex flex-col gap-2 mb-8">
                <Skeleton variant="row" count={4} />
              </div>

              <h3 className="h3 text-[15.5px] mb-4">Grid skeleton</h3>
              <SkeletonGrid columns={4} rows={1} />
            </Canvas>
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
      </main>

      {/* Footer */}
      <Footer
        columns={FOOTER_COLUMNS}
        socials={[
          { icon: <Globe size={16} />, label: "Website" },
          { icon: <Mail size={16} />, label: "Email" },
          { icon: <MessageCircle size={16} />, label: "Discord" },
        ]}
      />
    </div>
  )
}
