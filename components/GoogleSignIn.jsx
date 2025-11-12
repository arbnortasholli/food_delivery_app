// components/GoogleSignIn.jsx
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../config/firebase';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '382317126727-d80828bedkrmih3gssmor5or32a43f6p.apps.googleusercontent.com',
    scopes: ['openid', 'profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        handleSignIn(authentication.accessToken);
      }
    }
  }, [response]);

  const handleSignIn = async (accessToken) => {
    try {
      setLoading(true);
      const credential = GoogleAuthProvider.credential(null, accessToken);
      const result = await signInWithCredential(auth, credential);
      const user = result.user;
      
      console.log('User logged in:', user);
      Alert.alert('Success', 'Signed in with Google successfully!');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      Alert.alert('Error', error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handlePress = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      await promptAsync();
    } catch (error) {
      console.error('Prompt error:', error);
      Alert.alert('Error', 'Failed to start Google sign-in');
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={!request || loading}
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        gap: 8,
        opacity: (!request || loading) ? 0.6 : 1,
      }}
    >
      <Ionicons name="logo-google" size={20} color="#DB4437" />
      <Text style={{ color: '#333', fontWeight: '500', fontSize: 14 }}>
        {loading ? 'Loading...' : 'Google'}
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleSignIn;