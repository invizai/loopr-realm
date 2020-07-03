import React from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {useAuth} from '../providers/AuthProvider';

export function ProjectSummaryView({project}) {
  const {logOut, user} = useAuth();

  return (
    <>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button type="outline" title="Log Out" onPress={logOut} />
      </View>
      <Text h2>{project.name} Summary</Text>
      <ScrollView>
        
      </ScrollView>
    </>
  );
}
 