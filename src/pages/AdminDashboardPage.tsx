import React from 'react';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import Header from '../components/header/Header';
import FooterTW from '../components/footer/FooterTW';
import Seo from '../services/meta/Seo';
import { AuthGuard } from '../components/admin/AuthGuard';

const AdminDashboardPage: React.FC = () => {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Seo title="Admin kontrolna tabla | JBL Concept Real Estate" />
        <Header />
        
        <div className="flex-grow bg-gray-50">
          <AdminDashboard />
        </div>
        
        <FooterTW />
      </div>
    </AuthGuard>
  );
};

export default AdminDashboardPage; 