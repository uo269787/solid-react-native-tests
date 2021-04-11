import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import Session from '@inrupt/solid-client-authn-node';

export default function App() {
  const session = useState(new Session());
  const _handlePress = () => {
    Linking.openURL("https://www.google.com");
  };

  const _handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync('https://www.google.com');
  };

  const _redirectHandler = (url) => {
    WebBrowser.openBrowserAsync(url);
  };

  const _removeLinkingListener = () => {
    Linking.removeEventListener("url", _handleRedirect);
  }
  const _handleRedirect = async (event) => {
    if (Constants.platform.ios) {
      WebBrowser.dismissBrowser();
    } else {
      this._removeLinkingListener();
    }

    await session.handleIncomingRedirect(event.url);
  }

  const _login = async () => {
    Linking.addEventListener("url", _handleRedirect)
    await session.login({
      // After login, the Solid Identity Provider will send the user back to the following
      // URL, with the data necessary to complete the authentication process
      // appended as query parameters:
      redirectUrl: Linking.makeUrl("/handle-redirect"),
      // Set to the user's Solid Identity Provider; e.g., "https://broker.pod.inrupt.com" 
      oidcIssuer: "https://inrupt.net",
      clientName: "Radarin",
      handleRedirect: _redirectHandler,
    });
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>And it works</Text>
      <Button 
        onPress={_login} 
        title="Go to login"
      />
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
