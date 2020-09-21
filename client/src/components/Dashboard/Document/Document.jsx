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
import DocumentDialog from './DocumentDialog';

export default class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.onFormSubmitPDF = this.onFormSubmitPDF.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getAllPdf = this.getAllPdf.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  onEdit(e){
    e.preventDefault();
    const url = "/pdf/title/" + document.forms.namedItem("editTitle")["id"]["value"];
    const body = {
      "title": document.forms.namedItem("editTitle")["title"]["value"]
    }
    axios.post(url,body);
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
    //alert(document.getElementById("title").value);
    var url = "";
    if(document.getElementById("title").value.trim()!==""){
      url = '/pdf/upload/'+ document.getElementById("title").value;
    }else{
      url = "/pdf/upload/"+"UNKNOWN";
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
          <TableRow>
            <TableCell>
              <a href={ele.getFileLink} target="_blank">
                {ele.originalname}
              </a>
            </TableCell>
            <TableCell>
              {ele.title}
            </TableCell>
            <TableCell align="right">{ele.date}</TableCell>
            <TableCell align="right">
              <IconButton aria-label="delete">
                <DeleteIcon
                  onClick={() => {
                    axios.delete(ele.deleteFileLink);
                    window.location.reload();
                  }}
                />
              </IconButton>
            </TableCell>
          </TableRow>
        ));
        ReactDOM.render(Pdfs, document.getElementById('changeLater'));
      }
    });
  }

  render() {
    return (
      <Fragment>
        <div style={{height: '120px', backgroundColor: '#094183'}}>
          <br />
          <br />
          <Typography variant="h4" align="center" style={{color: '#fff'}}>
            Personal Documents
          </Typography>
        </div>

        <Helmet>
          <title>Microhard &middot; Personal Documents </title>
        </Helmet>

        <Container>
          <br />
          <br />
          <DocumentDialog
            onFormSubmitPDF={this.onFormSubmitPDF}
            onDelete={this.onDelete}
            onChange={this.onChange}
          />

          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight: '700'}}>Filename</TableCell>
                  <TableCell align="right" style={{fontWeight: '700'}}>
                    Date Uploaded
                  </TableCell>
                  <TableCell align="right" style={{fontWeight: '700'}}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody id="changeLater"></TableBody>
            </Table>
          </TableContainer>
        </Container>
        <div>
          <form name ="editTitle" onSubmit = {this.onEdit}>
            <input type = "text" name ="id" required/>
            <input type = "text" name = "title" required/>
            <input type = "submit" value = "text"/>
          </form>
        </div>
      </Fragment>
    );
  }
}
