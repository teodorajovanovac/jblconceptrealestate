import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Proverava da li je korisnik autentifikovan
    const checkAuth = () => {
      const authData = localStorage.getItem('adminAuth') || sessionStorage.getItem('adminAuth');
      
      if (!authData) {
        setIsAuthenticated(false);
        return;
      }
      
      try {
        const userData = JSON.parse(authData);
        setIsAuthenticated(userData.isLoggedIn === true);
      } catch (e) {
        console.error('Error parsing auth data:', e);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  // Prikaži loading stanje dok se proverava autentifikacija
  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen">Učitavanje...</div>;
  }

  // Redirekcija na login ako korisnik nije autentifikovan
  if (!isAuthenticated) {
    return <Navigate to="/promeni" replace />;
  }

  // Ako je korisnik autentifikovan, prikaži children komponente
  return <>{children}</>;
}; 