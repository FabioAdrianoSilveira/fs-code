import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CustomerController from '../../controllers/CustomerController';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles } from '../styles/globalStyles';

const statusLabel = {
  PENDING: 'Pendente',
  CONFIRMED: 'Confirmada',
  PICKED_UP: 'Retirada',
  CANCELLED: 'Cancelada',
};

export default function PurchaseHistoryScreen({ navigation, user }) {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState('');

  const loadPurchases = async () => {
    try {
      const data = await CustomerController.loadPurchases(user.userId);
      setPurchases(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPurchases();
    }, [user.userId]),
  );

  const handleCancel = (purchase) => {
    Alert.alert('Cancelar compra', 'Deseja cancelar esta compra nao retirada?', [
      { text: 'Nao', style: 'cancel' },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: async () => {
          try {
            await CustomerController.cancelPurchase(user.userId, purchase.id);
            loadPurchases();
          } catch (err) {
            Alert.alert('Erro', err.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Minhas Compras</Text>
      <Text style={globalStyles.subtitle}>UC 09 - Historico ordenado por data</Text>
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      <FlatList
        data={purchases}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={globalStyles.subtitle}>Nenhuma compra registrada</Text>}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.cardTitle}>{item.shopName}</Text>
            <Text style={globalStyles.cardText}>R$ {Number(item.totalAmount).toFixed(2)}</Text>
            <Text style={globalStyles.cardText}>Status: {statusLabel[item.status] || item.status}</Text>
            <Text style={globalStyles.cardText}>Data: {item.createdAt?.replace('T', ' ').substring(0, 16)}</Text>
            {item.canCancel() ? (
              <PrimaryButton title="Cancelar Compra" danger onPress={() => handleCancel(item)} />
            ) : null}
          </View>
        )}
      />

      <PrimaryButton title="Voltar" secondary onPress={() => navigation.goBack()} />
    </View>
  );
}
