import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import logo from '../../img/form-logo.PNG';
import ReactDOM from 'react-dom';
import axios from '../../helpers/axiosConfig';

class Profile extends Component{
    componentDidMount() {
        const imgs = axios.get("/image").then(res=>{
            if(res.data.files){
                const imgPic = res.data.files.map((ele) =>
                    <img src = {ele} alt = {ele}/>);
                ReactDOM.render(imgPic,document.getElementById('all_img'));
            }
        });
    }

    render () {
        const { user } = this.props.user;
        return (
            <section>
                <Helmet>
                    <title>Microhard &middot; Profile </title>
                </Helmet>

                <div className='container-fluid'>

                    <div className='form-wrap'>
                        <h1 className='h1 form-title'>Welcome to Microhard  </h1>
                        <h2 className = 'h2 form-title'>This is the account of  {user.username}  </h2>
                        <h2 className = 'h2 form-title'>Some information about me:  {user.bio}  </h2>
                        <h2 className = 'h2 form-title'>My email address is: {user.email}  </h2>
                        <h2 className = 'h2 form-title'>Here is some of my image </h2>
                    </div>
                </div>
                <div id="all_img"></div>
            </section>
        );

    }

}
const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(Profile);
