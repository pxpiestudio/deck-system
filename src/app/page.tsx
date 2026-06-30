"use client";

import * as React from "react";

import "@/components/design-system/design-system.css";
import { Sidebar } from "@/components/design-system/sidebar";
import { Button } from "@/components/ui/button";
import { Icon, ICON_PATHS, type IconName } from "@/components/dc/icon";
import { CardArt } from "@/components/dc/card-art";
import { GradeBadge, RarityChip, StatusBadge } from "@/components/dc/badges";
import { ProductCard } from "@/components/dc/product-card";
import { PriceComparison } from "@/components/dc/price-comparison";
import { InboxRow } from "@/components/dc/inbox-row";
import { Navbar } from "@/components/dc/navbar";
import { SearchBar } from "@/components/dc/search-bar";
import { QtyControl } from "@/components/dc/qty-control";
import { LangToggle } from "@/components/dc/lang-toggle";
import { Input } from "@/components/ui/input";

/* ── Small doc helpers ─────────────────────────────────────────────────── */
function Code({ children }: { children: React.ReactNode }) {
  return <code className="ds-code">{children}</code>;
}

function Swatch({
  block,
  name,
  token,
  use,
  small,
  blockStyle,
}: {
  block: string;
  name: string;
  token: string;
  use?: string;
  small?: boolean;
  blockStyle?: React.CSSProperties;
}) {
  return (
    <div className="swatch">
      <div className="swatch-block" style={{ background: block, ...blockStyle }} />
      <div className="swatch-body">
        <div className="swatch-name" style={small ? { fontSize: 12 } : undefined}>
          {name}
        </div>
        <div className="swatch-token">{token}</div>
        {use && <div className="swatch-use">{use}</div>}
      </div>
    </div>
  );
}

function TypeRow({ children, spec }: { children: React.ReactNode; spec: string }) {
  return (
    <div className="type-row">
      <span>{children}</span>
      <span className="type-spec">{spec}</span>
    </div>
  );
}

/* Status lifecycle step pill */
function Step({
  color,
  textColor,
  children,
}: {
  color: string;
  textColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 16px",
        borderRadius: 10,
        background: `color-mix(in oklch, ${color} 12%, transparent)`,
      }}
    >
      <span
        style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "block" }}
      />
      <span
        style={{
          fontFamily: "var(--font-head)",
          fontWeight: 700,
          fontSize: 13,
          color: textColor,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function Connector() {
  return <div style={{ width: 24, height: 2, background: "var(--border-strong)" }} />;
}

const HUES = [8, 48, 140, 200, 260, 300, 320];
const ICON_NAMES = Object.keys(ICON_PATHS) as IconName[];

export default function DesignSystemPage() {
  return (
    <div>
      <Sidebar />

      <main className="ds-main">
        <div className="ds-wrap">
          {/* ══════════════ BRAND ══════════════ */}
          <section className="ds-section" id="brand">
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "calc(var(--radius) * 1.4)",
                background: "var(--navy-surface)",
                padding: "52px 48px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(600px 360px at 88% 120%, color-mix(in oklch,var(--accent) 55%,transparent), transparent 60%), radial-gradient(520px 320px at 6% -20%,color-mix(in oklch,var(--purple) 50%,transparent),transparent 60%)",
                  opacity: 0.85,
                }}
              />
              <div style={{ position: "relative", zIndex: 2, maxWidth: 640 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/deckcenter-logo.svg"
                  alt="Deckcenter"
                  style={{ height: 72, width: "auto", marginBottom: 24 }}
                />
                <h1
                  style={{
                    fontSize: "clamp(28px,3.5vw,44px)",
                    color: "#fff",
                    lineHeight: 1.05,
                    margin: "0 0 14px",
                  }}
                >
                  Deckcenter Design System
                </h1>
                <p
                  style={{
                    color: "rgba(232,237,249,.75)",
                    fontSize: 16,
                    lineHeight: 1.6,
                    margin: "0 0 26px",
                    maxWidth: "52ch",
                  }}
                >
                  A complete, themeable foundation for the Pokémon TCG marketplace — now in
                  React, Tailwind and shadcn. Every surface, token, component, and pattern —
                  light and dark.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[
                    { label: "Magenta", dot: "#de0e7f" },
                    { label: "Purple", dot: "#8a2bb8" },
                    { label: "Navy", dot: "#121427", outline: true },
                  ].map((c) => (
                    <span
                      key={c.label}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "rgba(255,255,255,.1)",
                        border: "1px solid rgba(255,255,255,.16)",
                        borderRadius: "var(--radius-pill)",
                        padding: "7px 14px",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#fff",
                      }}
                    >
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 3,
                          background: c.dot,
                          outline: c.outline ? "1px solid rgba(255,255,255,.3)" : undefined,
                          display: "block",
                        }}
                      />
                      {c.label}
                    </span>
                  ))}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(255,255,255,.1)",
                      border: "1px solid rgba(255,255,255,.16)",
                      borderRadius: "var(--radius-pill)",
                      padding: "7px 14px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    Saira · Geist
                  </span>
                </div>
              </div>
            </div>

            <div className="ds-h3">Logo variants</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/deckcenter-logo.svg" alt="Deckcenter logo" style={{ height: 52 }} />
              </div>
              <div
                style={{
                  background: "#121427",
                  borderRadius: "var(--radius)",
                  padding: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/deckcenter-logo.svg" alt="Deckcenter logo light" style={{ height: 52 }} />
              </div>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/deckcenter-mark.svg" alt="Deckcenter mark" style={{ height: 52 }} />
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 14,
                fontSize: 12,
                color: "var(--faint)",
                fontWeight: 600,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              <div>Light mode wordmark</div>
              <div>Dark / navy wordmark</div>
              <div>Mark (icon only)</div>
            </div>
          </section>

          {/* ══════════════ COLOR ══════════════ */}
          <section className="ds-section" id="color">
            <span className="ds-eyebrow">Foundations</span>
            <h2 className="ds-h2">Color</h2>
            <p className="ds-lead">
              Four brand hues from the logo seed every surface. Semantic tokens resolve
              per-theme — flip the <Code>.dark</Code> class and everything follows.
            </p>

            <div className="ds-h3">Brand</div>
            <div className="swatch-grid">
              <Swatch block="#de0e7f" name="Magenta" token="--magenta · #de0e7f" use="Primary accent · CTAs" />
              <Swatch block="#8a2bb8" name="Purple" token="--purple · #8a2bb8" use="Grades · gradients" />
              <Swatch block="#121427" name="Navy" token="--navy · #121427" use="Ink · dark surfaces" />
              <Swatch
                block="#e8edf9"
                name="Lavender"
                token="--lavender · #e8edf9"
                use="On-navy text"
                blockStyle={{ borderBottom: "1px solid var(--border)" }}
              />
            </div>

            <div className="ds-h3">
              Surfaces{" "}
              <span style={{ fontWeight: 500, color: "var(--faint)", fontSize: 12.5 }}>
                — theme-reactive
              </span>
            </div>
            <div className="swatch-grid-5">
              <Swatch block="var(--bg)" name="Background" token="--bg" small />
              <Swatch block="var(--bg-2)" name="Background 2" token="--bg-2" small />
              <Swatch
                block="var(--surface)"
                name="Surface"
                token="--surface"
                small
                blockStyle={{ boxShadow: "inset 0 0 0 1px var(--border)" }}
              />
              <Swatch block="var(--surface-2)" name="Surface 2" token="--surface-2" small />
              <Swatch block="var(--navy-surface)" name="Navy surface" token="--navy-surface" small />
            </div>

            <div className="ds-h3">Status &amp; signal</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              <Swatch block="#1fad66" name="Success / Up" token="#1fad66" small />
              <Swatch block="#e0466b" name="Down / Alert" token="#e0466b" small />
              <Swatch block="#f0a030" name="Amber / Pending" token="#f0a030" small />
              <Swatch block="#2a6fdb" name="Blue / Confirmed" token="#2a6fdb" small />
            </div>
          </section>

          {/* ══════════════ TYPOGRAPHY ══════════════ */}
          <section className="ds-section" id="type">
            <span className="ds-eyebrow">Foundations</span>
            <h2 className="ds-h2">Typography</h2>
            <p className="ds-lead">
              <strong>Saira</strong> carries headings, labels and numerals with tight{" "}
              <Code>−0.02em</Code> tracking. <strong>Geist</strong> handles body copy and
              inputs.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {[
                { kicker: "Display / Headings", font: "var(--font-head)", weight: 700, ls: "-0.03em", name: "Saira", token: "--font-head" },
                { kicker: "Body / Inputs", font: "var(--font-body)", weight: 500, ls: "-0.01em", name: "Geist", token: "--font-body" },
              ].map((f) => (
                <div
                  key={f.name}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: 24,
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: "var(--faint)",
                    }}
                  >
                    {f.kicker}
                  </div>
                  <div
                    style={{
                      fontFamily: f.font,
                      fontWeight: f.weight,
                      fontSize: 56,
                      letterSpacing: f.ls,
                      lineHeight: 1,
                      margin: "10px 0",
                    }}
                  >
                    Aa
                  </div>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 16 }}>
                    {f.name}
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 4 }}>
                    400 · 500 · 600 · 700 — <Code>{f.token}</Code>
                  </div>
                </div>
              ))}
            </div>

            <div className="type-scale">
              <TypeRow spec="Saira 700 · clamp→96 / -.035em">
                <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 46, letterSpacing: "-0.035em", lineHeight: 1 }}>
                  Display
                </span>
              </TypeRow>
              <TypeRow spec="Saira 700 · clamp→44">
                <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 36, letterSpacing: "-0.02em", lineHeight: 1 }}>
                  Heading 1
                </span>
              </TypeRow>
              <TypeRow spec="Saira 700 · 26–30">
                <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1 }}>
                  Heading 2
                </span>
              </TypeRow>
              <TypeRow spec="Saira 700 · 15–19">
                <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 18 }}>
                  Heading 3 · card titles
                </span>
              </TypeRow>
              <TypeRow spec="Geist 400 · 16–17">
                <span style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--muted)" }}>
                  Lead paragraph — comfortable reading for intros and subheads.
                </span>
              </TypeRow>
              <TypeRow spec="Geist 400 · 14–15">
                <span style={{ fontFamily: "var(--font-body)", fontSize: 14.5 }}>
                  Body — default UI text across listings, forms and tables.
                </span>
              </TypeRow>
              <TypeRow spec="Geist 500 · 12–13">
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--muted)" }}>
                  Small — meta, captions and helper text.
                </span>
              </TypeRow>
              <TypeRow spec="Saira 700 · 11 · .14em caps">
                <span style={{ fontFamily: "var(--font-head)", fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--accent)" }}>
                  EYEBROW LABEL
                </span>
              </TypeRow>
            </div>
          </section>

          {/* ══════════════ SPACING ══════════════ */}
          <section className="ds-section" id="spacing">
            <span className="ds-eyebrow">Foundations</span>
            <h2 className="ds-h2">Spacing &amp; Radius</h2>
            <p className="ds-lead">
              Content lives in a 1240px max-width rail. A single <Code>--d</Code> density
              multiplier scales padding globally. Radius is driven by <Code>--radius</Code>{" "}
              (default 18px) and derived tokens.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: 22,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Spacing scale</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { w: 8, label: "inline gaps, chip padding" },
                    { w: 12, label: "card inner padding" },
                    { w: 16, label: "section gutters" },
                    { w: 24, label: "card padding" },
                    { w: 48, label: "section side padding" },
                    { w: 96, label: "section vertical rhythm" },
                  ].map((s) => (
                    <div key={s.w} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ height: 12, width: s.w, background: "var(--accent)", borderRadius: 2, flexShrink: 0 }} />
                      <Code>{s.w}</Code>
                      <span style={{ fontSize: 12.5, color: "var(--faint)" }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: 22,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Radius scale</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { r: "5px", label: "--radius-sm · ~10px" },
                    { r: "var(--radius)", label: "--radius · 18px" },
                    { r: "999px", label: "--radius-pill" },
                  ].map((s) => (
                    <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 56,
                          height: 32,
                          background: "var(--accent-soft)",
                          border: "1.5px solid var(--accent)",
                          borderRadius: s.r,
                        }}
                      />
                      <Code>{s.label}</Code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════ ELEVATION ══════════════ */}
          <section className="ds-section" id="elevation">
            <span className="ds-eyebrow">Foundations</span>
            <h2 className="ds-h2">Elevation</h2>
            <p className="ds-lead">
              Two shadow levels. Both tint to the navy so they feel warm rather than cold
              grey — rgba(18,20,39,…) in light, rgba(0,0,0,…) in dark.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 4 }}>
              {[
                { shadow: "var(--shadow)", title: "Default shadow", token: "--shadow", use: "Cards, dropdowns, nav bar at rest" },
                { shadow: "var(--shadow-lg)", title: "Large shadow", token: "--shadow-lg", use: "Modals, overlays, hovered cards" },
              ].map((s) => (
                <div
                  key={s.token}
                  style={{
                    background: "var(--surface)",
                    borderRadius: "var(--radius)",
                    padding: 28,
                    boxShadow: s.shadow,
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{s.title}</div>
                  <code className="ds-code" style={{ display: "block", marginTop: 8, fontSize: 11 }}>
                    {s.token}
                  </code>
                  <p style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 8 }}>{s.use}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════ MOTION ══════════════ */}
          <section className="ds-section" id="motion">
            <span className="ds-eyebrow">Foundations</span>
            <h2 className="ds-h2">Motion</h2>
            <p className="ds-lead">
              One easing curve — <Code>cubic-bezier(0.22, 1, 0.36, 1)</Code> — covers all UI
              transitions. Enter animations gate on{" "}
              <Code>@media (prefers-reduced-motion: no-preference)</Code>.
            </p>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
              }}
            >
              {[
                { label: "Micro (hover, focus)", spec: "0.12–0.2s var(--ease)" },
                { label: "Component (slide, expand)", spec: "0.25–0.35s var(--ease)" },
                { label: "Page transition (overlay)", spec: "0.45–0.52s var(--ease)" },
                { label: "Theme crossfade (bg/color)", spec: "0.5s var(--ease)" },
              ].map((m) => (
                <TypeRow key={m.label} spec={m.spec}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{m.label}</span>
                </TypeRow>
              ))}
            </div>
          </section>

          {/* ══════════════ BUTTONS ══════════════ */}
          <section className="ds-section" id="buttons">
            <span className="ds-eyebrow">Components</span>
            <h2 className="ds-h2">Buttons</h2>
            <p className="ds-lead">
              Three intent levels — primary, ghost, quiet — in three sizes. Built on the
              shadcn <Code>cva</Code> + <Code>asChild</Code> pattern. The primary button is
              the single accent CTA.
            </p>

            <div className="ds-canvas">
              <div className="ds-h3" style={{ marginTop: 0 }}>Primary</div>
              <div className="ds-row" style={{ marginBottom: 20 }}>
                <Button>Start browsing</Button>
                <Button size="sm">Add to cart</Button>
                <Button size="sm" disabled>Disabled</Button>
              </div>
              <div className="ds-h3">Ghost / Outline</div>
              <div className="ds-row" style={{ marginBottom: 20 }}>
                <Button variant="ghost">Browse sets</Button>
                <Button variant="ghost" size="sm">Back</Button>
              </div>
              <div className="ds-h3">Quiet (text)</div>
              <div className="ds-row">
                <Button variant="quiet">Sign in</Button>
                <Button variant="quiet" size="sm">Cancel</Button>
              </div>
            </div>

            <div className="ds-canvas" style={{ marginTop: 12, background: "var(--navy-surface)" }}>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "rgba(232,237,249,.4)",
                  marginBottom: 14,
                }}
              >
                On dark / utility bar
              </div>
              <div className="ds-row">
                <button className="nu-btn on">EN</button>
                <button className="nu-btn">ES</button>
                <button className="nu-link" style={{ color: "rgba(232,237,249,.65)" }}>
                  Seller portal
                </button>
                <button className="nav-portal-btn">
                  <Icon name="store" size={16} />
                  Seller portal
                </button>
              </div>
            </div>
          </section>

          {/* ══════════════ BADGES ══════════════ */}
          <section className="ds-section" id="badges">
            <span className="ds-eyebrow">Components</span>
            <h2 className="ds-h2">Badges &amp; Chips</h2>
            <p className="ds-lead">
              Badges communicate grade and rarity. Status chips communicate order lifecycle.
              All use <Code>font-head</Code> at 10–11px bold for clarity at small sizes.
            </p>

            <div className="ds-h3">Grade badges</div>
            <div className="ds-canvas">
              <div className="ds-row">
                <GradeBadge graded>PSA 10</GradeBadge>
                <GradeBadge graded>CGC 9.5</GradeBadge>
                <GradeBadge>NM</GradeBadge>
                <GradeBadge>LP</GradeBadge>
                <GradeBadge>MP</GradeBadge>
              </div>
            </div>

            <div className="ds-h3">Rarity chips (card type)</div>
            <div className="ds-canvas">
              <div className="ds-row">
                <RarityChip>Special</RarityChip>
                <RarityChip>Ultra</RarityChip>
                <RarityChip>Illustration</RarityChip>
                <RarityChip>Hyper</RarityChip>
              </div>
            </div>

            <div className="ds-h3">Status bar labels (active/sold)</div>
            <div className="ds-canvas">
              <div className="ds-row">
                <StatusBadge tone="active">Active</StatusBadge>
                <StatusBadge tone="sold">Sold</StatusBadge>
                <StatusBadge tone="pending">Pending</StatusBadge>
                <StatusBadge tone="confirmed">Confirmed</StatusBadge>
                <StatusBadge tone="shipped">Shipped</StatusBadge>
                <StatusBadge tone="delivered">Delivered</StatusBadge>
              </div>
            </div>
          </section>

          {/* ══════════════ STATUS SYSTEM ══════════════ */}
          <section className="ds-section" id="status">
            <span className="ds-eyebrow">Components</span>
            <h2 className="ds-h2">Status System</h2>
            <p className="ds-lead">
              Two status lifecycles: <strong>Purchase</strong> (buyer view) and{" "}
              <strong>Fulfillment</strong> (seller view). Each step maps to a distinct color
              and label pair.
            </p>

            <div className="ds-h3">Purchase lifecycle — buyer view</div>
            <div className="ds-canvas">
              <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
                <Step color="#f0a030" textColor="#b07018">⏳ Pending</Step>
                <Connector />
                <Step color="#2a6fdb" textColor="#2a6fdb">✓ Confirmed</Step>
                <Connector />
                <Step color="#8a2bb8" textColor="#8a2bb8">📍 At store · Ready</Step>
                <Connector />
                <Step color="#1fad66" textColor="#1fad66">✅ Collected</Step>
              </div>
              <div
                style={{
                  marginTop: 12,
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "color-mix(in oklch,#8a2bb8 8%,transparent)",
                  border: "1px solid color-mix(in oklch,#8a2bb8 20%,transparent)",
                  fontSize: 13,
                  color: "#8a2bb8",
                  fontFamily: "var(--font-head)",
                  fontWeight: 600,
                }}
              >
                📍 Pick up at PokeNest Kanto · 0.8 km — shows on Confirmed + Ready steps
              </div>
            </div>

            <div className="ds-h3">Fulfillment lifecycle — seller view</div>
            <div className="ds-canvas">
              <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
                <Step color="#f0a030" textColor="#b07018">💳 Paid</Step>
                <Connector />
                <Step color="#2a6fdb" textColor="#2a6fdb">🏪 At store</Step>
                <Connector />
                <Step color="#8a2bb8" textColor="#8a2bb8">✅ Ready to pick up</Step>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 12 }}>
                Seller advances each step via a CTA on the sold listing card. Buyer sees the
                reflected status in their Purchases tab.
              </div>
            </div>
          </section>

          {/* ══════════════ FORMS ══════════════ */}
          <section className="ds-section" id="forms">
            <span className="ds-eyebrow">Components</span>
            <h2 className="ds-h2">Forms &amp; Search</h2>
            <p className="ds-lead">
              The hero search bar is the primary entry point. Focus state is handled at the
              container level via <Code>:focus-within</Code> — never on the input directly.
            </p>

            <div className="ds-canvas" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <SearchBar className="max-w-[560px]" />
              <div style={{ display: "flex", gap: 24, alignItems: "flex-end", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--faint)", marginBottom: 8 }}>
                    Quantity
                  </div>
                  <QtyControl defaultValue={4} />
                </div>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--faint)", marginBottom: 8 }}>
                    Language
                  </div>
                  <LangToggle />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--faint)", marginBottom: 8 }}>
                    Text field
                  </div>
                  <Input placeholder="you@email.com" />
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════ NAVIGATION ══════════════ */}
          <section className="ds-section" id="nav-comp">
            <span className="ds-eyebrow">Components</span>
            <h2 className="ds-h2">Navigation</h2>
            <p className="ds-lead">
              A thin navy utility strip sits above the main bar. Auth state drives the
              right-side slot — <strong>guest</strong>, <strong>buyer</strong>, and{" "}
              <strong>seller</strong> each render a distinct action group.
            </p>

            <div className="ds-h3">Guest state</div>
            <Navbar state="guest" />

            <div className="ds-h3">Buyer state — avatar + Start selling nudge</div>
            <Navbar state="buyer" />

            <div className="ds-h3">Seller state — role switcher + avatar</div>
            <Navbar state="seller" />
          </section>

          {/* ══════════════ PRODUCT CARDS ══════════════ */}
          <section className="ds-section" id="cards">
            <span className="ds-eyebrow">Components</span>
            <h2 className="ds-h2">Product Cards</h2>
            <p className="ds-lead">
              The core marketplace surface. Each card pairs a hue-tinted art placeholder with
              a heading-font title, monospace meta and a magenta price. Hue is a per-card{" "}
              <Code>--h</Code> CSS variable (0–360).
            </p>

            <div className="ds-canvas">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0,1fr))",
                  gap: 20,
                  maxWidth: 720,
                }}
              >
                <ProductCard
                  hue={8}
                  rarity="Special"
                  artLabel="151 · 199/165"
                  name="Charizard ex"
                  meta="151 · 199/165"
                  price="$412.50"
                  listings="41 listings"
                  delta={{ dir: "up", value: "6.2%" }}
                />
                <ProductCard
                  hue={48}
                  rarity="Illustration"
                  artLabel="151 · 173/165"
                  name="Pikachu"
                  meta="151 · 173/165"
                  price="$134.00"
                  listings="28 listings"
                  delta={{ dir: "up", value: "11.4%" }}
                />
                <ProductCard
                  hue={280}
                  rarity="Special"
                  artLabel="PAL · 253/193"
                  name="Miraidon ex"
                  meta="Paldea Evolved · 253/193"
                  price="$64.25"
                  listings="52 listings"
                  delta={{ dir: "down", value: "3.8%" }}
                />
              </div>
            </div>
          </section>

          {/* ══════════════ PRICE COMPARISON ══════════════ */}
          <section className="ds-section" id="price-cmp">
            <span className="ds-eyebrow">Components</span>
            <h2 className="ds-h2">Price Comparison</h2>
            <p className="ds-lead">
              Horizontal tiles show price across external marketplaces. Deckcenter is omitted
              from this list — it&apos;s implied as the context. The &ldquo;Mkt avg&rdquo;
              badge appears on market-tracked rows.
            </p>

            <div className="ds-canvas">
              <PriceComparison
                stores={[
                  { store: "TCGplayer", logo: { color: "#2563eb", glyph: "T" }, price: "$458.00", over: "+$45.50", marketAvg: true },
                  { store: "CardMarket", logo: { color: "#1a6e3d", glyph: "C" }, price: "$441.00", over: "+$28.50" },
                  { store: "eBay (avg)", logo: { color: "#e53238", glyph: "e" }, price: "$472.00", over: "+$59.50", marketAvg: true },
                ]}
                footer={
                  <>
                    Best price: Deckcenter at{" "}
                    <strong style={{ color: "var(--accent)" }}>$412.50</strong> — save up to
                    $59.50
                  </>
                }
              />
            </div>
          </section>

          {/* ══════════════ INBOX ROWS ══════════════ */}
          <section className="ds-section" id="inbox">
            <span className="ds-eyebrow">Components</span>
            <h2 className="ds-h2">Inbox Rows</h2>
            <p className="ds-lead">
              Dense list pattern used in both Purchases and Selling tabs. Grid:{" "}
              <Code>checkbox · thumbnail · info · status chip · price</Code>. Scales to 300+
              orders — no card grid needed.
            </p>

            <div className="ds-h3">Purchases (no checkbox)</div>
            <div className="demo-inbox">
              <InboxRow
                hue={22}
                title="Charizard ex"
                subtitle="Obsidian Flames · Seller: PokeVault"
                dim
                status={
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "var(--font-head)", fontSize: 11, fontWeight: 700, padding: "4px 9px", borderRadius: 7, color: "#1fad66", background: "color-mix(in oklch,#1fad66 12%,transparent)", whiteSpace: "nowrap" }}>
                    ✅ Collected
                  </span>
                }
                trailing={
                  <>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14, color: "var(--accent)" }}>$89.99</div>
                    <div style={{ fontSize: 11, color: "var(--faint)", marginTop: 2 }}>Jun 18</div>
                  </>
                }
              />
              <InboxRow
                hue={260}
                title="Umbreon VMAX"
                subtitle="Evolving Skies · Seller: CardDen"
                note="📍 Pick up at PokeNest Kanto · 0.8 km"
                status={
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "var(--font-head)", fontSize: 11, fontWeight: 700, padding: "4px 9px", borderRadius: 7, color: "#8a2bb8", background: "color-mix(in oklch,#8a2bb8 13%,transparent)", whiteSpace: "nowrap" }}>
                    📍 At store · Ready
                  </span>
                }
                trailing={
                  <>
                    <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 14, color: "var(--accent)" }}>$44.50</div>
                    <div style={{ fontSize: 11, color: "var(--faint)", marginTop: 2 }}>Jun 20</div>
                  </>
                }
              />
            </div>

            <div className="ds-h3">Selling — sold tab with bulk select</div>
            <SellingInbox />
          </section>

          {/* ══════════════ CARD ART ══════════════ */}
          <section className="ds-section" id="cardart">
            <span className="ds-eyebrow">Components</span>
            <h2 className="ds-h2">Card Art</h2>
            <p className="ds-lead">
              The <Code>CardArt</Code> placeholder generates a hue-tinted radial-gradient art
              background from a single CSS variable <Code>--h</Code> (0–360 hue). The holo
              shimmer overlay is keyed off the same hue.
            </p>

            <div className="ds-canvas">
              <div className="hue-row">
                {HUES.map((h) => (
                  <CardArt key={h} hue={h} style={{ width: 80, height: 112, borderRadius: 8 }} />
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8, fontSize: 11, color: "var(--faint)", fontFamily: "var(--font-mono)" }}>
                {HUES.map((h) => (
                  <span key={h} style={{ width: 80, textAlign: "center" }}>
                    --h:{h}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════ ICONS ══════════════ */}
          <section className="ds-section" id="icons">
            <span className="ds-eyebrow">Components</span>
            <h2 className="ds-h2">Iconography</h2>
            <p className="ds-lead">
              All icons are hand-drawn Lucide-style strokes (2px, round cap/join) rendered
              inline as SVG. No icon font or sprite — each icon is directly editable and
              colour-inheritable.
            </p>

            <div className="ds-canvas">
              <div className="ds-row" style={{ gap: 20, flexWrap: "wrap" }}>
                {ICON_NAMES.map((name) => (
                  <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <Icon name={name} size={22} />
                    <span style={{ fontSize: 10.5, color: "var(--faint)" }}>{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 14, padding: "14px 18px", background: "var(--surface-2)", borderRadius: 10, fontSize: 13, color: "var(--muted)" }}>
              Icons are defined in <Code>icon.tsx</Code> as <Code>ICON_PATHS</Code> and
              rendered via <Code>&lt;Icon name=&quot;search&quot; size={20} /&gt;</Code>.
              Stroke width defaults to 2, override with <Code>sw</Code>.
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ── Selling inbox demo (stateful bulk-select) ─────────────────────────── */
function SellingInbox() {
  const [selected, setSelected] = React.useState(true);
  return (
    <div className="demo-inbox">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "9px 14px",
          background: "var(--surface-2)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 4,
            background: "var(--accent)",
            display: "grid",
            placeItems: "center",
            fontSize: 9,
            color: "#fff",
            fontWeight: 800,
          }}
        >
          ✓
        </div>
        <span style={{ fontSize: 11.5, color: "var(--muted)", fontFamily: "var(--font-head)", fontWeight: 600 }}>
          Select all · 2 sold
        </span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 12, color: "var(--accent)" }}>
            {selected ? "1 selected" : "0 selected"}
          </span>
          <Button size="sm" className="text-[11px]">Advance status →</Button>
        </div>
      </div>
      <InboxRow
        hue={320}
        title="Hisuian Zoroark VSTAR"
        subtitle="Lost Origin"
        selected={selected}
        checkbox={{ checked: selected, onChange: setSelected }}
        trailing={
          <button
            style={{
              fontFamily: "var(--font-head)",
              fontSize: 11,
              fontWeight: 700,
              padding: "5px 10px",
              borderRadius: 8,
              cursor: "pointer",
              color: "#b07018",
              background: "color-mix(in oklch,#f0a030 14%,transparent)",
              border: "none",
              whiteSpace: "nowrap",
            }}
          >
            💳 Paid →
          </button>
        }
      />
    </div>
  );
}
