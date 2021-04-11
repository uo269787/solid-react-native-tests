/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import Session from '@inrupt/solid-client-authn-node';


const App = () => {
  return (
    <SafeAreaView>
      <View>
        <StatusBar></StatusBar>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
