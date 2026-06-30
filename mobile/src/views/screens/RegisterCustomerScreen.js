import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AuthController from '../../controllers/AuthController';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles } from '../styles/globalStyles';

export default function RegisterCustomerScreen({ navigation, onLogin }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    setError('');
    setLoading(true);

    try {
      const user = await AuthController.registerCustomer(form);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Cadastro de Cliente</Text>
      <Text style={globalStyles.subtitle}>UC 05 - Manter cadastro</Text>

      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      <FormInput placeholder="Nome" value={form.name} onChangeText={(v) => updateField('name', v)} />
      <FormInput placeholder="Email" value={form.email} onChangeText={(v) => updateField('email', v)} autoCapitalize="none" keyboardType="email-address" />
      <FormInput placeholder="Senha" value={form.password} onChangeText={(v) => updateField('password', v)} secureTextEntry />
      <FormInput placeholder="Telefone" value={form.phone} onChangeText={(v) => updateField('phone', v)} keyboardType="phone-pad" />

      <PrimaryButton title="Cadastrar" onPress={handleRegister} loading={loading} />
      <PrimaryButton title="Voltar" secondary onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}
