import axios from 'axios';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const fetchDrink = async (drinkId?: string) => {
    try {
      let url = `${BASE_URL}/filter.php?c=Ordinary Drink`;
      if (drinkId && drinkId !== '') {
        url = `${BASE_URL}/lookup.php?i=${drinkId}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching dirnks${drinkId ? ` for drink ${drinkId}` : ''}:`, error);
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
  
  export const fetchCocktailsByCategory = async (category: string) => {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    return data;
  };
  
  export const searchDrink = async (name: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/search.php?s=${name}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching dirnks${name ? ` for drink ${name}` : ''}:`, error);
      throw error;
    }
  }