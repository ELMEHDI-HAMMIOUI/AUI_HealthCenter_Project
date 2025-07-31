import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Consultations from './pages/Consultations';
import Medicines from './pages/Medicines';
import StockManagement from './pages/StockManagement';
import Students from './pages/Students';
import Suppliers from './pages/Suppliers';
import Reports from './pages/Reports';
import Personnel from './pages/Personnel';
import StudentPortal from './pages/StudentPortal';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  const isStudent = user?.role === 'STUDENT';

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {!isStudent && (
              <>
                <Route path="/consultations" element={<Consultations />} />
                <Route path="/medicines" element={<Medicines />} />
                <Route path="/stock" element={<StockManagement />} />
                <Route path="/students" element={<Students />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/personnel" element={<Personnel />} />
              </>
            )}
            <Route path="/student-portal" element={<StudentPortal />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;