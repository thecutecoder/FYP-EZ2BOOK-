import React, { useState , useEffect} from "react";
import { 
  View,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button
} from "react-native";
import {auth,database} from "./../database/firebase"

export default function UpdateProfileScreen ({navigation}){
  const [ MatricNo, setMatricNo] = useState('');
  const [ Kulliah, setKulliah] = useState('');
  const [ DisplayName, setDisplayName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const [values, setValues] = useState({
    Email: "",
    Password: "",
})

  const userId = auth.currentUser.id;
  useEffect(() => {
    displayUser();
  }, []);
  

changeEmail = () =>{
  if(Email === '')
  {Alert.alert('Update Error','Enter your email to update')}
  else { auth.currentUser.updateEmail(Email).then (() => { 
    Alert.alert("Details updated", "Your details have been updated");
  })}
}

changePassword = () =>{
  if(Password === '')
  {Alert.alert('Update Error', 'Enter your password to update')}
  else { auth.currentUser.updatePassword(Password).then (() => { 
    Alert.alert("Details updated", "Your details have been updated");
  })}
}


displayUser = async () => {
  const list=[];
  await  database
    .collection('Reg').where('userId', '==' , auth.currentUser.uid)
    .get()
    .then((querySnapshot) => {querySnapshot.forEach((doc) =>{
      if(auth.currentUser.id == userId){

      const {
        userId,
        DisplayName,
        Email,
        MatricNo,
        Kulliah,
      }=doc.data();
      list.push({
        DisplayName:DisplayName,
        Email:Email,
        MatricNo:MatricNo,
        Kulliah:Kulliah,
      })
      setDisplayName(DisplayName)
      setMatricNo(MatricNo)
      setKulliah(Kulliah)
      console.log(Kulliah)
    }
    })
      
      
    });
  }

    return (
      
      <View style={styles.container}>
         <ScrollView style={styles.scrollView}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={{alignItems: 'center', marginTop: 80, marginBottom: 30 }}>
              <Text style={styles.name}>{auth.currentUser.displayName}</Text>
              <Text style={styles.info}>User Profile</Text>
              <Text style={styles.textHeader}>Name</Text>
              <Text style={styles.description}>{auth.currentUser.displayName}</Text>
              <Text style={styles.textHeader}>No Matric</Text>
              <Text style={styles.description}>{MatricNo}</Text>
              <Text style={styles.textHeader}>Kulliyyah</Text>
              <Text style={styles.description}>{Kulliah}</Text>
              <Text style={styles.textHeader}>Email</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder={auth.currentUser.email}
                value={Email}
                onChangeText={text => setEmail(text)}
              />
                <TouchableOpacity style={styles.buttonUpdate}
                    onPressIn={()=> changeEmail()}>
                <Text>Update</Text>  
              </TouchableOpacity> 
              <Text style={styles.textHeader}>Password</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="New Password"
                value={Password}
                onChangeText={text => setPassword(text)}
              />
                              <TouchableOpacity style={styles.buttonUpdate}
                    onPressIn={()=> changePassword()}>
                <Text>Update</Text>  
              </TouchableOpacity> 
             <Text style={styles.textHeader}>Upload Profile Picture</Text>
             <TouchableOpacity style={styles.buttonUpload}>
                <Text>Choose a photo</Text>  
              </TouchableOpacity>     
          </View> 
          <View style={{alignItems: 'center', marginBottom: 30 }}>
              <TouchableOpacity style={styles.buttonUpdate}>
                <Text>Update</Text>  
              </TouchableOpacity>              
          </View>
      </ScrollView>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    backgroundColor: "#53D8C6",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#F95757",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  scrollView: {
    marginHorizontal: 0,
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
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#64E647",
  },
  buttonUpload: {
    marginTop:10,
    backgroundColor: "#e7e7e7",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
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
  inputStyle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    borderWidth: 1,
  },
});