import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import General from './General';
import Status from './Status';

import axios from 'axios';

export default function HomePage() {
  return (
    <Fragment>
      <Helmet>
        <title>Microhard &middot; Project</title>
      </Helmet>

      <div className={classes.heroContent}>
        <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" style={{color: '#fff'}} gutterBottom>
                <TextField
                    value = {this.state.name}
                    onKeyDown={this.handleNameChange}
                    onChange={this.handleNameOnChange}
                    fullWidth
                    InputProps={{
                        className: classes.input,
                        disableUnderline: true
                    }}
                    inputProps={{style: { textAlign: 'center' }}}
                />
            </Typography>
        </Container>
      </div>
    </Fragment>
  );
}
