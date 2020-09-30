import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import ReactDOM from 'react-dom';
import axios from '../../../helpers/axiosConfig';
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
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onFormSubmitPDF = this.onFormSubmitPDF.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getAllPdf = this.getAllPdf.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  onEdit(e) {
    e.preventDefault();
    const url =
      '/pdf/title/' + document.forms.namedItem('editTitle')['id']['value'];
    const body = {
      title: document.forms.namedItem('editTitle')['title']['value'],
    };
    axios.post(url, body);
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
    var url = '';
    if (document.getElementById('title').value.trim() !== '') {
      url = '/pdf/upload/' + document.getElementById('title').value;
    } else {
      url = '/pdf/upload/' + 'UNKNOWN';
    }
    axios
      .post(url, formData, config)
      .then((response) => {
        alert('The file is successfully uploaded');
      })
      .catch((error) => {});
  }
  onChange(e) {
    this.setState({file: e.target.files[0]});
  }
  getAllPdf(e) {
    e.preventDefault();
    const show = axios.get('/pdf/');
  }

  componentDidMount() {
    const pdf = axios.get('/pdf').then((res) => {
      if (res.data.pdfs) {
        const Pdfs = res.data.pdfs.map((ele) => (
          <Document file={ele.getFileLink}>
            <Page pageNumber={1} />
          </Document>
          // <TableRow>
          //   <TableCell>{ele.title}</TableCell>
          //   <TableCell align="right">
          //     <a
          //       href={ele.getFileLink}
          //       target="_blank"
          //       rel="noopener noreferrer"
          //     >
          //       {ele.originalname}
          //     </a>
          //   </TableCell>
          //   <TableCell align="right">{ele.date}</TableCell>
          //   <TableCell align="right">
          //     <EditDocument />
          //     <IconButton aria-label="delete">
          //       <DeleteIcon
          //         onClick={() => {
          //           axios.delete(ele.deleteFileLink);
          //           window.location.reload();
          //         }}
          //       />
          //     </IconButton>
          //   </TableCell>
          // </TableRow>
        ));
        ReactDOM.render(Pdfs, document.getElementById('changeLater'));
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
              {/*<TableBody id="changeLater"></TableBody>*/}
            </Table>
          </TableContainer>

          <div id="changeLater"></div>
        </Container>
      </Fragment>
    );
  }
}

export default Documents;
