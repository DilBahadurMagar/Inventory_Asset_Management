import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { ToastContainer } from '../components/ui/Toast';
import { useApp } from '../store/appStore';

export function AppLayout() {
  const { state } = useApp();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopNav />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
