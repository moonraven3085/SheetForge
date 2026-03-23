import './CategoryPill.css'

export function CategoryPill({ label, accent, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      style={{ '--pill-accent': accent || '#58a6ff' }}
      className={`pill ${active ? 'active' : ''}`}
    >
      {icon && <span className="pill-icon">{icon}</span>}
      {label}
    </button>
  )
}

export default CategoryPill
