import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import logo from '../../img/form-logo.PNG';

class Profile extends Component{
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


                    </div>
                </div>
            </section>
        );

    }

}
const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps)(Profile);
