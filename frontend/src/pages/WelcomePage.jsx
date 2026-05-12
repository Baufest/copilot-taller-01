import { useNavigate } from 'react-router-dom'

function decodeJwtPayload(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = atob(base64)
    return JSON.parse(json)
  } catch {
    return null
  }
}

function getUsername() {
  const stored = sessionStorage.getItem('username')
  if (stored) return stored
  const token = sessionStorage.getItem('access_token')
  if (!token) return 'User'
  const payload = decodeJwtPayload(token)
  return payload?.sub || payload?.username || payload?.name || 'User'
}

export default function WelcomePage() {
  const navigate = useNavigate()
  const username = getUsername()

  function handleLogout() {
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('username')
    navigate('/login', { replace: true })
  }

  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div style={styles.pageBackground}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.headerBrand}>
            <div style={styles.headerLogoMark}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0F172A" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#0F172A" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#0F172A" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={styles.headerTitle}>Compliance Platform</span>
          </div>

          <div style={styles.headerRight}>
            <div style={styles.userPill}>
              <div style={styles.avatar}>{username.charAt(0).toUpperCase()}</div>
              <span style={styles.userPillText}>{username}</span>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={styles.main}>
        {/* Welcome hero */}
        <div style={styles.heroShell} className="shadow-card">
          <div style={styles.heroCard}>
            <div style={styles.heroBadge}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" fill="#22c55e"/>
              </svg>
              Active session
            </div>
            <h2 style={styles.heroTitle}>
              {greeting}, <span style={styles.heroName}>{username}</span>
            </h2>
            <p style={styles.heroSubtitle}>
              Welcome to the Compliance Platform. You have full access to your dashboard and compliance tools.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div style={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} style={styles.statShell} className="shadow-card">
              <div style={styles.statCard}>
                <div style={styles.statIconWrap}>
                  {stat.icon}
                </div>
                <div>
                  <div style={styles.statValue}>{stat.value}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info cards row */}
        <div style={styles.infoGrid}>
          <div style={styles.infoShell} className="shadow-card">
            <div style={styles.infoCard}>
              <div style={styles.infoCardHeader}>
                <h3 style={styles.infoCardTitle}>Session Information</h3>
                <div style={styles.infoCardBadge}>Active</div>
              </div>
              <div style={styles.infoList}>
                <InfoRow label="User" value={username} />
                <InfoRow label="Session start" value={now.toLocaleTimeString()} />
                <InfoRow label="Token storage" value="sessionStorage" />
                <InfoRow label="Auth method" value="JWT Bearer" />
              </div>
            </div>
          </div>

          <div style={styles.infoShell} className="shadow-card">
            <div style={styles.infoCard}>
              <div style={styles.infoCardHeader}>
                <h3 style={styles.infoCardTitle}>Quick Actions</h3>
              </div>
              <div style={styles.actionsList}>
                <ActionItem
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  label="Review compliance reports"
                  description="View and manage your compliance documentation"
                />
                <ActionItem
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  label="Analytics dashboard"
                  description="Monitor platform metrics and performance"
                />
                <ActionItem
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke="#0F172A" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="3" stroke="#0F172A" strokeWidth="1.5"/>
                    </svg>
                  }
                  label="Account settings"
                  description="Configure your preferences and security settings"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div style={infoRowStyles.row}>
      <span style={infoRowStyles.label}>{label}</span>
      <span style={infoRowStyles.value}>{value}</span>
    </div>
  )
}

const infoRowStyles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid rgba(241,245,249,0.8)',
  },
  label: {
    fontSize: '13px',
    color: '#64748B',
    fontWeight: '400',
  },
  value: {
    fontSize: '13px',
    color: '#0F172A',
    fontWeight: '500',
  },
}

function ActionItem({ icon, label, description }) {
  return (
    <div style={actionStyles.item}>
      <div style={actionStyles.iconWrap}>{icon}</div>
      <div>
        <div style={actionStyles.label}>{label}</div>
        <div style={actionStyles.desc}>{description}</div>
      </div>
    </div>
  )
}

const actionStyles = {
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid rgba(241,245,249,0.8)',
    cursor: 'pointer',
    transition: 'opacity 160ms ease',
  },
  iconWrap: {
    width: '32px',
    height: '32px',
    background: 'rgba(241,245,249,0.8)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  label: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#0F172A',
    lineHeight: '20px',
  },
  desc: {
    fontSize: '12px',
    color: '#64748B',
    lineHeight: '18px',
    marginTop: '1px',
  },
}

const stats = [
  {
    label: 'Compliance Score',
    value: '98%',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Active Policies',
    value: '24',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Open Issues',
    value: '3',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="1.5"/>
        <path d="M12 8v4M12 16h.01" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Last Audit',
    value: '2d ago',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="#64748B" strokeWidth="1.5"/>
        <path d="M16 2v4M8 2v4M3 10h18" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const cardShellStyle = {
  background: 'linear-gradient(to right bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.5), rgba(203,213,225,0.3))',
  borderRadius: '17px',
  padding: '1px',
}

const cardInnerStyle = {
  background: 'linear-gradient(to bottom right, rgba(255,255,255,0.95), rgba(248,249,250,0.9) 50%, rgba(255,255,255,0.85))',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '16px',
}

const styles = {
  pageBackground: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #FAFAFA 0%, #F8F9FA 40%, #E0E7FF 100%)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    borderBottom: '1px solid rgba(241,245,249,0.9)',
    background: 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  headerInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 24px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  headerLogoMark: {
    width: '32px',
    height: '32px',
    background: 'rgba(241,245,249,0.8)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(241,245,249,1)',
  },
  headerTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#0F172A',
    letterSpacing: '-0.01em',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 10px 4px 4px',
    background: 'rgba(241,245,249,0.6)',
    borderRadius: '32px',
    border: '1px solid rgba(241,245,249,0.9)',
  },
  avatar: {
    width: '24px',
    height: '24px',
    background: '#0F172A',
    borderRadius: '50%',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userPillText: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#0F172A',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    background: 'transparent',
    border: '1px solid rgba(15,23,42,0.12)',
    borderRadius: '4px',
    color: '#0F172A',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 160ms ease, border-color 160ms ease',
  },
  main: {
    flex: 1,
    maxWidth: '1100px',
    width: '100%',
    margin: '0 auto',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  heroShell: {
    ...cardShellStyle,
  },
  heroCard: {
    ...cardInnerStyle,
    padding: '32px 36px',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    background: 'rgba(34,197,94,0.08)',
    border: '1px solid rgba(34,197,94,0.2)',
    borderRadius: '32px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#16a34a',
    marginBottom: '16px',
  },
  heroTitle: {
    fontSize: '28px',
    fontWeight: '600',
    lineHeight: '36px',
    letterSpacing: '-0.025em',
    color: '#0F172A',
    marginBottom: '8px',
  },
  heroName: {
    color: '#0F172A',
  },
  heroSubtitle: {
    fontSize: '15px',
    color: '#64748B',
    lineHeight: '24px',
    maxWidth: '520px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  statShell: {
    ...cardShellStyle,
  },
  statCard: {
    ...cardInnerStyle,
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  statIconWrap: {
    width: '40px',
    height: '40px',
    background: 'rgba(241,245,249,0.8)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statValue: {
    fontSize: '22px',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    color: '#0F172A',
    lineHeight: '28px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#64748B',
    lineHeight: '18px',
    marginTop: '1px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
  },
  infoShell: {
    ...cardShellStyle,
  },
  infoCard: {
    ...cardInnerStyle,
    padding: '24px 28px',
  },
  infoCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  infoCardTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#0F172A',
  },
  infoCardBadge: {
    fontSize: '11px',
    fontWeight: '500',
    padding: '2px 8px',
    background: 'rgba(34,197,94,0.08)',
    color: '#16a34a',
    borderRadius: '32px',
    border: '1px solid rgba(34,197,94,0.2)',
  },
  infoList: {},
  actionsList: {},
}
