/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Linking
} from 'react-native';
import { Session } from '@inrupt/solid-client-authn-node';
import { authorize } from 'react-native-app-auth';
import { WebView } from 'react-native-webview';

const App = () => {
  const ses = useState(new Session());

  const _redirectHandler = (url) => {
    Linking.addEventListener('url', _handleRedirect);
    Linking.openURL(url);
  };

  const _handleRedirect = async (event) => {
    Linking.removeEventListener('url', _handleRedirect);
    await session.handleIncomingRedirect(event.url);
  }

  const _login = async () => {
    await session.login({
      // After login, the Solid Identity Provider will send the user back to the following
      // URL, with the data necessary to complete the authentication process
      // appended as query parameters:
      redirectUrl: "radarinen2b.auth://",
      // Set to the user's Solid Identity Provider; e.g., "https://broker.pod.inrupt.com" 
      oidcIssuer: "https://inrupt.net",
      clientName: "RadarinEn2B",
      handleRedirect: _redirectHandler,
    });
  }

  return (
    <SafeAreaView>
      <View>
        <StatusBar></StatusBar>
        <Text>Hello</Text>
        <Button onPress={_login}>Log In</Button>
      </View>
    </SafeAreaView>
  );
};

export default App;
