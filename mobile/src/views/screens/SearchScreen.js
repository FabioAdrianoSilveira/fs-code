import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import CustomerController from '../../controllers/CustomerController';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { globalStyles, colors } from '../styles/globalStyles';

export default function SearchScreen({ navigation }) {
  const [keyword, setKeyword] = useState('');
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setError('');
    setSearched(true);

    try {
      const result = await CustomerController.search(keyword.trim());
      setShops(result.shops);
      setProducts(result.products);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Buscar</Text>
      <Text style={globalStyles.subtitle}>UC 06 - Lojas ou alimentos</Text>

      <FormInput placeholder="Palavra-chave" value={keyword} onChangeText={setKeyword} />
      <PrimaryButton title="Buscar" onPress={handleSearch} />

      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      <Text style={[globalStyles.cardTitle, { marginTop: 16 }]}>Lojas</Text>
      <FlatList
        data={shops}
        keyExtractor={(item) => `shop-${item.id}`}
        ListEmptyComponent={searched ? <Text style={globalStyles.cardText}>Nenhuma loja encontrada</Text> : null}
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

      <Text style={[globalStyles.cardTitle, { marginTop: 16 }]}>Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => `product-${item.id}`}
        ListEmptyComponent={searched ? <Text style={globalStyles.cardText}>Nenhum produto encontrado</Text> : null}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={globalStyles.card}
            onPress={() => navigation.navigate('ShopDetail', { shopId: item.shopId })}
          >
            <Text style={globalStyles.cardTitle}>{item.name}</Text>
            <Text style={globalStyles.cardText}>{item.shopName}</Text>
            <Text style={{ color: colors.primary, fontWeight: '600' }}>
              R$ {Number(item.price).toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      />

      <PrimaryButton title="Voltar" secondary onPress={() => navigation.goBack()} />
    </View>
  );
}
