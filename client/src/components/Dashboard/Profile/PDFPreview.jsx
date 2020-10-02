import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import axios from '../../../helpers/axiosConfig';
import {Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDFPreview extends Component {
  constructor(props){
    super(props);
    this.state = {
      file: null,
      numPages: null,
      pageNumber: 1,
      fileLink: ""
    };
  }
  onDocumentLoadSuccess = async ({ numPages }) => {
    
    await this.setState({numPages:numPages});
    await this.setState({pageNumber:1});
  };

  previousPage = () =>
    this.setState((state) => ({pageNumber: state.pageNumber - 1}));
  nextPage = () =>
    this.setState((state) => ({pageNumber: state.pageNumber + 1}));

  componentDidMount() {
    const pdf = axios.get('/pdf').then((res) => {
      const {numPages, pageNumber} = this.state;
      if (res.data.pdfs) {
        if (res.data.pdfs[0]){
          this.setState({fileLink:res.data.pdfs[0].getFileLink})
          const links = res.data.pdfs.map((ele)=>(
              <div>
                <h1> Switch to : {ele.title} </h1>
                <button onClick = {()=> this.setState({fileLink:ele.getFileLink})}> click to switch </button>
              </div>
          ));
          ReactDOM.render(links,document.getElementById('links'));
        }

      }
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <Fragment>
            <div id ="links">
            </div>
            <nav>
              <button onClick={this.previousPage}>Prev</button>
              <button onClick={this.nextPage}>Next</button>
            </nav>

            <div style={{width: 400}}>
              <Document
                file={this.state.fileLink}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page pageNumber={this.state.pageNumber} width={600} />

                <p>
                  Page {this.state.pageNumber} of {this.state.numPages}
                </p>
              </Document>
            </div>
      </Fragment>
    );
  }
}

export default PDFPreview;
