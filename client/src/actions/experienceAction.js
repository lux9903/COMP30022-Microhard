import {createActions} from 'redux-actions';
import axios from '../helpers/axiosConfig';
import {push} from 'connected-react-router';

export const {
  fetchExperiencesStarted,
  fetchExperiencesSuccess,
  fetchExperiencesFailure,
  fetchExperienceStarted,
  fetchExperienceSuccess,
  fetchExperienceFailure,
  postExperienceStarted,
  postExperienceSuccess,
  postExperienceFailure,
  deleteExperienceStarted,
  deleteExperienceSuccess,
  deleteExperienceFailure,
  updateExperienceFailure,
} = createActions(
  {
    FETCH_EXPERIENCES_SUCCESS: (data) => ({data}),
    FETCH_PHOTOS_FAILURE: (error) => ({error}),
    FETCH_EXPERIENCE_SUCCESS: (data) => ({data}),
    FETCH_EXPERIENCE_FAILURE: (error) => ({error}),
    POST_EXPERIENCE_SUCCESS: (data) => ({data}),
    POST_EXPERIENCE_FAILURE: (error) => ({error}),
    DELETE_EXPERIENCE_SUCCESS: (data) => ({data}),
    DELETE_EXPERIENCE_FAILURE: (error) => ({error}),
  },
  'FETCH_EXPERIENCES_STARTED',
  'FETCH_EXPERIENCE_STARTED',
  'POST_EXPERIENCE_STARTED',
  'DELETE_EXPERIENCE_STARTED'
);

export const fetchExperiences = (page) => {
  return async (dispatch) => {
    dispatch(fetchExperiencesStarted());

    try {
      const response = await axios.get(`/experience`);
      dispatch(fetchExperiencesSuccess(response.data));
    } catch (error) {
      dispatch(fetchExperiencesFailure('Could not retrieve experiences.'));
    }
  };
};

export const fetchExperience = (filename) => {
  return async (dispatch) => {
    dispatch(fetchExperienceStarted());

    try {
      const response = await axios.get(`/experience/${filename}`);
      dispatch(fetchExperienceSuccess(response.data));
    } catch (error) {
      dispatch(fetchExperienceFailure('Could not retrieve experience.'));
    }
  };
};

export const deleteExperience = (id) => {
  return async (dispatch) => {
    dispatch(deleteExperienceStarted());

    try {
      await axios.delete(`/experience/${id}`);
      dispatch(deleteExperienceSuccess(id));
      //dispatch(push('/experience'));
    } catch (error) {
      dispatch(deleteExperienceFailure('Could not delete experience.'));
    }
  };
};

export const postExperience = (url, data) => {
  return async (dispatch) => {
    dispatch(postExperienceStarted());

    try {
      const response = await axios.post(url, data);
      dispatch(postExperienceSuccess(response.data));
      dispatch(push('/experience'));
    } catch (error) {
      dispatch(postExperienceFailure('Could not add experience.'));
    }
  };
};
