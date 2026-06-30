import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import ShopkeeperController from '../../controllers/ShopkeeperController';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles } from '../styles/globalStyles';

export default function ProductFormScreen({ navigation, route, user }) {
  const editing = route.params?.product;
  const [form, setForm] = useState({
    name: editing?.name || '',
    description: editing?.description || '',
    price: editing ? String(editing.price) : '',
    stock: editing ? String(editing.stock) : '',
    expirationDate: editing?.expirationDate || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setError('');
    setLoading(true);

    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      expirationDate: form.expirationDate,
    };

    try {
      if (editing) {
        await ShopkeeperController.updateProduct(user.userId, editing.id, payload);
      } else {
        await ShopkeeperController.createProduct(user.userId, payload);
      }
      Alert.alert('Sucesso', 'Produto salvo com sucesso');
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>{editing ? 'Editar Produto' : 'Novo Produto'}</Text>
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      <FormInput placeholder="Nome" value={form.name} onChangeText={(v) => updateField('name', v)} />
      <FormInput placeholder="Descricao" value={form.description} onChangeText={(v) => updateField('description', v)} />
      <FormInput placeholder="Preco" value={form.price} onChangeText={(v) => updateField('price', v)} keyboardType="decimal-pad" />
      <FormInput placeholder="Estoque" value={form.stock} onChangeText={(v) => updateField('stock', v)} keyboardType="number-pad" />
      <FormInput placeholder="Validade (AAAA-MM-DD)" value={form.expirationDate} onChangeText={(v) => updateField('expirationDate', v)} />

      <PrimaryButton title="Salvar" onPress={handleSave} loading={loading} />
      <PrimaryButton title="Cancelar" secondary onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}
