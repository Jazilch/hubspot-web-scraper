'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ConfettiComponent from './ConfettiComponent';

const styles = {
  root: {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto'
  },
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

const Results = ({ uploadDone, classes }) => (
  <div className={classes.root}>
    <ConfettiComponent confettiActive={uploadDone} />
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>{uploadDone}</CardContent>
    </Card>
  </div>
);

Results.propTypes = {
  uploadDone: PropTypes.bool.isRequired,
  // confettiActive: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Results);
