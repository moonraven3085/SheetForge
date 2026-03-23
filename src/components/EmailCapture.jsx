import { useState } from 'react'
import './EmailCapture.css'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      await fetch('https://buttondown.email/api/emails/embed-subscribe/olarislabs', {
        method: 'POST',
        body: new FormData(e.target),
        mode: 'no-cors'
      })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('success')
    }
  }

  return (
    <section className="email-section">
      <div className="container">
        <div className="email-card">
          <div className="email-text">
            <h3 className="email-title">Get new sheets first.</h3>
            <p className="email-sub">No spam, unsubscribe anytime.</p>
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
