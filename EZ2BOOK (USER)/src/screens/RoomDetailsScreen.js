import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';

import {database} from "../database/firebase";
import "firebase/firestore";
import * as firebase from 'firebase';
  
export default function RoomDetailScreen({navigation, route}) {

  const { venueName } = route.params;
  
  const [ venueAddress, setvenueAddress] = useState('');
  const [ venueCapacity, setvenueCapacity] = useState('');
  const [ venueDesc, setvenueDesc] = useState('');
  const [ venueFacilities, setvenueFacilities] = useState('');
  const [ postImg, setpostImg] = useState('');
  
  useEffect(() => {
    displayRoomDetails();
  }, []);
  
  displayRoomDetails = async () => {
    const list=[];
    await database
      .collection("Venue")
      .where("venueName", "==", venueName)
      .get()
      .then((querySnapshot) => {querySnapshot.forEach((doc) =>{
 
        const {
          venueCapacity,
          venueAddress,
          venueDesc,
          venueFacilities,
          postImg
        }=doc.data();
        list.push({
          venueCapacity:venueCapacity,
          venueAddress:venueAddress,
          venueDesc:venueDesc,
          venueFacilities:venueFacilities,
          postImg:postImg
        })
        setvenueCapacity(venueCapacity)
        setvenueAddress(venueAddress)
        setvenueDesc (venueDesc)
        setvenueFacilities (venueFacilities)
        setpostImg (postImg)
      });
      console.log(venueName);
    });
  }

    return (
        <View style={styles.container}>
          <View style={{
            height: 45,
            width: "100%",
            backgroundColor: "#00B8D4",
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ fontSize: 24, color: 'white' }}>Venue Details</Text>
          </View>
          <ScrollView>
          <View style={{alignItems:'center', marginHorizontal:30}}>
          <View style={{ marginTop: 30, marginBottom: 20}}>
            <Image style={{ height:170 ,width:270, alignSelf:'center',}}
            source={{uri : postImg}} />
          </View>
            <Text style={styles.name}>{venueName}</Text>
            <Text style={styles.price}>Located at:</Text>
            <Text style={styles.description}>
            {venueAddress}
            </Text>
            <Text style={styles.price}>Head count:</Text>
            <Text style={styles.description}>
            {venueCapacity}
            </Text>
            <Text style={styles.price}>Description:</Text>
            <Text style={styles.description}>
            {venueDesc}
            </Text>
            <Text style={styles.price}>Utilities:</Text>
            <Text style={styles.description}>
            {venueFacilities}
            </Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity style={styles.reserveButton} onPress={()=> navigation.navigate('Create Booking', {venueName})}>
              <Text>RESERVE</Text>  
            </TouchableOpacity>
          </View> 
        </ScrollView>
      </View>
    );
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginBotton:30,
  },
  productImg:{
    width:200,
    height:200,
  },
  name:{
    fontSize:20,
    color:"#696969",
    fontWeight:'bold',
    marginTop:20
  },
  price:{
    marginTop:10,
    fontSize:15,
    color:"black",
    fontWeight:'bold'
  },
  description:{
    textAlign:'center',
    marginTop:10,
    color:"#696969",
  },
  star:{
    width:40,
    height:40,
  },
  btnColor: {
    height:30,
    width:30,
    borderRadius:30,
    marginHorizontal:3
  },
  btnSize: {
    height:40,
    width:40,
    borderRadius:40,
    borderColor:'#778899',
    borderWidth:1,
    marginHorizontal:3,
    backgroundColor:'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer:{
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentColors:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentSize:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  separator:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:20,
    marginHorizontal:30
  },
  reserveButton: {
    marginTop:10,
    marginBottom: 30,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#64E647",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  addToCarContainer:{
    marginHorizontal:30
  }
});    