import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import logo from '../../img/form-logo.PNG';

export default function Home() {
    return (
        <section>
            <Helmet>
                <title>Microhard &middot; Welcome </title>
            </Helmet>

            <div className='container-fluid'>

                        <div className='form-wrap'>
                            <h1 className='h1 form-title'>Welcome to Microhard ! </h1>

                        </div>
            </div>
        </section>
    );
}
