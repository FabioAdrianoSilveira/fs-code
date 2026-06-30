import React from 'react';
import { TextInput } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function FormInput({ style, ...props }) {
  return <TextInput style={[globalStyles.input, style]} {...props} />;
}
