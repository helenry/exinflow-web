// stores/walletStore.js
import { create } from 'zustand';
import {
  getWalletsService,
  createWalletService,
  updateWalletService,
  deleteWalletService,
} from '../services/walletService';
import { walletSchema } from '../models/walletSchema';
import { trimStrings } from '../utils/format';
import { convertFirestoreTimestamps } from '../utils/type';
import { validateUniqueName } from '../utils/validation';
import { z } from 'zod';
import { serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

const validateWallet = wallet => walletSchema.parse(wallet);

const useWalletStore = create((set, get) => ({
  // State
  wallets: [],
  loading: false,
  error: null,
  currentUserUid: null,

  // Actions
  setCurrentUser: (userUid) => {
    const { currentUserUid, getWallets, reset } = get();
    
    if (currentUserUid !== userUid) {
      set({ currentUserUid: userUid });
      
      if (userUid) {
        getWallets(userUid);
      } else {
        reset();
      }
    }
  },

  getWallets: async (userUid) => {
    if (!userUid) return;

    set({ loading: true, error: null });

    try {
      const data = await getWalletsService(userUid);

      const walletList = data.map(convertFirestoreTimestamps).filter(wallet => {
        try {
          validateWallet(wallet);
          return true;
        } catch (e) {
          console.warn('Invalid wallet skipped:', e);
          return false;
        }
      });

      set({ wallets: walletList, loading: false });
    } catch (e) {
      console.error(e);
      set({ error: 'Failed to load wallets', loading: false });
    }
  },

  createWallet: async (walletData) => {
    const { wallets, currentUserUid } = get();
    
    set({ error: null });
    let errorMessage;
    
    try {
      const trimmed = trimStrings(walletData);
      if (!validateUniqueName(wallets, trimmed.name)) {
        errorMessage = 'Wallet name must be unique';
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const newWallet = {
        ...trimmed,
        user_uid: currentUserUid,
        is_deleted: false,
        created_at: serverTimestamp(),
        created_by: currentUserUid,
        updated_at: null,
        updated_by: null,
      };

      validateWallet({ ...newWallet, created_at: new Date() }); // zod doesn't like serverTimestamp

      const docRef = await createWalletService(newWallet);
      
      set(state => ({
        wallets: [...state.wallets, { id: docRef.id, ...newWallet, created_at: new Date() }]
      }));
      
      toast.success('Wallet created successfully!');
    } catch (e) {
      console.error(e);
      errorMessage =
        e instanceof z.ZodError
          ? 'Validation error: ' + e.errors.map(err => err.message).join(', ')
          : e.message || 'Failed to create wallet';
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw e; // Re-throw to allow component to handle if needed
    }
  },

  updateWallet: async (walletId, updatedData) => {
    const { wallets, currentUserUid } = get();
    
    set({ error: null });
    let errorMessage;
    
    try {
      const existing = wallets.find(w => w.id === walletId);
      if (!existing) {
        errorMessage = 'Wallet not found';
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const trimmed = trimStrings(updatedData);
      if (!validateUniqueName(wallets, trimmed.name, walletId)) {
        errorMessage = 'Wallet name must be unique';
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const merged = {
        ...existing,
        ...trimmed,
        updated_at: new Date(),
        updated_by: currentUserUid,
      };

      validateWallet(merged);

      await updateWalletService(walletId, {
        ...trimmed,
        updated_at: serverTimestamp(),
        updated_by: currentUserUid,
      });

      set(state => ({
        wallets: state.wallets.map(w =>
          w.id === walletId ? { ...w, ...trimmed, updated_at: new Date() } : w
        )
      }));
      
      toast.success('Wallet updated successfully!');
    } catch (e) {
      console.error(e);
      errorMessage =
        e instanceof z.ZodError
          ? 'Validation error: ' + e.errors.map(err => err.message).join(', ')
          : e.message || 'Failed to update wallet';
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw e; // Re-throw to allow component to handle if needed
    }
  },

  deleteWallet: async (walletId) => {
    set({ error: null });
    
    try {
      await deleteWalletService(walletId);
      set(state => ({
        wallets: state.wallets.filter(w => w.id !== walletId)
      }));
      toast.success('Wallet deleted successfully!');
    } catch (e) {
      console.error(e);
      const errorMessage = 'Failed to delete wallet';
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw e; // Re-throw to allow component to handle if needed
    }
  },

  reset: () => {
    set({
      wallets: [],
      loading: false,
      error: null,
    });
  },

  // Computed values (selectors)
  getWalletById: (walletId) => {
    const { wallets } = get();
    return wallets.find(w => w.id === walletId);
  },

  getWalletsByUser: (userUid) => {
    const { wallets } = get();
    return wallets.filter(w => w.user_uid === userUid);
  },
}));

export default useWalletStore;