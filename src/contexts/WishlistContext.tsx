
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_WISHLIST' };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: []
      };
    default:
      return state;
  }
};

const WishlistContext = createContext<{
  state: WishlistState;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
  isInWishlist: (id: number) => boolean;
} | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  const addToWishlist = (item: WishlistItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromWishlist = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (id: number) => {
    return state.items.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        state, 
        addToWishlist, 
        removeFromWishlist, 
        clearWishlist, 
        isInWishlist 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
