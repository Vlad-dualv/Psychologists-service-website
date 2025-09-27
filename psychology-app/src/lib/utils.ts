const FAVORITES_STORAGE_KEY = "psychology-app-favorites"

export const localStorageUtils = {
    getFavorites: (): string[] => {
        if (typeof window === "undefined") return [];
        try {
            const favorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
            return favorites ? JSON.parse(favorites) : []
        } catch (error) {
            console.error('Error reading favorites from localStorage:', error);
      return [];
        }
    },

    saveFavorites: (favorites: string[]): void => {
        if (typeof window === "undefined") return
        try {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
        } catch (error) {
            console.error('Error saving favorites to localStorage:', error);
        }
    },

    addFavorite: (psychologistId: string): void => {
        const favorites = localStorageUtils.getFavorites()
        if (!favorites.includes(psychologistId)) {
            favorites.push(psychologistId)
            localStorageUtils.saveFavorites(favorites)
        }
    },
    removeFavorite: (psychologistId: string): void => {
        const favorites = localStorageUtils.getFavorites()
        const updatedFavorites = favorites.filter(id => id !== psychologistId);
            localStorageUtils.saveFavorites(updatedFavorites)
        
    },

    clearFavorites: (): void => {
        if (typeof window === "undefined") return
        localStorage.removeItem(FAVORITES_STORAGE_KEY)
    }
}