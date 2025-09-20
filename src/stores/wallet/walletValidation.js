// stores/wallet/walletValidation.js
import { walletSchema } from "../../models/walletSchema";

export const validateWallet = (wallet) => {
  return walletSchema.parse(wallet);
};

export const validateWalletUniqueness = (wallets, name, excludeId = null) => {
  const trimmedName = name?.trim().toLowerCase();
  if (!trimmedName) return false;
  
  return !wallets.some((wallet) => {
    const walletName = wallet.name?.trim().toLowerCase();
    return walletName === trimmedName && wallet.id !== excludeId;
  });
};