import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import realEstate from '../data/RealEstateData';
import axios from 'axios';
import { ApiIsTokenValid } from '../data/Api';

// Define your auth types

interface Credentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}


type AuthContextType = {
  token: string | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("auth_token") || null
  );
  
  const [isLoading, setIsLoading] = useState(true);
  const [badUser, setBadUser] = useState(false);

  const setAxiosAuthHeader = (token: string | null) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };


  const setAuthData = (newToken:string) => {
    //REMOVE THIS LOG
    console.log('setAuthData')
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("auth_token", newToken);
    } else {
      localStorage.removeItem("auth_token");
    }
    setAxiosAuthHeader(newToken);
  };

  const getSavedUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const credentials : Credentials = JSON.parse(user);
      credentials.rememberMe = true; 
      login(JSON.parse(user));
      console.log('getSavedUser', credentials);
    }
  }


  const checkIfTokenIsValid = async () => {
    if (!token) {
      setAuthData(''); // Clear auth if no token
      if (!badUser) {
        console.warn("No token found. Attempting to get saved user.");
        getSavedUser(); // Try to get saved user if no token
      }
      return;
    }
    try {
      setAxiosAuthHeader(token);
      const response = await axios.get(ApiIsTokenValid);
      if (!response.data) {
        if (!badUser) {
          
          //setAuthData(''); // Clear auth if token is invalid
          //getSavedUser(); // Try to get saved user if no token
          throw new Error("No responce API.");
        }
        
      }
      console.log("Token is valid");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.warn("Token is invalid. Clearing auth data.");
        setAuthData(''); // Clear auth on 401
        //try to obtain new token
        getSavedUser();
      } else {
        console.error("Error validating token:", error);
      }
    }
  };
  
   // Initial Token Validation
   useEffect(() => {
    const validateToken = async () => {
      await checkIfTokenIsValid();
      setIsLoading(false);
    };
    validateToken();
  }, []);
  

  const login = async (credentials: { username: string; password: string, rememberMe?: boolean }) => {
    setIsLoading(true);
    try {
      const response = await realEstate.login({username: credentials.username, password: credentials.password});
      if (!response) {
        setBadUser(true);
        throw new Error('Login failed');
      }
      setBadUser(false);              
      setAuthData(response);
      
      if (credentials.rememberMe) 
        {
          localStorage.setItem('user', JSON.stringify(credentials));
        } else {
          localStorage.removeItem('user');
        }
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuthData(''); // Clear auth data
    localStorage.removeItem('user');
    // Additional logout logic as needed
  };

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        login, 
        logout, 
        isAuthenticated: !!token, 
        isLoading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};