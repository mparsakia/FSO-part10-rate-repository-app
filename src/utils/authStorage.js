import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const getToken = await AsyncStorage.getItem(
      `${this.namespace}:accessToken`
    );
    return getToken ? JSON.parse(getToken) : null;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      JSON.stringify(accessToken)
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;

// in AsyncStorage everything is global string keys, so be sure to use
// the JSON methods to serialize & unserialze data as needed
// Because AsyncStorage keys are global, it is usually
// a good idea to add a namespace for the keys

// expo install @react-native-community/async-storage
