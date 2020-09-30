import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import axios from '../../../helpers/axiosConfig';
import {Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDFPreview extends Component {
  state = {
    file: null,
    numPages: null,
    pageNumber: 1,
  };

  onDocumentLoadSuccess = ({numPages}) => {
    this.setState({numPages});
    console.log({numPages});
  };
  previousPage = () =>
    this.setState((state) => ({pageNumber: state.pageNumber - 1}));
  nextPage = () =>
    this.setState((state) => ({pageNumber: state.pageNumber + 1}));

  componentDidMount() {
    const {pageNumber, numPages} = this.state;
    const pdf = axios.get('/pdf').then((res) => {
      if (res.data.pdfs) {
        const Pdfs = res.data.pdfs.map((ele) => (
          <div>
            <nav>
              <button onClick={this.previousPage}>Prev</button>
              <button onClick={this.nextPage}>Next</button>
            </nav>

            <div style={{width: 400}}>
              <Document
                file={ele.getFileLink}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} width={600} />
              </Document>
            </div>

            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
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
