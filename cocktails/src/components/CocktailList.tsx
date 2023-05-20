import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { fetchCocktails } from '../services/cocktailApi';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface CocktailListProps {
  category: string;
}

const CocktailList: React.FC<CocktailListProps> = ({ category }) => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    const fetchCocktailList = async () => {
      try {
        const data = await fetchCocktails(category);
        setCocktails(data.drinks);
      } catch (error) {
        console.error('Error fetching cocktails:', error);
      }
    };

    fetchCocktailList();
  }, [category]);

  return (
    <Grid container spacing={3} >
      {cocktails.map((cocktail) => (
        <Grid item key={cocktail.idDrink} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardActionArea component={Link} to={`/recipe/${cocktail.idDrink}`}>
              <CardMedia component="img" height="140" image={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <CardContent>
                <Typography variant="h6" component="h2" align="center">
                  {cocktail.strDrink}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CocktailList;
