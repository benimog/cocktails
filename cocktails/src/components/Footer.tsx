import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <AppBar
      position="static"
      style={{
        top: "auto",
        bottom: 0,
        marginTop: 12,
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
        alignItems: "center",
      }}
    >
      <Toolbar>
        <Typography variant="body1" color="inherit">
          Website created by{" "}
          <a
            style={{ color: "#FFF" }}
            target="_blank"
            href="http://erikmartinandersson.se"
            rel="noreferrer"
          >
            Martin
          </a>
          . Data provided by{" "}
          <a
            style={{ color: "#FFF" }}
            target="_blank"
            href="https://www.thecocktaildb.com/"
            rel="noreferrer"
          >
            TheCocktailDB
          </a>.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
