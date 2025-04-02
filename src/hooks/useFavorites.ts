
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { toast } from '@/hooks/use-toast';

export type FavoriteType = 'projects' | 'components' | 'guides' | 'languages';

export function useFavorites(type: FavoriteType) {
  const { user, updateProfile } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.favorites && user.favorites[type]) {
      setFavorites(user.favorites[type] || []);
    } else {
      setFavorites([]);
    }
  }, [user, type]);

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  const toggleFavorite = async (id: string, itemName?: string) => {
    setIsLoading(true);
    try {
      const newFavorites = [...favorites];
      
      if (isFavorite(id)) {
        // Remove from favorites
        const index = newFavorites.indexOf(id);
        if (index > -1) {
          newFavorites.splice(index, 1);
        }
        
        // Update user profile
        const updatedFavorites = {
          ...(user?.favorites || {}),
          [type]: newFavorites
        };
        
        await updateProfile({ favorites: updatedFavorites });
        setFavorites(newFavorites);
        
        toast({
          title: 'Removed from favorites',
          description: itemName ? `${itemName} removed from your favorites` : 'Item removed from your favorites',
        });
      } else {
        // Add to favorites
        newFavorites.push(id);
        
        // Update user profile
        const updatedFavorites = {
          ...(user?.favorites || {}),
          [type]: newFavorites
        };
        
        await updateProfile({ favorites: updatedFavorites });
        setFavorites(newFavorites);
        
        toast({
          title: 'Added to favorites',
          description: itemName ? `${itemName} added to your favorites` : 'Item added to your favorites',
        });
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast({
        title: 'Error',
        description: 'Failed to update favorites. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    isLoading
  };
}
