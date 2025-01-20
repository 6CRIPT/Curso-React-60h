import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import { FavouritesSliceType, createFavouriteSlice } from "./favouritesSlice";
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";

type StoreState = RecipesSliceType & FavouritesSliceType & NotificationSliceType;

export const useAppStore = create<StoreState>()(devtools((...a) => ({ //...a copia todos los argumentos y le pasamos los tipos de los slices que necesitemos
    ...createRecipesSlice(...a), //esto es para traerte el slice, y le pasas todos los argumentos (set, get, api)
    ...createFavouriteSlice(...a),
    ...createNotificationSlice(...a)
}))) //cada slide sera del tipo que toque
