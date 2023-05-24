import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import { compose } from 'redux';

/** reduc */
import { withBrewery, withBreweryRedux } from '../../HOC';

/** navigation */
import Navigation from '@navigation/Navigation'
import { Screen } from '@navigation/Screen'

// import { connect, useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@redux/reducers';
// import { fetchBreweries, getBookmarkedItems, loadMoreBreweries, searchBreweries, toggleBookmark } from '@redux/actions/breweryAction';

/** utils */
import { toastConfig, ToastMessage } from '@utils/ToastMessageUtil';
import { log } from '@utils/LoggerUtil';
import { Message } from '../../shared';

/**
 * This is fully working but I change the approach to HOC
 */
// const mapStateToProps = (state: any) => ({
//   breweries: state.Breweries.breweries,
//   loading: state.Breweries.loading,
//   error: state.Breweries.error,
//   page: state.Breweries.page,
//   bookmarkedItemsCount: state.Breweries.bookmarkedItems.length,
//   bookmarkItems: state.Breweries.bookmarkedItems
// })

// const mapDispatchToProps = (dispatch: any) => ({
//   fetchBreweries: () => dispatch(fetchBreweries()),
//   loadMoreBreweries: (params: any) => dispatch(loadMoreBreweries(params)),
//   searchBreweries: (params: any) => dispatch(searchBreweries(params))
// })

const BreweryListScreen: React.FC = (props: any) => {
  const {
    breweries, loading, error, page, bookmarkedItemsCount, bookmarkItems,
    fetchBreweries, loadMoreBreweries, searchBreweries, getBookmarkedItems, toggleBookmark
  } = props
  const [searchText, setSearchText] = useState('');
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  // log('BreweryListScreen', breweries)
  // log('bookmarkItems', bookmarkItems, bookmarkedItems)

  useEffect(() => {
    fetchBreweries()
    getBookmarkedItems()
  }, []);

  useEffect(() => {
    setBookmarkedItems(bookmarkItems);
  }, [bookmarkItems]);

  useEffect(() => {
    if (searchText.trim() === '') {
      fetchBreweries()
    }
  }, [searchText]);

  const handleSearch = () => {
    if (searchText.trim() === '') {
      fetchBreweries()
    } else {
      searchBreweries(searchText)
    }
  };

  const handleLoadMore = () => {
    if (!loading && !searchText) {
      loadMoreBreweries(page + 10)
    }
  };

  const handlePress = (item: any) => {
    // Navigate to the new screen
    Navigation.navigate(Screen.BREWERY_DETAILS_SCREEN, { item: item });
  };

  const onPressAddToBookmark = (item: any) => {
    const isBookmarked = bookmarkedItems.some(
      (bookmark: any) => bookmark.id === item.id
    );
    if (isBookmarked) {
      // Show error message that item is already bookmarked
      ToastMessage.show({
        type: 'error',
        message: Message.BOOKMARK_ERR,
        subMessage: '',
      })
    } else {
      toggleBookmark(item)
      ToastMessage.show({
        type: 'success',
        message: Message.BOOKMARK_SUCCESS,
        subMessage: '',
      })
    }
  };


  const onNavigateToBookmarkedItems = () => {
    Navigation.navigate(Screen.BOOKMARKED_ITEMS_SCREEN);
  };

  const renderItem = ({ item }: { item: any }) => {
    const isBookmarked = bookmarkedItems.some((bookmark: any) => bookmark.id === item.id);

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handlePress(item)}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.breweryName}>{item.name}</Text>
            <TouchableOpacity onPress={() => onPressAddToBookmark(item)}>
              <Icon
                name={isBookmarked ? 'bookmark' : 'bookmark-o'}
                size={30}
                style={[styles.bookmarkIcon, { color: isBookmarked ? '#1396ba' : 'white' }]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.breweryType}>{item.brewery_type}</Text>
            <Text style={styles.breweryAddress}>{`${item.street}, ${item.city}, ${item.state}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      { /** SEARCH */}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onNavigateToBookmarkedItems}>
        <View style={styles.bookmarkContainer}>
          <Text style={styles.bookmarkLabel}>{`View Bookmarks ${bookmarkedItemsCount !== 0 && bookmarkedItemsCount !== undefined ? `(${bookmarkedItemsCount})` : ''}`}</Text>
        </View>
      </TouchableOpacity>


      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <FlatList
          data={breweries}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          initialNumToRender={10} // validate the number of items to render initially
          maxToRenderPerBatch={10} // validate the number of items to render per batch
          windowSize={10}
        />
      )}
      <Toast config={toastConfig} />

    </View>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(BreweryListScreen);

const WrappedComponent = compose(
  withBrewery,
  withBreweryRedux
)(BreweryListScreen)

export default WrappedComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  listContent: {
    paddingBottom: 16,
  },
  breweryContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  breweryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  breweryType: {
    fontSize: 14,
    color: '#000000',
  },
  breweryAddress: {
    fontSize: 14,
    color: 'gray',
  },
  bookmarkIcon: {
    alignSelf: 'flex-end',
    marginTop: 8,
    color: 'gray',
  },

  //search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#124C81',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // card
  cardContainer: {
    marginBottom: 16,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: '#FFFFFF',
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#124C81',
  },
  cardContent: {
    padding: 16,
  },

  //bookmark
  bookmarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    alignSelf: 'flex-end',
  },

  bookmarkLabel: {
    fontSize: 16,
    color: '#124C81',
  },
});
