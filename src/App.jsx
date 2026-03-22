import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import catalog from './data/sheets.json'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import SheetCard from './components/SheetCard.jsx'
import CategoryPill from './components/CategoryPill.jsx'
import EmailCapture from './components/EmailCapture.jsx'
import './App.css'

const ICONS = {
  cpu:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  cloud:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  layers:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  flask:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M9 3v8l-5 9h16l-5-9V3"/></svg>,
  palette:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="8" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/></svg>,
  gamepad:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15.5" cy="11.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="13.5" r=".5" fill="currentColor"/><path d="M20 8H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2z"/><path d="M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"/></svg>,
  terminal: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  code:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  briefcase:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>,
}

export default function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    let sheets = catalog.sheets
    if (activeCategory !== 'all') {
      sheets = sheets.filter(s => s.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      sheets = sheets.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some(t => t.includes(q))
      )
    }
    return sheets
  }, [search, activeCategory])

  const counts = useMemo(() => {
    const map = {}
    catalog.sheets.forEach(s => {
      map[s.category] = (map[s.category] || 0) + 1
    })
    return map
  }, [])

  return (
    <div className="app">
      <Nav />

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge fade-up">
            <span className="badge-dot" />
            Olaris Labs
          </div>
          <h1 className="hero-title fade-up" style={{ animationDelay: '0.05s' }}>
            Every reference you<br />
            <span className="hero-gradient">actually need.</span>
          </h1>
          <p className="hero-sub fade-up" style={{ animationDelay: '0.1s' }}>
            {catalog.sheets.length} handcrafted dark-theme cheat sheets for AI engineers,
            developers, and creators. Free to download.
          </p>

          {/* Search */}
          <div className="search-wrap fade-up" style={{ animationDelay: '0.15s' }}>
            <span className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              className="search-input"
              type="text"
              placeholder="Search pytorch, git, ollama, quickbooks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search cheat sheets"
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')} aria-label="Clear search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          {/* Stats row */}
          <div className="hero-stats fade-up" style={{ animationDelay: '0.2s' }}>
            {[
              { n: catalog.sheets.length, label: 'sheets' },
              { n: catalog.categories.length, label: 'categories' },
              { n: '100%', label: 'free' },
              { n: 'A4', label: 'print-ready' },
            ].map(({ n, label }) => (
              <div className="stat" key={label}>
                <span className="stat-n">{n}</span>
                <span className="stat-l">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="filter-bar">
        <div className="container">
          <div className="pills-scroll">
            <CategoryPill
              label="All sheets"
              count={catalog.sheets.length}
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            />
            {catalog.categories.map(cat => (
              <CategoryPill
                key={cat.id}
                label={cat.label}
                count={counts[cat.id] || 0}
                accent={cat.accent}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                icon={ICONS[cat.icon]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sheet grid */}
      <section className="grid-section">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <p>No sheets match <strong>"{search}"</strong></p>
              <button onClick={() => { setSearch(''); setActiveCategory('all') }}>Clear filters</button>
            </div>
          ) : (
            <>
              <div className="grid-meta">
                <span>{filtered.length} sheet{filtered.length !== 1 ? 's' : ''}</span>
                {(search || activeCategory !== 'all') && (
                  <button className="clear-link" onClick={() => { setSearch(''); setActiveCategory('all') }}>
                    Clear filters
                  </button>
                )}
              </div>
              <div className="sheet-grid">
                {filtered.map((sheet, i) => {
                  const cat = catalog.categories.find(c => c.id === sheet.category)
                  return (
                    <SheetCard
                      key={sheet.slug}
                      sheet={sheet}
                      accent={cat?.accent || '#58a6ff'}
                      index={i}
                      onClick={() => navigate(`/sheets/${sheet.slug}`)}
                    />
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Category deep-dive cards */}
      <section className="cat-section">
        <div className="container">
          <h2 className="section-title">Browse by category</h2>
          <div className="cat-grid">
            {catalog.categories.map(cat => (
              <button
                key={cat.id}
                className="cat-card"
                style={{ '--cat-accent': cat.accent }}
                onClick={() => { setActiveCategory(cat.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              >
                <div className="cat-icon">{ICONS[cat.icon]}</div>
                <div className="cat-info">
                  <span className="cat-name">{cat.label}</span>
                  <span className="cat-desc">{cat.description}</span>
                </div>
                <div className="cat-count">{counts[cat.id] || 0}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <EmailCapture />
      <Footer />
    </div>
  )
}
