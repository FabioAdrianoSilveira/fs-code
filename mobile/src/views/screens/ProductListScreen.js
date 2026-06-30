import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ShopkeeperController from '../../controllers/ShopkeeperController';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles, colors } from '../styles/globalStyles';

export default function ProductListScreen({ navigation, user }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    try {
      const data = await ShopkeeperController.loadProducts(user.userId);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [user.userId]),
  );

  const handleDelete = (product) => {
    Alert.alert('Excluir', `Deseja excluir ${product.name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await ShopkeeperController.deleteProduct(user.userId, product.id);
            loadProducts();
          } catch (err) {
            Alert.alert('Erro', err.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Produtos</Text>
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={globalStyles.subtitle}>Nenhum produto cadastrado</Text>}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.cardTitle}>{item.name}</Text>
            <Text style={globalStyles.cardText}>R$ {Number(item.price).toFixed(2)}</Text>
            <Text style={globalStyles.cardText}>Estoque: {item.stock}</Text>
            <Text style={globalStyles.cardText}>Validade: {item.expirationDate}</Text>
            <View style={[globalStyles.row, { marginTop: 8 }]}>
              <TouchableOpacity onPress={() => navigation.navigate('ProductForm', { product: item })}>
                <Text style={{ color: colors.primary, fontWeight: '600' }}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item)}>
                <Text style={{ color: colors.error, fontWeight: '600' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <PrimaryButton title="Novo Produto" onPress={() => navigation.navigate('ProductForm')} />
      <PrimaryButton title="Voltar" secondary onPress={() => navigation.goBack()} />
    </View>
  );
}
