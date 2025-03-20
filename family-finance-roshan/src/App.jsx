import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUpPage from './screens/auth/pages/SignUpPage'
import LoginPage from './screens/auth/pages/LoginPage';
import FamilySetupPage from './screens/family/pages/FamilySetupPage';
import DashboardPage from './screens/dashboard/pages/DashboardPage';
import TransactionsPage from './screens/transactions/pages/TransactionsPage';
import CategoryPage from './screens/categories/pages/CategoryPage';
import AnalyticsPage from './screens/analytics/pages/AnalyticsPage';

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
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/" element={<Navigate to="/signup" replace />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
