import { StateCreator } from 'zustand';
import type { Recipe } from '../types';
import { createNotificationSlice, NotificationSliceType } from './notificationSlice';
import { RecipesSliceType } from './recipeSlice';


export type FavouritesSliceType = {
    favourites: Recipe[],
    handleClickFavourite: (recipe: Recipe) => void
    favouriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavouriteSlice: StateCreator<FavouritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavouritesSliceType> = (set, get, api) => ({ //MUCHO OJO CON EL ORDEN CANCERIGENO!
    favourites: [],
    handleClickFavourite: (recipe: Recipe) => {
        if (get().favouriteExists(recipe.idDrink)) { // si está en favoritos...
            set({ //lo quitamos de favoritos
                favourites: [...get().favourites.filter(favourite => favourite.idDrink !== recipe.idDrink)]
            })
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se eliminó de favoritos',
                error: false
            })
        } else { //si no, lo añadimos.
            set({
                favourites: [...get().favourites, recipe]
            })
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se añadió a favoritos',
                error: false
            })
        }
        localStorage.setItem('favourites', JSON.stringify(get().favourites))
    },
    favouriteExists: (id) => {
        return get().favourites.some(favourite => favourite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavourites = localStorage.getItem('favourites')
        if (storedFavourites) {
            set({
                favourites: JSON.parse(storedFavourites)
            })
        }
    }
})