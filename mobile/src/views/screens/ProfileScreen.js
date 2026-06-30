import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import AuthController from '../../controllers/AuthController';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles } from '../styles/globalStyles';

export default function ProfileScreen({ navigation, user, onLogout }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setError('');
    setLoading(true);

    try {
      const updated = await AuthController.updateProfile(user.userId, form);
      Alert.alert('Sucesso', 'Perfil atualizado');
      onLogout(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir conta',
      'Deseja excluir sua conta permanentemente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await AuthController.deleteAccount(user.userId);
              onLogout(null);
            } catch (err) {
              Alert.alert('Erro', err.message);
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Meu Perfil</Text>
      <Text style={globalStyles.subtitle}>Editar ou excluir conta</Text>

      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      <FormInput placeholder="Nome" value={form.name} onChangeText={(v) => updateField('name', v)} />
      <FormInput placeholder="Email" value={form.email} onChangeText={(v) => updateField('email', v)} autoCapitalize="none" keyboardType="email-address" />
      <FormInput placeholder="Telefone" value={form.phone} onChangeText={(v) => updateField('phone', v)} keyboardType="phone-pad" />
      <FormInput placeholder="Nova senha (opcional)" value={form.password} onChangeText={(v) => updateField('password', v)} secureTextEntry />

      <PrimaryButton title="Salvar" onPress={handleSave} loading={loading} />
      <PrimaryButton title="Excluir Conta" danger onPress={handleDelete} />
      <PrimaryButton title="Voltar" secondary onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}
