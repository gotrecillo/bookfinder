import React from 'react';
import AppBar from '../components/ui/AppBar';
import Toolbar from '../components/ui/Toolbar';
import Typography from '../components/ui/Typography';
import UnstyledLink from "../components/ui/UnstyledLink";

const Header = () =>
  <AppBar position="static">
    <Toolbar>
      <UnstyledLink to="/">
        <Typography variant="title" color="inherit">
          Bookfinder
        </Typography>
      </UnstyledLink>
    </Toolbar>
  </AppBar>;

export default Header;
