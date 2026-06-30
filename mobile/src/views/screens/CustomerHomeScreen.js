import React from 'react';
import { View, Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles } from '../styles/globalStyles';

export default function CustomerHomeScreen({ navigation, user, onLogout }) {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Ola, {user.name}</Text>
      <Text style={globalStyles.subtitle}>Painel do Cliente</Text>

      <PrimaryButton title="Buscar (UC 06)" onPress={() => navigation.navigate('Search')} />
      <PrimaryButton title="Favoritos" onPress={() => navigation.navigate('Favorites')} />
      <PrimaryButton title="Carrinho (UC 08)" onPress={() => navigation.navigate('Cart')} />
      <PrimaryButton title="Minhas Compras (UC 09)" onPress={() => navigation.navigate('PurchaseHistory')} />
      <PrimaryButton title="Meu Perfil (UC 05)" onPress={() => navigation.navigate('Profile')} />
      <PrimaryButton title="Sair" secondary onPress={onLogout} />
    </View>
  );
}
