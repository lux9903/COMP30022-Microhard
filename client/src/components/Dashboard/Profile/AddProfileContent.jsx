import React from 'react';
import {FormWizard} from 'react-material-formik-wizard';

import aboutSectionStep from './AboutSectionStep';

function AddProfileContent() {
  const steps = [
    {
      component: aboutSectionStep,
      title: 'About',
    },
  ];

  const doSubmit = (values) => {
    alert('submitting: ' + JSON.stringify(values));
    console.log('submitting valuess', values);
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
          successMessage={'Your recipe has been submitted'}
          successMessageComponent={'h5'}
        />
      </main>
    </React.Fragment>
  );
}

export default AddProfileContent;
