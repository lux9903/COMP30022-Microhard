import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';

import ReactDOM from 'react-dom';
import axios from '../../helpers/axiosConfig';
import {Container} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Gallery from 'react-grid-gallery';
import clsx from 'clsx';

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
      deleteImageLink: null,
      currentImage: 0,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
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
  deleteImage() {
    if (
      window.confirm(
        `Are you sure you want to delete image number ${this.state.currentImage}?`
      )
    ) {
      axios.delete(this.state.deleteImageLink[this.state.currentImage]);
      window.location.reload();
    }
  }
  onCurrentImageChange(index) {
    this.setState({currentImage: index});
  }

  componentDidMount() {
    const imgs = axios.get('/image').then((res) => {
      if (res.data.files) {
        //const imgPic = res.data.files.map((ele) => src={"/api/image/"+ele.filename} alt={"/image/"+ele.filename} />);
        const photodata = res.data.files.map(getPhoto);
        function getPhoto(elem) {
          return {
            src: '/api/image/' + elem.filename,
            thumbnail: '/api/image/' + elem.filename,
            thumbnailWidth: 340,
            thumbnailHeight: 250,
          };
        }
        this.setState({images: photodata});
        const deleteLink = res.data.files.map((ele) => '/image/' + ele._id);
        this.setState({deleteImageLink: deleteLink});

        let photogrid = (
          <Container>
            <div
              style={{
                display: 'block',
                minHeight: '1px',
                width: '100%',
                border: '1px solid #ddd',
                overflow: 'auto',
              }}
            >
              <Gallery
                maxRows={5}
                images={photodata}
                enableLightbox={true}
                enableImageSelection={false}
                currentImageWillChange={this.onCurrentImageChange}
                customControls={[
                  <button key="deleteImage" onClick={this.deleteImage}>
                    Delete Image
                  </button>,
                ]}
              />
            </div>
          </Container>
        );
        ReactDOM.render(photogrid, document.getElementById('all_img'));
      }
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <Fragment>
        <div style={{height: '120px', backgroundColor: '#094183'}}>
          <br />
          <br />
          <Typography variant="h1" align="center" style={{color: '#fff'}}>
            Images
          </Typography>
        </div>

        <div className={classes.root}>
          <Container>
            <Helmet>
              <title>Microhard &middot; Images </title>
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
            <div id="all_img"></div>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(FilesUploadComponent);
