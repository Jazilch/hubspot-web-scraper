'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    marginBottom: '2rem'
  }
};

const Header = ({ classes }) => (
  <div className={classes.root}>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          HubSpot Web Scraper
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Header);
