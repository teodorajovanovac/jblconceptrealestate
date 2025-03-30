import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  // Load favorites from localStorage on initial render
  useEffect(() => {
    console.log('useFavorites init effect');
    const storedFavorites = localStorage.getItem('favoriteProperties');
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        console.log('Loading favorites from storage:', parsedFavorites);
        setFavorites(parsedFavorites);
        setFavoritesCount(parsedFavorites.length);
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        setFavorites([]);
        setFavoritesCount(0);
      }
    }
  }, []);

  // Додајемо нови useEffect за праћење промена у favorites низу
  useEffect(() => {
    //console.log('Favorites changed, updating count:', favorites.length);
    // Форсирамо ажурирање favoritesCount чак и ако је иста вредност
    setFavoritesCount(prev => {
      const newCount = favorites.length;
      console.log('Updating favoritesCount from', prev, 'to', newCount);
      return newCount;
    });
  }, [favorites]);

  // Check if a property is in favorites
  const isFavorite = (propertyId: number): boolean => {
    return favorites.includes(propertyId);
  };

  // Toggle a property in favorites
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

  // // Get count of favorites
  // const getFavoritesCount = (): number => {
  //   return favorites.length;
  // };

  return {
    favorites,
    favoritesCount,
    isFavorite,
    toggleFavorite
  };
}

export default useFavorites; 