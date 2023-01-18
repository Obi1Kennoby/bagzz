import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from './routes';
import TabNavigation, {TabNavigationParamList} from './tabs';
import DetailsScreen from '../screens/Details';
import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  [Routes.HomeTabs]: NavigatorScreenParams<TabNavigationParamList>;
  [Routes.Details]: {id: string};
};

const RootStack = createStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name={Routes.HomeTabs} component={TabNavigation} />
      <RootStack.Screen
        name={Routes.Details}
        component={DetailsScreen}
        options={{headerShown: true}}
      />
    </RootStack.Navigator>
  );
};

export default Router;
