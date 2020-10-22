import { handleActions } from 'redux-actions';

export default handleActions(
  {
    FETCH_PROJECTLIST_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_PROJECTLIST_SUCCESS: (state) => ({
      ...state,
      isFetching: false,
      projects: action.payload.data.projects,
    }),
    FETCH_PROJECTLIST_FAILURE: (state) => ({
      ...state,
      isFetching: false,
      error: action.payload.error,
    }),
    FETCH_PROJECTLISTCONDITION_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_PROJECTLISTCONDITION_SUCCESS: (state) => ({
      ...state,
      isFetching: false,
      projects: action.payload.data.projects,
    }),
    FETCH_PROJECTLISTCONDITION_FAILURE: (state) => ({
      ...state,
      isFetching: false,
      error: action.payload.error,
    }),
    CREATE_PROJECT_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    CREATE_PROJECT_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      projects: [...state.projects, action.payload.data.project],
    }),
    CREATE_PROJECT_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    FETCH_PROJECT_STARTED: (state) => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    FETCH_PROJECT_SUCCESS: (state) => ({
      ...state,
      isFetching: false,
      project: action.payload.data.project,
      contributor: action.payload.data.project.contributors,
      process: action.payload.data.project.process,
      timeline:action.payload.data.project.timeline,
    }),
    FETCH_PROJECT_FAILURE: (state) => ({
      ...state,
      isFetching: false,
      error: action.payload.error,
    }),
    UPDATE_PROJECT_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    UPDATE_PROJECT_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    UPDATE_PROJECT_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    LIKE_PROJECT_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    LIKE_PROJECT_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
    }),
    LIKE_PROJECT_FAILURE: (state) => ({
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
    DELETE_PROJECT_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      project: state.projects.filter((proj) => proj._id !== action.payload.data.deleteId),
    }),
    DELETE_PROJECT_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),

    CREATE_CONTRIBUTOR_STARTED: (state) => ({
      ...state,
      isUpdating: true,
      error: null,
    }),
    CREATE_CONTRIBUTOR_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      project: action.payload.data.project,
      contributor: action.payload.data.project.contributors,
      process: action.payload.data.project.process,
      timeline:action.payload.data.project.timeline,
      contributor: [...state.contributor, ]
    }),
    CREATE_CONTRIBUTOR_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    DELETE_CONTRIBUTOR_STARTED: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    DELETE_CONTRIBUTOR_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    DELETE_CONTRIBUTOR_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    CREATE_PROCESS_STARTED: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    CREATE_PROCESS_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    CREATE_PROCESS_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    UPDATE_PROCESS_STARTED: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    UPDATE_PROCESS_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    UPDATE_PROCESS_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    DELETE_PROCESS_STARTED: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    DELETE_PROCESS_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    DELETE_PROCESS_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    CREATE_NODE_STARTED: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    CREATE_NODE_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    CREATE_NODE_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    UPDATE_NODE_STARTED: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    UPDATE_NODE_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    UPDATE_NODE_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    DELETE_NODE_STARTED: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    DELETE_NODE_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    DELETE_NODE_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    FINISH_NODE_STARTED: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    FINISH_NODE_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    FINISH_NODE_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    CREATE_TIMELINE_STARTED: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    CREATE_TIMELINE_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    CREATE_TIMELINE_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    UPDATE_TIMELINE_STARTED: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    UPDATE_TIMELINE_SUCCESS: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    UPDATE_TIMELINE_FAILURE: (state) => ({
      ...state,
      isUpdating: false,
      error: action.payload.error,
    }),
    DELETE_TIMELINE_STARTED: (state) => ({
      ...state,
      isUpdating: false,
      error: null,
    }),
    DELETE_TIMELINE_SUCCESS: (state) => ({
      ...state,
      isupdating: true,
      error: null,
    }),
    DELETE_TIMELINE_FAILURE: (state) => ({
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
    process: [],
    timeline: [],
    contributor: [],
    error: null,
  }
);
