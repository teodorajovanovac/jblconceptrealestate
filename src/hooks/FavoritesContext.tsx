import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: number[];
  favoritesCount: number;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  clearAllFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteProperties');
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
        setFavoritesCount(parsedFavorites.length);
      } catch (error) {
        console.error('Error parsing favorites:', error);
      }
    }
  }, []);

  useEffect(() => {
    console.log('Favorites changed, updating count:', favorites.length);
    setFavoritesCount(favorites.length);
  }, [favorites]);

  const isFavorite = (propertyId: number): boolean => {
    return favorites.includes(propertyId);
  };

  const toggleFavorite = (propertyId: number): void => {
    console.log('toggleFavorite called for property:', propertyId);
    setFavorites(currentFavorites => {
      const newFavorites = isFavorite(propertyId)
        ? currentFavorites.filter(id => id !== propertyId)
        : [...currentFavorites, propertyId];
      
      console.log('New favorites state:', newFavorites);
      localStorage.setItem('favoriteProperties', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const clearAllFavorites = () => {
    localStorage.setItem('favoriteProperties', '[]');
    setFavorites([]);
    setFavoritesCount(0);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      favoritesCount, 
      isFavorite, 
      toggleFavorite,
      clearAllFavorites 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 