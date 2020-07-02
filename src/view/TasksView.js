import React from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {useAuth} from '../providers/AuthProvider';
import {useTasks} from '../providers/TasksProvider';
import {TaskItem} from '../components/TaskItem';
import {AddTaskView} from './AddTaskView';

export function TasksView() {
  const {logOut} = useAuth();
  const {tasks, projectId} = useTasks();

  return (
    <>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button type="outline" title="Log Out" onPress={logOut} />
        <AddTaskView />
      </View>
      <Text h2>{projectId}</Text>
      <ScrollView>
        {tasks.map(task => (
          <TaskItem key={`${task._id}`} task={task} />
        ))}
      </ScrollView>
    </>
  );
}
