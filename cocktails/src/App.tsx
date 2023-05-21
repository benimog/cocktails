import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import CocktailList from './components/DrinkList';
import CocktailRecipe from './components/DrinkRecipe';
import { fetchCategories } from './services/drinkApi';
import { SelectChangeEvent } from '@mui/material/Select';
import TopBar from './components/TopBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <TopBar categories={categories} selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />

        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            {selectedCategory === "" ? "Ordinary Drink" : selectedCategory} Recipes
          </Typography>

          {categories.length > 0 ? (
            <Routes>
              <Route path="/" element={<CocktailList category={selectedCategory} />} />
              <Route path="/drink/:id" element={<CocktailRecipe />} />
            </Routes>
          ) : (
            <Typography variant="body1" align="center">
              Loading categories...
            </Typography>
          )}
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
