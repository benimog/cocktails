import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { searchDrink } from '../services/drinkApi';

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const SearchResults: React.FC = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const { term } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const data = await searchDrink(term || "");
        setDrinks(data.drinks || []);
      } catch (error) {
        console.error(`Error fetching drinks for term ${term}:`, error);
      }
    };

    fetchSearchResults();
  }, [term]);

  return (
    <Grid container spacing={3}>
      {drinks.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center">
            No drinks found for this search.
          </Typography>
        </Grid>
      ) : (
        drinks.map((drink) => (
          <Grid item key={drink.idDrink} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea component={Link} to={`/drink/${drink.idDrink}`}>
                <CardMedia component="img" height="140" image={drink.strDrinkThumb} alt={drink.strDrink} />
                <CardContent>
                  <Typography variant="h6" component="h2" align="center">
                    {drink.strDrink}
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

export default SearchResults;
