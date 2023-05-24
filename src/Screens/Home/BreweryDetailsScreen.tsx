import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const BreweryDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const openLink = () => {
    if (item.website_url) {
      Linking.openURL(item.website_url);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Icon name="arrow-left" size={24} color="#000000" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Brewery Details</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.type}>{item.brewery_type}</Text>
        </View>
        <View style={styles.profileInfo}>
          <View style={styles.infoItem}>
            <Icon name="phone" size={18} color="#555555" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {item.phone}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="map-marker" size={18} color="#555555" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {`${item.street}, ${item.city}, ${item.state}, ${item.postal_code}, ${item.country}`}
            </Text>
          </View>
          {/* {item.website_url && (
            <TouchableOpacity style={styles.infoItem} onPress={openLink}>
              <Icon name="external-link" size={18} color="blue" style={styles.infoIcon} />
              <Text style={styles.infoLinkText}>Visit Website</Text>
            </TouchableOpacity>
          )} */}
          <Text style={styles.updatedDate}>
            Postal Code: {moment().format('MMM, DD YYYY')}
            {/* {item.postal_code} */}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.floatingButton} onPress={openLink}>
        <Icon name="link" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default BreweryDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99A8BB',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  header: {
    backgroundColor: '#124C81',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f1f1',
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  profileHeader: {
    borderBottomColor: '#4E6190',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  type: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 8,
  },
  profileInfo: {},
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#000000',
  },
  infoLinkText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  updatedDate: {
    fontSize: 14,
    color: '#000000',
    marginTop: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#124C81',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
  },
});