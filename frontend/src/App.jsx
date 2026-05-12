import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage'

function PrivateRoute({ children }) {
  const token = sessionStorage.getItem('access_token')
  return token ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const token = sessionStorage.getItem('access_token')
  return token ? <Navigate to="/" replace /> : children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><WelcomePage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
