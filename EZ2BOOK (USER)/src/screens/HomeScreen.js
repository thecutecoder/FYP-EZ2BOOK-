import React, { useState, useEffect } from "react";
import { ScrollView,
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  ImageBackground
} from "react-native";
import {auth,database} from "../database/firebase";
import "firebase/firestore";
import * as firebase from 'firebase';

const HomeScreen = ({navigation}) => {
  const [VenueList, setVenueList] = useState([]);

  useEffect(() => {
    getVenueList(VenueList);
  });

  const getVenueList = async () => {
    await database.collection("Venue")
      .get()
      .then((querySnapshot) => {
        let myData = [];
        querySnapshot.forEach((doc) => {
          const{
            venueName,
            postImg,
          } = doc.data();
          myData.push({
            venueName: venueName,
            postImg:  postImg,
          });
        });
        setVenueList(myData);
      })
      .catch((error) => {
        console.log("Error getting data: ", error);
        console.log(doc.data);
      });
  };

  const Item = ({ venueName,  postImg }) => (
        <View>
          <View style={styles.container1}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium', marginBottom: 10}}>{venueName}</Text>
          <View style={{ marginBottom: 20}}>
            <Image style={{ height:170 ,width:270, alignSelf:'center',}}
            source={{uri : postImg}} />
          </View>
          <View style={styles.joinButton}>
            <Button onPress={()=> navigation.navigate("Room Details", {venueName}) } title="See More" color={"#00B8D4"}/>
          </View>
          </View>
        </View>
    
  );

  const renderItem = ({ item }) => (
    <Item 
    venueName ={item.venueName} 
    postImg ={item.postImg} 
    />
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            Hello {auth.currentUser.displayName}
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require('../assets/images/user-profile.jpg')}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
            />
          </TouchableOpacity>
        </View>
       <FlatList
          data={VenueList}
          renderItem={renderItem}
          keyExtractor={(item) => item.venueName}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#EEEEFF',
    padding: 20,
    height: '150%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    width:'100%',
    height: '100%',
    padding:20,
    borderRadius:10,
    shadowOpacity:80,
    elevation:15,
    marginTop:20,
    marginBottom:20,
    textAlign: 'center',
  },
  
  header: {
    marginTop: 60,
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },

  textinput: {
    height: 35,
    width: '80%',
    fontSize: 14,
    borderWidth: 0.4,
    borderRadius: 3,
    borderColor: 'white',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    paddingLeft: 6
  },

  row:{
    flexDirection: 'row', 
    width: '99%',
    marginTop: 10
  },

  col1: {
    width: '100%', 
    alignItems:'flex-end',
    justifyContent: 'center', 
    paddingRight: 10,
    fontSize: 18,
    fontColor : 'white'
  },

  joinButton: {
    marginTop: 5,
    width: '100%',
  },
  });
export default HomeScreen;
