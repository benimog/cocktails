import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
} from '@mui/material';
import CocktailList from './components/CocktailList';
import CocktailRecipe from './components/CocktailRecipe';
import { fetchCocktails, fetchCategories } from './services/cocktailApi';
import { SelectChangeEvent } from '@mui/material/Select';
import TopBar from './components/TopBar';

const App: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.drinks.map((drink: any) => drink.strCategory));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoryList();
  }, []);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Router>
      <TopBar categories={[]} selectedCategory={''} handleCategoryChange={function (event: SelectChangeEvent<string>): void {
        throw new Error('Function not implemented.');
      } } />

      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Cocktail Recipes
        </Typography>

        <Routes>
          <Route path="/" element={<CocktailList category={selectedCategory} />} />
          <Route path="/recipe/:id" element={<CocktailRecipe />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
