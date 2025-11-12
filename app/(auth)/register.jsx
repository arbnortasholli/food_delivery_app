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
import { registerUser } from '../../services/authService';
import GoogleSignIn from '../../components/GoogleSignIn';

export default function RegisterScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false); 

  const styles = createStyles(colors);

  const handleRegister = async () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (!acceptedTerms) { 
      Alert.alert('Error', 'You must accept the Terms and Privacy Policy');
      return;
    }

    setIsLoading(true);
    
    try {
      const { user, error } = await registerUser(
        formData.email, 
        formData.password, 
        formData.fullName
      );
      
      if (error) {
        Alert.alert('Registration Failed', error);
      } else {
        Alert.alert('Success', 'Account created successfully!');
        router.replace('/');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
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
            onPress={() => router.back()} 
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us today!</Text>
        </View>

        <View style={styles.form}>
          <InputField
            placeholder="Full name"
            value={formData.fullName}
            onChangeText={(text) => setFormData({...formData, fullName: text})}
            type="text"
            icon="person-outline"
            autoCapitalize="words"
          />

          <InputField
            placeholder="Email address"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            type="email"
            icon="mail-outline"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <InputField
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
            type="password"
            secureTextEntry={!showPassword}
            showPasswordToggle={true}
            onTogglePassword={() => setShowPassword(!showPassword)}
            icon="lock-closed-outline"
            autoCapitalize="none"
          />

          <InputField
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
            type="password"
            secureTextEntry={!showConfirmPassword}
            showPasswordToggle={true}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            icon="lock-closed-outline"
            autoCapitalize="none"
          />

          <TouchableOpacity 
            style={styles.termsContainer}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.checkbox,
              acceptedTerms && styles.checkboxChecked
            ]}>
              {acceptedTerms && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </View>
            <Text style={[styles.termsText, { color: colors.text }]}>
              I agree to the{' '}
              <Text style={[styles.termsLink, { color: colors.primary }]}>Terms</Text>
              {' '}and{' '}
              <Text style={[styles.termsLink, { color: colors.primary }]}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          <ActionButton
            title={acceptedTerms ? 'Create Account' : 'Accept Terms to Continue'}
            onPress={handleRegister}
            variant="primary"
            loading={isLoading}
            disabled={!acceptedTerms || isLoading}
            icon="person-add-outline"
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
              onPress={() => Alert.alert('Coming Soon', 'Google signup will be available soon')}
              variant="secondary"
              icon="logo-google"
              fullWidth={false}
              style={{ flex: 1 }}
            />

            <ActionButton
              title="Apple"
              onPress={() => Alert.alert('Coming Soon', 'Apple signup will be available soon')}
              variant="secondary"
              icon="logo-apple"
              fullWidth={false}
              style={{ flex: 1 }}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.text }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={[styles.footerLink, { color: colors.primary }]}>
              Sign In
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
    padding: 24,
    paddingTop: 50,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
  },
  termsLink: {
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