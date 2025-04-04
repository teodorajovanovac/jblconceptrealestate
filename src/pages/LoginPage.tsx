import React from 'react';
import { LoginForm } from "../components/admin/LoginForm";
import Seo from '../services/meta/Seo';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Seo title="Admin Prijava | JBL Concept Real Estate" />
      <div className="flex flex-grow items-center justify-center py-16 px-4 bg-gray-50">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 