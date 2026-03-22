import './SheetCard.css'

const DOWNLOAD_BASE = '/pdfs/'
const PREMIUM_LOCKED = import.meta.env.VITE_PREMIUM_LOCKED === 'true'

export default function SheetCard({ sheet, accent, index, onClick }) {
  function handleDownload(e) {
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
    <div
      className="sheet-card"
      style={{ '--accent': accent, animationDelay: `${Math.min(index * 0.03, 0.4)}s` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <div className="card-accent-bar" />

      <div className="card-body">
        <div className="card-category">{sheet.category.replace(/-/g, ' ')}</div>
        <h3 className="card-title">{sheet.title}</h3>
        <p className="card-desc">{sheet.description}</p>

        <div className="card-tags">
          {sheet.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="card-footer">
        <button
          className={`dl-btn ${PREMIUM_LOCKED ? 'locked' : ''}`}
          onClick={handleDownload}
          aria-label={`Download ${sheet.title} cheat sheet`}
        >
          {PREMIUM_LOCKED ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Premium
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              PDF
            </>
          )}
        </button>
        <span className="view-link">View details →</span>
      </div>
    </div>
  )
}
