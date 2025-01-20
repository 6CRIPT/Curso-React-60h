import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";

export const useAppStore = create<RecipesSliceType>()(devtools((...a) => ({ //...a copia todos los argumentos
    ...createRecipesSlice(...a) //esto es para traerte el slice, y le pasas todos los argumentos (set, get, api)
}))) //cada slide sera del tipo que toque