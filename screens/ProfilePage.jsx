import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function Profile() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* User Avatar */}
      <Image
        source={require('../assets/avatar.png')} 
        style={styles.avatar}
        resizeMode="cover"
      />

      {/* User Info */}
      <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
      <Text style={[styles.email, { color: colors.text }]}>johndoe@example.com</Text>

      {/* Profile Sections */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionText, { color: colors.text }]}>Order History</Text>
      </View>

      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionText, { color: colors.text }]}>Favorites</Text>
      </View>

      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionText, { color: colors.text }]}>Settings</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 20,
  },
  section: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
