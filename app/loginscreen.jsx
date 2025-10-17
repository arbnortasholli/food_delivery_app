import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={{ backgroundColor: 'white', width: '100%', padding: 10, borderRadius: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ backgroundColor: 'white', width: '100%', padding: 10, borderRadius: 8, marginBottom: 20 }}
      />
      <Button title="Login" onPress={() => router.push('/(tabs)')} />
    </View>
  );
}
