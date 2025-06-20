
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface NavigationProps {
  currentView: 'dashboard' | 'calendar';
  onViewChange: (view: 'dashboard' | 'calendar') => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const { profile, user, signOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      });
    }
  };

  const displayName = profile?.name || user?.email || 'User';

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🗓️</span>
              <span className="font-semibold text-gray-900">Personal Scheduler</span>
            </div>
            
            <div className="flex space-x-1">
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => onViewChange('dashboard')}
                className="px-4 py-2 rounded-lg font-medium"
              >
                Dashboard
              </Button>
              <Button
                variant={currentView === 'calendar' ? 'default' : 'ghost'}
                onClick={() => onViewChange('calendar')}
                className="px-4 py-2 rounded-lg font-medium"
              >
                Calendar
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {displayName} 👋</span>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
