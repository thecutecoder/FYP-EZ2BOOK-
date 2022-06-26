import React, { useState, useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import moment from 'moment';
import {database} from "../database/firebase";
import "firebase/firestore";
import * as firebase from 'firebase';

export default function BookingConfirmedScreen ({navigation , route}) {
  const { id } = route.params;

  const [ venueName, setvenueName] = useState('');
  const [ StartDate, setStartDate] = useState('');
  const [ EndDate, setEndDate] = useState('');
  const [ TimeSlot, setTimeSlot] = useState('');
  const [ Guests, setGuests] = useState('');
  
  useEffect(() => {
    displayBookingConfirmed();

  }, []);
  
  displayBookingConfirmed = async () => {
    const list=[];
    await database
      .collection('Book')
      .where("doc.id", "", id)
      .get()
      .then((querySnapshot) => {querySnapshot.forEach((doc) =>{
 
        const {
          venueName,
          StartDate,
          EndDate,
          TimeSlot,
          Guests,
        }=doc.data();
        list.push({
          venueName: venueName,
          StartDate: StartDate,
          EndDate: EndDate,
          TimeSlot: TimeSlot,
          Guests: Guests,
        })
        setvenueName(venueName)
        setStartDate(StartDate)
        setEndDate(EndDate)
        setTimeSlot(TimeSlot)
        setGuests(Guests)
      });
      console.log(StartDate);
      console.log(EndDate);
    });
  }
  
    return (
      <View style={styles.container}>
        <ScrollView >
        <View style={styles.container}>
        <Text style={styles.title}>Request sent</Text>
        <Text style={styles.description}>This is not a confirmed booking - at least not yet. You'll get a response within 24 hours.</Text>
        <Text style={styles.textHeader}>{venueName}</Text>
        <Text style={styles.para}>Check-in</Text>
        <Text style={styles.textHeader}>{moment(StartDate, "MMM, DD").format("LL")} </Text>
        <Text style={styles.para}>Check-out</Text>
        <Text style={styles.textHeader}>{moment(EndDate,"MMM, DD").format("LL")} </Text>
        <Text style={styles.para}>Time Slot</Text>
        <Text style={styles.textHeader}>{TimeSlot}</Text>
        <Text style={styles.para}>Guests</Text>
        <Text style={styles.textHeader}>{Guests}</Text>
        <TouchableHighlight 
        style={[styles.buttonContainer, styles.loginButton]} onPress={()=> navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Go back home</Text>
        </TouchableHighlight>
        </View>
        </ScrollView>        
      </View>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    paddingTop:50,
  },
  icon:{
    width:120,
    height:120,
  },
  title:{
    fontSize:24,
    textAlign: 'center',
    marginTop:22,
    color: "#5F6D7A"
  },
  textHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 2,
    marginTop: 10,

  },
  description: {
    marginTop:20,
    textAlign: 'center',
    color: "#A9A9A9",
    fontSize:16,
    margin:40,
  },
  para:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize:20,
  }
});
