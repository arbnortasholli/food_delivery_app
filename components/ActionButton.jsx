import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ActionButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary', 'secondary', 'outline'
  size = 'medium', // 'small', 'medium', 'large'
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left', // 'left', 'right'
  fullWidth = false,
  style,
  textStyle,
  ...props
}) => {
  const { colors } = useTheme();

  const getButtonStyles = () => {
    const baseStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      paddingVertical: size === 'small' ? 10 : size === 'large' ? 18 : 14,
      paddingHorizontal: size === 'small' ? 16 : size === 'large' ? 24 : 20,
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : undefined,
    };

    const variantStyles = {
      primary: {
        backgroundColor: colors.primary,
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary,
      },
    };

    return [baseStyle, variantStyles[variant], style];
  };

  const getTextStyles = () => {
    const baseStyle = {
      fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
      fontWeight: '600',
      marginLeft: icon && iconPosition === 'left' ? 8 : 0,
      marginRight: icon && iconPosition === 'right' ? 8 : 0,
    };

    const variantTextStyles = {
      primary: { color: '#fff' },
      secondary: { color: colors.text },
      outline: { color: colors.primary },
    };

    return [baseStyle, variantTextStyles[variant], textStyle];
  };

  const renderIcon = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={variant === 'primary' ? '#fff' : colors.primary} />;
    }

    if (icon) {
      return (
        <Ionicons 
          name={icon} 
          size={size === 'small' ? 16 : size === 'large' ? 22 : 20} 
          color={variant === 'primary' ? '#fff' : colors.primary} 
        />
      );
    }

    return null;
  };

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {iconPosition === 'left' && renderIcon()}
      
      {loading ? (
        <Text style={getTextStyles()}>Loading...</Text>
      ) : (
        <Text style={getTextStyles()}>{title}</Text>
      )}
      
      {iconPosition === 'right' && renderIcon()}
    </TouchableOpacity>
  );
};

export default ActionButton;