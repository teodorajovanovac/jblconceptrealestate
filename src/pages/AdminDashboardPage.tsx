import React from 'react';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import Seo from '../services/meta/Seo';
//import { AuthGuard } from '../components/admin/AuthGuard';

const AdminDashboardPage: React.FC = () => {
  return (
   // <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Seo title="Admin kontrolna tabla | JBL Concept Real Estate" />
        <div className="flex-grow bg-gray-50">
          <AdminDashboard />
        </div>
      </div>
    //</AuthGuard>
  );
};

export default AdminDashboardPage; 