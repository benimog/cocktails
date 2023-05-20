import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strDrinkThumb: string;
}

interface CocktailListProps {
  cocktails: Cocktail[];
}

const CocktailList: React.FC<CocktailListProps> = ({ cocktails }) => {
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Cocktail List
      </Typography>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {cocktails.map((cocktail) => (
          <Card key={cocktail.idDrink} sx={{ maxWidth: 300 }}>
            <CardMedia component="img" height="200" image={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <CardContent>
              <Link to={`/cocktails/${cocktail.idDrink}`} style={{ textDecoration: 'none' }}>
                <Typography variant="h6" component="div">
                  {cocktail.strDrink}
                </Typography>
              </Link>
              <Typography variant="body2">{cocktail.strInstructions}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CocktailList;
