import React from 'react';

/** Redux */
import { useSelector } from 'react-redux';

/**
 * A HOC that is being used for our network.
 * It has states that can be used to all of the custom
 * component attached to it.
 * 
 * @param CustomComponent - A react functional/class component.
 * @returns {React.FC}
 */
export const withBrewery = (CustomComponent) => {
  return (props: any) => {
    //State
    const breweries = useSelector((state: any) => state.Breweries.breweries);
    const loading = useSelector((state: any) => state.Breweries.loading)
    const error = useSelector((state: any) => state.Breweries.error)
    const page = useSelector((state: any) => state.Breweries.page)
    const bookmarkedItemsCount = useSelector((state: any) => state.Breweries.bookmarkedItems.length)
    const bookmarkItems = useSelector((state: any) => state.Breweries.bookmarkedItems)

    return <CustomComponent
      {...props}
      breweries={breweries}
      loading={loading}
      error={error}
      page={page}
      bookmarkedItemsCount={bookmarkedItemsCount}
      bookmarkItems={bookmarkItems}
    />
  }
}