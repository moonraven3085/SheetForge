import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'

export default function AboutPage() {
  return (
    <div className="app">
      <Nav />
      <div className="container" style={{ maxWidth: 680, padding: '64px 24px 120px' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--dim)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:24 }}>About</div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:clamp(32,48), fontWeight:800, letterSpacing:'-0.03em', marginBottom:24, lineHeight:1.1 }}>
          Built by one person.<br/>
          <span style={{ background:'linear-gradient(135deg,#58a6ff,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>For every developer.</span>
        </h1>
        <div style={{ color:'var(--muted)', lineHeight:1.8, fontSize:16, display:'flex', flexDirection:'column', gap:20 }}>
          <p>SheetForge started as a personal project — I kept making cheat sheets for myself because I work across too many tools to remember everything. At some point I had 70 of them, all in the same dark theme, and realized that was actually a library worth sharing.</p>
          <p>Every sheet is handcrafted using a custom Python generator with ReportLab. The content is researched and written from scratch — not scraped or generated without care. Each one fits on a single A4 page, print-ready at 300 DPI, with a consistent three-column layout and syntax-highlighted code blocks.</p>
          <p>SheetForge is one product under <strong style={{ color:'var(--text)' }}>Olaris Labs</strong> — my personal studio for developer tools. I also build tools for the gaming community and run <a href="https://clayandcharm.com" style={{ color:'var(--accent)' }}>Clay & Charm</a>, a handmade polymer clay earring shop in NEPA.</p>
          <p>Have a tool you'd like to see a sheet for? Reach out.</p>
        </div>
        <div style={{ marginTop:40, display:'flex', gap:12, flexWrap:'wrap' }}>
          <Link to="/" style={{ padding:'10px 20px', background:'var(--accent)', color:'#0d1117', borderRadius:'var(--r-md)', fontWeight:600, fontSize:14 }}>Browse all sheets</Link>
          <a href="https://github.com/olarislabs" target="_blank" rel="noopener noreferrer" style={{ padding:'10px 20px', border:'1px solid var(--border)', color:'var(--text)', borderRadius:'var(--r-md)', fontSize:14 }}>GitHub</a>
        </div>
      </div>
      <Footer />
    </div>
  )
}
