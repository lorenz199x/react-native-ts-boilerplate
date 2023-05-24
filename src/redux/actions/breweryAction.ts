import { log } from "@utils/LoggerUtil"

export enum ActionType {
  FETCH_BREWERIES_REQUEST = 'FETCH_BREWERIES_REQUEST',
  FETCH_BREWERIES_SUCCESS = 'FETCH_BREWERIES_SUCCESS',
  FETCH_BREWERIES_ERROR = 'FETCH_BREWERIES_ERROR',

  LOAD_MORE_BREWERIES = 'LOAD_MORE_BREWERIES',

  SEARCH_BREWERIES_REQUEST = 'SEARCH_BREWERIES_REQUEST',
  SEARCH_BREWERIES_SUCCESS = 'SEARCH_BREWERIES_SUCCESS',
  SEARCH_BREWERIES_ERROR = 'SEARCH_BREWERIES_ERROR',

  TOGGLE_BOOKMARK = 'TOGGLE_BOOKMARK',
  GET_BOOKMARKED_ITEMS = 'GET_BOOKMARKED_ITEMS',

  REMOVE_BOOKMARK = 'REMOVE_BOOKMARK'

}

export const fetchBreweries = () => {
  return {
    type: ActionType.FETCH_BREWERIES_REQUEST,
  };
};

export const fetchBreweriesSuccess = (args: any) => {
  return {
    type: ActionType.FETCH_BREWERIES_SUCCESS,
    payload: args,
  };
};

export const fetchBreweriesError = (error: any) => {
  return {
    type: ActionType.FETCH_BREWERIES_ERROR,
    payload: error,
  };
};

export const loadMoreBreweries = (args: any) => {
  return {
    type: ActionType.LOAD_MORE_BREWERIES,
    payload: args,
  };
};

export const searchBreweries = (args: string) => {
  return {
    type: ActionType.SEARCH_BREWERIES_REQUEST,
    payload: args,
  };
};

export const searchBreweriesSuccess = (args: any) => {
  return {
    type: ActionType.SEARCH_BREWERIES_SUCCESS,
    payload: args,
  };
};

export const searchBreweriesError = (args: any) => {
  return {
    type: ActionType.SEARCH_BREWERIES_ERROR,
    payload: args,
  };
};

export const toggleBookmark = (breweryId: any) => {
  return {
    type: ActionType.TOGGLE_BOOKMARK,
    payload: breweryId,
  };
};

export const getBookmarkedItems = () => {
  return {
    type: ActionType.GET_BOOKMARKED_ITEMS,
  };
};

export const removeBookmark = (bookmarkId: string) => {
  return {
    type: ActionType.REMOVE_BOOKMARK,
    payload: bookmarkId,
  };
};