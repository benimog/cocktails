import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const StyledInputContainer = styled("div")<{ isMobile: boolean }>(
  ({ isMobile }) => ({
    flex: isMobile ? "1 1 100%" : "initial",
    minWidth: 0,
  })
);

interface TopBarProps {
  categories: string[];
  selectedCategory: string;
  handleCategoryChange: (event: SelectChangeEvent<string>) => void;
}

const TopBar: React.FC<TopBarProps> = ({
  categories,
  selectedCategory,
  handleCategoryChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearch = async () => {
    try {
      navigate(`/search/${searchTerm}`);
    } catch (error) {
      console.error("Error searching for drink:", error);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <AppBar position="static" style={{ marginBottom: "20px" }}>
      <StyledToolbar>
        <div>
          <FormControl
            variant="outlined"
            margin="normal"
            style={{ minWidth: "200px" }}
          >
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ position: "relative" }}>
          <a
            href="/"
            onClick={handleClearSearch}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 1,
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/logo192.png"}
              alt="Logo"
              style={{
                height: "30px",
                marginRight: "10px",
                marginBottom: isMobile ? "10px" : 0,
                zIndex: 2,
              }}
            />
            <Typography
              variant="h6"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginBottom: isMobile ? "10px" : 0,
                zIndex: 2,
              }}
            >
              Crafty Mixology
            </Typography>
          </a>
        </div>
        <StyledInputContainer isMobile={isMobile}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            fullWidth={!isMobile}
          />
        </StyledInputContainer>
      </StyledToolbar>
    </AppBar>
  );
};

export default TopBar;
