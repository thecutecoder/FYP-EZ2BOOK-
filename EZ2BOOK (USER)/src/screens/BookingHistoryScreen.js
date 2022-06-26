import React, { useState, useEffect } from 'react'
import { Button,View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import {auth,database} from "../database/firebase";
import "firebase/firestore";
import * as firebase from 'firebase';
import moment from 'moment';
const SettingsScreen = ({navigation}) => {

  const [BookingList, setBookingList] = useState([]);
  const[ID,setID]=useState('');
  useEffect(() => {
    getBookingList(BookingList);
  });

  const getBookingList = async () => {

    await database.collection("Book")
      .where('userId', '==' , auth.currentUser.uid)
      .get()
      .then((querySnapshot) => {
        let myData = [];
        querySnapshot.forEach((doc) => {
          setID(doc.id)
          const{
            venueName,
            timestamp,
            StartDate,
            EndDate,
            TimeSlot,
            Guests,
            Status
          } = doc.data();
          myData.push({
            id: doc.id,
            venueName: venueName,
            timestamp: timestamp,
            StartDate: StartDate,
            EndDate: EndDate,
            TimeSlot: TimeSlot,
            Guests: Guests,
            Status: Status,
          });
        });
        setBookingList(myData);
      })
      .catch((error) => {
        console.log("Error getting data: ", error);
        console.log(doc.data);
      });
};
  const handleDeleteRes = () => { 
    Alert.alert( 
      'Delete post', 
      'Are you sure?', 
      [ 
        { 
          text: 'Cancel', 
          onPress: () => console.log('Cancel Pressed!'), 
          style: 'cancel', 
        }, 
        { 
          text: 'Confirm', 
          onPress: () => handleDelete(), 
        }, 
      ], 
      {cancelable: false}, 
    ); 
  };



const handleDelete = ()=>{
 database.collection("Book")
  .doc(ID)
  .delete()
  .then(() => {
    console.log("Error getting data: ");})     .catch((error) => {
      console.log("Error getting data: ", error);
      console.log(doc.data);
    });
}
  const Item = ({ venueName, timestamp, StartDate, EndDate, TimeSlot, Guests, Status }) => (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.card}>
              <Text style={styles.bdate}>
                {moment(timestamp.toDate()).format('LLL')} 
              </Text>
              <View style ={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.modalText}>Venue: {venueName}</Text>
              <Text style={styles.modalText}>Check in: {moment(StartDate.toDate()).format('LL')} </Text>
              <Text style={styles.modalText}>Check out: {moment(EndDate.toDate()).format('LL')} </Text>
              <Text style={styles.modalText}>Time slot: {TimeSlot}</Text>
              <Text style={styles.modalText}>Guests: {Guests}</Text>
              <Text style={styles.modalText}>Status: {Status}</Text>
              <TouchableOpacity style={styles.followButton} onPress={() => {}}>
                  <Text style={styles.followButtonText}
                           onPress={handleDeleteRes}
                  >Cancel Booking</Text>
              </TouchableOpacity> 
              </View>
          </View>
        </View>
      </View>
    );

  const renderItem = ({ item }) => (
    <Item 
    venueName ={item.venueName} 
    timestamp ={item.timestamp} 
    StartDate ={item.StartDate} 
    EndDate ={item.EndDate}
    TimeSlot ={item.TimeSlot}
    Guests ={item.Guests}
    Status ={item.Status}
    
    />
  );

  const render_FlatList_header = () => {
 
    var header_View = (
  
      <View style={{
        height: 45,
        width: "100%",
        backgroundColor: "#00B8D4",
        justifyContent: 'center',
        alignItems: 'center',
        marginBotton: 20
      }}>
  
        <Text style={{ fontSize: 24, color: 'white' }}> Booking History</Text>
  
      </View>
    );
  
    return header_View ;
  
  };
  return (
    <View>
      <FlatList 
        ListHeaderComponent={render_FlatList_header}
        data={BookingList}
        renderItem={renderItem}
        onDelete={handleDelete}
        keyExtractor={(item) => item.venueName}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 0,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  memberImage: {
    height: 30,
    width: 30,
    marginRight:4,
    borderRadius:10,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"  
  },
  bdate:{
    color:"#20B2AA",
    marginBottom: 20,
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  followButton: {
    marginTop:20,
    height:25,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#F95757",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:10,
  },
  card: {
    height:null,
    paddingBottom:10,
    marginTop:30,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth:40,
    marginBottom:20,
    borderColor: '#4682B4',
  },
  modalText: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});  

export default SettingsScreen