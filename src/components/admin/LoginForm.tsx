import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../services/AuthProvider";

interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading } = useAuth();
  
  // Get the return path from location state or default to dashboard
  const from = (location.state as any)?.from?.pathname || "/promeni/dashboard";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Molimo unesite korisničko ime i lozinku");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use the login function from AuthProvider
      await login({ 
        username, 
        password, 
        rememberMe
      });
      
      //rememberMe 

      // If login is successful, AuthProvider will set isAuthenticated to true
      // and the useEffect above will handle the navigation
      
    } catch (err) {
      setError("Neispravno korisničko ime ili lozinka");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Don't render the form if already authenticated and not loading
  if (isAuthenticated && !isLoading) {
    return null;
  }

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-primary-blue mb-2">Admin prijava</h2>
          <p className="text-gray-600">Unesite vaše pristupne podatke</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <label htmlFor="username" className="font-medium text-gray-700">
                Korisničko ime
              </label>
              <input 
                id="username" 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                placeholder="korisnicko_ime"
                required 
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="password" className="font-medium text-gray-700">
                Lozinka
              </label>
              <input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                required 
              />
            </div>
            
            <div className="flex items-center">
              <input 
                id="remember-me" 
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded" 
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Zapamti me
              </label>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md">
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              className="cta-button rounded-full"
              disabled={loading || isLoading}
            >
              {loading || isLoading ? 'Prijava u toku...' : 'Prijavi se'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 