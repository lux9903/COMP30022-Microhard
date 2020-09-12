import React from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import {Container, Typography} from '@material-ui/core';

export default function Home() {
  return (
    <section>
      <Helmet>
        <title>Microhard &middot; Welcome </title>
      </Helmet>

      <Container>
        <div style={{padding: '30px'}}>
          <br />
          <Typography variant="h6">
            This is where you put your career path!
          </Typography>
        </div>
      </Container>
    </section>
  );
}
