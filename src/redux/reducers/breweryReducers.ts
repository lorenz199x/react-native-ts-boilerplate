import { Reducer } from 'redux'
import { Action } from 'reactnativets'
import { ActionType } from '@redux/actions/breweryAction';
import { log } from '@utils/LoggerUtil';

const initialState = {
  breweries: [],
  loading: false,
  error: null,
  page: 10,
  bookmarkedItems: [],
};

export const breweryReducer: Reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.FETCH_BREWERIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.FETCH_BREWERIES_SUCCESS:
      return {
        ...state,
        breweries: action.payload,
        loading: false,
        error: null,
      };
    case ActionType.FETCH_BREWERIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionType.LOAD_MORE_BREWERIES:
      return {
        ...state,
        breweries: state.breweries.concat(action.payload),
        loading: false,
        error: null,
        page: state.page + 10,
      };

    case ActionType.SEARCH_BREWERIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ActionType.SEARCH_BREWERIES_SUCCESS:
      return {
        ...state,
        breweries: action.payload,
        loading: false,
        error: null,
      };
    case ActionType.SEARCH_BREWERIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionType.TOGGLE_BOOKMARK:
      const { payload: breweryId } = action;
      const isBookmarked = state.bookmarkedItems.includes(breweryId);
      const updatedBookmarkedItems = isBookmarked
        ? state.bookmarkedItems.filter((id) => id !== breweryId)
        : [...state.bookmarkedItems, breweryId];
      return {
        ...state,
        bookmarkedItems: updatedBookmarkedItems,
      };
    case ActionType.GET_BOOKMARKED_ITEMS:
      return state;

    case ActionType.REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarkedItems: state.bookmarkedItems.filter((bookmark: any) => bookmark.id !== action.payload),
      };

    default:
      return state;
  }
};
