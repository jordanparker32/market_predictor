import React from 'react';
//import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';

export default function GoogleInfo() {
  return (
    <React.Fragment>
      <Title>Google/Alphabet (GOOGL)</Title>
      <Typography color="textSecondary">
        Current Value:
      </Typography>
      <Typography component="p" variant="h5">
        $3,024.00
      </Typography>
      <Typography color="textSecondary">
        Predicted Closing Price:
      </Typography>
      <Typography component="p" variant="h4">
        $0,000.00
      </Typography>
    </React.Fragment>
  );
}
