import React, { useEffect, useState } from "react";
import { 
  StyleSheet, 
  View, 
  Button,
  Text, 
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {auth, database} from "../database/firebase";
import "firebase/firestore";
import * as firebase from 'firebase';
import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CreateBookingScreen({navigation, route}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (StartDate) => {
    setStartDate(StartDate);
    hideDatePicker();
  };

  const handle2Confirm = (EndDate) => {
    setEndDate(EndDate);
    hideDatePicker();
  };

  const getStartDate = () => {
    let tempDate = StartDate.toString().split(' ');
    return StartDate !== ''
      ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
      : '';
  };

  const getEndDate = () => {
    let tempDate = EndDate.toString().split(' ');
    return EndDate !== ''
      ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
      : '';
  };

  const { venueName } = route.params;

  const [values, setValues] = useState({
    TimeSlot: "",
    Guests: "",
    Status: "Pending for approval",
})

function handleChange(text, eventName) {
  setValues(prev => {
      return {
          ...prev,
          [eventName]: text
      }
  })
}

const CreateBooking = async () => {
  const {
    Guests,
    TimeSlot,
    Status
   } = values

   if(  StartDate === '' && EndDate === '' && Guests === '' && TimeSlot === '') {
    Alert.alert('Error!', 'Please enter your details to create a booking.')
  } else {

   await database.collection('Book')
    .add({
      //userId: user.uid,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      userId:auth.currentUser.uid,
      userName:auth.currentUser.displayName,
      userEmail: auth.currentUser.email,
      venueName,
      StartDate,
      EndDate,
      Guests,
      TimeSlot,
      Status,
     
    })
    .then(() => {
      console.log('Booking Created!');
      Alert.alert(
        'Booking Created!',
        'Your booking has been created successfully!',
      )
      navigation.navigate('Home');
    })
    .catch((error) => {
      console.log('Something went wrong with booking creation to firestore.', error);
    });
  }
}
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={{
            height: 45,
            width: "100%",
            backgroundColor: "#00B8D4",
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ fontSize: 24, color: 'white' }}>Create Booking</Text>
          </View>
        <TextInput
          style={styles.inputStyle}
          placeholder="Check In"
          value={getStartDate()}
        />  
        <View style={{justifyContent: "center", alignItems: "center"}}>
        <Button style={styles.btnStyle} onPress={showDatePicker} title="Set Date" />
        </View>

        <DateTimePickerModal

        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        />


       <TextInput
          style={styles.inputStyle}
          placeholder="Check Out"
          value={getEndDate()}
        /> 

        <View style={{justifyContent: "center", alignItems: "center"}}>
         <Button style={styles.btnStyle} onPress={showDatePicker} title="Set Date" />
        </View>

        <DateTimePickerModal

        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handle2Confirm}
        onCancel={hideDatePicker}
        /> 
  
        <TextInput
          style={styles.inputStyle}
          placeholder="Guests"
          keyboardType='numeric' 
          onChangeText={text => handleChange(text, "Guests")}
        />
        <Picker
        style={styles.pickerStyle}
        onValueChange={text => handleChange(text, "TimeSlot")}>
    
        <Picker.Item label="Time Slot" value="Time Slot" />
        <Picker.Item label="8.00-10.00" value="8.00-10.00" />
        <Picker.Item label="10.00-12.00" value="10.00-12.00" />
        <Picker.Item label="2.00-4.00" value="2.00-4.00" />
        <Picker.Item label="4.00-6.00" value="4.00-6.00" />
        </Picker>

        <View style={{justifyContent: "center", alignItems: "center"}}>
          <TouchableOpacity style={styles.ReserveBtn}>
            <Text
              onPress={CreateBooking}
            >RESERVE</Text>
           </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex:1,
    marginBotton:30,
  },

  title:{
    marginTop:10,
    marginBottom:10,
    fontSize:25,
    color:"black",
    fontWeight:'bold'
  },
  
  inputStyle: {
    margin: 15,
    height: 40,
    width:'80%',
    borderColor: '#0A8C7A',
    borderRadius:10,
    borderWidth: 1,
    backgroundColor:'#fff',
    alignSelf: 'center',
    marginTop: 40
  },
 
 pickerStyle: {
  height: 50, 
  width: 150,
  backgroundColor: "#FFFFFF", 
  borderRadius: 30,
  alignSelf: 'center',
  marginTop: 10
 },
 
  ReserveBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    marginTop: 30,
    marginBottom: 40,
    backgroundColor: "#64E647",
    justifyContent: "center", alignItems: "center"
  },

  btnStyle: {
    marginTop: 5,
    width: '100%',
    padding: 20
  }
});