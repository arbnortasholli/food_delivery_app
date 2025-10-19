import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Avatar from '../assets/avatar.png';
import Spacer from '../components/Spacer';
import ActionButton from '../components/ActionButton';

export default function ProfilePage() {
  const { colors, userPreference, setLightMode, setDarkMode, setSystemMode } = useTheme();
  const router = useRouter();
  const styles = profileStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Avatar} style={styles.avatar} resizeMode="cover" />
      <Text style={styles.name}>Guest</Text>
      <Text style={styles.email}>Guest@example.com</Text>
      
      <Spacer height={40} />
      
      <Text style={styles.guestText}>Login or register to view your profile</Text>
      
      <View style={styles.authButtonsContainer}>
        <ActionButton
          title="Login"
          onPress={() => router.push('/login')}  
          variant="primary"
          icon="log-in"
          fullWidth={false}
          style={{ flex: 1 }}
        />
        
        <ActionButton
          title="Register"
          onPress={() => router.push('/register')}  
          variant="outline"
          icon="person-add"
          fullWidth={false}
          style={{ flex: 1 }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
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
            const iconColor = isActive ? "#fff" : colors.primary;

            return (
              <ActionButton
                key={label}
                title={label}
                onPress={() => value === null ? setSystemMode() : value === 'light' ? setLightMode() : value === 'dark' ? setDarkMode() : null}
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
    </SafeAreaView>
  );
}

export const profileStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.background,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 15,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 5,
      color: colors.text,
    },
    email: {
      fontSize: 16,
      opacity: 0.7,
      marginBottom: 10,
      color: colors.text,
    },
    guestText: {
      fontSize: 14,
      opacity: 0.6,
      marginBottom: 20,
      color: colors.text,
      textAlign: 'center',
    },
    authButtonsContainer: {
      flexDirection: 'row',
      width: '100%',
      gap: 12,
      marginBottom: 20,
    },
    section: {
      width: '100%',
      padding: 20,
      borderRadius: 16,
      marginVertical: 8,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: colors.text,
    },
    modeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    currentThemeInfo: {
      marginTop: 15,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    currentThemeText: {
      fontSize: 14,
      textAlign: 'center',
      opacity: 0.8,
    },
  });