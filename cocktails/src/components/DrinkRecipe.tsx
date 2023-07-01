import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, styled } from '@mui/material';
import { fetchDrink } from '../services/drinkApi';

interface Drink {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: string]: string | null;
}

const StyledDrinkRecipe = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& > *': {
    marginBottom: theme.spacing(2),
  },
  paddingBottom: theme.spacing(5),
}));

function convertImperialToMetric(text: string): string {
  // Convert mixed numbers to decimal
  const mixedToDecimal = text.replace(/(\d+)\s+(\d+\/\d+)/g, function (match, p1, p2) {
    return (parseInt(p1) + eval(p2)).toFixed(2);
  });

  // Convert fractional numbers to decimal
  const fractionalToDecimal = mixedToDecimal.replace(/(\d+\/\d+)/g, function (match) {
    return (eval(match)).toFixed(2);
  });

  // Convert ranges to 'to'
  const rangeToTo = fractionalToDecimal.replace(/(\d+\.?\d*)-(\d+\.?\d*)\s*oz/g, function (match, p1, p2) {
    const cl1 = (parseFloat(p1) * 2.95735).toFixed(1); // 1 ounce = 2.95735 cl
    const cl2 = (parseFloat(p2) * 2.95735).toFixed(1);
    return cl1 + ' to ' + cl2 + ' cl';
  });

  // Convert ounces to centiliters
  const ounceToCl = rangeToTo.replace(/(\d+\.?\d*)\s*oz/g, function (match, p1) {
    const cl = (parseFloat(p1) * 2.95735).toFixed(1); // 1 ounce = 2.95735 cl
    return cl + ' cl';
  });

  // Convert inches to centimeters
  const inchToCm = ounceToCl.replace(/(\d+\.?\d*)\s*inches?/g, function (match, p1) {
    const cm = (parseFloat(p1) * 2.54).toFixed(1); // 1 inch = 2.54 cm
    return cm + ' cm';
  });

  return inchToCm;
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

  // Convert imperial units in ingredientList
  const ingredientList = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];

    if (ingredient || measure) {
      const convertedMeasure = measure ? convertImperialToMetric(measure) : measure;
      ingredientList.push(
        <li key={i}>
          {convertedMeasure} {ingredient}
        </li>
      );
    }
  }

  // Convert imperial units in instructions
  const convertedInstructions = convertImperialToMetric(cocktail.strInstructions);

  return (
    <StyledDrinkRecipe>
      <Typography variant="h4" gutterBottom>
        {cocktail.strDrink}
      </Typography>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} style={{ maxWidth: '100%', height: 'auto' }} />
      <Typography variant="h6">Ingredients:</Typography>
      <ul>{ingredientList}</ul>
      <Typography variant="h6">Instructions:</Typography>
      <Typography variant="body2">{convertedInstructions}</Typography>
    </StyledDrinkRecipe>
  );
};

export default CocktailRecipe;
