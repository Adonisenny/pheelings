import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../TheContext/AuthContext';

export const SignOut = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const logout = async () => {
      try {
        await AsyncStorage.multiRemove(['token', 'user']); // remove token
        dispatch({ type: 'LOGOUT' }); // update global state
        navigation.replace('Login'); // redirect to login screen
      } catch (error) {
        console.log('Error during logout:', error);
      }
    };

    logout();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#184b29" />
      <Text style={styles.text}>Signing out...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
});
