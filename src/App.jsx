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
  cpu: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  cloud: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  layers: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  flask: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M9 3v8l-5 9h16l-5-9V3"/></svg>,
  palette: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="8" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/></svg>,
  gamepad: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15.5" cy="11.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="13.5" r=".5" fill="currentColor"/><path d="M20 8H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2z"/><path d="M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"/></svg>,
  terminal: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  code: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  briefcase: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>,
  share: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  radio: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>,
  user: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  film: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>,
  music: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  box: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  'pen-tool': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  globe: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  'bar-chart': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  'shopping-cart': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  book: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
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
            {catalog.sheets.length} handcrafted dark-theme cheat sheets for AI engineers, developers, and creators. Free to download.
          </p>

          {/* Stats row */}
          <div className="hero-stats fade-up" style={{ animationDelay: '0.15s' }}>
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

      {/* Search + Category filter — sticky together */}
      <section className="filter-bar">
        <div className="container">
          {/* Search */}
          <div className="search-wrap-bar">
            <span className="search-icon-bar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              className="search-input-bar"
              type="text"
              placeholder="Search pytorch, git, ollama, figma..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search cheat sheets"
            />
            {search && (
              <button className="search-clear-bar" onClick={() => setSearch('')} aria-label="Clear search">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="pills-scroll">
            <CategoryPill
              label="All"
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            />
            {catalog.categories.map(cat => (
              <CategoryPill
                key={cat.id}
                label={cat.label}
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

      <EmailCapture />
      <Footer />
    </div>
  )
}
