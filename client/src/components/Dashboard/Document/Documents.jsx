import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import AddDocument from './AddDocument';
import EditDocument from './EditDocument';
import Alert from '@material-ui/lab/Alert';
import {fetchDocuments, deleteDocument, updateDocument,postDocument} from '../../../actions/documentAction';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import {CircularProgress} from '@material-ui/core';

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      deleted: false,
      page: 1,
    };
    this.onFormSubmitPDF = this.onFormSubmitPDF.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  onEdit(id) {
    const body = {
      title: document.forms.namedItem('editTitle')['title']['value'],
    };
    console.log(id);
    this.props.dispatch(updateDocument(id,body));
    
  }

  onFormSubmitPDF(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);

    var base = '';
    var url = '';
    if (document.getElementById('isResume').checked) {
      base = '/pdf/upload/resume/';
    } else {
      base = '/pdf/upload/';
    }
    if (document.getElementById('title').value.trim() !== '') {
      url = base + document.getElementById('title').value;
    } else {
      url = base + 'UNKNOWN';
    }
    this.props.dispatch(postDocument(url,formData));
  }
  onChange(e) {
    this.setState({file: e.target.files[0]});
  }

  deleteDocument(id) {
    if (
      window.confirm(
        `Are you sure you want to delete this document?`
      )
    ) {
      this.props.dispatch(
        deleteDocument(id)
      );
      this.setState({delete: true});
    }
  }

  componentDidMount() {
    let page = 1;

    if (this.props.match.params.page !== undefined) {
      page = this.props.match.params.page;
    }
    this.props.dispatch(fetchDocuments(page));
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      let page = 1;

      if (this.props.match.params.page !== undefined) {
        page = this.props.match.params.page;
      }
      this.props.dispatch(fetchDocuments(page));
    }
  }

  render() {
    const {classes} = this.props;
    const {error, isFetching, documents,isUpdating} = this.props.document;
    console.log(this.props);

    let content;

    if (error) {
      content = (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      );
    } else if (isFetching) {
      content = (
        <div className="text-center">
          <CircularProgress>
            <span>Loading...</span>
          </CircularProgress>
        </div>
      );
    }else if (isUpdating){
      content = (
        <div className="text-center">
          <span>Update your change</span>
        </div>
      );
    }
    else if (documents.length === 0 || !documents) {
      content = <p className="lead">No documents found.</p>;
    } else {
      const Pdfs = documents.map((ele) => (
        <TableRow>
          <TableCell>{ele.title}</TableCell>
          <TableCell align="right">
            <a
              href={ele.getFileLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ele.originalname}
            </a>
          </TableCell>
          <TableCell align="right">{ele.date}</TableCell>
          <TableCell align="right">
            <EditDocument onEdit={this.onEdit} id = {ele._id}/>
            <IconButton aria-label="delete">
              <DeleteIcon
                onClick={() => {
                  this.deleteDocument(ele._id)
                }}
              />
            </IconButton>
          </TableCell>
        </TableRow>
      ));
      content = <TableBody>{Pdfs}</TableBody>
    }
    return (
      <Fragment>
        <div style={{height: '120px', backgroundColor: '#094183'}}>
          <br />
          <br />
          <Typography
            variant="h1"
            align="center"
            style={{color: '#fff', fontSize: '36px'}}
          >
            Personal Documents
          </Typography>
        </div>

        <Helmet>
          <title>Microhard &middot; Personal Documents </title>
        </Helmet>

        <Container>
          <br />
          {this.state.deleted ? (
            <Alert severity="success">Document has been deleted</Alert>
          ) : null}
          <br />
          <AddDocument
            onFormSubmitPDF={this.onFormSubmitPDF}
            onDelete={this.onDelete}
            onChange={this.onChange}
          />

          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight: '700'}}>Title</TableCell>
                  <TableCell align="right" style={{fontWeight: '700'}}>
                    Filename
                  </TableCell>
                  <TableCell align="right" style={{fontWeight: '700'}}>
                    Date Uploaded
                  </TableCell>
                  <TableCell align="right" style={{fontWeight: '700'}}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              {content}
            </Table>
          </TableContainer>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default withRouter(connect(mapStateToProps)(Documents));

