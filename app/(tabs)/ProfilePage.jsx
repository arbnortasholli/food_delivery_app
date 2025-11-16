import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from '../../components/ActionButton';
import { logoutUser } from '../../services/authService';
import { getUserFavourites } from "../../services/favouriteService";
import { useFocusEffect } from '@react-navigation/native';
import AddressModal from '../../components/AddressModal';
import { getUserAddress, updateUserAddress } from '../../services/databaseService';
import { getFavorites,removeFavourite } from '../../services/favorites';

export default function ProfilePage() {
  const { 
    colors, 
    setSystemMode, 
    setLightMode, 
    setDarkMode, 
    userPreference, 
    setUserLoggedIn, 
    setUserLoggedOut,
    isUserLoggedIn 
  } = useTheme();
  
  const router = useRouter();
  const { user, loading } = useAuth();
  const [address, setAddress] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [favourites, setFavourites] = useState([]);

  const styles = createStyles(colors);

  // Sync user status with ThemeContext
  useEffect(() => {
    if (user && !isUserLoggedIn) {
      setUserLoggedIn();
    } else if (!user && isUserLoggedIn) {
      setUserLoggedOut();
    }
  }, [user, isUserLoggedIn, setUserLoggedIn, setUserLoggedOut]);

  useEffect(() => {
    if (user) {
      loadUserAddress();
    }
  }, [user]);

  const loadUserAddress = async () => {
    if (!user?.uid) return;
    
    try {
      setAddressLoading(true);
      const savedAddress = await getUserAddress(user.uid);
      if (savedAddress) {
        setAddress(savedAddress);
      }
    } catch (error) {
      console.error('Error loading address:', error);
    } finally {
      setAddressLoading(false);
    }
  };

  const handleSaveAddress = async (newAddress) => {
    if (!user?.uid) return;
    
    try {
      await updateUserAddress(user.uid, newAddress);
      setAddress(newAddress);
      Alert.alert('Success', 'Address updated successfully! ✅');
    } catch (error) {
      console.error('Error saving address:', error);
      Alert.alert('Error', 'Failed to update address');
    }
  };

  const handleDeleteAddress = () => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to remove your delivery address?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await updateUserAddress(user.uid, '');
              setAddress('');
              Alert.alert('Success', 'Address removed successfully');
            } catch (error) {
              console.error('Error deleting address:', error);
            }
          }
        }
      ]
    );
  };

  const handleRemoveFavourite = async (itemId, itemName) => {
  Alert.alert(
    'Remove Favourite',
    `Are you sure you want to remove "${itemName}" from favourites?`,
    [
      { 
        text: 'Cancel', 
        style: 'cancel' 
      },
      { 
        text: 'Remove', 
        style: 'destructive',
        onPress: async () => {
          try {
            console.log("🔄 Starting remove process...");
            
            const { error, success } = await removeFavourite(itemId);
            
            if (error) {
              console.error('❌ Remove failed:', error);
              Alert.alert('Error', 'Failed to remove favourite');
            } else if (success) {
              console.log("✅ Remove successful, refreshing favourites...");
              Alert.alert('Success', 'Removed from favourites!');
              
              
              await refreshFavourites();
              console.log("🔄 Favourites refreshed after remove");
            }
          } catch (error) {
            console.error('❌ Error in handleRemoveFavourite:', error);
            Alert.alert('Error', 'Failed to remove favourite');
          }
        }
      }
    ]
  );
};

  const refreshFavourites = async () => {
  if (user) {
    console.log("🔍 Getting favourites for user:", user.uid);
    const favs = await getFavorites();
    console.log('📋 Raw favourites data:', favs);
    
   
    if (Array.isArray(favs)) {
      console.log("✅ Favourites is an array, length:", favs.length);
      favs.forEach((item, index) => {
        console.log(`Item ${index}:`, {
          value: item,
          type: typeof item
        });
      });
    } else {
      console.log("❌ Favourites is not an array:", typeof favs);
    }
    
    setFavourites(favs);
  }
};

  useFocusEffect(
    useCallback(() => {
      refreshFavourites();
    }, [user])
  );

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await logoutUser();
              if (error) {
                Alert.alert('Error', error);
              } else {
                Alert.alert('Success', 'Logged out successfully!');
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to log out');
            }
          },
        },
      ]
    );
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const handleRegister = () => {
    router.push('/(auth)/register');
  };

  const getCurrentThemeDisplay = () => {
    if (!user) {
      return 'Light (default)';
    }
    return userPreference === null
      ? 'System'
      : userPreference === 'light'
      ? 'Light'
      : 'Dark';
  };

  const handleThemeChange = (value) => {
    if (!user) {
      Alert.alert(
        'Login Required',
        'Please log in to change theme preferences',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Log In',
            onPress: handleLogin,
          },
        ]
      );
      return;
    }

    if (value === null) {
      setSystemMode();
    } else if (value === 'light') {
      setLightMode();
    } else if (value === 'dark') {
      setDarkMode();
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Loading...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </View>
          
          {user ? (
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>
                {user.displayName || 'User'}
              </Text>
              <Text style={[styles.userEmail, { color: colors.text + '80' }]}>
                {user.email}
              </Text>
              <View style={[styles.verifiedBadge, { backgroundColor: colors.primary }]}>
                <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
              <View style={[styles.currentThemeInfo, { marginTop: 8 }]}>
                <Text style={[styles.currentThemeText, { color: colors.text + '60' }]}>
                  Current theme: {getCurrentThemeDisplay()}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>
                Welcome!
              </Text>
              <Text style={[styles.userEmail, { color: colors.text + '80' }]}>
                Please log in to your account
              </Text>
              <View style={[styles.currentThemeInfo, { marginTop: 8 }]}>
                <Text style={[styles.currentThemeText, { color: colors.text + '60' }]}>
                  Current theme: {getCurrentThemeDisplay()}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Theme Preference Section */}
        {user && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
            <View style={styles.modeContainer}>
              {[
                {
                  label: 'System',
                  value: null,
                  icon: 'phone-portrait',
                  activeIcon: 'phone-portrait'
                },
                {
                  label: 'Light',
                  value: 'light',
                  icon: 'sunny-outline',
                  activeIcon: 'sunny'
                },
                {
                  label: 'Dark',
                  value: 'dark',
                  icon: 'moon-outline',
                  activeIcon: 'moon'
                },
              ].map(({ label, value, icon, activeIcon }) => {
                const isActive = userPreference === value || (value === null && userPreference === null);
                const currentIcon = isActive ? activeIcon : icon;

                return (
                  <ActionButton
                    key={label}
                    title={label}
                    onPress={() => handleThemeChange(value)}
                    variant={isActive ? "primary" : "secondary"}
                    size="small"
                    icon={currentIcon}
                    style={{ flex: 1 }}
                    textStyle={{ fontSize: 12 }}
                  />
                );
              })}
            </View>

            <View style={styles.currentThemeInfo}>
              <Text style={[styles.currentThemeText, { color: colors.text }]}>
                {userPreference === null
                  ? 'Using system mode'
                  : userPreference === 'light'
                    ? 'Using light mode'
                    : 'Using dark mode'
                }
              </Text>
            </View>
          </View>
        )}


        <View style={styles.favouritesSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            My Favourites ❤️
          </Text>

          {favourites.length === 0 ? (
            <View style={styles.emptyFavourites}>
              <Ionicons name="heart-outline" size={48} color={colors.text + '40'} />
              <Text style={[styles.emptyFavouritesText, { color: colors.text + '60' }]}>
                You haven't added any favourites yet
              </Text>
              <Text style={[styles.emptyFavouritesSubtext, { color: colors.text + '40' }]}>
                Tap the heart icon on food items to add them here
              </Text>
            </View>
          ) : (
            <View style={styles.favouritesList}>
              {favourites.map((favourite) => (
                <View
                  key={favourite.id}
                  style={[styles.favouriteItem, { backgroundColor: colors.card }]}
                >
                  <View style={styles.favouriteInfo}>
                    <Text style={[styles.favouriteName, { color: colors.text }]}>
                      {favourite.name}
                    </Text>
                    <Text style={[styles.favouritePrice, { color: colors.primary }]}>
                      ${favourite.price}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleRemoveFavourite(favourite.id, favourite.name)}
                    style={[styles.removeButton, { backgroundColor: colors.background }]}
                  >
                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

     
        <View style={styles.actionsSection}>
          {user ? (
            <>
              <TouchableOpacity style={[styles.actionItem, { backgroundColor: colors.card }]}>
                <Ionicons name="person-outline" size={24} color={colors.primary} />
                <Text style={[styles.actionText, { color: colors.text }]}>Edit Profile</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text + '60'} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionItem, {backgroundColor: colors.card}]}
                onPress={() => {
                  console.log("Address item pressed");
                  setShowAddressModal(true);
                }}
                activeOpacity={0.7}>
                <Ionicons name="location-outline" size={24} color={colors.primary} />
                <View style={styles.addressActionContent}>
                  <Text style={[styles.actionText, { color: colors.text }]}>
                    Delivery Address
                  </Text>
                  {address ? (
                    <Text style={[styles.addressPreview, { color: colors.text + '70' }]} numberOfLines={1}>
                      {address.length > 30 ? address.substring(0, 30) + '...' : address}
                    </Text>
                  ) : (
                    <Text style={[styles.noAddressText, { color: colors.text + '60' }]}>
                      Not set - Tap to add
                    </Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.text + '60'} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionItem, { backgroundColor: colors.card }]}>
                <Ionicons name="card-outline" size={24} color={colors.primary} />
                <Text style={[styles.actionText, { color: colors.text }]}>Payment Methods</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text + '60'} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionItem, { backgroundColor: colors.card }]}>
                <Ionicons name="notifications-outline" size={24} color={colors.primary} />
                <Text style={[styles.actionText, { color: colors.text }]}>Notifications</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text + '60'} />
              </TouchableOpacity>

              <ActionButton
                title="Log Out"
                onPress={handleLogout}
                variant="secondary"
                icon="log-out-outline"
                fullWidth={true}
                style={styles.logoutButton}
              />
            </>
          ) : (
            <>
              <ActionButton
                title="Sign In"
                onPress={handleLogin}
                variant="primary"
                icon="log-in-outline"
                fullWidth={true}
                style={styles.authButton}
              />

              <ActionButton
                title="Create Account"
                onPress={handleRegister}
                variant="secondary"
                icon="person-add-outline"
                fullWidth={true}
                style={styles.authButton}
              />

              <View style={styles.guestInfo}>
                <Ionicons name="information-circle-outline" size={20} color={colors.text + '60'} />
                <Text style={[styles.guestText, { color: colors.text + '60' }]}>
                  Log in to customize theme preferences and save your order history
                </Text>
              </View>
            </>
          )}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appVersion, { color: colors.text + '60' }]}>
            FoodExpress v1.0.0
          </Text>
        </View>
      </ScrollView>

      <AddressModal
        visible={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSave={handleSaveAddress}
        existingAddress={address}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  currentThemeInfo: {
    alignItems: 'center',
  },
  currentThemeText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  favouritesSection: {
    marginBottom: 30,
  },
  emptyFavourites: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    borderRadius: 12,
    backgroundColor: colors.card + '50',
  },
  emptyFavouritesText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyFavouritesSubtext: {
    fontSize: 12,
    textAlign: 'center',
  },
  favouritesList: {
    gap: 8,
  },
  favouriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  favouriteInfo: {
    flex: 1,
  },
  favouriteName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  favouritePrice: {
    fontSize: 14,
    fontWeight: '500',
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  actionsSection: {
    marginBottom: 40,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    minHeight: 60,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  authButton: {
    marginBottom: 12,
  },
  logoutButton: {
    marginTop: 20,
  },
  guestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.card,
    gap: 8,
  },
  guestText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 20,
  },
  appVersion: {
    fontSize: 14,
  },
  addressActionContent: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 8,
  },
  addressPreview: {
    fontSize: 12,
    marginTop: 2,
  },
  noAddressText: {
    fontSize: 12,
    marginTop: 2,
    fontStyle: 'italic',
  },
});