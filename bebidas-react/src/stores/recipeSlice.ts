// import {StateCreator} from 'zustand'
// type Category = {

// }
// export type RecipesSliceType = {
//     categories: Category[]
// }
// export const createRecipesSlice: StateCreator<RecipesSliceType> = (set, get, api) => ({
//     categories: []
// }) TODO ESTO, ES COMO LA PLANTILLA BASICA PARA HACER UN SLIDE

import {StateCreator} from 'zustand'
import { getCategories, getRecipeById, getRecipes } from '../services/RecipeService'
import type {Categories, Drink, Drinks, SearchFilter, Recipe} from '../types'

export type RecipesSliceType = {
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean
    fetchCategories: () => Promise<void>,
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>,
    closeModal: () => void
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks:[]
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal: true //para que el modal aparezca.
        })
    },
    closeModal: () => {
        set({
            modal:false,
            selectedRecipe: {} as Recipe // reiniciar la receta seleccionada!!
        })
    }
})