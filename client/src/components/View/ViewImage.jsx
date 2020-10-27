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
import ViewNav from './ViewNav';
import Gallery from 'react-grid-gallery';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
});

class ViewImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view_user :"default",
        };

    }

    componentDidMount() {
        const user_id = this.props.match.params.id;

        const view_user = axios.get(`/view/${user_id}`).then((res) => {
            this.setState({view_user:res.data});
        })
                const imgs = axios.get(`/view/${user_id}/image`).then((res) => {
                    if (res.data.files) {
                        //const imgPic = res.data.files.map((ele) => src={"/api/image/"+ele.filename} alt={"/image/"+ele.filename} />);
                        const photodata = res.data.files.map(getPhoto);
 function getPhoto(elem) {
          return {
            src: '/api/image/' + elem.filename,
            thumbnail: '/api/image/' + elem.filename,
            thumbnailWidth: 'auto',
            thumbnailHeight: 250,
            thumbnailCaption: elem.caption,
            caption: elem.caption,
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
              fontFamily: 'Nunito, Lato, sans-serif',
              textAlign: 'center',
              background: 'white',
            }}
          >
            <Gallery
              images={photodata}
              enableLightbox={true}
              enableImageSelection={false}
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
                <ViewNav view_user={this.state.view_user}/>
                <div style={{height: '120px', backgroundColor: '#094183'}}>
                                  <br />
                                  <br />
                                  <Typography
                                    variant="h1"
                                    align="center"
                                    style={{color: '#fff', fontSize: '36px'}}
                                  >
                                      Photos
                                  </Typography>
                </div>

                <div className={classes.root}>
                    <Container>
                        <Helmet>
                            <title>Microhard &middot; Images </title>
                        </Helmet>
                        <br />
                        <div id="all_img" align="center"></div>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default withStyles(styles)(ViewImage);
