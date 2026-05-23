import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/appStore';
import { AppLayout } from './layouts/AppLayout';
import { LoginPage } from './pages/Login';
import { DashboardPage } from './pages/Dashboard';
import { ItemListPage } from './pages/ItemList';
import { ItemDetailPage } from './pages/ItemDetail';
import { ItemNewPage } from './pages/ItemNew';
import { LocationsPage } from './pages/Locations';
import { ReportsPage } from './pages/Reports';
import { NotFoundPage } from './pages/NotFound';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="items" element={<ItemListPage />} />
            <Route path="items/new" element={<ItemNewPage />} />
            <Route path="items/:id" element={<ItemDetailPage />} />
            <Route path="items/:id/edit" element={<ItemDetailPage />} />
            <Route path="locations" element={<LocationsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
            <Route path="settings" element={<PlaceholderPage title="Settings" />} />
            <Route path="help" element={<PlaceholderPage title="Help & Support" />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-14 h-14 rounded-2xl bg-gray-800/80 border border-gray-700/50 flex items-center justify-center mb-4">
        <span className="text-2xl text-gray-500">🔧</span>
      </div>
      <h2 className="text-lg font-semibold text-gray-300 mb-1">{title}</h2>
      <p className="text-sm text-gray-500">This page is coming soon.</p>
    </div>
  );
}
