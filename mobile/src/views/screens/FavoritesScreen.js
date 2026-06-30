import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CustomerController from '../../controllers/CustomerController';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles } from '../styles/globalStyles';

export default function FavoritesScreen({ navigation, user }) {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  const loadFavorites = async () => {
    try {
      const data = await CustomerController.loadFavorites(user.userId);
      setFavorites(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [user.userId]),
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Lojas Favoritas</Text>
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={globalStyles.subtitle}>Nenhuma loja favoritada</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={globalStyles.card}
            onPress={() => navigation.navigate('ShopDetail', { shopId: item.id })}
          >
            <Text style={globalStyles.cardTitle}>{item.name}</Text>
            <Text style={globalStyles.cardText}>{item.address}</Text>
          </TouchableOpacity>
        )}
      />

      <PrimaryButton title="Voltar" secondary onPress={() => navigation.goBack()} />
    </View>
  );
}
