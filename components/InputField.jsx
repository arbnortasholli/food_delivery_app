import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const InputField = ({
  placeholder,
  value,
  onChangeText,
  type = 'text', // 'text', 'email', 'password'
  secureTextEntry = false,
  icon,
  showPasswordToggle = false,
  onTogglePassword,
  style,
}) => {
  const { colors } = useTheme();

  let keyboardType = 'default';
  if (type === 'email') {
    keyboardType = 'email-address';
  }

  let autoCapitalize = 'none';
  if (type === 'text') {
    autoCapitalize = 'sentences';
  }

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
      height: 56,
      marginBottom: 16,
      ...style
    }}>
      {icon && (
        <Ionicons 
          name={icon} 
          size={20} 
          color={colors.text} 
          style={{ marginRight: 12 }}
        />
      )}
      
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.text + '80'}
        value={value}
        onChangeText={onChangeText}
        style={{
          flex: 1,
          fontSize: 16,
          color: colors.text,
          height: '100%',
        }}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
      
      {showPasswordToggle && (
        <TouchableOpacity 
          onPress={onTogglePassword}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          style={{
            padding: 12, 
            marginLeft: 4,
          }}
        >
          <Ionicons 
            name={secureTextEntry ? "eye-outline" : "eye-off-outline"} 
            size={20} 
            color={colors.text} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;