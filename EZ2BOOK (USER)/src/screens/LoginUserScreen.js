import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  ScrollView
} from "react-native";
 import {auth} from "./../database/firebase"
export default class LoginUserScreen extends Component {

    constructor() {
      super();
      this.state = { 
        email: '', 
        password: '',
        isLoading: false
      }
    }
  
    updateInputVal = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    }
  
    userLogin = () => {
      if(this.state.email === '' && this.state.password === '') {
        Alert.alert('Error!', 'Please enter your details to sign in.')
      } else {
      
        this.setState({
          isLoading: true,
        })
        
        auth
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res)
          console.log('User logged-in successfully!')
          this.setState({
            isLoading: false,
            email: '', 
            password: ''
          })
          this.props.navigation.navigate('Home')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
        }   
    }
  
    render() {
      if(this.state.isLoading){
        return(
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>
        )
      }    
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
           <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginText}
              onPress={() => this.userLogin()}>LOGIN</Text>
            </TouchableOpacity>
        </View>
  
        <View style={styles.objPosition}>
        <Text 
              style={styles.loginText}
              onPress={() => this.props.navigation.navigate('Sign Up')}>
              Don't have account? Click here to sign up
            </Text>
        </View>
          </ScrollView>
          </ImageBackground>
        </View>
      );
    }
  }
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17D5BA",
    alignItems: "center",
    justifyContent: "center",
  },

  objPosition: {
    alignItems: 'center'
  },
 
  image: {
    alignItems: "center",
    marginBottom: 40,
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
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
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
});