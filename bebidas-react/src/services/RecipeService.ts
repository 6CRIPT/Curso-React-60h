import axios from "axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema";
import { Drink, SearchFilter } from "../types";


export async function getCategories(){
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list' //CLAVE, QUE NO SE TE OLVIDE EL PUTO HTTPS CANCERIGENO
    const {data} = await axios.get(url)

    const result = CategoriesAPIResponseSchema.safeParse(data) //esto simplemente valida que la respuesta de la API sea de la estructura que hemos definido.

    if(result.success){
        return result.data
    }
} 

export async function getRecipes(filters: SearchFilter){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}` //CLAVE, QUE NO SE TE OLVIDE EL PUTO HTTPS CANCERIGENO
    const {data} = await axios.get(url)

    const result = DrinksAPIResponse.safeParse(data) //esto simplemente valida que la respuesta de la API sea de la estructura que hemos definido.

    if(result.success){
        return result.data
    }
}

export async function getRecipeById(id: Drink['idDrink']){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}` //CLAVE, QUE NO SE TE OLVIDE EL PUTO HTTPS CANCERIGENO
    const {data} = await axios.get(url)

    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]) //esto simplemente valida que la respuesta de la API sea de la estructura que hemos definido.
    // console.log(result)
    if(result.success){
        return result.data
    }
}