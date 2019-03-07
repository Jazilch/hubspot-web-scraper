'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  card: {
    maxWidth: '700px',
    margin: '20px auto',
    padding: '20px'
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const Results = ({ imageStatus, classes }) => (
  <Card className={classes.card}>
    <CardContent className={classes.cardContent}>{imageStatus}</CardContent>
  </Card>
);

Results.propTypes = {
  imageStatus: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Results);
