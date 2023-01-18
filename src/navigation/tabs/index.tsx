import React, {useContext} from 'react';
import Routes from '../routes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home';
import CartScreen from '../../screens/Cart';
import {Image} from 'react-native';
import {cartIcon, homeIcon} from '../../../assets';
import ProductsContext from '../../context';
import commonStyles from '../../styles';

export type TabNavigationParamList = {
  [Routes.Home]: undefined;
  [Routes.Cart]: undefined;
};

const Tab = createBottomTabNavigator<TabNavigationParamList>();

const TabBarHomeIcon = () => (
  <Image source={homeIcon} style={commonStyles.icon} />
);
const TabBarCartIcon = () => (
  <Image source={cartIcon} style={commonStyles.icon} />
);

const TabNavigation = () => {
  const {getAllProductQuantity} = useContext(ProductsContext);

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={Routes.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: TabBarHomeIcon,
        }}
      />
      <Tab.Screen
        name={Routes.Cart}
        component={CartScreen}
        options={{
          tabBarIcon: TabBarCartIcon,
          tabBarBadge: getAllProductQuantity() || undefined,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
