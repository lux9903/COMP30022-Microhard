import { handleActions } from 'redux-actions';

export default handleActions(
  {
    FETCH_PROJECTLIST_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_PROJECTLIST_SUCCESS: (state , action) => ({
      ...state,
      isFetching: false,
      projects: action.payload.data.projects,
    }),
    FETCH_PROJECTLIST_FAILURE: (state , action) => ({
      ...state,
      isFetching: false,
      error: action.payload.error,
    }),
    FETCH_PROJECTLISTCONDITION_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_PROJECTLISTCONDITION_SUCCESS: (state , action) => ({
      ...state,
      isFetching: false,
      projects: action.payload.data.projects,
    }),
    FETCH_PROJECTLISTCONDITION_FAILURE: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.payload.error,
    }),
    CREATE_PROJECT_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    CREATE_PROJECT_SUCCESS: (state, action) => ({
      ...state,
      isUpdating: false,
      projects: [...state.projects, action.payload.data.project],
    }),
    CREATE_PROJECT_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    FETCH_PROJECT_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_PROJECT_SUCCESS: (state , action) => ({
      ...state,
      isFetching: false,
      project: action.payload.data.project,
    }),
    FETCH_PROJECT_FAILURE: (state , action) => ({
      ...state,
      isFetching: false,
      error: action.payload.error,
    }),
    UPDATE_PROJECT_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    UPDATE_PROJECT_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    UPDATE_PROJECT_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    LIKE_PROJECT_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    LIKE_PROJECT_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    LIKE_PROJECT_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    //MAY BE THERE WILL BE A DISLIKE
    DELETE_PROJECT_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    DELETE_PROJECT_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      projects: state.projects.filter((proj) => proj._id !== action.payload.data.deleteId),
    }),
    DELETE_PROJECT_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    CREATE_CONTRIBUTOR_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    CREATE_CONTRIBUTOR_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    CREATE_CONTRIBUTOR_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    DELETE_CONTRIBUTOR_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    DELETE_CONTRIBUTOR_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    DELETE_CONTRIBUTOR_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    CREATE_PROCESS_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    CREATE_PROCESS_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    CREATE_PROCESS_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    UPDATE_PROCESS_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    UPDATE_PROCESS_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    UPDATE_PROCESS_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    DELETE_PROCESS_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    DELETE_PROCESS_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    DELETE_PROCESS_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    CREATE_NODE_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    CREATE_NODE_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    CREATE_NODE_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    UPDATE_NODE_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    UPDATE_NODE_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    UPDATE_NODE_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    DELETE_NODE_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    DELETE_NODE_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    DELETE_NODE_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    FINISH_NODE_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    FINISH_NODE_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    FINISH_NODE_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    CREATE_TIMELINE_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    CREATE_TIMELINE_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    CREATE_TIMELINE_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    UPDATE_TIMELINE_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    UPDATE_TIMELINE_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    UPDATE_TIMELINE_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    DELETE_TIMELINE_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    DELETE_TIMELINE_SUCCESS: (state , action) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    DELETE_TIMELINE_FAILURE: (state , action) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
  },
  {
    isFetching: false,
    isUpdating: false,
    projects: [],
    project: {},
    error: null,
  }
);
