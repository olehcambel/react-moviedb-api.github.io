import * as types from '../constants';
// import { favoritesRef } from '../config/firebase';
const apiKey = process.env.REACT_APP_API_KEY;

// get movies by genre
// https://api.themoviedb.org/3/genre/28/movies?page=1&api_key=apiKey&language=en-US

export function filterSetDefault() {
  return { type: types.FILTER_SET_DEFAULT };
}

export function movieLoadByQuery(page, query) {
  return {
    type: types.MOVIE_LOAD_BY_QUERY,
    callAPI: `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&api_key=${apiKey}&language=en-US`,
    payload: { page, query }
  };
}

export const movieLoadPerPage = (page, type, id) => (dispatch, getState) => {
  if (type === 'byPopular') {
    dispatch({
      type: types.MOVIE_LOAD_PER_PAGE,
      callAPI: `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${apiKey}&language=en-US`
    });
  }

  dispatch(genreLoadAll());
};

export const genreLoadAll = () => (dispatch, getState) => {
  const { genres } = getState();
  if (genres.loading || genres.loaded) return;
  dispatch({
    type: types.GENRE_LOAD_ALL,
    callAPI: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
  });
};

export const favoriteAdd = id => ({
  type: types.FAVORITE_ADD,
  payload: { id }
});
export const favoriteRemove = id => ({
  type: types.FAVORITE_REMOVE,
  payload: { id }
});

// export const favoriteAdd = id => async dispatch => {
//   debugger;
//   favoritesRef.push().set(id);
// };

// export const favoriteRemove = id => async dispatch => {
//   favoritesRef.child(id).remove();
// };

// export const favoriteFetch = () => async dispatch => {
//   favoritesRef.on('value', snapshot => {
//     dispatch({
//       type: types.FAVORITE_FETCH,
//       payload: snapshot.val()
//     });
//   });
// };

// export function movieLoadPerPage(page) {
//   return {
//     type: types.MOVIE_LOAD_PER_PAGE,
//     callAPI: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`,
//     //походу не нужен пейлоад ??
//     payload: { page }
//   };
// }