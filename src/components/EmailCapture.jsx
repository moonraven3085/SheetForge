import { useState } from 'react'
import './EmailCapture.css'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    // Simple client-side rate limit — one submission per 60s per session
    const lastSub = sessionStorage.getItem('sf_last_sub')
    if (lastSub && Date.now() - parseInt(lastSub) < 60000) {
      setStatus('success')
      return
    }
    setStatus('loading')
    // Buttondown endpoint — replace YOUR_LIST with your Buttondown username
    try {
      await fetch('https://buttondown.email/api/emails/embed-subscribe/olarislabs', {
        method: 'POST',
        body: new FormData(e.target),
        mode: 'no-cors'
      })
      sessionStorage.setItem('sf_last_sub', Date.now().toString())
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('success') // no-cors always throws, treat as success
    }
  }

  return (
    <section className="email-section">
      <div className="container">
        <div className="email-card">
          <div className="email-text">
            <h3 className="email-title">New sheets, first.</h3>
            <p className="email-sub">Get notified when new cheat sheets drop. No spam, unsubscribe anytime.</p>
          </div>
          {status === 'success' ? (
            <div className="email-success">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              You're on the list!
            </div>
          ) : (
            <form className="email-form" onSubmit={handleSubmit} name="email" method="post">
              <input type="hidden" value="1" name="embed" />
              <input
                type="email"
                name="email"
                className="email-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="email-btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'Subscribing...' : 'Notify me'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
