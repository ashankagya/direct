import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  phone: string;
  reliabilityScore: number;
  isElite: boolean;
  tags: string[];
  photoUrl: string;
}

interface AppState {
  currentUser: User | null;
  selectedProfileForDate: User | null;
  isSchedulerModalOpen: boolean;
  
  hasAgreedToRules: boolean;
  isOnboarded: boolean;
  
  // Actions
  setCurrentUser: (user: User) => void;
  setSelectedProfile: (user: User | null) => void;
  setSchedulerModalOpen: (isOpen: boolean) => void;
  
  setAgreedToRules: (val: boolean) => void;
  setOnboarded: (val: boolean) => void;
}

// Mock current user for MVP
const MOCK_CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex',
  phone: '(555) 123-4567',
  reliabilityScore: 100,
  isElite: false,
  tags: ['Coffee', 'Tech', 'Night Owl'],
  photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
};

export const useAppStore = create<AppState>((set) => ({
  currentUser: MOCK_CURRENT_USER,
  selectedProfileForDate: null,
  isSchedulerModalOpen: false,
  hasAgreedToRules: false,
  isOnboarded: false,
  
  setCurrentUser: (user) => set({ currentUser: user }),
  setSelectedProfile: (user) => set({ selectedProfileForDate: user }),
  setSchedulerModalOpen: (isOpen) => set({ isSchedulerModalOpen: isOpen }),
  setAgreedToRules: (val) => set({ hasAgreedToRules: val }),
  setOnboarded: (val) => set({ isOnboarded: val }),
}));
