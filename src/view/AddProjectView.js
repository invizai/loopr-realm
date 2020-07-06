import React, { useState } from 'react';
import { Text, Image, ImageBackground, Button, TextInput, Dimensions, TouchableOpacity, View, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native';

import Icons1 from 'react-native-vector-icons/AntDesign';
import Icons2 from 'react-native-vector-icons/Ionicons';
import { Container, Header, Left, Body, Right, Title, Subtitle, Icon, Form, Textarea, Label, Item, Input } from 'native-base';
const { width, height } = Dimensions.get('window');
import { useProjects } from '../providers/ProjectsProvider';
import { useAuth } from '../providers/AuthProvider';

export function AddProjectView({navigation}) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const { createProject } = useProjects();
  const { user } = useAuth();

  return (
    <SafeAreaView style={cpStyle.wrapperBackground}>
      <Container>
       


        <View style={cpStyle.wrapperBackground}>
          <Text style={cpStyle.listTitle}>Project Details</Text>
          <View>

            <Form>
              <View style={cpStyle.input}>
                <Label style={cpStyle.label}>Project Name</Label>
                <TextInput style={cpStyle.textInput} placeholderTextColor="#e4eaed" placeholder={"Enter your project name"} onChangeText={setProjectName}
                  autoFocus={true} />
              </View>
              <View style={cpStyle.input}>
                <Label style={cpStyle.label}>Project Description</Label>
                <TextInput
                  placeholderTextColor="#e4eaed"
                  style={[cpStyle.textAreaInput]}
                  underlineColorAndroid="transparent"
                  placeholder={"Enter you project description"}
                  numberOfLines={10}
                  multiline={true}
                  onChangeText={setProjectDescription}
                />
              </View>
            </Form>
            <TouchableOpacity style={cpStyle.btn} onPress={() => { createProject(projectName, projectDescription, user);  navigation.navigate('Home');}} >
              <Text style={cpStyle.buttonText}>Create </Text>
              <Icons1 name="arrowright" size={20} color='white' style={{ textAlignVertical: 'center' }} />
            </TouchableOpacity>

          </View>
        </View>
      </Container>

    </SafeAreaView>

  )
}

const cpStyle = StyleSheet.create({
  textInput: {
    marginVertical: 8,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    paddingHorizontal: 15,
  },
  textAreaInput: {
    marginVertical: 8,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    paddingHorizontal: 15,
    height: 200,
    justifyContent: "flex-start",
    textAlignVertical: 'top',
  },
  input: {
    margin: 20,
  },
  label: {
    color: 'white',
    margin: 1,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20,
    color: '#8498a0',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginVertical: 20,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  },
  wrapperBackground: {
    backgroundColor: '#063f57',
    height: height,
    color: 'white',

  },
  fontFamilySet: {
    fontFamily: 'Oxygen-Bold',
  },


  loginLogo: {
    width: 100,
    height: 40,
    marginHorizontal: 20,
    alignContent: 'center',
    justifyContent: 'center',

  },
  btn: {
    backgroundColor: '#2698fb',
    color: 'white',
    padding: 10,
    width: 150,
    margin: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',

  },
  buttonText: {

    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 8,
    marginHorizontal: 10,

  },
})