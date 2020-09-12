import React from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

export default function Home() {
  return (
    <section>
      <Helmet>
        <title>Microhard &middot; Welcome </title>
      </Helmet>

      <div className="container-fluid">
        <div className="form-wrap" style={{padding: '30px'}}>
          <br />
          <Typography variant="h6">
            This is where you put your career path!
          </Typography>
        </div>
      </div>
    </section>
  );
}
