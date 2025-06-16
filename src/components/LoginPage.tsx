
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🗓️</h1>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Scheduler</h1>
            <p className="text-gray-600">Task + Reminder Manager</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Ready to manage your tasks?</p>
          </div>
          
          <Button 
            onClick={login}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Log in as demo-user
          </Button>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              This is a demo application. No real authentication required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
