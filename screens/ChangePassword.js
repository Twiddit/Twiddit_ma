import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView, 
  Image
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

import { useMutation } from "@apollo/client";
import { updateProfile, userProfileData, userTwiddits } from "../gql/queries";
import { useQuery } from "@apollo/client";

const { width, height } = Dimensions.get("screen");

export default function ChangePassword (props){
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
  
    
    const {data, loading, error} = useQuery(userProfileData, {
        variables: {
          userId: 1, 
        },
        enabled:false,
        onCompleted:(data) => {
          // console.log(data)
        },
        onError(error){
          console.log(error)
        }
    })

    if (!loading) {
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
                    Update your password
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
                        placeholder="Current Password"
                        onChangeText={newPassword => setOldPassword(oldPassword)}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    
                    <Block width={width * 0.8}>
                      <Input
                        borderless
                        placeholder="New Password"
                        onChangeText={newPassword => setNewPassword(newPassword)}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="bell"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>                    
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={() => {
                        runMutation()
                      }}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          UPDATE PASSWORD
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
  }


const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
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
