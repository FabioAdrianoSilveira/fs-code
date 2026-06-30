import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CustomerController from '../../controllers/CustomerController';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles } from '../styles/globalStyles';

export default function CartScreen({ navigation, user }) {
  const [cart, setCart] = useState(CustomerController.getCart());
  const [loading, setLoading] = useState(false);

  const refreshCart = () => {
    setCart({ ...CustomerController.getCart(), items: [...CustomerController.getCart().items] });
  };

  useFocusEffect(
    useCallback(() => {
      refreshCart();
    }, []),
  );

  const handleCheckout = async () => {
    if (cart.isEmpty()) {
      Alert.alert('Aviso', 'Carrinho vazio');
      return;
    }

    setLoading(true);

    try {
      const purchase = await CustomerController.checkout(user.userId);
      Alert.alert('Sucesso', `Compra #${purchase.id} realizada!`);
      refreshCart();
      navigation.navigate('PurchaseHistory');
    } catch (err) {
      Alert.alert('Erro', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Carrinho</Text>
      <Text style={globalStyles.subtitle}>UC 08 - Efetuar compra</Text>

      <FlatList
        data={cart.items}
        keyExtractor={(item) => String(item.product.id)}
        ListEmptyComponent={<Text style={globalStyles.subtitle}>Carrinho vazio</Text>}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.cardTitle}>{item.product.name}</Text>
            <Text style={globalStyles.cardText}>
              {item.quantity}x R$ {Number(item.product.price).toFixed(2)}
            </Text>
          </View>
        )}
      />

      {!cart.isEmpty() ? (
        <Text style={globalStyles.cardTitle}>
          Total: R$ {cart.getTotal().toFixed(2)}
        </Text>
      ) : null}

      <PrimaryButton title="Finalizar Compra" onPress={handleCheckout} loading={loading} />
      <PrimaryButton title="Voltar" secondary onPress={() => navigation.goBack()} />
    </View>
  );
}
