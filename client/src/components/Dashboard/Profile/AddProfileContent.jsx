import React from 'react';
import {FormWizard} from 'react-material-formik-wizard';
import AboutSectionStep from './AboutSectionStep';
import BasicDetailsStep from './BasicDetailsStep';
import ReviewStep from './ReviewStep';

function AddProfileContent() {
  const steps = [
    {
      component: BasicDetailsStep,
      title: 'Basic details',
    },
    {
      component: AboutSectionStep,
      title: 'About',
    },
    {
      component: ReviewStep,
      title: 'Review',
    },
  ];

  const doSubmit = (values) => {
    alert('submitting: ' + JSON.stringify(values));
    console.log('submitting values', values);
  };

  return (
    <React.Fragment>
      <main>
        <FormWizard
          displayProgress={true}
          formComponents={steps}
          doSubmit={doSubmit}
          successTitle={'Success'}
          successTitleComponent={'h1'}
          successMessage={'Your user profile has been successfully made!'}
          successMessageComponent={'h5'}
        />
      </main>
    </React.Fragment>
  );
}

export default AddProfileContent;
