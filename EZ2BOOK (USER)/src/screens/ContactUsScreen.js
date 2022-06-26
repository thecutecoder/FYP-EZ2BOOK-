import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity, 
  ScrollView,
  Text,
  TextInput,
  Alert
} from 'react-native';
import {auth, database} from "../database/firebase";
import "firebase/firestore";
import * as firebase from 'firebase';


export default class ContactUsScreen extends Component {
  constructor() {
    super();
    this.state = { 
      email: '', 
      title: '', 
      feedback: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  SendFeedback = () => {

  database.collection('Feedback').add({
    userId:auth.currentUser.uid,
    userName:auth.currentUser.displayName,
    userEmail: this.state.email,
    title: this.state.title,
    feedback: this.state.feedback}
    )
    .then (Alert.alert("Feedback sent",
    "Your feedback was sent successfully!"
    ))
    .catch((error) => {
      console.log('Error!', error);
    });
}

  render() {
    return (
      <View style={{alignItems: 'center', marginBottom: 30 }}>
        <View style={{
        height: 45,
        width: "100%",
        backgroundColor: "#00B8D4",
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{ fontSize: 24, color: 'white' }}>Contact Us</Text>
      </View>
          <ScrollView>
            <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}></View>
            <View style={{ alignItems: 'center'}}>
            <Image style={{width:250, height:140}} source={require('../assets/irkhs2.jpg')}/>
            </View>
            <Text style={styles.textHeader}>ADDRESS</Text>
            <Text>Kulliyyah of Islamic Revealed  {"\n"} 
                    Knowledge Center and  {"\n"}
                    Human Sciences (IRKHS),  {"\n"}
                    International Islamic University Malaysia (IIUM), {"\n"} 
                    53100 Gombak,
                    Selangor
            </Text>
            <Text style={styles.textHeader}>PHONE NUMBER</Text>
            <Text>03-61965053</Text>
            <Text style={styles.textHeader}>FEEDBACK FORM</Text>
              <TextInput 
                style={styles.input}
                placeholder="Email"
                value={this.state.email}
                onChangeText={(val) => this.updateInputVal(val, 'email')}
              /> 
              <TextInput 
                style={styles.input}
                placeholder="Title"
                value={this.state.title}
                onChangeText={(val) => this.updateInputVal(val, 'title')}
              />  
              <TextInput
                 style={styles.bio}
                 placeholder="Feedback"
                 multiline={true}
                 numberOfLines={4}
                 value={this.state.feedback}
                 onChangeText={(val) => this.updateInputVal(val, 'feedback')}
              />
              <View style={{alignItems: 'center'}}>
              <TouchableOpacity style={styles.buttonUpdate}>
                <Text
                onPress={()=> this.SendFeedback()}
                >Send</Text>  
              </TouchableOpacity> 
              </View>  
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#FFE333",
    height:200,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonUpdate: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:50,
    width:250,
    borderRadius:30,
    backgroundColor: "#64E647",
  },

   buttonDelete: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#F95757",
  },
  textHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 2,
    marginTop: 10,

  },
  input: {
    margin: 15,
    alignSelf:'center',
    height: 40,
    width:'90%',
    borderColor: '#0A8C7A',
    borderRadius:10,
    borderWidth: 1,
    backgroundColor:'#fff',
  },
  bio: {
    alignSelf:'center',
    backgroundColor:'#fff',
    width:'90%',
    borderRadius:10,
    marginTop:10,
    marginBottom:20,
    borderColor: '#7a42f4',
    borderWidth: 1,
    },
});
