'use es6';

import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem 2rem'
  },
  h1: {
    fontSize: '4rem'
  },
  h2: {
    fontSize: '3rem'
  }
};

const Lander = ({ classes }) => (
  <div className={classes.root}>
    <Typography className={classes.h1} component="h1" variant="h1" gutterBottom>
      HubSpot Web Scraper
    </Typography>
    <Typography className={classes.h2} variant="h2" gutterBottom>
      Get Started
    </Typography>
    <Button href="/auth/hubspot" variant="outlined" color="primary">
      Sign in with HubSpot
    </Button>
  </div>
);

Lander.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Lander);
