import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import ActionButton from '../../components/ActionButton';
import InputField from '../../components/InputField';

export default function LoginScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const styles = createStyles(colors);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Logged in successfully!');
      router.replace('/');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" 
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace('/ProfilePage')} 
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.form}>
          <InputField
            placeholder="Email address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            type="email"
            icon="mail-outline"
          />

          <InputField
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            type="password"
            secureTextEntry={!showPassword}
            showPasswordToggle={true}
            onTogglePassword={() => setShowPassword(!showPassword)}
            icon="lock-closed-outline"
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
              Forgot your password?
            </Text>
          </TouchableOpacity>

          <ActionButton
            title="Sign In"
            onPress={handleLogin}
            variant="primary"
            loading={isLoading}
            disabled={isLoading}
            icon="log-in-outline"
            fullWidth={true}
            style={{ marginBottom: 24 }}
          />

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.text }]}>or</Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          <View style={styles.socialContainer}>
            <ActionButton
              title="Google"
              onPress={() => { }}
              variant="secondary"
              icon="logo-google"
              fullWidth={false}
              style={{ flex: 1 }}
            />

            <ActionButton
              title="Apple"
              onPress={() => { }}
              variant="secondary"
              icon="logo-apple"
              fullWidth={false}
              style={{ flex: 1 }}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.text }]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={[styles.footerLink, { color: colors.primary }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop:50,
    padding: 24,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text + '80',
  },
  form: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    opacity: 0.6,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});