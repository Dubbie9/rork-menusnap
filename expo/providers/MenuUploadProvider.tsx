import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Restaurant } from '@/types/restaurant';

interface MenuUploadContextType {
  agentName: string;
  selectedRestaurant: Restaurant | null;
  photos: string[];
  setAgentName: (name: string) => void;
  setSelectedRestaurant: (restaurant: Restaurant) => void;
  addPhoto: (photoUri: string) => void;
  removePhoto: (index: number) => void;
  clearUpload: () => void;
}

const MenuUploadContext = createContext<MenuUploadContextType | undefined>(undefined);

export function MenuUploadProvider({ children }: { children: ReactNode }) {
  const [agentName, setAgentName] = useState<string>('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);

  const addPhoto = (photoUri: string) => {
    setPhotos(prev => [...prev, photoUri]);
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const clearUpload = () => {
    setSelectedRestaurant(null);
    setPhotos([]);
  };

  return (
    <MenuUploadContext.Provider value={{
      agentName,
      selectedRestaurant,
      photos,
      setAgentName,
      setSelectedRestaurant,
      addPhoto,
      removePhoto,
      clearUpload,
    }}>
      {children}
    </MenuUploadContext.Provider>
  );
}

export function useMenuUpload() {
  const context = useContext(MenuUploadContext);
  if (context === undefined) {
    throw new Error('useMenuUpload must be used within a MenuUploadProvider');
  }
  return context;
}