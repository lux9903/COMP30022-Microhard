import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';

import ReactDOM from 'react-dom';
import axios from '../../helpers/axiosConfig';
import { Container, Grid, Typography, Input, Button } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import UploadImgAndPDF from '../Home/UploadImgAndPDF';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

class FilesUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
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
      .post('/image/upload', formData, config)
      .then((response) => {
        alert('The file is successfully uploaded');
      })
      .catch((error) => {});
  }
  onChange(e) {
    this.setState({file: e.target.files[0]});
  }

  componentDidMount() {
    const imgs = axios.get('/image').then((res) => {
      if (res.data.files) {
        const imgPic = res.data.files.map((ele) => (
          <img
            src={'/api/image/' + ele.filename}
            alt={'/image/' + ele.filename}
          />
        ));
        ReactDOM.render(imgPic, document.getElementById('all_img'));
      }
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <Fragment>
        <div style={{height: '200px', backgroundColor: '#094183'}}>
          <br />
          <br />
          <br />
          <h1
            align="center"
            style={{color: '#fff', fontFamily: 'Nunito, sans-serif'}}
          >
            Upload image
          </h1>
        </div>

        <div className={classes.root}>
          <Container>
            <Helmet>
              <title>Microhard &middot; Upload Image </title>
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
              {/*<div id="all_img" align="center"></div>*/}
            </Grid>
            <br />
            <br />
            <hr />
            <UploadImgAndPDF />
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(FilesUploadComponent);
