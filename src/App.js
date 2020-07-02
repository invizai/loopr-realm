import React from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';
import {useAuth} from './providers/AuthProvider';
import {LogInView} from './view/LogInView';
import {AuthProvider} from './providers/AuthProvider';

import {TasksProvider} from './providers/TasksProvider';
import {TasksView} from './view/TasksView';

const App = () => {
  return (
    <AuthProvider>
      <AppBody />
    </AuthProvider>
  );
};

function AppBody() {
  const {user} = useAuth();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          {user == null ? (
            <LogInView />
          ) : (
            <TasksProvider projectId="My Project">
              <TasksView />
            </TasksProvider>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

export default App;
