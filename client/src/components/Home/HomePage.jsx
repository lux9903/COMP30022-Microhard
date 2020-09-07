import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import logo from '../../img/form-logo.PNG';
import Hero from '../Home/Hero';
import Functionalities from './Functionalities';

export default function HomaPage() {
    return (
        <Fragment>
            <Helmet>
                <title>Microhard &middot; Home</title>
            </Helmet>
            <Hero />
            <Functionalities />
        </Fragment>
    );
};