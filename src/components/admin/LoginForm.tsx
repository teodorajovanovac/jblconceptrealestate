import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  // Check if user is already logged in
  useEffect(() => {
    const savedAuth = localStorage.getItem("adminAuth");
    if (savedAuth) {
      try {
        const auth = JSON.parse(savedAuth);
        if (auth.isLoggedIn) {
          navigate("/promeni/dashboard");
        }
      } catch (e) {
        // Invalid stored data
        localStorage.removeItem("adminAuth");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Molimo unesite korisničko ime i lozinku");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Ovde ćemo simulirati API poziv - kasnije ćemo ovo zameniti stvarnim API pozivom
      // U produkciji, koristiti stvarni API endpoint za validaciju
      
      // Fake authentication for demo purposes only
      // U pravoj implementaciji, ovaj deo bi poslao podatke na backend
      const isValidUser = username === "admin" && password === "admin123";
      
      if (isValidUser) {
        const authData = {
          isLoggedIn: true,
          username: username,
          timestamp: new Date().toISOString(),
        };
        
        // Sačuvaj u localStorage ako je "zapamti me" uključeno
        if (rememberMe) {
          localStorage.setItem("adminAuth", JSON.stringify(authData));
        } else {
          // U sessionStorage ako nije "zapamti me"
          sessionStorage.setItem("adminAuth", JSON.stringify(authData));
        }
        
        // Dodaj evidenciju logovanja
        const logins = JSON.parse(localStorage.getItem("adminLogins") || "[]");
        logins.push({
          username,
          timestamp: new Date().toISOString(),
          syncCount: 0
        });
        localStorage.setItem("adminLogins", JSON.stringify(logins));
        
        // Preusmeri na admin dashboard
        navigate("/promeni/dashboard");
      } else {
        setError("Neispravno korisničko ime ili lozinka");
      }
    } catch (err) {
      setError("Došlo je do greške prilikom prijave. Molimo pokušajte ponovo.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

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
              disabled={loading}
            >
              {loading ? 'Prijava u toku...' : 'Prijavi se'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 