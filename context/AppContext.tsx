import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for our context
interface UserSkinProfile {
  skinType?: string;
  concerns?: string[];
  sensitivity?: string;
  completed?: boolean;
}

interface UserRoutine {
  id: string;
  name: string;
  type: 'morning' | 'evening';
  steps: RoutineStep[];
}

interface RoutineStep {
  id: string;
  type: string;
  productId?: string;
  productName?: string;
  completed?: boolean;
}

interface ProgressEntry {
  id: string;
  date: string;
  imageUri: string;
  notes: string;
  concerns: string[];
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  addedDate: string;
}

interface AppContextType {
  userProfile: UserSkinProfile;
  updateUserProfile: (profile: Partial<UserSkinProfile>) => void;
  routines: UserRoutine[];
  addRoutine: (routine: UserRoutine) => void;
  updateRoutine: (id: string, routine: Partial<UserRoutine>) => void;
  deleteRoutine: (id: string) => void;
  progressEntries: ProgressEntry[];
  addProgressEntry: (entry: ProgressEntry) => void;
  deleteProgressEntry: (id: string) => void;
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  userProfile: {},
  updateUserProfile: () => {},
  routines: [],
  addRoutine: () => {},
  updateRoutine: () => {},
  deleteRoutine: () => {},
  progressEntries: [],
  addProgressEntry: () => {},
  deleteProgressEntry: () => {},
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserSkinProfile>({});
  const [routines, setRoutines] = useState<UserRoutine[]>([]);
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from storage on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        const profileData = await AsyncStorage.getItem('userProfile');
        const routinesData = await AsyncStorage.getItem('routines');
        const progressData = await AsyncStorage.getItem('progressEntries');
        const wishlistData = await AsyncStorage.getItem('wishlist');

        if (profileData) setUserProfile(JSON.parse(profileData));
        if (routinesData) setRoutines(JSON.parse(routinesData));
        if (progressData) setProgressEntries(JSON.parse(progressData));
        if (wishlistData) setWishlist(JSON.parse(wishlistData));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, []);

  // Save data to storage whenever it changes
  useEffect(() => {
    if (!isLoaded) return;

    const saveData = async () => {
      try {
        await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
        await AsyncStorage.setItem('routines', JSON.stringify(routines));
        await AsyncStorage.setItem('progressEntries', JSON.stringify(progressEntries));
        await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    saveData();
  }, [userProfile, routines, progressEntries, wishlist, isLoaded]);

  // Context methods
  const updateUserProfile = (profile: Partial<UserSkinProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };

  const addRoutine = (routine: UserRoutine) => {
    setRoutines(prev => [...prev, routine]);
  };

  const updateRoutine = (id: string, updates: Partial<UserRoutine>) => {
    setRoutines(prev => 
      prev.map(routine => routine.id === id ? { ...routine, ...updates } : routine)
    );
  };

  const deleteRoutine = (id: string) => {
    setRoutines(prev => prev.filter(routine => routine.id !== id));
  };

  const addProgressEntry = (entry: ProgressEntry) => {
    setProgressEntries(prev => [...prev, entry]);
  };

  const deleteProgressEntry = (id: string) => {
    setProgressEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const addToWishlist = (item: WishlistItem) => {
    // Check if item already exists
    if (!wishlist.some(i => i.id === item.id)) {
      setWishlist(prev => [...prev, item]);
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        routines,
        addRoutine,
        updateRoutine,
        deleteRoutine,
        progressEntries,
        addProgressEntry,
        deleteProgressEntry,
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => useContext(AppContext);