/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Router from './src/navigation/Router';
import ProductsProvider from './src/context/provider';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <ProductsProvider>
        <Router />
      </ProductsProvider>
    </NavigationContainer>
  );
}

export default App;
