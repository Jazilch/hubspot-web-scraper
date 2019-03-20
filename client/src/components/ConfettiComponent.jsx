'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import Confetti from 'react-dom-confetti';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  confetti: {
    width: '20px',
    margin: '0 auto'
  }
};

const config = {
  angle: 90,
  spread: '250',
  startVelocity: 45,
  elementCount: 50,
  dragFriction: 0.1,
  duration: 6000,
  delay: 0,
  width: '10px',
  height: '10px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
};

const ConfettiComponent = ({ confettiActive, classes }) => (
  <Confetti className={classes.confetti} active={confettiActive} config={config} />
);

ConfettiComponent.propTypes = {
  confettiActive: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(ConfettiComponent);
