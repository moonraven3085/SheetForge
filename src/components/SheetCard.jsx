import { Link } from 'react-router-dom'
import './SheetCard.css'

const DOWNLOAD_BASE = '/pdfs/'
const PREMIUM_LOCKED = import.meta.env.VITE_PREMIUM_LOCKED === 'true'

export default function SheetCard({ sheet, accent, index }) {
  const ac     = sheet.ac     || accent || '#58a6ff'
  const acGlow = sheet.acGlow || 'rgba(88,166,255,0.35)'
  const acDark = sheet.acDark || '#0c2040'
  const abbr   = sheet.abbr   || sheet.title.slice(0, 3).toUpperCase()

  function handleDownload(e) {
    e.preventDefault()
    e.stopPropagation()
    if (PREMIUM_LOCKED) {
      alert('Premium download coming soon! Sign up for early access.')
      return
    }
    const a = document.createElement('a')
    a.href = `${DOWNLOAD_BASE}${sheet.file}`
    a.download = sheet.file
    a.click()
  }

  return (
    <Link
      to={`/sheets/${sheet.slug}`}
      className="sheet-card"
      style={{
        '--ac':      ac,
        '--ac-glow': acGlow,
        '--ac-dark': acDark,
        animationDelay: `${Math.min(index * 0.03, 0.4)}s`
      }}
    >
      <div className="card-badge-wrap">
        <div className="card-badge">
          {abbr}
          <span className="card-badge-corner" />
        </div>
      </div>

      <span className="card-name">{sheet.title}</span>

      <div
        className={`card-dl ${PREMIUM_LOCKED ? 'locked' : ''}`}
        onClick={handleDownload}
        role="button"
        tabIndex={0}
        aria-label={`Download ${sheet.title}`}
        onKeyDown={e => e.key === 'Enter' && handleDownload(e)}
      >
        {PREMIUM_LOCKED ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        )}
      </div>
    </Link>
  )
}
