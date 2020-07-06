import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';

import { ProjectItem } from '../components/ProjectItem';
import { AddProjectView } from './AddProjectView';

import { useProjects } from '../providers/ProjectsProvider';
import Icon from 'react-native-vector-icons/Feather';
import { buttonStyles, colors } from '../../theme';

export function ProjectsView() {
  const navigation = useNavigation();
  const [createProject, setCreateProject] = useState(false);
  let { projects } = useProjects();

  return (
    <>
      <Button
        create={createProject} setCreate={setCreateProject}
        onPress={e => navigation.navigate('AddProject')}
        title=""
        containerStyle={{
          position: "absolute", bottom: 20, right: 20, zIndex: 100, borderRadius: 50,
          elevation: 3
        }}
        icon={() => <Icon name="plus" size={32} color="#fff" />}
      />
      {projects.length == 0 && <View style={{ position: "absolute", zIndex: 99, flex: 1, width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}><Text style={{ color: "#fff", fontSize: 20 }}>Loading Projects...</Text></View>}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      </View>
      <Text h4 style={{ ...styles.container, color: "#fff", padding: 10 }}>Projects</Text>
      <ScrollView style={styles.container}>
        {projects.map(project => (
          <ProjectItem
            key={`${project._id}`}
            onPress={() =>
              navigation.navigate('SummaryView', {
                projectId: project._id,
                projectName: project.name,
                projectDate:project.created_at,
              })
            }

            project={project}

          />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary
  }
})
