import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Avatar from '../assets/avatar.png';
import Spacer from '../components/Spacer';

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
        <TouchableOpacity 
          style={[styles.authButton, styles.loginButton]}
          onPress={() => router.push('/login')}
        >
          <Ionicons name="log-in" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.authButton, styles.registerButton]}
          onPress={() => router.push('/register')}
        >
          <Ionicons name="person-add" size={20} color={colors.primary} style={styles.buttonIcon} />
          <Text style={[styles.registerButtonText, { color: colors.primary }]}>Register</Text>
        </TouchableOpacity>
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
              <TouchableOpacity
                key={label}
                onPress={() => value === null ? setSystemMode() : value === 'light' ? setLightMode() : value === 'dark' ? setDarkMode() : null}
                style={[
                  styles.modeButton,
                  isActive && styles.modeButtonActive
                ]}
              >
                <Ionicons
                  name={currentIcon}
                  size={22}
                  color={iconColor}
                />
                <Text style={[
                  styles.modeButtonText,
                  isActive && styles.modeButtonTextActive
                ]}>
                  {label}
                </Text>
              </TouchableOpacity>
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
    authButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 2,
    },
    loginButton: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    registerButton: {
      backgroundColor: 'transparent',
      borderColor: colors.primary,
    },
    loginButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    registerButtonText: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    buttonIcon: {
      marginRight: 4,
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
    modeButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      paddingVertical: 12,
      paddingHorizontal: 8,
    },
    modeButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    modeButtonText: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.text,
    },
    modeButtonTextActive: {
      color: '#fff',
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