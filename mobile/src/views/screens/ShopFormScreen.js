import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ShopkeeperController from '../../controllers/ShopkeeperController';
import AuthController from '../../controllers/AuthController';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles } from '../styles/globalStyles';

export default function ShopFormScreen({ navigation, user, onLogout }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadShop = async () => {
    try {
      const shop = await ShopkeeperController.loadShop(user.userId);
      setForm({
        name: shop.name,
        description: shop.description,
        address: shop.address,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadShop();
    }, [user.userId]),
  );

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setError('');
    setLoading(true);

    try {
      await ShopkeeperController.updateShop(user.userId, form);
      Alert.alert('Sucesso', 'Loja atualizada com sucesso');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir conta',
      'Deseja excluir sua loja e conta permanentemente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await ShopkeeperController.deleteShop(user.userId);
              await AuthController.logout();
              onLogout();
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
      <Text style={globalStyles.title}>Minha Loja</Text>
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      <FormInput placeholder="Nome" value={form.name} onChangeText={(v) => updateField('name', v)} />
      <FormInput placeholder="Descricao" value={form.description} onChangeText={(v) => updateField('description', v)} />
      <FormInput placeholder="Endereco" value={form.address} onChangeText={(v) => updateField('address', v)} />

      <PrimaryButton title="Salvar" onPress={handleSave} loading={loading} />
      <PrimaryButton title="Excluir Conta" danger onPress={handleDelete} />
      <PrimaryButton title="Voltar" secondary onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}
