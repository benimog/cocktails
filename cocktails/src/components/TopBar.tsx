import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Box } from '@mui/material';

interface TopBarProps {
  categories: string[];
  selectedCategory: string;
  handleCategoryChange: (event: SelectChangeEvent<string>) => void;
}

const TopBar: React.FC<TopBarProps> = ({ categories, selectedCategory, handleCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      // Navigate to the SearchResults page with searchTerm as a URL parameter
      navigate(`/search/${searchTerm}`);
    } catch (error) {
      console.error('Error searching for drink:', error);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <AppBar position="static" style={{ marginBottom: '20px' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl variant="outlined" margin="normal" style={{ marginRight: '1em', width: '200px' }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select labelId="category-label" value={selectedCategory} onChange={handleCategoryChange} label="Category">
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
          <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleClearSearch}>
            Crafty Mixology
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
