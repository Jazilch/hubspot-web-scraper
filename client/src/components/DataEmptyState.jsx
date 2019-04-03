'use es6';

import React from 'react';
import PropTypes from 'prop-types';

const DataEmptyState = ({ url }) => (
  <div>
    <p>Couldnt find any data from your website. Try checking your URL</p>
    <p>
      URL Submitted:
      {url}
    </p>
  </div>
);

DataEmptyState.propTypes = {
  url: PropTypes.string.isRequired
};

export default DataEmptyState;
