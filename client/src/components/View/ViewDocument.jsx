import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import ReactDOM from 'react-dom';
import axios from '../../helpers/axiosConfig';
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
import ViewNav from './ViewNav';

class ViewDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view_user :"default",
        };
    }

    componentDidMount() {
        const user_id = this.props.match.params.id

        const view_user = axios.get(`/view/${user_id}`).then((res) => {
            this.setState({view_user:res.data});
        })
        const pdf = axios.get(`/view/${user_id}/pdf`).then((res) => {
            if (res.data.pdfs) {
                const Pdfs = res.data.pdfs.map((ele) => (
                    <TableRow>
                        <TableCell>{ele.title}</TableCell>
                        <TableCell align="right">
                            <a href={ele.getFileLink} target="_blank">
                                {ele.originalname}
                            </a>
                        </TableCell>
                        <TableCell align="right">{ele.date}</TableCell>
                    </TableRow>
                ));
                ReactDOM.render(Pdfs, document.getElementById('changeLater'));
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
                        Personal Documents
                    </Typography>
                </div>

                <Helmet>
                    <title>Microhard &middot; Personal Documents </title>
                </Helmet>

                <Container>
                    <br />
                    <br />

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
                                </TableRow>
                            </TableHead>
                            <TableBody id="changeLater"></TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Fragment>
        );
    }
}

export default ViewDocument;
