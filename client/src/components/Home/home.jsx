import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import logo from '../../img/form-logo.PNG';
import Hero from '../Home/Hero';
import Functionalities from './Functionalities';

export default () => {
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
// export default function Home() {
//     return (
//         <section>
//             <Helmet>
//                 <title>Microhard &middot; Home</title>
//             </Helmet>
//
//             <div className='container-fluid'>
//                 <div className='row'>
//                     <div className='col order-2'>
//                         <div className='form-wrap'>
//                             <Link to='/'>
//                                 <img src={logo} alt='Microhard' className='form-logo' />
//                                 <div className='sr-only'>Microhard</div>
//                             </Link>
//
//                             <h1 className='h2 form-title'>Welcome to Microhard</h1>
//
//                             <p className='lead'>Your dream way to organize your e-portfolio </p>
//
//                             <ul className='list-group list-group-flush mb-4'>
//                                 <li className='list-group-item'>Your personalised e-portfolio</li>
//                                 <li className='list-group-item'>Carrer path function to show off your skills</li>
//                             </ul>
//
//                             <Link to='/sign-in' className='btn btn-outline-primary mb-2 mr-2'>
//                                 Sign in
//                             </Link>
//
//                             <Link to='/sign-up' className='btn btn-primary mb-2'>
//                                 Sign up
//                             </Link>
//                         </div>
//                     </div>
//
//                     <div className='col-sm-3 col-md-6 col-lg-7 col-xl-8 form-background order-sm-2'></div>
//                 </div>
//             </div>
//         </section>
//     );
// }
