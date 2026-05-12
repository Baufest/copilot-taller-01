import { useNavigate } from 'react-router-dom';
import { getUsername, logout as authLogout } from '../utils/auth';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  const username = getUsername();

  const handleLogout = () => {
    authLogout();
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-header">
          <h1 className="welcome-title">Compliance Platform</h1>
          <p className="welcome-subtitle">Panel de control</p>
        </div>

        <div className="welcome-content">
          <div className="user-info-card">
            <div className="user-avatar">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2 className="user-greeting">Bienvenido, {username}!</h2>
            <p className="user-message">
              Has iniciado sesión correctamente en el sistema.
            </p>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="info-title">Sesión Segura</h3>
              <p className="info-description">
                Tu sesión está protegida con autenticación JWT
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="info-title">Token Activo</h3>
              <p className="info-description">
                Tu token de acceso es válido por 5 minutos
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="info-title">Acceso Protegido</h3>
              <p className="info-description">
                Esta página requiere autenticación
              </p>
            </div>
          </div>

          <div className="actions">
            <button onClick={handleLogout} className="logout-button">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
