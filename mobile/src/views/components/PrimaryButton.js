import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

export default function PrimaryButton({
  title,
  onPress,
  loading,
  danger,
  secondary,
}) {
  const buttonStyle = danger
    ? globalStyles.buttonDanger
    : secondary
      ? globalStyles.buttonSecondary
      : globalStyles.button;

  const textStyle = secondary ? globalStyles.buttonSecondaryText : globalStyles.buttonText;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={loading}>
      {loading ? (
        <ActivityIndicator color={secondary ? colors.primary : colors.white} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
