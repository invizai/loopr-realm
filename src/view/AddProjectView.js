import React, {useState} from 'react';
import {Overlay, Input, Button} from 'react-native-elements';
import {useProjects} from '../providers/ProjectsProvider';
import {useAuth} from '../providers/AuthProvider';

export function AddProjectView(props) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const {createProject} = useProjects();
  const {user} = useAuth();

  return (
    <>
      <Overlay
        isVisible={props.create}
        overlayStyle={{width: '90%'}}
        onBackdropPress={() => props.setCreate(false)}>
        <>
          <Input
            placeholder="Project Name"
            onChangeText={setProjectName}
            autoFocus={true}
          />
          <Input
            placeholder="Project Description"
            onChangeText={setProjectDescription}
          />
          <Button
            title="Create"
            onPress={() => {
              props.setCreate(false)
              createProject(projectName, projectDescription, user);
            }}
          />
        </>
      </Overlay>
    </>
  );
}
