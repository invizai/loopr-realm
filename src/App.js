import * as React from 'react';
import {Text, View, StatusBar, StyleSheet} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider, useAuth } from './providers/AuthProvider';
import { ProjectsProvider, useProjects } from './providers/ProjectsProvider';
import { ProductsProvider } from './providers/ProductsProvider';

import { LogInView } from './view/LogInView';
import { ProjectsView } from './view/ProjectsView';
import { ProductsView } from './view/ProductsView';
import { AddProjectView } from './view/AddProjectView';

import SummaryView from './view/SummaryView';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from "./assets/logo.svg"
import { colors, buttonStyles } from '../theme';
import { Button } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();



function LogoTitle() {
  return (
    <View>
      <Logo height={50} style={{left:-30}} />
    </View>
  );
}


function ProjectsScreen() {
  return (
    <ProjectsProvider>
      <ProjectsView />
    </ProjectsProvider>
  )
}

function ProductsScreen({route}) {
  const { projectName, projectId } = route.params;

  return (
    <ProductsProvider project={projectId}>
      <ProductsView project={{name: projectName}}/>
    </ProductsProvider>
  )
}


function SummaryScreen({route}) {
  const { projectName, projectId, projectDate} = route.params;
  return (
    <ProductsProvider project={projectId}>
      <SummaryView project={{name:projectName,_id:projectId, date:projectDate}}>

      </SummaryView>
    </ProductsProvider>
  )
}
function AddProjectScreen({ navigation }) {
  return (
    <ProjectsProvider>
      <AddProjectView navigation={navigation}></AddProjectView>
    </ProjectsProvider>
  );
}
function HomeStackScreen() {
  const { logOut } = useAuth()
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.accent,
          height: 70
        },
        headerTitle: props => <LogoTitle {...props} />,
        headerRight: props => <Button {...buttonStyles.clear} titleStyle={{ color: colors.primary }} title="Log Out" onPress={logOut} />,
        headerRightContainerStyle: { paddingRight: 10 }
      }}


    >
      <HomeStack.Screen name='Home' component={ProjectsScreen} />
      <HomeStack.Screen name='Products' component={ProductsScreen} />
      <HomeStack.Screen name="AddProject" component={AddProjectScreen} />
      <HomeStack.Screen name="SummaryView" component={SummaryScreen} />

    </HomeStack.Navigator>
  );
}

function SettingsScreen() {
  const { logOut } = useAuth();
  return (
    <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
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
  const { user } = useAuth();

  return (
    <>
      {user == null ? (<LogInView />) : (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = 'ios-home';
                } else if (route.name === 'Settings') {
                  iconName = 'ios-settings';
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

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.primary
  }
})
