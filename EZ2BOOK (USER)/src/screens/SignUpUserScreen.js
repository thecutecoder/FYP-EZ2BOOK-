import React, {Component, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {auth, database} from "../database/firebase";
import "firebase/firestore";
import * as firebase from 'firebase';

 
export default class SignUpUserScreen extends Component {
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      matricNo: '',
      Kulliah: '',
      image: '',
      //kulliyyah: '',
      isLoading: false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  registerUser = (email,password) => {
    const firestore = firebase.firestore;

    if(this.state.email === '' && this.state.password === '' && this.state.matricNo === '' && this.state.kulliah === '' && this.state.image === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })

      auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
       res.user.updateProfile({
        isLoading: false,
        displayName: this.state.displayName,
       })
      console.log ('User registered')
     
      database.collection('Reg').add({
        userId:auth.currentUser.uid,
        DisplayName: this.state.displayName,
        Email: this.state.email,
        MatricNo :this.state.matricNo,
        Kulliah : this.state.Kulliah,
        image : this.state.image
        
      }).catch(error=> alert(error.message));
        this.props.navigation.navigate('Login')
       
      }
    
     
  ).catch(error=> alert(error.message));
    }
  }
  render() {

    return (
          <View style={styles.container}> 
      <ImageBackground source={require("../assets/images/background.jpg")} resizeMode="cover" style={styles.imageBackground}>
      <ScrollView>
      <View style={styles.objPosition}>
       <Image style={styles.image} source={require("../assets/logo.png")} />
       </View>

      <View style={styles.objPosition}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />  
    </View> 

     <View style={styles.objPosition}>
       <TextInput
          style={styles.inputStyle}
          placeholder="Matric No"
          value={this.state.matricNo}
          onChangeText={(val) => this.updateInputVal(val, 'matricNo')}
        />  
  </View> 

      <View style={styles.objPosition}>
      <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
       
      </View>

      <View style={styles.objPosition}> 
      <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
      </View>

     <View style={styles.objPosition}> 
        <Picker
        style={styles.pickerStyle}
        onValueChange={(val) => this.updateInputVal(val, 'Kulliah')}>
    
        <Picker.Item label="Kulliyyah" value="Kulliyyah" />
        <Picker.Item label="KICT" value="KICT" />
        <Picker.Item label="KAED" value="KAED" />
        <Picker.Item label="ECONS" value="ECONS" />
        <Picker.Item label="AIKOL" value="AIKOL" />
        <Picker.Item label="IRKHS" value="IRKHS" />
        <Picker.Item label="ENGIN" value="ENGIN" />
        <Picker.Item label="CELPAD" value="CELPAD" />
        </Picker>
        </View> 

      <View style={styles.objPosition}>     
        <TouchableOpacity style={styles.loginBtn}>
        <Text
        onPress={() => this.registerUser(this.state.email,this.state.password)}
        >SIGN UP</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.objPosition}>
        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already registered? Click here to sign in
        </Text>
      </View>
        </ScrollView>
        </ImageBackground>
      </View>
 
      
    );
  }
}
const styles = StyleSheet.create({
  objPosition: {
    alignItems: 'center'
  },

  signText: {
    fontSize: 30,
  },

  container: {
    //backgroundColor: "#FFE333",
  },
 
  image: {
    alignItems: "center",
    width: 350, 
    height: 200,
  },
 
  inputStyle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
  },
 
 pickerStyle: {
  height: 50, 
  width: 150,
  backgroundColor: "#FFFFFF", 
  borderRadius: 30,
 },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
    alignItems: 'center',
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#4682B4",
  },

  loginText: {
    marginBottom: 20,
  },

});