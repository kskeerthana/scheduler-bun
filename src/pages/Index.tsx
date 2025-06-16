
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { TaskProvider } from '../contexts/TaskContext';
import AuthPage from '../components/AuthPage';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';
import Calendar from '../components/Calendar';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'calendar'>('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-4xl mb-4">🗓️</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation 
          currentView={currentView} 
          onViewChange={setCurrentView} 
        />
        <main>
          {currentView === 'dashboard' ? <Dashboard /> : <Calendar />}
        </main>
      </div>
    </TaskProvider>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
