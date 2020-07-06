import React, {useState, useRef, useEffect} from 'react';
import {Button, Text,Input} from 'react-native-elements';
import {useAuth} from '../providers/AuthProvider';
import { StyleSheet, View } from 'react-native';
import { buttonStyles, colors, inputs } from '../../theme';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Logo from "../assets/logo.svg"
import Icon from 'react-native-vector-icons/MaterialIcons';

// This view has an input for email and password and logs in the user when the
// "log in" button is pressed.
export function LogInView(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [emailError,setEmailError] = useState("")
  const [passwordError,setPasswordError] = useState("")
  const [formSubmitted,setFormSubmitted] = useState(false);
  const [passwordShow,setPasswordShow] = useState(false);
  const submitHandler = async ()=>{
    setFormSubmitted(true)
    setEmailError("")
    setPasswordError("")
    if(email.trim() == ""){
      setEmailError("Email can't be empty")
      setFormSubmitted(false)
      return
    }
    if(password.trim() == ""){
      setFormSubmitted(false)
      setPasswordError("Password can't be empty")
      return
    }
    console.log(
      `Log in button pressed with email ${email} and password ${password}`,
    );
    setError("");
    try {
      await logIn(email, password);
    } catch (e) {
      setError(`Login failed: ${e.message}`);
      setFormSubmitted(false);
    }
  }

  const {logIn} = useAuth();
  const togglePasswordShow = ()=>{
    setPasswordShow(prev=>!prev)
  }
  return (
    <ScrollView style={{backgroundColor:'#063f57',}}>
    <View style={styles.container} >
      <Logo style={{alignSelf:"center",marginVertical:100}}/>
      <Text style={{textAlign:"center",color:"red",paddingVertical:10}}>{error}</Text>
      <Input
        {...inputs.input1}
        style={{alignSelf:"flex-start"}}
        errorMessage={emailError||""}
        placeholder="Enter your email id"
        onChangeText={setEmail}
      />
      <Input
        {...inputs.input1}
        errorMessage={passwordError||""}
        secureTextEntry={!passwordShow}
        autoCorrect={false}
        placeholder="Enter your password"
        onChangeText={setPassword}
        rightIcon={()=><Icon name="remove-red-eye" color={passwordShow?"black":colors.light} size={32} onPress={e=>togglePasswordShow()} />}
      />
      <Button
        {...buttonStyles.solid}
        loading={formSubmitted}
        onPress={submitHandler}
        title="Login"
        icon={()=><Icon name="arrow-forward" size={20} color="#fff" style={{paddingLeft:30}} />}
        iconRight={true}
      />
      <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",paddingTop:20}}>
      <Text  style={{fontSize:20,color:colors.light,textAlign:'center'}}>Dont have an account ?</Text>
      <TouchableOpacity onPress={()=>navigation.navigate("Signup")}><Text style={{color:colors.secondary,fontWeight:"bold",fontSize:20}}> Signup</Text></TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    padding:20,
    display:"flex",
    
  }
})