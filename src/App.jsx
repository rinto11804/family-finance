import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUpPage from './screens/auth/pages/SignUpPage'
import LoginPage from './screens/auth/pages/LoginPage';
import FamilyMembersPage from './screens/family/pages/FamilyMembersPage';
import CreateFamilyPage from './screens/family/pages/CreateFamilyPage';
import JoinFamilyPage from './screens/family/pages/JoinFamilyPage';
import DashboardPage from './screens/dashboard/pages/DashboardPage';
import TransactionsPage from './screens/transactions/pages/TransactionsPage';
import CategoryPage from './screens/categories/pages/CategoryPage';
import AnalysisPage from './screens/analysis/pages/AnalysisPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-base-200">
        <Routes>
          {/* Public routes */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/transactions" element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          } />
          <Route path="/categories" element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          } />
          <Route path="/analysis" element={
            <ProtectedRoute>
              <AnalysisPage />
            </ProtectedRoute>
          } />

          {/* Family Management Routes */}
          <Route path="/family/members" element={
            <ProtectedRoute>
              <FamilyMembersPage />
            </ProtectedRoute>
          } />
          <Route path="/family/create" element={
            <ProtectedRoute>
              <CreateFamilyPage />
            </ProtectedRoute>
          } />
          <Route path="/family/join" element={
            <ProtectedRoute>
              <JoinFamilyPage />
            </ProtectedRoute>
          } />

          {/* Redirect root to signup */}
          <Route path="/" element={<Navigate to="/signup" replace />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
