// CategoryPill.jsx
export function CategoryPill({ label, count, accent, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      style={{ '--pill-accent': accent || '#58a6ff' }}
      className={`pill ${active ? 'active' : ''}`}
    >
      {icon && <span className="pill-icon">{icon}</span>}
      {label}
      <span className="pill-count">{count}</span>
    </button>
  )
}

export default CategoryPill
