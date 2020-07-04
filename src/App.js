import * as React from 'react';
import {View, StatusBar} from 'react-native';
import {Button} from 'react-native-elements';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {AuthProvider, useAuth} from './providers/AuthProvider';
import {ProjectsProvider, useProjects} from './providers/ProjectsProvider';
import {ProductsProvider} from './providers/ProductsProvider';

import {LogInView} from './view/LogInView';
import {ProjectsView} from './view/ProjectsView';
import {ProductsView} from './view/ProductsView';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function ProjectsScreen() {
  return (
    <ProjectsProvider>
      <ProjectsView />
    </ProjectsProvider>
  )
}

function ProductsScreen() {
  return (
    <ProductsProvider>
      <ProductsView project={{name: 'My Project'}}/>
    </ProductsProvider>
  )
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={ProjectsScreen}/>
      <HomeStack.Screen name='Products' component={ProductsScreen} />
    </HomeStack.Navigator>
  );
}

function SettingsScreen() {
  const {logOut} = useAuth();
  return (
    <View style={{flex:1, flexDirection: 'column-reverse'}}>
      <StatusBar barStyle="dark-content" />
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppBody />
    </AuthProvider>
  );
}

function AppBody() {
  const {user} = useAuth();

  return (
    <>
      {user == null ? (<LogInView />) : (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'ios-grid';
              } else if (route.name === 'Settings') {
                iconName = 'ios-help-circle';
              }
              return <Icon name={iconName} color={color} size={size} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>)}
    </>
  );
}

export default App;
