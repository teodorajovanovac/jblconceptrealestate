import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, LogOut, User, Calendar, Database, Home, Trash, Pen, PlusCircle } from 'lucide-react';
import { useAuth } from '../../services/AuthProvider';
import realEstate from '../../data/RealEstateData';
import { ComparisonResult } from '../../data/models/Import';

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
  const [runingPreview, setRuningPreview] = useState<boolean>(false);
  const [runPreviewDateTime, setRunPreviewDateTime] = useState<string>('');
  const [runDateTime, setRunDateTime] = useState<string>('');
  const [dataPreview, setDataPreview] = useState<boolean>(false);
  const [syncComplete, setSyncComplete] = useState<boolean>(false);
  const [loginRecords, setLoginRecords] = useState<LoginRecord[]>([]);
  const [responseData, setResponseData] = useState<ComparisonResult | null>(null);
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/promeni'); // Redirect to home page or login page after logout
  };

  const handleSync = async() => {
    setResponseData(null);
    setIsLoading(true);
    setSyncComplete(false);
    const response = await realEstate.importUpdate();
    setDataPreview(false);
    setResponseData(response || null);
    console.log('Response IN FORM:', JSON.stringify(response));
    setSyncComplete(true);
    setIsLoading(false);
    
  };
  
  const handleSyncPreview = async() => {
    setResponseData(null);
    setIsLoading(true);
    setSyncComplete(false);
    setRuningPreview(true);
    const response = await realEstate.importPreview();
    setDataPreview(true);
    setResponseData(response || null);
    console.log('Response IN FORM:', JSON.stringify(response));
    setSyncComplete(true);
    setRuningPreview(false);
    setIsLoading(false);
    
  };
  

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary-blue">Admin kontrolna tabla</h1>
        <div className="flex items-center gap-2">
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
                  Kliknite na dugme ispod da sinhronizujete najnovije podatke sa DIMEDIA servera.
                </p>
                
                <button 
                  onClick={handleSyncPreview}
                  disabled={isLoading}
                  className="w-full cta-button rounded-full flex items-center justify-center gap-2 mb-6"
                >
                  {isLoading && runingPreview ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Učitanjanje promena ...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw size={16} />
                      <span>Pregled pre sinhronizije podatke</span>
                    </>
                  )}
                </button>
                
                <button 
                  onClick={handleSync}
                  disabled={isLoading}
                  className="w-full cta-button rounded-full flex items-center justify-center gap-2"
                >
                  {isLoading && !runingPreview  ? (
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
        
        {/* Desna strana - ListaPromena */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-primary-blue">{(dataPreview? "Lista promena - preview" : "Lista izvršenih promena")}</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <RefreshCw size={14} className="mr-2" />
                        Akcija
                      </div>
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Home size={14} className="mr-2" />
                        ID
                      </div>
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2" />
                        Vreme promene 
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {responseData != null ? 
                  <>
                   {/* Add Items */}
                   {responseData.addItems.length > 0 ? (
                      responseData.addItems.map((record, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <PlusCircle size={14} className="mr-2" />
                              Novi podatak
                            </div>
                          </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{record.id}</div>
                          
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(record.edited)}</div>
                        </td>
                      </tr>
                    ))
                    ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                        Podataka za novi unos : 0;
                      </td>
                    </tr>
                  )} 
                  {/* Update Items */}
                  {responseData.updateItems.length > 0 ? (
                    responseData.updateItems.map((record, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Pen size={14} className="mr-2" />
                            Ažuriranje
                          </div>
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.id}</div>
                        
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(record.edited)}</div>
                      </td>
                    </tr>
                  ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                        Podataka za update unos : 0;
                      </td>
                    </tr>
                  )} 
                  
                    {/* Delete Items */}
                    {responseData.deleteItems.length > 0 ? (
                  responseData.deleteItems.map((record, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Trash size={14} className="mr-2" />
                          Brisanje
                        </div>
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.id}</div>
                      
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(record.edited)}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                    Podataka za brisanje : 0;
                  </td>
                </tr>
              )} </>
                 : (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                        Nema podataka sunhronizacije
                      </td>
                    </tr>
                  )}
                
                
                
                
                
                
                </tbody>
              </table>
            </div>
          </div>

        {/* Desna strana - Evidencija logovanja */}
          {/* <div className="bg-white p-6 rounded-lg shadow-md">
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
          </div> */}

        </div>
      </div>
    </div>
  );
}; 