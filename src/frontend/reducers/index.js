import { actions } from '../actions';

const reducer = (state, action) => {
  switch (action.type) {
    case actions.setFavorite:
      return {
        ...state,
        myList: [...state.myList.filter((item) => item.id !== action.payload.id),
          action.payload,
        ],
      };
    case actions.deleteFavorite:
      return {
        ...state,
        myList: state.myList.filter((item) => item.id !== action.payload),
      };
    case actions.loginRequest:
      return {
        ...state,
        user: action.payload,
      };
    case actions.logoutRequest:
      return {
        ...state,
        user: action.payload,
      };
    case actions.registerRequest:
      return {
        ...state,
        user: action.payload,
      };
    case actions.getVideoSource:
      return {
        ...state,
        playing: state.trends.find((item) => item.id === Number(action.payload)) ||
                state.originals.find((item) => item.id === Number(action.payload)) ||
                [],
      };
    case actions.searchQuery:
      if (action.payload === ' ' || action.payload === '') {
        return {
          ...state,
          searchResult: [],
        };
      }
      return {
        ...state,
        searchResult: state.trends.filter((item) => {
          return item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
                    item.year === Number(action.payload);
        }),
      };
    default:
      return state;
  }
};

export default reducer;
