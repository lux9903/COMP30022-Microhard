import { handleActions } from 'redux-actions';

export default handleActions(
  {
    FETCH_VIEW_PHOTOS_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_VIEW_PHOTOS_SUCCESS: (state, action) => ({
      ...state,
      isFetching: false,
      view_photos: action.payload.data.files,
    }),
    FETCH_VIEW_PHOTOS_FAILURE: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.payload.error,
    }),
    FETCH_VIEW_DOCUMENTS_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_VIEW_DOCUMENTS_SUCCESS: (state, action) => ({
      ...state,
      isFetching: false,
      view_documents: action.payload.data.pdfs,
    }),
    FETCH_VIEW_DOCUMENTS_FAILURE: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.payload.error,
    }),
    FETCH_VIEW_USER_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_VIEW_USER_SUCCESS: (state, action) => ({
      ...state,
      isFetching: false,
      view_user: action.payload.data,
    }),
    FETCH_VIEW_USER_FAILURE: (state, action) => ({
      ...state,
      isFetching: false,
    }),

  },
  {
    isFetching: false,
    isUpdating: false,
    view_photos: [],
    view_documents: [],
    view_user: null,
    error: null,
  }
);