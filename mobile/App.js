import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthController from './src/controllers/AuthController';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const session = await AuthController.getSession();
      setUser(session);
      setLoading(false);
    };

    restoreSession();
  }, []);

  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
  };

  const handleUserChange = async (nextUser) => {
    if (nextUser) {
      setUser(nextUser);
      return;
    }
    await AuthController.logout();
    setUser(null);
  };

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppNavigator user={user} onLogin={handleLogin} onLogout={handleUserChange} />
    </NavigationContainer>
  );
}
