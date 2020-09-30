import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import axios from '../../../helpers/axiosConfig';
import Container from '@material-ui/core/Container';
import {Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDFPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onChange = this.onChange.bind(this);
    this.getAllPdf = this.getAllPdf.bind(this);
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
        ));
        ReactDOM.render(Pdfs, document.getElementById('changeLater'));
      }
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <Fragment>
        <div id="changeLater"></div>
      </Fragment>
    );
  }
}

export default PDFPreview;
