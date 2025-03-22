import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteProperties');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Check if a property is in favorites
  const isFavorite = (propertyId: number): boolean => {
    return favorites.includes(propertyId);
  };

  // Toggle a property in favorites
  const toggleFavorite = (propertyId: number): void => {
    let newFavorites: number[];
    
    if (isFavorite(propertyId)) {
      // Remove from favorites
      newFavorites = favorites.filter(id => id !== propertyId);
    } else {
      // Add to favorites
      newFavorites = [...favorites, propertyId];
    }
    
    // Update state
    setFavorites(newFavorites);
    
    // Save to localStorage
    localStorage.setItem('favoriteProperties', JSON.stringify(newFavorites));
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new CustomEvent('favoritesUpdated', { 
      detail: { favorites: newFavorites } 
    }));
  };

  // Get count of favorites
  const getFavoritesCount = (): number => {
    return favorites.length;
  };

  return {
    isFavorite,
    toggleFavorite,
    getFavoritesCount,
    favorites
  };
}

export default useFavorites; 