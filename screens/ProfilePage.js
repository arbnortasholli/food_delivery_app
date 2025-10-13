import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useTheme } from '../theme/ThemeContext';


export default function ProfilePage({ navigation }) {
  const { colors } = useTheme();
  const [name, setName] = useState('John Doe');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>Profile 👤</Text>
      <Text style={{ fontSize: 16, color: colors.text, opacity: 0.8, marginBottom: 20 }}>
        Welcome back, {name}!
      </Text>

      <TextInput
        placeholder="Update your name..."
        placeholderTextColor={colors.text + '80'}
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: colors.primary,
          borderRadius: 8,
          padding: 10,
          width: 220,
          color: colors.text,
          marginBottom: 20,
          backgroundColor: colors.card,
        }}
      />

      <Button color={colors.primary} title="Save Changes 💾" onPress={() => alert('Profile updated!')} />
      <View style={{ marginTop: 20 }}>
        <Button color={colors.accent} title="Back to Main 🏠" onPress={() => navigation.navigate('Main')} />
      </View>
    </View>
  );
}
