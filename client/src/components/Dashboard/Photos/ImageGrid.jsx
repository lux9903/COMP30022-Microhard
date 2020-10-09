import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import axios from '../../../helpers/axiosConfig';
import {Container} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Gallery from 'react-grid-gallery';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      deleteImageLink: null,
      currentImage: 0,
    };
    this.deleteImage = this.deleteImage.bind(this);
    this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
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
        );
        ReactDOM.render(photogrid, document.getElementById('all_img'));
      }
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <div id="all_img"></div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Image);
