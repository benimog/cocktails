import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchCocktails } from './services/cocktailApi';
import CocktailList from './components/CocktailList';
import CocktailRecipe from './components/CocktailRecipe';

const App: React.FC = () => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    const fetchCocktailsData = async () => {
      try {
        const data = await fetchCocktails();
        setCocktails(data.drinks);
      } catch (error) {
        console.error('Error fetching cocktails:', error);
      }
    };

    fetchCocktailsData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        My Cocktail Recipes
      </Typography>
      <Router>
        <Routes>
          <Route path="/" element={<CocktailList cocktails={cocktails} />} />
          <Route path="/cocktails/:id" element={<CocktailRecipe />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
