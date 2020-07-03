import React, {useState} from 'react';
import {Overlay, Input, Button} from 'react-native-elements';
import {useProjects} from '../providers/ProjectsProvider';
import {useAuth} from '../providers/AuthProvider';

export function AddProjectView() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const {createProject} = useProjects();
  const {user} = useAuth();

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{width: '90%'}}
        onBackdropPress={() => setOverlayVisible(false)}>
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
              setOverlayVisible(false);
              createProject(projectName, projectDescription, user);
            }}
          />
        </>
      </Overlay>
      <Button
        type="outline"
        title="Add Project"
        onPress={() => {
          setOverlayVisible(true);
        }}
      />
    </>
  );
}
