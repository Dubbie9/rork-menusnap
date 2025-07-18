import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Search, MapPin, ArrowRight, ChevronLeft } from 'lucide-react-native';
import { useMenuUpload } from '@/providers/MenuUploadProvider';
import { Restaurant } from '@/types/restaurant';
import { airtableService } from '@/services/airtable';
import { colors } from '@/constants/colors';

interface LocationGroup {
  location: string;
  count: number;
  restaurants: Restaurant[];
}

export default function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [locationGroups, setLocationGroups] = useState<LocationGroup[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<LocationGroup[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const { setSelectedRestaurant } = useMenuUpload();

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredGroups(locationGroups);
    } else {
      const filtered = locationGroups.filter(group =>
        group.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.restaurants.some(restaurant =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ).map(group => ({
        ...group,
        restaurants: group.restaurants.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }));
      setFilteredGroups(filtered);
    }
  }, [searchQuery, locationGroups]);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      const data = await airtableService.getRestaurants();
      setRestaurants(data);
      
      const groups = data.reduce((acc: { [key: string]: Restaurant[] }, restaurant) => {
        const location = restaurant.location;
        if (!acc[location]) {
          acc[location] = [];
        }
        acc[location].push(restaurant);
        return acc;
      }, {});

      const locationGroups = Object.entries(groups).map(([location, restaurants]) => ({
        location,
        count: restaurants.length,
        restaurants,
      })).sort((a, b) => b.count - a.count);

      setLocationGroups(locationGroups);
      setFilteredGroups(locationGroups);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    router.push('/camera');
  };

  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location);
  };

  const handleBackToLocations = () => {
    setSelectedLocation(null);
  };

  const renderLocationCard = ({ item }: { item: LocationGroup }) => (
    <TouchableOpacity 
      style={styles.locationCard} 
      onPress={() => handleSelectLocation(item.location)}
      testID={`location-${item.location}`}
    >
      <View style={styles.locationHeader}>
        <View style={styles.locationInfo}>
          <Text style={styles.locationName}>{item.location}</Text>
          <View style={styles.countContainer}>
            <MapPin size={14} color={colors.textSecondary} />
            <Text style={styles.restaurantCount}>
              {item.count} restaurant{item.count !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
        <ArrowRight size={18} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  const renderRestaurant = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity 
      style={styles.restaurantCard} 
      onPress={() => handleSelectRestaurant(item)}
      testID={`restaurant-${item.id}`}
    >
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantContact}>{item.contactInfo}</Text>
      </View>
      <ArrowRight size={18} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading restaurants...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const selectedLocationData = locationGroups.find(group => group.location === selectedLocation);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {selectedLocation && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackToLocations}>
            <ChevronLeft size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>
          {selectedLocation ? selectedLocation : 'Select Location'}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={18} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={selectedLocation ? "Search restaurants..." : "Search locations..."}
            placeholderTextColor={colors.textLight}
            testID="search-input"
          />
        </View>
      </View>

      {selectedLocation ? (
        <View style={styles.content}>
          <Text style={styles.resultsText}>
            {selectedLocationData?.restaurants.length} restaurant{selectedLocationData?.restaurants.length !== 1 ? 's' : ''} in {selectedLocation}
          </Text>
          <FlatList
            data={selectedLocationData?.restaurants || []}
            renderItem={renderRestaurant}
            keyExtractor={(item) => item.id}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No restaurants found</Text>
                <Text style={styles.emptySubtext}>Try adjusting your search</Text>
              </View>
            }
          />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.resultsText}>
            {filteredGroups.length} location{filteredGroups.length !== 1 ? 's' : ''} available
          </Text>
          <FlatList
            data={filteredGroups}
            renderItem={renderLocationCard}
            keyExtractor={(item) => item.location}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No locations found</Text>
                <Text style={styles.emptySubtext}>Try adjusting your search</Text>
              </View>
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: 12,
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.surface,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 6,
    paddingHorizontal: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  resultsText: {
    padding: 20,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  locationCard: {
    backgroundColor: colors.background,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  restaurantCount: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  restaurantCard: {
    backgroundColor: colors.background,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  restaurantContact: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '400',
  },
});