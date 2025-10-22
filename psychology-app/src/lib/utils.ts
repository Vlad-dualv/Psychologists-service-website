import { Psychologist, SortOption } from "./types";

export const formatPrice = (price: number): string => {
  return `${price}$`;
};

export const generateId = (): string => {
  return crypto.randomUUID().slice(0, 8);
};

// LOCAL STORAGE

const FAVORITES_STORAGE_KEY = "psychology-app-favorites";

export const localStorageUtils = {
  getFavorites: (): string[] => {
    if (typeof window === "undefined") return [];
    try {
      const favorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return [];
    }
  },

  saveFavorites: (favorites: string[]): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  },

  addFavorite: (psychologistId: string): void => {
    const favorites = localStorageUtils.getFavorites();
    if (!favorites.includes(psychologistId)) {
      favorites.push(psychologistId);
      localStorageUtils.saveFavorites(favorites);
    }
  },
  removeFavorite: (psychologistId: string): void => {
    const favorites = localStorageUtils.getFavorites();
    const updatedFavorites = favorites.filter((id) => id !== psychologistId);
    localStorageUtils.saveFavorites(updatedFavorites);
  },

  clearFavorites: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
  },
};

// SORT

export const sortPsychologists = (
  psychologists: Psychologist[],
  sortBy: SortOption,
  order: SortOrder = "asc"
): Psychologist[] => {
  return [...psychologists].sort((a, b) => {
    let valueA: string | number;
    let valueB: string | number;

    switch (sortBy) {
      case "name":
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case "price_per_hour":
        valueA = a.price_per_hour;
        valueB = b.price_per_hour;
        break;
      case "rating":
        valueA = a.rating;
        valueB = b.rating;
        break;
      default:
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
    }

    if (order === "asc") {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  });
};

// DEBOUNCE

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// VALIDATION

export const validationUtils = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
  },

  isValidPassword: (password: string): boolean => {
    return password.length >= 6;
  },
};

// ERROR HANDLING

export const errorUtils = {
  getFirebaseErrorMessage: (errorCode: string): string => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No user found with this email address.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      default:
        return "An error occurred. Please try again.";
    }
  },
};
