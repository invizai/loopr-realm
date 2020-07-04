import React, {useState} from 'react';
import {Text, ListItem} from 'react-native-elements';
import { View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function ProjectItem({project, onPress}) {

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={.9} style={styles.container} key={project.key}>
      <View style={{flexDirection:"row",alignItems:"flex-end"}}>
        <Image style={{height:50,width:50}} source={require("../assets/project.png")} />
        <Text style={{ color:"grey",fontSize:18,paddingBottom:10,paddingLeft:10}}>2D Object Detection</Text>
      </View>
      <Text h4 h4Style={{fontSize:24}}>{project.name}</Text>
      <Text style={{ color:"grey",fontSize:16,paddingTop:10,}}>
        Started : {new Date(project.created_at).toDateString()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{
    padding:20,
    backgroundColor:"#fff",
    borderRadius:10,
    marginVertical:10,
    marginHorizontal:10
  }
})