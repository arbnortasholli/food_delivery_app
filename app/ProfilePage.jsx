import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Avatar from '../assets/avatar.png'

export default function ProfilePage() {
  const { colors } = useTheme();
  const styles = profileStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Avatar} style={styles.avatar} resizeMode="cover" />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>

      <View style={styles.section}>
        <Text style={styles.sectionText}>Order History</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionText}>Favorites</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionText}>Settings</Text>
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
      marginBottom: 20,
      color: colors.text,
    },
    section: {
      width: '100%',
      padding: 15,
      borderRadius: 12,
      marginVertical: 8,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    sectionText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
  });

