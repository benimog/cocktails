import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface TopBarProps {
  categories: string[];
  selectedCategory: string;
  handleCategoryChange: (event: SelectChangeEvent<string>) => void;
}

const TopBar: React.FC<TopBarProps> = ({ categories, selectedCategory, handleCategoryChange }) => {
  return (
    <AppBar position="static" style={{ marginBottom: '20px' }}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Drink Recipes
        </Typography>
        <FormControl variant="outlined" margin="normal" style={{ marginLeft: '1em', width: '120px' }} >
          <InputLabel id="category-label">Category</InputLabel>
          <Select labelId="category-label" value={selectedCategory} onChange={handleCategoryChange} label="Category" >
            {/* <MenuItem value="">All</MenuItem> */}
            {categories.map((category) => (
              <MenuItem key={category} value={category} >
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
