import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import Hero from '../Home/Hero';
import Functionalities from './Functionalities';
import Appbar from '../Navigation/Appbar';

export default function HomePage() {
  return (
    <Fragment>
      <Helmet>
        <title>Microhard &middot; Home</title>
      </Helmet>
      <Appbar />
      <Hero />
      <Functionalities />
    </Fragment>
  );
}
