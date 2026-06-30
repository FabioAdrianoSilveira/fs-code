import React from 'react';
import { View, Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles } from '../styles/globalStyles';

export default function ShopkeeperHomeScreen({ navigation, user, onLogout }) {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Ola, {user.name}</Text>
      <Text style={globalStyles.subtitle}>Painel do Lojista</Text>

      <PrimaryButton title="Minha Loja (UC 01)" onPress={() => navigation.navigate('ShopForm')} />
      <PrimaryButton title="Produtos (UC 03)" onPress={() => navigation.navigate('ProductList')} />
      <PrimaryButton title="Vendas (UC 04)" onPress={() => navigation.navigate('SalesList')} />
      <PrimaryButton title="Meu Perfil" onPress={() => navigation.navigate('Profile')} />
      <PrimaryButton title="Sair" secondary onPress={onLogout} />
    </View>
  );
}
