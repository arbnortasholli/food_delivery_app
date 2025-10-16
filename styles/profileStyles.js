import { StyleSheet } from 'react-native';

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
