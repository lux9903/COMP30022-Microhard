import React, { Component } from 'react'; 
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import logo from '../../img/form-logo.PNG';

import ReactDOM from 'react-dom';
import axios from 'axios';

export default class FilesUploadComponent extends Component {
    

    componentDidMount() {
        const imgs = axios.get('/image').then(res=>{
            if(res.data.files){
                const imgPic = res.data.files.map((ele) =>
                    <img src = {ele} alt = {ele}/>);
                ReactDOM.render(imgPic,document.getElementById('all_img'));
            }
        })

    }


    render() {
        return (
            <div className="container">
                <div className="row">
                <div>
                    <h3>React File Upload</h3>
                </div>
                <div>
                    <form action ="/image/upload" method = "POST" encType="multipart/form-data">
                        <input type = "file" name = "file" id = "file"/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
                <div id="all_img">
                </div>
                </div>
            </div>
        )
    }
}
