import { FETCH_POSTS, SEARCH_POSTS, FETCH_POST, BREADCRUMB, INCREMENT_PAGENUM, DECREMENT_PAGENUM } from './types';

export const fetchPosts = (searchTerm, pagenum) => dispatch => {
  
  //console.log("fetchPosts: " + searchTerm + " Page: " + pagenum)
  fetch('https://panlasangpinoy.com/wp-json/wp/v2/posts?per_page=10&_embed&search='+searchTerm+'&page='+pagenum)
    .then( function( res ) {
      const contentType = res.headers.get( 'content-type' );
      const pages       = res.headers.get( 'x-wp-totalpages' );
      
      if ( contentType && contentType.includes( 'application/json' ) ) {
				dispatch({
          type: INCREMENT_PAGENUM,
          payload: pagenum + 1,
          totalpages: pages,
        })
				return res.json();
			}
			throw new TypeError( 'Oops, the format is not JSON.' );
    })
    //.then(res => res.json())    
    .then(posts => dispatch({
      type: FETCH_POSTS,
      payload: posts,
    }))

}

export const fetchPost = (postID) => dispatch => {
  fetch('https://panlasangpinoy.com/wp-json/wp/v2/posts/'+postID+'?_embed')
    .then(res => res.json())
    .then(post => dispatch({
      type: FETCH_POST,
      payload: post
    }))
}

// Tracks the keyword searched and put it in a state.
export const fetchBreadcrumb = (keyword) => dispatch => {
  dispatch({
    type: BREADCRUMB,
    payload: keyword
  })
}

export const searchPosts = (searchTerm, pagenum) => dispatch => {
  
  fetch('https://panlasangpinoy.com/wp-json/wp/v2/posts?per_page=10&_embed&search='+searchTerm+'&page='+pagenum)
    .then( function( res ) {
      const contentType = res.headers.get( 'content-type' );
      const pages       = res.headers.get( 'x-wp-totalpages' );
      console.log("totalpages: " + pages)
      
      if ( contentType && contentType.includes( 'application/json' ) ) {
				dispatch({
          type: INCREMENT_PAGENUM,
          payload: pagenum + 1,
          totalpages: pages,
        })
				return res.json();
			}
			throw new TypeError( 'Oops, the format is not JSON.' );
    })
    .then(posts => dispatch({
      type: SEARCH_POSTS,
      payload: posts,
    }))
    .then(
      dispatch({
        type: DECREMENT_PAGENUM,
        payload: pagenum = 2      //Since pagenum is already set to 1 on call, reset pagenum to 2
      }),
      window.scrollTo(0, 0),
      console.log("searchPosts: " + searchTerm + " Page: " + pagenum),
    )
}