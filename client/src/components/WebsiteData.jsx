'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorComponent from './ErrorComponent';
import DataEmptyState from './DataEmptyState';
import { cleanBackgroundImage } from '../utils/cleanBackgroundImage';

const styles = () => ({
  root: {
    minHeight: '500px',
    maxWidth: '700px',
    width: '100%',
    margin: '20px auto',
    overflowX: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center'
  },
  head: {
    backgroundImage: 'linear-gradient(to right top, #3f51b5, #5262bf, #6473c9, #7684d3, #8895dc);'
  },
  cell: {
    color: '#fff'
  }
});

const WebsiteData = ({ data, url, loading, error, classes }) => (
  <main className="website__data">
    <Paper className={classes.root}>
      {!data.length && loading && <CircularProgress color="secondary" />}
      {!data.length && !loading && <ErrorComponent error={error} />}
      {data && !data.length && !loading && !error && <DataEmptyState url={url} />}
      {data && !!data.length && (
        <Table className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.cell}>Slug</TableCell>
              <TableCell className={classes.cell}>Featured Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(d => {
              return (
                <TableRow key={d.id}>
                  <TableCell>{d.slug}</TableCell>
                  <TableCell>
                    {d.featuredImage ? (
                      <img
                        src={cleanBackgroundImage(d.featuredImage)}
                        height="250"
                        width="250"
                        alt=""
                      />
                    ) : (
                      'No featured image found'
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Paper>
  </main>
);

WebsiteData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  url: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.object || PropTypes.string),
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(WebsiteData);
