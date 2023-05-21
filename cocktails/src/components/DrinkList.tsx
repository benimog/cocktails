import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { fetchCocktailsByCategory } from '../services/drinkApi';

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface DrinkListProps {
  category: string;
}

const CocktailList: React.FC<DrinkListProps> = ({ category }) => {
  const [cocktails, setCocktails] = useState<Drink[]>([]);

  useEffect(() => {
    const fetchCocktailList = async () => {
      try {
        let data;
        if (category === '') {
          data = await fetchCocktailsByCategory("Ordinary Drink");
        } else {
          data = await fetchCocktailsByCategory(category);
        }
        setCocktails(data.drinks || []);
      } catch (error) {
        console.error(`Error fetching cocktails for category ${category}:`, error);
      }
    };

    fetchCocktailList();
  }, [category]);

  return (
    <Grid container spacing={3}>
      {cocktails.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center">
            No drinks found for this category.
          </Typography>
        </Grid>
      ) : (
        cocktails.map((cocktail) => (
          <Grid item key={cocktail.idDrink} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea component={Link} to={`/drink/${cocktail.idDrink}`}>
                <CardMedia component="img" height="140" image={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <CardContent>
                  <Typography variant="h6" component="h2" align="center">
                    {cocktail.strDrink}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default CocktailList;
