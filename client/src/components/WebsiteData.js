'use es6';

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  table: {
    maxWidth: 850,
    margin: '20px auto'
  }
});

const WebsiteData = ({ data, classes }) => (
  <main classname="website__data">
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
                <img src={d.featuredImage} height="250" width="250" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </main>
);

export default withStyles(styles)(WebsiteData);
