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
import {
  SafeAreaView,
  Button,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { authorize, register } from 'react-native-app-auth';
import { buildFetch } from './auth/buildFetch.js';
import { getWebId } from './auth/token.js';
import { getLocations, getName } from './services/crudPod.js';

const App = () => {
  const scopes = useState("None granted");
  const [clientId, setClientId] = useState(null);
  const [inLoginProcess, setLogginIn] = useState("Idle");
  const [authr, setAuthr] = useState({});
  const [webId, setWebId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const _login = async () => {
    setLogginIn("logging in");
    const config = {
      issuer: 'https://inrupt.net/',
      clientId: clientId,
      redirectUrl: 'com.appauth.auth://oidc',
      scopes: ['openid', 'profile', 'offline_access'],
    };
    setAuthr(await authorize(config));
    setLoggedIn(true);
  }
  
  useEffect(() => {
    if (authr.idToken) {
      console.log(authr.idToken);
      const id = getWebId(authr.idToken);
      console.log(id);
      setWebId(id.sub);
    }
  }, [authr])

  useEffect(async () => {
    const registerConfig = {
      issuer: 'https://inrupt.net/',
      redirectUrls: ['com.appauth.auth://oidc'],
    }
    const registerResult = await register(registerConfig);
    setClientId(registerResult.clientId);
  }, []);
  
  useEffect(async () => {
    if (loggedIn) {
      setName(await getName(webId));
      console.log("Name: ", name);
      setLocation(await getLocations(buildFetch(authr.accessToken), webId));
      console.log("Location:", location);
    }
  }, [loggedIn])

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Hello! {name}</Text>
        <Text>Web id: {webId}</Text>
        <Text>Client id: {clientId}</Text>
        <Text>{inLoginProcess}</Text>
        <Text>Auth results:</Text>
        <Text>Access token: {authr.accessToken}</Text>
        <Text>Id token: {authr.idToken}</Text>
        <Text>Access token type: {authr.tokenType}</Text>
        <Text>Refresher token: {authr.refreshToken}</Text>
        {!loggedIn ? <Button title="Log In" onPress={_login}/> : <Text>Already logged in</Text>}
        <Button title="Change" onPress={() => setLogginIn("Whatever")}/>
        <Text>Location JSON or something</Text>
      </ScrollView>
      <StatusBar/>
    </SafeAreaView>
  );
};

export default App;
