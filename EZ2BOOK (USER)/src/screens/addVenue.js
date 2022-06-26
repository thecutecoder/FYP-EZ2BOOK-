import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity, 
  TextInput,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import * as firebase from 'firebase';
import {storage, database} from '../database/firebase';


//import { AuthContext } from '../navigation/AuthProvider';

const AddVenue = ({navigation,}) => {;

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

  const [values, setValues] = useState({
    venueName: "",
    venueID: "",
    venueAddress: "",
    venueCapacity: "",
    venueDesc: "",
    venueFacilities: "",
})

function handleChange(text, eventName) {
  setValues(prev => {
      return {
          ...prev,
          [eventName]: text
      }
  })
}

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'android' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({ 
      width: 1200, 
      height: 780, 
      cropping: true, 
    }).then((image) => { 
      console.log(image); 
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path; 
      setImage(imageUri); 
    }); 
  };

  const submitPost = async () => {
    const { venueName,
      venueID,
      venueAddress,
      venueCapacity,
      venueDesc,
      venueFacilities,
     } = values

    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);

    await database
    .collection('Venue')
    .add({
      //userId: user.uid,
    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      postImg: imageUrl,
      venueName,
      venueID,
      venueAddress,
      venueCapacity,
      venueDesc,
      venueFacilities,
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      setPost(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }

  const uploadImage = async () => {
    if( image == null ) {
      console.log("uploaded an image."); 

      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage.ref(`photos/${filename}`);
    const response = await fetch(uploadUri);  
    const blob = await response.blob(); // Here is the trick 
    
    await storageRef 
         .put(blob) 
         .then((snapshot) => { 
           console.log("uploaded an image."); 
         }) 
         .catch((err) => console.log(err)); 
 
 
    try { 
  
 
      const url = await storageRef.getDownloadURL(); 
 
      setUploading(false); 
      setImage(null); 
 
      // Alert.alert( 
      //   'Image uploaded!', 
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!', 
      // ); 
      return url; 
 
    } catch (e) { 
      console.log(e); 
      return null; 
    } 
 
  };

  return (
    <View style={styles.container}>
        <Text style={styles.textHeader}>Add Venue</Text>

        <TextInput
          style={styles.inputStyle}
          placeholder="Venue Name"
          onChangeText={text => handleChange(text, "venueName")}
        />  
  
        <TextInput
          style={styles.inputStyle}
          placeholder="Venue ID"
          onChangeText={text => handleChange(text, "venueID")}
        />

         <TextInput
          style={styles.inputStyle}
          placeholder="Venue Address"
          onChangeText={text => handleChange(text, "venueAddress")}
        /> 

       <TextInput
          style={styles.inputStyle}
          placeholder="Venue Capacity"
          onChangeText={text => handleChange(text, "venueCapacity")}
        />  
  
        <TextInput
          style={styles.inputStyle}
          placeholder="Venue Description"
          onChangeText={text => handleChange(text, "venueDesc")}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Venue Facilities"
          onChangeText={text => handleChange(text, "venueFacilities")}
        /> 

        <ActionButton buttonColor="#2e64e5">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Take Photo"
            onPress={takePhotoFromCamera}>
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Choose Photo"
            onPress={()=>choosePhotoFromLibrary()}>
            <Icon name="md-images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
      </ActionButton>   

      <TouchableOpacity style={styles.buttonUpload}>
                <Text
                onPress={submitPost}
                >Submit</Text>  
      </TouchableOpacity>
    </View>
  );
};

export default AddVenue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
   
  textHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 2,
    marginTop: 10,
  },

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});