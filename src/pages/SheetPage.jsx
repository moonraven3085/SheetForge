import { useParams, useNavigate, Link } from 'react-router-dom'
import { useMemo } from 'react'
import catalog from '../data/sheets.json'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import SheetCard from '../components/SheetCard.jsx'
import './SheetPage.css'

const PREMIUM_LOCKED = import.meta.env.VITE_PREMIUM_LOCKED === 'true'

export default function SheetPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const sheet = catalog.sheets.find(s => s.slug === slug)
  const category = sheet ? catalog.categories.find(c => c.id === sheet.category) : null

  const related = useMemo(() => {
    if (!sheet) return []
    return catalog.sheets
      .filter(s => s.slug !== slug && s.category === sheet.category)
      .slice(0, 3)
  }, [slug, sheet])

  if (!sheet) {
    return (
      <div className="app">
        <Nav />
        <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: 12 }}>Sheet not found</h2>
          <Link to="/" style={{ color: 'var(--accent)' }}>← Back to all sheets</Link>
        </div>
        <Footer />
      </div>
    )
  }

  function handleDownload() {
    if (PREMIUM_LOCKED) {
      alert('Premium download coming soon!')
      return
    }
    const a = document.createElement('a')
    a.href = `/pdfs/${sheet.file}`
    a.download = sheet.file
    a.click()
  }

  return (
    <div className="app">
      <Nav />

      <div className="container sheet-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Sheets</Link>
          <span>›</span>
          <span style={{ color: category?.accent }}>{category?.label}</span>
          <span>›</span>
          <span>{sheet.title}</span>
        </nav>

        <div className="sheet-layout">
          {/* Main: PDF preview */}
          <div className="sheet-main">
            <div className="pdf-preview">
              <iframe
                src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(`https://sheetforge-roan.vercel.app/pdfs/${sheet.file}`)}`}
                className="pdf-embed"
                title={`${sheet.title} cheat sheet preview`}
                allowFullScreen
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sheet-sidebar">
            <div className="sidebar-card" style={{ '--accent': category?.accent }}>
              <span className="sidebar-cat">{category?.label}</span>
              <h1 className="sidebar-title">{sheet.title}</h1>
              <p className="sidebar-desc">{sheet.description}</p>

              <div className="sidebar-tags">
                {sheet.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              <button
                className={`dl-btn-lg ${PREMIUM_LOCKED ? 'locked' : ''}`}
                onClick={handleDownload}
              >
                {PREMIUM_LOCKED ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Premium Download
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download PDF — Free
                  </>
                )}
              </button>

              <div className="sidebar-meta">
                <div className="meta-row">
                  <span>Format</span><span>A4 PDF, print-ready</span>
                </div>
                <div className="meta-row">
                  <span>Theme</span><span>Dark · syntax-highlighted</span>
                </div>
                <div className="meta-row">
                  <span>Category</span><span>{category?.label}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="related">
            <h2 className="related-title">More in {category?.label}</h2>
            <div className="sheet-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {related.map((s, i) => {
                const cat = catalog.categories.find(c => c.id === s.category)
                return (
                  <SheetCard
                    key={s.slug}
                    sheet={s}
                    accent={cat?.accent}
                    index={i}
                    onClick={() => navigate(`/sheets/${s.slug}`)}
                  />
                )
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
