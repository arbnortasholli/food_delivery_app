import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { profileStyles } from '../styles/profileStyles';

export default function Profile() {
  const { colors } = useTheme();
  const styles = profileStyles(colors);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/avatar.png')}
        style={styles.avatar}
        resizeMode="cover"
      />
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
    </View>
  );
}
