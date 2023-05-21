import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { fetchDrink } from '../services/drinkApi';

interface Drink {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: string]: string | null;
}


const CocktailRecipe: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [cocktail, setCocktail] = useState<Drink | null>(null);

  useEffect(() => {
    const fetchCocktailData = async () => {
      if (id) {
        try {
          const data = await fetchDrink(id);
          setCocktail(data.drinks[0]);
        } catch (error) {
          console.error('Error fetching cocktail:', error);
        }
      }
    };

    fetchCocktailData();
  }, [id]);

  if (!cocktail) {
    return <Typography variant="body1">Loading drink...</Typography>;
  }

  const ingredientList = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];

    if (ingredient && measure) {
      ingredientList.push(
        <li key={i}>
          {measure} {ingredient}
        </li>
      );
    }
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {cocktail.strDrink}
      </Typography>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <Typography variant="h6">Ingredients:</Typography>
      <ul>{ingredientList}</ul>
      <Typography variant="h6">Instructions:</Typography>
      <Typography variant="body2">{cocktail.strInstructions}</Typography>
    </div>
  );
};

export default CocktailRecipe;
