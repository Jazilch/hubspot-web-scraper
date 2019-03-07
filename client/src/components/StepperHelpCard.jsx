'use es6';

import React, { Component } from 'react';
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

class StepperHelpCard extends Component {
  renderContent = activeStep => {
    switch (activeStep) {
      case 0:
        return (
          <div>
            <p>Welcome to the HubSpot Web Scraper!</p>
            <p>Start by entering the URL of your website and then hit next.</p>
          </div>
        );
      case 1:
        return (
          <div>
            <p>We just checked your website and these are the posts and images we found.</p>
            <p>Make sure these are correct and then click next</p>
          </div>
        );
      case 2:
        return 'Now that we have the posts data we can see which posts are in HubSpot. Once you have reviewed the posts click next and this will upload your images into the HubSpot File Manager';
      case 3:
        return 'Awesome! Lets upload the images to HubSpot';
      case 4:
        return 'Last Step! Lets update all your posts with the new data';
      default:
        return 'Hmmmm who are you ';
    }
  };

  render() {
    const { classes, activeStep } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>{this.renderContent(activeStep)}</CardContent>
      </Card>
    );
  }
}

StepperHelpCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  activeStep: PropTypes.number.isRequired
};

export default withStyles(styles)(StepperHelpCard);
