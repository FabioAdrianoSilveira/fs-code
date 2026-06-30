import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ShopkeeperController from '../../controllers/ShopkeeperController';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles, colors } from '../styles/globalStyles';

const statusLabel = {
  PENDING: 'Pendente',
  CONFIRMED: 'Confirmada',
  PICKED_UP: 'Retirada',
  CANCELLED: 'Cancelada',
};

export default function SalesListScreen({ navigation, user }) {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState('');

  const loadSales = async () => {
    try {
      const data = await ShopkeeperController.loadSales(user.userId);
      setSales(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSales();
    }, [user.userId]),
  );

  const handleConfirm = (sale) => {
    Alert.alert('Confirmar venda', `Confirmar pagamento de R$ ${Number(sale.totalAmount).toFixed(2)}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Confirmar',
        onPress: async () => {
          try {
            await ShopkeeperController.confirmSale(user.userId, sale.id);
            loadSales();
          } catch (err) {
            Alert.alert('Erro', err.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Vendas</Text>
      <Text style={globalStyles.subtitle}>Ordenadas por data (mais recente)</Text>
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      <FlatList
        data={sales}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={globalStyles.subtitle}>Nenhuma venda registrada</Text>}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.cardTitle}>{item.customerName}</Text>
            <Text style={globalStyles.cardText}>R$ {Number(item.totalAmount).toFixed(2)}</Text>
            <Text style={globalStyles.cardText}>Status: {statusLabel[item.status] || item.status}</Text>
            <Text style={globalStyles.cardText}>Data: {item.createdAt?.replace('T', ' ').substring(0, 16)}</Text>
            {item.status === 'PENDING' ? (
              <PrimaryButton title="Confirmar Pagamento" onPress={() => handleConfirm(item)} />
            ) : null}
          </View>
        )}
      />

      <PrimaryButton title="Voltar" secondary onPress={() => navigation.goBack()} />
    </View>
  );
}
