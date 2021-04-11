import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { login, getSession } from 'solid-auth-fetcher';
import * as Linking from 'expo-linking';


export default function App() {
  async function nlogin(issuer) {
    await login({
      oidcIssuer: issuer,
      popUp: false,
      redirectUrl: Linking.makeUrl()
    });
  }
  getSession().then(async (session) => {
    if (!session) {
      return(
        <WebView>
          originWhitelist={['*']}
          source={{ html: 
          `
          <h2>Issue:</h2>
          <input type="text"/>
          <button onclick="this.nlogin("https://inrupt.net")">Log In</button>
          `
          }}
          style={{ marginTop: 20 }}
        </WebView>);
    } else {
      return (
        <View>
          <Text>Logged in</Text>
        </View>
      );
      
    }
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
