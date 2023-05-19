import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView, 
  Image
} from "react-native";



import { Block, Checkbox, Text, theme } from "galio-framework";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLazyQuery } from "@apollo/client";

import { useMutation } from "@apollo/client";
import { newTwiddit } from "../gql/queries";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

export default function NewTwiddit (props) {

    
    const [imageUri,setimageUri] = useState("");
    const [text,settext] = useState("");
    const [imageURL1,setimageURL1] = useState("");
    const [imageURL2,setimageURL2] = useState("");
    const [imageURL3,setimageURL3] = useState("");
    const [imageURL4,setimageURL4] = useState("");

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
        userId: 1,
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
                            openCamera();
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