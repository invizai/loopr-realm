import React from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Button} from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';

import {useAuth} from '../providers/AuthProvider';
import {ProjectItem} from '../components/ProjectItem';
import {AddProjectView} from './AddProjectView';

import {useProjects} from '../providers/ProjectsProvider';

export function ProjectsView() {
  const {logOut, user} = useAuth();
  const navigation = useNavigation();
  
  let {projects} = useProjects();

  return (
    <>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button type="outline" title="Log Out" onPress={logOut} />
        <AddProjectView />
      </View>
      <Text h2>{user.name}</Text>
      <ScrollView>
        {projects.map(project => (
          <ProjectItem key={`${project._id}`} onPress={() => navigation.navigate('Products', {project: project})}  project={project} />
        ))}
      </ScrollView>
    </>
  );
}

