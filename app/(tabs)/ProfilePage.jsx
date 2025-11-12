import React, { useEffect } from 'react';
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

  const styles = createStyles(colors);

  // Sync user status with ThemeContext
  useEffect(() => {
    if (user && !isUserLoggedIn) {
      setUserLoggedIn();
    } else if (!user && isUserLoggedIn) {
      setUserLoggedOut();
    }
  }, [user, isUserLoggedIn, setUserLoggedIn, setUserLoggedOut]);

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
                // setUserLoggedOut do të thirret automatikisht nga useEffect
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

  // Funksion për të kontrolluar temën aktuale për shfaqje
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

  // Funksion për të kontrolluar nëse mund të ndryshohet tema
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

  // Nëse po loading, shfaq loading state
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
            // User i loguar
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
              {/* Shfaq informacion se cila temë po përdoret për user të loguar */}
              <View style={[styles.currentThemeInfo, { marginTop: 8 }]}>
                <Text style={[styles.currentThemeText, { color: colors.text + '60' }]}>
                  Current theme: {getCurrentThemeDisplay()}
                </Text>
              </View>
            </View>
          ) : (
            // User i paloguar
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>
                Welcome!
              </Text>
              <Text style={[styles.userEmail, { color: colors.text + '80' }]}>
                Please log in to your account
              </Text>
              {/* Shfaq informacion se cila temë po përdoret */}
              <View style={[styles.currentThemeInfo, { marginTop: 8 }]}>
                <Text style={[styles.currentThemeText, { color: colors.text + '60' }]}>
                  Current theme: {getCurrentThemeDisplay()}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Theme Preference Section - Shfaqet VETËM nëse useri është i loguar */}
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

        {/* Profile Actions */}
        <View style={styles.actionsSection}>
          {user ? (
            // User i loguar - shfaq profile actions dhe logout
            <>
              <TouchableOpacity style={[styles.actionItem, { backgroundColor: colors.card }]}>
                <Ionicons name="person-outline" size={24} color={colors.primary} />
                <Text style={[styles.actionText, { color: colors.text }]}>Edit Profile</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text + '60'} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionItem, { backgroundColor: colors.card }]}>
                <Ionicons name="location-outline" size={24} color={colors.primary} />
                <Text style={[styles.actionText, { color: colors.text }]}>Addresses</Text>
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

              {/* Logout Button */}
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
            // User i paloguar - shfaq login/register
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
  // Stilimet për seksionin e temës
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
  actionsSection: {
    marginBottom: 40,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
});