import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, LogOut, User, Calendar, Database } from 'lucide-react';

interface LoginRecord {
  username: string;
  timestamp: string;
  syncCount: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('sr-RS', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const AdminDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [syncComplete, setSyncComplete] = useState<boolean>(false);
  const [loginRecords, setLoginRecords] = useState<LoginRecord[]>([]);
  const [user, setUser] = useState<{username: string, timestamp: string} | null>(null);
  
  const navigate = useNavigate();

  // Proveri autentifikaciju prilikom učitavanja
  useEffect(() => {
    const authData = localStorage.getItem('adminAuth') || sessionStorage.getItem('adminAuth');
    
    if (!authData) {
      navigate('/promeni');
      return;
    }
    
    try {
      const userData = JSON.parse(authData);
      if (!userData.isLoggedIn) {
        navigate('/promeni');
        return;
      }
      
      setUser({
        username: userData.username,
        timestamp: userData.timestamp
      });
      
      // Učitaj evidenciju logovanja
      const logins = JSON.parse(localStorage.getItem('adminLogins') || '[]');
      setLoginRecords(logins.sort((a: LoginRecord, b: LoginRecord) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    } catch (e) {
      console.error('Error parsing auth data:', e);
      navigate('/promeni');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminAuth');
    navigate('/promeni');
  };

  const handleSync = () => {
    setIsLoading(true);
    setSyncComplete(false);
    
    // Simuliramo sinhronizaciju sa zadrškom
    setTimeout(() => {
      // Ažuriraj broj sinhronizacija za trenutnog korisnika
      const logins = JSON.parse(localStorage.getItem('adminLogins') || '[]');
      const updatedLogins = logins.map((login: LoginRecord) => {
        if (login.username === user?.username && 
            new Date(login.timestamp).toDateString() === new Date(user.timestamp).toDateString()) {
          return {
            ...login,
            syncCount: (login.syncCount || 0) + 1
          };
        }
        return login;
      });
      
      localStorage.setItem('adminLogins', JSON.stringify(updatedLogins));
      setLoginRecords(updatedLogins.sort((a: LoginRecord, b: LoginRecord) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
      
      setIsLoading(false);
      setSyncComplete(true);
    }, 2000);
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Učitavanje...</div>;
  }

  return (
    <div className="container mx-auto py-64 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary-blue">Admin kontrolna tabla</h1>
        
        <div className="flex items-center gap-2">
          <div className="text-right mr-4">
            <div className="font-medium">{user.username}</div>
            <div className="text-sm text-gray-500">Prijavljen: {formatDate(user.timestamp)}</div>
          </div>
          <button 
            onClick={handleLogout}
            className="cta-button rounded-full flex items-center gap-2"
          >
            <LogOut size={16} />
            <span>Odjavi se</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leva strana - Akcije */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4 text-primary-blue">Akcije</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Sinhronizacija podataka</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Kliknite na dugme ispod da sinhronizujete najnovije podatke sa servera.
                </p>
                
                <button 
                  onClick={handleSync}
                  disabled={isLoading}
                  className="w-full cta-button rounded-full flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Sinhronizacija...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw size={16} />
                      <span>Sinhronizuj podatke</span>
                    </>
                  )}
                </button>
                
                {syncComplete && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-center">
                    Sinhronizacija uspešno završena!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Desna strana - Evidencija logovanja */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-primary-blue">Evidencija aktivnosti</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <User size={14} className="mr-2" />
                        Korisnik
                      </div>
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2" />
                        Vreme prijave
                      </div>
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Database size={14} className="mr-2" />
                        Broj sinhronizacija
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loginRecords.length > 0 ? (
                    loginRecords.map((record, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{record.username}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(record.timestamp)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{record.syncCount || 0}</div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                        Nema zabeleženih aktivnosti
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 