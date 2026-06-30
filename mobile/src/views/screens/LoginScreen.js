import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import AuthController from '../../controllers/AuthController';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles } from '../styles/globalStyles';

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const user = await AuthController.login(email.trim(), password);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Food Saver</Text>
      <Text style={globalStyles.subtitle}>Conectando lojistas e clientes</Text>

      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      <FormInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <FormInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <PrimaryButton title="Entrar" onPress={handleLogin} loading={loading} />
      <PrimaryButton
        title="Cadastrar Lojista"
        secondary
        onPress={() => navigation.navigate('RegisterShopkeeper')}
      />
      <PrimaryButton
        title="Cadastrar Cliente"
        secondary
        onPress={() => navigation.navigate('RegisterCustomer')}
      />
    </View>
  );
}
