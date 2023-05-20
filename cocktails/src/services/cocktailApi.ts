import axios from 'axios';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const fetchCocktails = async (id?: string) => {
    try {
      const url = id ? `${BASE_URL}/lookup.php?i=${id}` : `${BASE_URL}/filter.php?c=Cocktail`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching cocktails:', error);
      throw error;
    }
  };
  
  export const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/list.php?c=list`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
  