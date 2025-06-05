
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '@/data/products';

interface RecentlyViewedState {
  items: Product[];
}

type RecentlyViewedAction =
  | { type: 'ADD_TO_RECENTLY_VIEWED'; product: Product };

const RecentlyViewedContext = createContext<{
  state: RecentlyViewedState;
  addToRecentlyViewed: (product: Product) => void;
} | null>(null);

const recentlyViewedReducer = (state: RecentlyViewedState, action: RecentlyViewedAction): RecentlyViewedState => {
  switch (action.type) {
    case 'ADD_TO_RECENTLY_VIEWED':
      const filtered = state.items.filter(item => item.id !== action.product.id);
      return { items: [action.product, ...filtered].slice(0, 5) };
    default:
      return state;
  }
};

export const RecentlyViewedProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(recentlyViewedReducer, { items: [] });

  const addToRecentlyViewed = (product: Product) => {
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', product });
  };

  return (
    <RecentlyViewedContext.Provider value={{
      state,
      addToRecentlyViewed
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};
