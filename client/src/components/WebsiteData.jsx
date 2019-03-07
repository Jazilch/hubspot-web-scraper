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

const styles = () => ({
  root: {
    width: '60%',
    minHeight: '500px',
    maxWidth: '700px',
    margin: '20px auto',
    overflowX: 'auto'
  }
});

const WebsiteData = ({ data, classes }) => (
  <main className="website__data">
    <Paper className={classes.root}>
      {!data.length ? (
        <CircularProgress color="secondary" />
      ) : (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Slug</TableCell>
              <TableCell>Featured Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map(d => (
                <TableRow>
                  <TableCell>{d.slug}</TableCell>
                  <TableCell>
                    <img src={d.featuredImage} height="250" width="250" alt="" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  </main>
);

WebsiteData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(WebsiteData);
