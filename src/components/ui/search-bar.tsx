import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { Button } from "./button"

interface SearchResult {
  id: string
  name: string
  set?: string
  num?: string
  price?: number
  hue?: number
}

interface SearchBarProps {
  placeholder?: string
  results?: SearchResult[]
  loading?: boolean
  onSearch?: (query: string) => void
  onSelect?: (result: SearchResult) => void
  className?: string
}

const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  ({ placeholder = "Search cards, sets, sealed product…", results, loading, onSearch, onSelect, className }, ref) => {
    const [query, setQuery] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const wrapRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClick)
      return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setQuery(val)
      setOpen(true)
      onSearch?.(val)
    }

    const handleSelect = (result: SearchResult) => {
      setQuery(result.name)
      setOpen(false)
      onSelect?.(result)
    }

    const showResults = open && (loading || (results && results.length > 0) || query.length > 0)

    return (
      <div ref={ref} className={cn("relative z-30", className)}>
        <div
          ref={wrapRef}
          className={cn(
            "flex items-center gap-3 bg-surface border-[1.5px] border-border-strong rounded-xl px-5 py-[7px] pr-[7px] shadow transition-all",
            "focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--accent-soft)]"
          )}
        >
          <Search size={20} className="flex-none text-faint" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="flex-1 min-w-0 bg-transparent border-0 outline-none text-base text-text font-sans placeholder:text-faint"
          />
          <Button size="sm" className="flex-none">Search</Button>
        </div>

        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.985 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[calc(100%+10px)] left-0 right-0 z-40 bg-surface border border-border rounded-lg shadow-lg overflow-hidden p-[7px] origin-top"
            >
              {loading ? (
                <div className="flex flex-col gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-[47px] mx-1.5 rounded-sm animate-pulse"
                      style={{
                        background: "linear-gradient(100deg, var(--surface-2) 30%, color-mix(in oklch, var(--surface-2) 50%, var(--bg)) 50%, var(--surface-2) 70%)",
                        backgroundSize: "200% 100%",
                      }}
                    />
                  ))}
                </div>
              ) : results && results.length > 0 ? (
                <>
                  <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-faint px-3 py-2 pb-1.5">
                    Results
                  </div>
                  {results.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => handleSelect(r)}
                      className="flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer hover:bg-surface-2 transition-colors"
                    >
                      <div
                        className="w-[34px] h-[47px] rounded-[5px] flex-none"
                        style={{
                          background: r.hue
                            ? `linear-gradient(160deg, color-mix(in oklch, hsl(${r.hue} 70% 55%) 90%, white) 0%, hsl(${r.hue} 72% 42%) 55%, color-mix(in oklch, hsl(${r.hue} 70% 40%) 80%, #121427) 100%)`
                            : "var(--surface-2)",
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-[14.5px] text-text truncate">{r.name}</div>
                        <div className="text-[12.5px] text-muted">
                          {r.set && r.num ? `${r.set} · ${r.num}` : r.set}
                        </div>
                      </div>
                      {r.price !== undefined && (
                        <div className="font-heading font-semibold text-sm text-text ml-auto">
                          ${r.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : query.length > 0 ? (
                <div className="px-3.5 py-5 text-center text-muted text-sm">
                  No cards found. Try a different name.
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
SearchBar.displayName = "SearchBar"

export { SearchBar }
