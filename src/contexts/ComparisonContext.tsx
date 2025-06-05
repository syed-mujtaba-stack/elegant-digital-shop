
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/data/products';

interface ComparisonState {
  items: Product[];
}

type ComparisonAction =
  | { type: 'ADD_TO_COMPARISON'; product: Product }
  | { type: 'REMOVE_FROM_COMPARISON'; productId: number }
  | { type: 'CLEAR_COMPARISON' };

const ComparisonContext = createContext<{
  state: ComparisonState;
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: number) => void;
  clearComparison: () => void;
  isInComparison: (productId: number) => boolean;
} | null>(null);

const comparisonReducer = (state: ComparisonState, action: ComparisonAction): ComparisonState => {
  switch (action.type) {
    case 'ADD_TO_COMPARISON':
      if (state.items.length >= 3) return state;
      if (state.items.find(item => item.id === action.product.id)) return state;
      return { items: [...state.items, action.product] };
    case 'REMOVE_FROM_COMPARISON':
      return { items: state.items.filter(item => item.id !== action.productId) };
    case 'CLEAR_COMPARISON':
      return { items: [] };
    default:
      return state;
  }
};

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(comparisonReducer, { items: [] });

  const addToComparison = (product: Product) => {
    dispatch({ type: 'ADD_TO_COMPARISON', product });
  };

  const removeFromComparison = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_COMPARISON', productId });
  };

  const clearComparison = () => {
    dispatch({ type: 'CLEAR_COMPARISON' });
  };

  const isInComparison = (productId: number) => {
    return state.items.some(item => item.id === productId);
  };

  return (
    <ComparisonContext.Provider value={{
      state,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
