import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import TopBar from './components/TopBar';
import CocktailList from './components/DrinkList';
import CocktailRecipe from './components/DrinkRecipe';
import { fetchCategories } from './services/drinkApi';
import { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SearchResults from './components/SearchResults';

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


          {categories.length > 0 ? (
            <Routes>
<Route path="/" element={<CocktailList category={selectedCategory} selectedCategory={selectedCategory} />} />
              <Route path="/drink/:id" element={<CocktailRecipe />} />
              <Route path="/search/:term" element={<SearchResults />} />
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
