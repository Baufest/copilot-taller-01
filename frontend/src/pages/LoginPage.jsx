import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.detail || 'Invalid credentials. Please try again.')
        setLoading(false)
        return
      }

      const data = await res.json()
      sessionStorage.setItem('access_token', data.access_token)
      sessionStorage.setItem('username', username)
      navigate('/', { replace: true })
    } catch {
      setError('Unable to connect to the server. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={styles.pageBackground}>
      <div style={styles.centerContainer}>
        {/* Gradient border shell */}
        <div style={styles.gradientShell} className="shadow-card">
          <div style={styles.card}>
            {/* Logo mark */}
            <div style={styles.logoMark}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0F172A" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#0F172A" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#0F172A" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>

            <h1 style={styles.title}>Compliance Platform</h1>
            <p style={styles.subtitle}>Sign in to your account to continue</p>

            <form onSubmit={handleSubmit} style={styles.form} noValidate>
              <div style={styles.fieldGroup}>
                <label style={styles.label} htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  className="form-input"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  disabled={loading}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label} htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div style={styles.errorBox} role="alert">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
                    <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.5"/>
                    <path d="M8 5v3.5M8 11h.01" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="error-message" style={{ marginTop: 0 }}>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={loading || !username || !password}
                style={{ marginTop: '8px' }}
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <p style={styles.footerText}>
              Secure access powered by JWT authentication
            </p>
          </div>
        </div>
      </div>

      {/* Bottom watermark */}
      <div style={styles.pageFooter}>
        © {new Date().getFullYear()} Compliance Platform. All rights reserved.
      </div>
    </div>
  )
}

const styles = {
  pageBackground: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #FAFAFA 0%, #F8F9FA 40%, #E0E7FF 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  centerContainer: {
    width: '100%',
    maxWidth: '420px',
  },
  gradientShell: {
    background: 'linear-gradient(to right bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.5), rgba(203,213,225,0.3))',
    borderRadius: '17px',
    padding: '1px',
  },
  card: {
    background: 'linear-gradient(to bottom right, rgba(255,255,255,0.95), rgba(248,249,250,0.9) 50%, rgba(255,255,255,0.8))',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '16px',
    padding: '40px 36px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  logoMark: {
    width: '44px',
    height: '44px',
    background: 'rgba(241,245,249,0.8)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    border: '1px solid rgba(241,245,249,0.9)',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '32px',
    letterSpacing: '-0.025em',
    color: '#0F172A',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    color: '#64748B',
    marginBottom: '28px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    color: '#0F172A',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    background: 'rgba(220,38,38,0.05)',
    border: '1px solid rgba(220,38,38,0.15)',
    borderRadius: '4px',
    padding: '10px 12px',
  },
  footerText: {
    marginTop: '24px',
    fontSize: '12px',
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: '18px',
  },
  pageFooter: {
    marginTop: '32px',
    fontSize: '12px',
    color: '#94A3B8',
    textAlign: 'center',
  },
}
