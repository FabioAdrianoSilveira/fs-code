import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CustomerController from '../../controllers/CustomerController';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles, colors } from '../styles/globalStyles';

export default function ShopDetailScreen({ navigation, route, user }) {
  const { shopId } = route.params;
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const shopData = await CustomerController.loadShop(shopId, user.userId);
      const productList = await CustomerController.loadShopProducts(shopId);
      setShop(shopData);
      setProducts(productList);
    } catch (err) {
      setError(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [shopId, user.userId]),
  );

  const handleToggleFavorite = async () => {
    try {
      const isFavorite = await CustomerController.toggleFavorite(
        user.userId,
        shop,
        shop.favorite,
      );
      setShop({ ...shop, favorite: isFavorite });
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  };

  const handleAddToCart = (product) => {
    const qty = parseInt(quantities[product.id] || '1', 10);

    if (qty < 1 || qty > product.stock) {
      Alert.alert('Erro', 'Quantidade invalida');
      return;
    }

    CustomerController.addToCart(shopId, product, qty);
    Alert.alert('Sucesso', `${product.name} adicionado ao carrinho`);
  };

  if (!shop) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.subtitle}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>{shop.name}</Text>
      <Text style={globalStyles.subtitle}>{shop.description}</Text>
      <Text style={globalStyles.cardText}>{shop.address}</Text>

      <PrimaryButton
        title={shop.favorite ? 'Remover Favorito' : 'Favoritar Loja'}
        secondary
        onPress={handleToggleFavorite}
      />
      <PrimaryButton title="Ver Carrinho" onPress={() => navigation.navigate('Cart')} />

      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      <Text style={[globalStyles.cardTitle, { marginTop: 16 }]}>Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={globalStyles.subtitle}>Nenhum produto disponivel</Text>}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.cardTitle}>{item.name}</Text>
            <Text style={globalStyles.cardText}>{item.description}</Text>
            <Text style={globalStyles.cardText}>R$ {Number(item.price).toFixed(2)}</Text>
            <Text style={globalStyles.cardText}>Estoque: {item.stock}</Text>
            <FormInput
              placeholder="Qtd"
              value={quantities[item.id] || '1'}
              onChangeText={(v) => setQuantities((prev) => ({ ...prev, [item.id]: v }))}
              keyboardType="number-pad"
            />
            <PrimaryButton title="Adicionar ao Carrinho" onPress={() => handleAddToCart(item)} />
          </View>
        )}
      />

      <PrimaryButton title="Voltar" secondary onPress={() => navigation.goBack()} />
    </View>
  );
}
