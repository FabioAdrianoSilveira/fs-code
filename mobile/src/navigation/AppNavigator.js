import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../views/screens/LoginScreen';
import RegisterShopkeeperScreen from '../views/screens/RegisterShopkeeperScreen';
import RegisterCustomerScreen from '../views/screens/RegisterCustomerScreen';
import ShopkeeperHomeScreen from '../views/screens/ShopkeeperHomeScreen';
import CustomerHomeScreen from '../views/screens/CustomerHomeScreen';
import ShopFormScreen from '../views/screens/ShopFormScreen';
import ProductListScreen from '../views/screens/ProductListScreen';
import ProductFormScreen from '../views/screens/ProductFormScreen';
import SalesListScreen from '../views/screens/SalesListScreen';
import SearchScreen from '../views/screens/SearchScreen';
import ShopDetailScreen from '../views/screens/ShopDetailScreen';
import CartScreen from '../views/screens/CartScreen';
import PurchaseHistoryScreen from '../views/screens/PurchaseHistoryScreen';
import FavoritesScreen from '../views/screens/FavoritesScreen';
import ProfileScreen from '../views/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ user, onLogin, onLogout }) {
  const screenProps = { user, onLogin, onLogout };

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} onLogin={onLogin} />}
        </Stack.Screen>
        <Stack.Screen name="RegisterShopkeeper">
          {(props) => <RegisterShopkeeperScreen {...props} onLogin={onLogin} />}
        </Stack.Screen>
        <Stack.Screen name="RegisterCustomer">
          {(props) => <RegisterCustomerScreen {...props} onLogin={onLogin} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  if (user.isShopkeeper()) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ShopkeeperHome">
          {(props) => <ShopkeeperHomeScreen {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name="ShopForm">
          {(props) => <ShopFormScreen {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name="ProductList">
          {(props) => <ProductListScreen {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name="ProductForm">
          {(props) => <ProductFormScreen {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name="SalesList">
          {(props) => <SalesListScreen {...props} {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name="Profile">
          {(props) => <ProfileScreen {...props} {...screenProps} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerHome">
        {(props) => <CustomerHomeScreen {...props} {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="Search">
        {(props) => <SearchScreen {...props} {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="ShopDetail">
        {(props) => <ShopDetailScreen {...props} {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="Cart">
        {(props) => <CartScreen {...props} {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="PurchaseHistory">
        {(props) => <PurchaseHistoryScreen {...props} {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="Favorites">
        {(props) => <FavoritesScreen {...props} {...screenProps} />}
      </Stack.Screen>
      <Stack.Screen name="Profile">
        {(props) => <ProfileScreen {...props} {...screenProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
