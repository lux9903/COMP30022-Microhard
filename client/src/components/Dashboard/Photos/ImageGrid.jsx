import React, {Component, Fragment} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Gallery from 'react-grid-gallery';
import {fetchPhotos,deletePhoto} from '../../../actions/photoAction';
import {connect} from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import {CircularProgress} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

class ImageGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      deleteImageLink: null,
      currentImage: 0,
      page: 1,
    };
    this.deleteImage = this.deleteImage.bind(this);
    this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
  }
  deleteImage(e) {
    e.preventDefault();
    if (
      window.confirm(
        `Are you sure you want to delete image number ${this.state.currentImage}?`
      )
    ) {
      this.props.dispatch(deletePhoto(this.props.photo.photos[this.state.currentImage]._id));
    }
  }
  onCurrentImageChange(index) {
    this.setState({currentImage: index});
  }
  componentDidMount() {

    this.props.dispatch(fetchPhotos());
  }


  render() {
    const {classes} = this.props;
    const { error, isFetching, photos } = this.props.photo;

    let content;

    if (error) {
      content = <Alert variant='danger'>{error}</Alert>;
    } else if (isFetching) {
      content = (
        <div className='text-center'>
          <CircularProgress>
            <span>Loading...</span>
          </CircularProgress>
        </div>
      );
    }else if (photos.length === 0 || !photos) {
      content = (
        <p className='lead'>
          No photos found.
        </p>
      );
    }
    else {
        const photodata = photos.map(getPhoto);

        function getPhoto(elem) {
          return {
            src: '/api/image/' + elem.filename,
            thumbnail: '/api/image/' + elem.filename,
            thumbnailWidth: 'auto',
            thumbnailHeight: 250,
          };
        }

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
              images={photodata}
              enableLightbox={true}
              enableImageSelection={false}
              currentImageWillChange={this.onCurrentImageChange}
              customControls={[
                <button key="deleteImage" onClick={this.deleteImage}>
                  Delete Image
                </button>
              ]}
            />
          </div>
        );
        content =(
          <div>
            {photogrid}
          </div>
        );



    }
    return (
      <Fragment>
        <div className={classes.root}>
          {content}
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(withStyles(styles)(ImageGrid));

