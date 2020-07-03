import React, {useState} from 'react';
import {Text, ListItem} from 'react-native-elements';

export function ProjectItem({project, onPress}) {

  return (
    <>
      <ListItem
        key={project.id}
        title={project.name}
        onPress={onPress}
        bottomDivider
      />
    </>
  );
}
