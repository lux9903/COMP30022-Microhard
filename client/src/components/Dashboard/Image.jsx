// import React, {Component, Fragment} from 'react';
// import {Helmet} from 'react-helmet';
//
// import ReactDOM from 'react-dom';
// import axios from '../../helpers/axiosConfig';
// import {Container} from '@material-ui/core';
// import Grid from '@material-ui/core/Grid';
// import withStyles from '@material-ui/core/styles/withStyles';
// import Typography from '@material-ui/core/Typography';
// import Input from '@material-ui/core/Input';
// import Button from '@material-ui/core/Button';
//
// const styles = (theme) => ({
//   root: {
//     flexGrow: 1,
//   },
// });
//
// class FilesUploadComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       file: null,
//     };
//     this.onFormSubmit = this.onFormSubmit.bind(this);
//     this.onChange = this.onChange.bind(this);
//   }
//   onFormSubmit(e) {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('file', this.state.file);
//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data',
//       },
//     };
//     axios
//       .post('/image/upload', formData, config)
//       .then((response) => {
//         alert('The file is successfully uploaded');
//       })
//       .catch((error) => {});
//   }
//   onChange(e) {
//     this.setState({file: e.target.files[0]});
//   }
//
//   componentDidMount() {
//     const imgs = axios.get('/image').then((res) => {
//       if (res.data.files) {
//         const imgPic = res.data.files.map((ele) => (
//           <img
//             src={'/api/image/' + ele.filename}
//             alt={'/image/' + ele.filename}
//           />
//         ));
//         ReactDOM.render(imgPic, document.getElementById('all_img'));
//       }
//     });
//   }
//
//   render() {
//     const {classes} = this.props;
//     return (
//       <Fragment>
//         <div style={{height: '200px', backgroundColor: '#094183'}}>
//           <br />
//           <br />
//           <br />
//           <h1
//             align="center"
//             style={{color: '#fff', fontFamily: 'Nunito, sans-serif'}}
//           >
//             Upload image
//           </h1>
//         </div>
//
//         <div className={classes.root}>
//           <Container>
//             <Helmet>
//               <title>Microhard &middot; Upload Image </title>
//             </Helmet>
//
//             <Grid
//               container
//               direction="column"
//               justify="center"
//               alignItems="center"
//               alignContent="center"
//             >
//               <Grid item xs={12} sm={12} md={12}>
//                 <div style={{padding: '20px'}}>
//                   <form onSubmit={this.onFormSubmit}>
//                     <Input
//                       type="file"
//                       name="file"
//                       onChange={this.onChange}
//                       color="primary"
//                     />
//                     <Button type="submit" color="primary" variant="contained">
//                       Upload
//                     </Button>
//                   </form>
//                 </div>
//               </Grid>
//               <br />
//               <div id="all_img" align="center"></div>
//             </Grid>
//           </Container>
//         </div>
//       </Fragment>
//     );
//   }
// }
//
// export default withStyles(styles)(FilesUploadComponent);

import React, {Component} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

import ReactDOM from 'react-dom';
//import axios from 'axios';
import axios from '../../helpers/axiosConfig';
import MaterialTable from 'material-table';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

export default class FilesUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.ondelete = this.ondelete.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFormSubmitPDF = this.onFormSubmitPDF.bind(this);
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
  onFormSubmitPDF(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post('/pdf/upload', formData, config)
      .then((response) => {
        alert('The file is successfully uploaded');
      })
      .catch((error) => {});
  }
  onChange(e) {
    this.setState({file: e.target.files[0]});
  }
  ondelete(e) {
    e.preventDefault();
    const formData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .delete('/pdf/5f57882947ad6155d8f36837')
      .then((response) => {
        alert('deleted');
      })
      .catch((error) => {});
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

    const pdf = axios.get('/pdf').then((res) => {
      if (res.data.files) {
        const pdf = res.data.files.map((ele) => (
          <ul>
            <li>
              <a href={'/api/pdf/' + ele.filename}>{ele.filename}</a>
            </li>
          </ul>
        ));
        ReactDOM.render(pdf, document.getElementById('all_pdf'));
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div>
            <h3>React File Upload</h3>
          </div>
          <div>
            <form onSubmit={this.onFormSubmit}>
              <input type="file" name="file" onChange={this.onChange} />
              <button type="submit">Upload</button>
            </form>

            <form onSubmit={this.onFormSubmitPDF}>
              <input type="file" name="file" onChange={this.onChange} />
              <button type="submit">Upload</button>
            </form>
          </div>
          {/*<div id="all_img"></div>*/}
          <button onClick={this.ondelete}> test Delete</button>
          <div id="all_pdf"></div>
        </div>
      </div>
    );
  }
}
