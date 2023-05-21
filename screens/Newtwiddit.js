import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Image
} from "react-native";



import { Block, Checkbox, Text, theme } from "galio-framework";
//import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLazyQuery } from "@apollo/client";

import { useMutation } from "@apollo/client";
import { newTwiddit } from "../gql/queries";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

export default function NewTwiddit (props) {

    
    const [imageUri,setimageUri] = useState("");
    const [userId,setuserId] = useState();
    const [text,settext] = useState("");
    const [imageURL1,setimageURL1] = useState("");
    const [imageURL2,setimageURL2] = useState("");
    const [imageURL3,setimageURL3] = useState("");
    const [imageURL4,setimageURL4] = useState("");

    const [singleFile, setSingleFile] = useState(null);

    const getAuth = async () => {
      try {

        const value = await AsyncStorage.getItem("Authorization")

        if(value !== null) {
          console.log(value)
          return value
        }
      } catch(e) {
        // error reading value
        console.log(e)
      }
    }

    const getUserID = async () => {
      try {
        const value = await AsyncStorage.getItem("UserID")

        if(value !== null) {
          setuserId(JSON.parse(value))
          return value
        }
      } catch(e) {
        // error reading value
      }
    }

    const checkPermissions = async () => {
      try {
        const result = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
  
        if (!result) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title:
                'You need to give storage permission to download and save the file',
              message: 'App needs access to your camera ',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
            return true;
          } else {
            Alert.alert('Error', I18n.t('PERMISSION_ACCESS_FILE'));
  
            console.log('Camera permission denied');
            return false;
          }
        } else {
          return true;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    };

    const uploadImage = async () => {
      const BASE_URL = 'xxxx';
  
      // Check if any file is selected or not
      if (singleFile != null) {
        // If file selected then create FormData
        const data = new FormData();
  
        data.append('file_attachment', {
          uri: singleFile.uri,
          name: singleFile.name,
          type: singleFile.mimeType,
        });
  
        // return
        try {
          let res = await fetch(BASE_URL + 'tutorial/upload.php', {
            method: 'post',
            body: data,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            timeout: 5000,
          });
  
          let result = await res.json();
          console.log('result', result);
          if (result.status == 1) {
            Alert.alert('Info', result.msg);
          }
        } catch (error) {
          // Error retrieving data
          // Alert.alert('Error', error.message);
          console.log('error upload', error);
        }
      } else {
        // If no file selected the show alert
        Alert.alert('Please Select File first');
      }
    };
  
    async function selectFile() {
      try {
        const result = await checkPermissions();
  
        if (result) {
          const result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: false,
            type: 'image/*',
          });
  
          if (result.type === 'success') {
            // Printing the log realted to the file
            console.log('res : ' + JSON.stringify(result));
            // Setting the state to show single file attributes
            setSingleFile(result);
          }
        }
      } catch (err) {
        setSingleFile(null);
        console.warn(err);
        return false;
      }
    }

    const openCamera= async () =>{
        let options ={
            storageOptions:{
                path:"image"
            },
            mediaType: 'photo',
            includeBase64: true
        };
        try{
            const doc = await launchCamera(options);
            console.log(doc)
        }catch(err){
           // if(DocumentPicker.isCancel(e)){
           //     console.log("User cancelled the upload",e);
           // }else{
                console.log(err);
           // }
        }
        
        
    };

    const openLibrary= async () =>{
        let options ={
            mediaType: 'photo',
            includeBase64: true
        };
        const result = await launchImageLibrary(options);
        
        setimageUri(result.assets[0].base64);
    };

    const [runMutation, {dataModifyTwiddit, errorModifyTwiddit}] = useMutation(newTwiddit, {
      variables: {
        userId: userId,
        text: text, 
        creationDate: new Date(), 
        imageURL1: imageURL1,
        imageURL2: imageURL2,
        imageURL3: imageURL3,
        imageURL4: imageURL4
      },
      enabled:false,
      onCompleted:(dataModifyTwiddit) => {
        console.log(dataModifyTwiddit)  
        navigation.navigate("newTwiddit")
        
        
      },
      onError(errorModifyTwiddit){
        console.log(errorModifyTwiddit)
      }
    })

    useEffect(() => {
      getUserID()
    }, [])

    return (
      
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.twidditRegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Image source={Images.twidditFilledLogo} style={styles.logo}/>
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={13}>
                    {userId}
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        style={{
                          height: 200,
                          margin: 10,
                          borderWidth: 1,
                          padding: 10,
                        }}
                        placeholder="What's happening?"
                        onChangeText={text => settext(text)}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ungroup"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block>
                        <Image source={imageUri}/>
                    </Block>
                    <Block width={width * 0.8} style={{flexDirection:"row"}}>
                        <Button color="primary" onPress={() => {
                            selectFile();
                        }}>
                            <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="palette"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        </Button>
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={() => {
                        runMutation()
                      }}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          POST
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }


const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.70,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  logo: {
    width: 100,
    height: 100,
    zIndex: 2,
    position: 'relative',

  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    backgroundColor: "#d10a30"
  }
});