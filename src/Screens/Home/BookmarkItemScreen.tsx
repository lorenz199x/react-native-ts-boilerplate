import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Linking } from 'react-native';
import { compose } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';

/** reduc */
import { withBrewery, withBreweryRedux } from '../../HOC';

/**
 * This is fully working but I change the approach to HOC
 */
// const mapStateToProps = (state) => ({
//   bookmarkedItems: state.Breweries.bookmarkedItems,
// });

// const mapDispatchToProps = {
//   getBookmarkedItems,
//   removeBookmark,
// };

const BookmarkItemScreen = (props) => {
  const { bookmarkItems, getBookmarkedItems, removeBookmark } = props;

  useEffect(() => {
    // Fetch bookmarked items when the component mounts
    getBookmarkedItems();
  }, []);

  const handleDeleteBookmark = (itemId: string) => {
    removeBookmark(itemId);
  };

  const renderBookmarkItem = ({ item }) => {
    const address = `${item.street}, ${item.city}, ${item.state}, ${item.postal_code}, ${item.country}`;
    return (
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>
            <Icon name="building" style={styles.icon} /> {item.name}
          </Text>
          <Text style={styles.address}>
            <Icon name="map-marker" style={styles.icon} /> {address}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(item.website_url)}>
            <Text style={styles.link}>
              <Icon name="external-link" style={styles.icon} /> {item.website_url}
            </Text>
          </TouchableOpacity>
          <Text style={styles.updatedDate}>
            <Icon name="envelope" style={styles.icon} /> Postal Code: {item.postal_code}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteBookmark(item.id)}
        >
          <Icon name="trash" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  const keyExtractor = (item) => item.id.toString();

  const ListEmptyComponent = () => (
    <Text style={styles.noItemsText}>No bookmarked items found</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Bookmarked Items</Text>
      </View>
      <FlatList
        data={bookmarkItems}
        renderItem={renderBookmarkItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.flatListContentContainer}
      />
    </View>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(BookmarkItemScreen);

const WrappedComponent = compose(
  withBrewery,
  withBreweryRedux
)(BookmarkItemScreen)

export default WrappedComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99A8BB',
  },
  headerContainer: {
    backgroundColor: '#124C81',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#f1f1f1',
  },
  flatListContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 10,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000000',
  },
  type: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    marginBottom: 4,
    color: '#000000',
  },
  link: {
    fontSize: 14,
    color: '#0000FF',
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
  updatedDate: {
    fontSize: 12,
    color: '#808080',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  icon: {
    marginRight: 4,
  },
  noItemsText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
    color: '#808080',
  },
});