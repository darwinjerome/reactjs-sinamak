import { FETCH_POSTS, FETCH_POST, BREADCRUMB, SEARCH_POSTS, INCREMENT_PAGENUM, DECREMENT_PAGENUM } from '../actions/types';

// this is where you initialised application level states and variables
const initialState = {
  items: [],
  item: {},
  breadcrumb: "all",
  pagenum: 1,
  totalpages: 1,
}

export default function(state = initialState, action){
  switch(action.type){
    default:
      return state;
    
    case FETCH_POSTS:
      return {
        ...state,
        // items: action.payload
        items: state.items.concat(action.payload)
      }

    case FETCH_POST:
      return {
        ...state,
        item: action.payload
      }
    
    case SEARCH_POSTS:
      return {
        ...state,
        items: action.payload
      }

    case BREADCRUMB:
      return {
        ...state,
        breadcrumb: action.payload
      }

    case INCREMENT_PAGENUM:
      return {
        ...state,
        pagenum: action.payload,
        totalpages: action.totalpages
      }

    case DECREMENT_PAGENUM:
      return {
        ...state,
        pagenum: action.payload
      }
  }
}