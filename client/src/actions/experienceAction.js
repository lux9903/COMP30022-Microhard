import { createActions } from 'redux-actions';
import axios from '../helpers/axiosConfig';
import { push } from 'connected-react-router';


export const {
  createExperienceStarted,
  createExperienceSuccess,
  createExperienceFailure,
} = createActions(
  {
    CREATE_EXPERIENCE_SUCCESS: (data) => ( {data} ),
    CREATE_EXPERIENCE_FAILURE: (data) => ( {data} ),
  },
  'UPDATE_USER_STARTED',
);

export const createExperience = (data) => {
  return async (dispatch) => {
    dispatch(createExperienceStarted());

    try {
      const response = await axios.post(`/api/experience/create`, data);
      localStorage.setItem('session', JSON.stringify(response.data));
      dispatch(createExperienceSuccess(response.data));
      dispatch(push('/'));
    } catch (error) {
      dispatch(createExperienceFailure('Creating Experience was unsuccessful.'));
    }
  };
};