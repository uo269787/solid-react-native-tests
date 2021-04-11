/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {
  useState,
  useEffect
} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  Button,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { authorize, register } from 'react-native-app-auth';

const App = () => {
  const scopes = useState("None granted");
  const [clientId, setClientId] = useState(null);
  const [inLoginProcess, setLogginIn] = useState("Idle");
  const [authr, setAuthr] = useState({});
  const _login = async () => {
    setLogginIn("logging in");
    const config = {
      issuer: 'https://inrupt.net/',
      clientId: clientId,
      redirectUrl: 'com.appauth.auth://oidc',
      scopes: ['openid', 'profile', 'offline_access'],
    };
    setAuthr(await authorize(config));
    
    
  }
  
  useEffect(async () => {
    const registerConfig = {
      issuer: 'https://inrupt.net/',
      redirectUrls: ['com.appauth.auth://oidc'],
    }
    const registerResult = await register(registerConfig);
    setClientId(registerResult.clientId);
  }, []);
  
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Hello</Text>
        <Text>Client id: {clientId}</Text>
        <Text>{inLoginProcess}</Text>
        <Text>Auth results:</Text>
        <Text>Access token: {authr.accessToken}</Text>
        <Text>Id token: {authr.idToken}</Text>
        <Text>Access token type: {authr.tokenType}</Text>
        <Button title="Log In" onPress={_login}/>
        <Button title="Change" onPress={() => setLogginIn("Whatever")}/>
      </ScrollView>
      <StatusBar/>
    </SafeAreaView>
  );
};

export default App;
