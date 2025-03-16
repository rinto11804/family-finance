import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUpPage from './screens/auth/pages/SignUpPage'
import LoginPage from './screens/auth/pages/LoginPage';
import FamilySetupPage from './screens/family/pages/FamilySetupPage';
import DashboardPage from './screens/dashboard/pages/DashboardPage';
import TransactionsPage from './screens/transactions/pages/TransactionsPage';

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-base-200">
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/family-setup" element={<FamilySetupPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/" element={<Navigate to="/signup" replace />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
