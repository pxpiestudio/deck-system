import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function Swatch({
  name,
  token,
  style,
}: {
  name: string
  token: string
  style?: React.CSSProperties
}) {
  return (
    <div className="rounded-[var(--radius-xl)] overflow-hidden bg-[hsl(var(--object))] border border-[hsl(var(--muted))]">
      <div className="h-20 w-full" style={style} />
      <div className="p-3">
        <div className="font-bold text-[13px]">{name}</div>
        <div className="font-mono text-[11px] text-[hsl(var(--loud))] mt-0.5">{token}</div>
      </div>
    </div>
  )
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-7">
      <span className="eyebrow text-[hsl(var(--app-accent))] block mb-2">{eyebrow}</span>
      <h2 className="h2">{title}</h2>
      {description && <p className="lead mt-2 max-w-[64ch]">{description}</p>}
    </div>
  )
}

function Canvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[hsl(var(--foreground)/0.5)] border border-[hsl(var(--muted))] rounded-[var(--radius-xl)] p-7">
      {children}
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    document.documentElement.dataset.theme = next
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--object))] text-[hsl(var(--body))]">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 flex items-center justify-between px-7 h-16 border-b border-[hsl(var(--muted))] bg-[hsl(var(--object)/0.85)] backdrop-blur-[12px] saturate-[180%]">
        <div className="flex items-center gap-2.5 font-heading font-bold text-xl text-[hsl(var(--bold))] tracking-tight">
          <span className="w-7 h-7 rounded-lg bg-[hsl(var(--app-accent))] text-white flex items-center justify-center font-heading font-bold text-sm">
            D
          </span>
          Deckcenter
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[hsl(var(--muted))] bg-[hsl(var(--foreground))] text-[hsl(var(--body))] font-heading font-semibold text-xs cursor-pointer"
          >
            {theme === "light" ? "☽ Dark" : "☀ Light"}
          </button>
        </div>
      </nav>

      <main className="max-w-[1040px] mx-auto px-6 md:px-12 pb-32">
        {/* Hero */}
        <section className="pt-16 pb-10">
          <div className="relative overflow-hidden rounded-[calc(var(--radius-xl)*1.2)] p-12 md:p-14 mb-10"
            style={{ background: "hsl(var(--brand))" }}>
            <div className="relative z-[2] max-w-[640px]">
              <h1 className="text-white text-[clamp(28px,3.5vw,44px)] leading-[1.05] mb-3.5">
                Deckcenter Design System
              </h1>
              <p className="text-white/75 text-base leading-relaxed mb-6 max-w-[52ch]">
                A complete, themeable foundation for the Pokémon TCG marketplace. Every surface, token, component, and pattern — light and dark.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/[0.16] rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-white">
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-[#de0e7f] block" />
                  Magenta
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/[0.16] rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-white">
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-[#8a2bb8] block" />
                  Purple
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/[0.16] rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-white">
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-[#121427] block outline outline-1 outline-white/30" />
                  Navy
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/[0.16] rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-white">
                  Geist · Qanelas
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Color */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Foundations"
            title="Color"
            description="Semantic tokens resolve per-theme — flip data-theme and everything follows."
          />
          <h3 className="h3 text-[15.5px] mb-3.5">Brand</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
            <Swatch name="Magenta" token="#de0e7f" style={{ background: "#de0e7f" }} />
            <Swatch name="Purple" token="#8a2bb8" style={{ background: "#8a2bb8" }} />
            <Swatch name="Navy" token="#121427" style={{ background: "#121427" }} />
            <Swatch name="Lavender" token="#e8edf9" style={{ background: "#e8edf9", borderBottom: "1px solid hsl(var(--muted))" }} />
          </div>

          <h3 className="h3 text-[15.5px] mb-3.5">Surfaces <span className="font-medium text-[hsl(var(--loud))] text-xs ml-1">— theme-reactive</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            <Swatch name="Background" token="--background" style={{ background: "hsl(var(--background))" }} />
            <Swatch name="Foreground" token="--foreground" style={{ background: "hsl(var(--foreground))" }} />
            <Swatch name="Object" token="--object" style={{ background: "hsl(var(--object))", boxShadow: "inset 0 0 0 1px hsl(var(--muted))" }} />
            <Swatch name="Neutral" token="--neutral" style={{ background: "hsl(var(--neutral))" }} />
            <Swatch name="Muted" token="--muted" style={{ background: "hsl(var(--muted))" }} />
          </div>

          <h3 className="h3 text-[15.5px] mb-3.5">Status &amp; signal</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Swatch name="Success / Up" token="#1fad66" style={{ background: "#1fad66" }} />
            <Swatch name="Down / Alert" token="#e0466b" style={{ background: "#e0466b" }} />
            <Swatch name="Amber / Pending" token="#f0a030" style={{ background: "#f0a030" }} />
            <Swatch name="Blue / Confirmed" token="#2a6fdb" style={{ background: "#2a6fdb" }} />
          </div>
        </section>

        {/* Typography */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Foundations"
            title="Typography"
            description="Qanelas carries headings with tight tracking. Geist handles body copy and inputs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-[hsl(var(--object))] border border-[hsl(var(--muted))] rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow)]">
              <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-[hsl(var(--loud))]">Display / Headings</div>
              <div className="font-heading font-bold text-[56px] leading-none tracking-[-0.03em] my-2.5">Aa</div>
              <div className="font-heading font-bold text-base">Qanelas</div>
              <div className="text-[hsl(var(--loud))] text-xs mt-1">400 · 500 · 600 · 700</div>
            </div>
            <div className="bg-[hsl(var(--object))] border border-[hsl(var(--muted))] rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow)]">
              <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-[hsl(var(--loud))]">Body / Inputs</div>
              <div className="font-sans font-medium text-[56px] leading-none tracking-[-0.01em] my-2.5">Aa</div>
              <div className="font-heading font-bold text-base">Geist</div>
              <div className="text-[hsl(var(--loud))] text-xs mt-1">400 · 500 · 600 · 700</div>
            </div>
          </div>

          <div className="bg-[hsl(var(--object))] border border-[hsl(var(--muted))] rounded-[var(--radius-xl)] overflow-hidden">
            {[
              { label: "Display", spec: "Qanelas 700 · clamp→96 / -.035em", size: "46px", tracking: "-0.035em" },
              { label: "Heading 1", spec: "Qanelas 700 · clamp→44", size: "36px", tracking: "-0.02em" },
              { label: "Heading 2", spec: "Qanelas 700 · 26–30", size: "26px", tracking: "-0.02em" },
              { label: "Heading 3 · card titles", spec: "Qanelas 700 · 15–19", size: "18px" },
              { label: "Lead paragraph", spec: "Geist 400 · 16–17", size: "16px", muted: true },
              { label: "Body — default UI text", spec: "Geist 400 · 14–15", size: "14.5px" },
              { label: "Small — meta, captions", spec: "Geist 500 · 12–13", size: "12.5px", muted: true },
              { label: "EYEBROW LABEL", spec: "Saira 700 · 11 · .14em caps", size: "11px", eyebrow: true },
            ].map((t, i) => (
              <div key={i} className="flex items-baseline justify-between gap-4 px-5 md:px-6 py-4 border-b border-[hsl(var(--muted))] last:border-0">
                <span
                  className="font-heading font-bold"
                  style={{
                    fontSize: t.size,
                    letterSpacing: t.tracking || (t.eyebrow ? "0.14em" : undefined),
                    textTransform: t.eyebrow ? "uppercase" : undefined,
                    color: t.eyebrow ? "hsl(var(--app-accent))" : t.muted ? "hsl(var(--loud))" : "hsl(var(--bold))",
                  }}
                >
                  {t.label}
                </span>
                <span className="font-mono text-[11px] text-[hsl(var(--loud))] whitespace-nowrap">{t.spec}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Foundations"
            title="Spacing &amp; Radius"
            description="Radius is driven by --radius (default 18px) and derived tokens."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[hsl(var(--object))] border border-[hsl(var(--muted))] rounded-[var(--radius-xl)] p-6">
              <div className="font-bold text-sm mb-3.5">Spacing scale</div>
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
                    <div className="h-3 bg-[hsl(var(--app-accent))] rounded-sm flex-shrink-0" style={{ width: s.px / 2 }} />
                    <code className="text-xs w-8">{s.px}</code>
                    <span className="text-xs text-[hsl(var(--loud))]">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[hsl(var(--object))] border border-[hsl(var(--muted))] rounded-[var(--radius-xl)] p-6">
              <div className="font-bold text-sm mb-3.5">Radius scale</div>
              <div className="flex flex-col gap-3.5">
                {[
                  { label: "--radius-sm", radius: "5px" },
                  { label: "--radius-lg", radius: "12px" },
                  { label: "--radius-xl", radius: "16px" },
                  { label: "--radius-2xl", radius: "24px" },
                  { label: "--radius-full", radius: "9999px" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-3">
                    <div
                      className="w-14 h-8 border-[1.5px] border-[hsl(var(--app-accent))]"
                      style={{ borderRadius: r.radius, background: "hsl(var(--app-accent)/0.1)" }}
                    />
                    <code className="text-xs">{r.label} · {r.radius}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Buttons"
            description="Three intent levels — primary, ghost, quiet — in multiple sizes. The primary button is the single accent CTA."
          />
          <Canvas>
            <h3 className="h3 text-[15.5px] mt-0 mb-4">Variants</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              <Button variant="primary">Primary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="success">Success</Button>
              <Button variant="dark">Dark</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>

            <h3 className="h3 text-[15.5px] mb-4">Sizes</h3>
            <div className="flex flex-wrap items-end gap-3 mb-6">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>

            <h3 className="h3 text-[15.5px] mb-4">States</h3>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </div>
          </Canvas>
        </section>

        {/* Badges */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Badges &amp; Chips"
            description="Badges communicate grade and rarity. Status chips communicate order lifecycle."
          />
          <Canvas>
            <h3 className="h3 text-[15.5px] mt-0 mb-4">Variants</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge>Neutral</Badge>
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
              <Badge shape="pill">Neutral</Badge>
              <Badge variant="accent" shape="pill">Accent</Badge>
              <Badge variant="success" shape="pill">Success</Badge>
              <Badge variant="info" shape="pill">Info</Badge>
            </div>
          </Canvas>
        </section>

        {/* Status System */}
        <section className="pt-16">
          <SectionTitle
            eyebrow="Components"
            title="Status System"
            description="Purchase lifecycle (buyer view) and Fulfillment lifecycle (seller view)."
          />
          <Canvas>
            <div className="flex flex-wrap items-center gap-0">
              {[
                { label: "⏳ Pending", color: "#f0a030", text: "#b07018" },
                { label: "✓ Confirmed", color: "#2a6fdb", text: "#2a6fdb" },
                { label: "📍 At store · Ready", color: "#8a2bb8", text: "#8a2bb8" },
                { label: "✅ Collected", color: "#1fad66", text: "#1fad66" },
              ].map((s, i, arr) => (
                <div key={s.label} className="flex items-center">
                  <div
                    className="flex items-center gap-2 px-4 py-2.5 rounded-[10px]"
                    style={{ background: `${s.color}1f` }}
                  >
                    <span className="w-2 h-2 rounded-full block" style={{ background: s.color }} />
                    <span className="font-heading font-bold text-[13px]" style={{ color: s.text }}>{s.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-6 h-0.5 bg-[hsl(var(--muted))]" />
                  )}
                </div>
              ))}
            </div>
          </Canvas>
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-10 border-t border-[hsl(var(--muted))]">
          <p className="text-xs text-[hsl(var(--loud))] font-semibold">
            Deckcenter Design System · v2.0 · 2026 · DC Design
          </p>
        </footer>
      </main>
    </div>
  )
}
