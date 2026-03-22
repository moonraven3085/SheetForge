import { useParams, useNavigate, Link } from 'react-router-dom'
import catalog from '../data/sheets.json'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import SheetCard from '../components/SheetCard.jsx'

export default function CategoryPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const category = catalog.categories.find(c => c.id === id)
  const sheets = catalog.sheets.filter(s => s.category === id)

  if (!category) return null

  return (
    <div className="app">
      <Nav />
      <div className="container" style={{ padding: '40px 24px 80px' }}>
        <nav style={{ display:'flex', gap:8, fontSize:13, color:'var(--dim)', marginBottom:32 }}>
          <Link to="/" style={{ color:'var(--muted)' }}>Sheets</Link>
          <span>›</span>
          <span style={{ color: category.accent }}>{category.label}</span>
        </nav>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:36, fontWeight:800, letterSpacing:'-0.02em', marginBottom:8 }}>{category.label}</h1>
        <p style={{ color:'var(--muted)', marginBottom:32 }}>{category.description} · {sheets.length} sheets</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:16 }}>
          {sheets.map((sheet, i) => (
            <SheetCard key={sheet.slug} sheet={sheet} accent={category.accent} index={i} onClick={() => navigate(`/sheets/${sheet.slug}`)} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
