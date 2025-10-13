import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native/types_generated/index'

const loginscreen = () => {
  return (
    <View style={{backgroundColor: 'green', width: '100%', height: '90%'}}>
        <TextInput 
        placeholder='Email'
        keyboardType='email-address'
        
        />
      <Text>LoginScreen</Text>
    </View>
  )
}

export default loginscreen