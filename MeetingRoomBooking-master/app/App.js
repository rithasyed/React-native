/*
 * Meeting room Booking System
 *
 * Developed by Prishan Maduka on 11/4/19 11:04 PM.
 * Last modified 11/4/19 9:15 PM
 * Copyright (c) 2019. All rights reserved Prishan Maduka
 */

import React from 'react';
import { Provider} from 'react-redux';
import {Actions,Router, Scene, Drawer} from 'react-native-router-flux';
import {
  Button,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {AuthManager} from './auth/AuthManager';
import {GraphManager} from './graph/GraphManager';

export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  async componentDidMount(): void {
    try {
      await AuthManager.signInAsync();
    } catch (error) {
      console.log(error);
    }
  }

  onPress = async() => {
    try {
      await GraphManager.getScheduleByMeetingRoomAsync("aurora.room@btoptions.onmicrosoft.com");

      //console.log(userList.value[0]);
    }catch (error) {
      console.log(error);
    }
  };

  render() {
    return (

        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text>Hello</Text>

          <Button title={'Users'}
                  onPress={()=>{
                    this.onPress();
                  }}
          />
        </View>

    )

  }

}
