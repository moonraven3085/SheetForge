import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">◈ SheetForge</span>
          <span className="footer-lab">by Olaris Labs</span>
          <p className="footer-copy">Handcrafted reference sheets for people who build things.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <span className="col-head">Site</span>
            <Link to="/">All sheets</Link>
            <a href="https://github.com/moonraven3085/SheetForge" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <div className="footer-col">
            <span className="col-head">Olaris Labs</span>
            <a href="https://olarislabs.dev" target="_blank" rel="noopener noreferrer">olarislabs.dev</a>
            <a href="https://clayandcharm.com" target="_blank" rel="noopener noreferrer">Clay & Charm</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Olaris Labs. All rights reserved.</span>
      </div>
    </footer>
  )
}
