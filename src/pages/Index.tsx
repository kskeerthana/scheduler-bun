
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { TaskProvider } from '../contexts/TaskContext';
import LoginPage from '../components/LoginPage';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';
import Calendar from '../components/Calendar';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'calendar'>('dashboard');

  if (!isAuthenticated) {
    return <LoginPage />;
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
