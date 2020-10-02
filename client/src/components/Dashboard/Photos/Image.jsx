import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import axios from '../../../helpers/axiosConfig';
import {Container} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ImageGrid from './ImageGrid';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

// Photo page that contains upload button to upload and preview images in grid
class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      deleteImageLink: null,
      currentImage: 0,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post('/image/upload', formData)
      .then((response) => {
        alert('The file is successfully uploaded');
      })
      .catch((error) => {});
  }

  onChange(e) {
    this.setState({file: e.target.files[0]});
  }

  render() {
    const {classes} = this.props;
    return (
      <Fragment>
        <div style={{height: '120px', backgroundColor: '#094183'}}>
          <br />
          <br />
          <Typography variant="h1" align="center" style={{color: '#fff'}}>
            Photos
          </Typography>
        </div>

        <div className={classes.root}>
          <Container>
            <Helmet>
              <title>Microhard &middot; Photos </title>
            </Helmet>

            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              alignContent="center"
            >
              <Grid item xs={12} sm={12} md={12}>
                <div style={{padding: '20px'}}>
                  <form onSubmit={this.onFormSubmit}>
                    <Input
                      type="file"
                      name="file"
                      inputProps={{accept: 'image/*'}}
                      onChange={this.onChange}
                      color="primary"
                    />
                    <Button type="submit" color="primary" variant="contained">
                      Upload
                    </Button>
                  </form>
                </div>
              </Grid>
              <br />
            </Grid>
            <ImageGrid />
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Image);
