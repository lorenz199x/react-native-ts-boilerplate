import React from 'react';

/** Redux */
import { useDispatch } from 'react-redux';

import { 
  fetchBreweries, fetchBreweriesError, fetchBreweriesSuccess, getBookmarkedItems, 
  loadMoreBreweries, removeBookmark, searchBreweries, searchBreweriesError, 
  searchBreweriesSuccess, toggleBookmark 
} from '@redux/actions/breweryAction';

/**
 * A HOC that is being used for our components.
 * It has states and functions that can be used to all of the custom
 * component attached to it.
 * 
 * @param CustomComponent - A react functional/class component.
 * @returns {React.FC}
 */
export const withBreweryRedux = (CustomComponent) => {
  return (props: any) => {
    const dispatch = useDispatch();

    return <CustomComponent
      {...props}

      //Dispatch
      fetchBreweries={() => dispatch(fetchBreweries())}
      fetchBreweriesSuccess={(params: any) => dispatch(fetchBreweriesSuccess(params))}
      fetchBreweriesError={(params: any) => dispatch(fetchBreweriesError(params))}
      loadMoreBreweries={(params: any) => dispatch(loadMoreBreweries(params))}
      searchBreweries={(params: any) => dispatch(searchBreweries(params))}
      searchBreweriesSuccess={(params: any) => dispatch(searchBreweriesSuccess(params))}
      searchBreweriesError={(params: any) => dispatch(searchBreweriesError(params))}
      toggleBookmark={(params: any) => dispatch(toggleBookmark(params))}
      getBookmarkedItems={() => dispatch(getBookmarkedItems())}
      removeBookmark={(params: any) => dispatch(removeBookmark(params))}
    />
  }
}