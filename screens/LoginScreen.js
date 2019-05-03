import React from "react";
import { View } from "react-native";
import firebase from "firebase";
import LoginForm from "./LoginForm"; //Goes at the top

const containerStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  padding: 16
};

var config = {
  apiKey: "AIzaSyCfb4_cOc5zgU-UDw48SuWOy-rWOErclLQ",
  authDomain: "relationtips-d6756.firebaseapp.com",
  databaseURL: "https://relationtips-d6756.firebaseio.com",
  projectId: "relationtips-d6756",
  storageBucket: "relationtips-d6756.appspot.com",
  messagingSenderId: "551855096122"
};
firebase.initializeApp(config);

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: "Hello"
    };
  }
  render() {
    return (
      <View style={containerStyle}>
        <LoginForm navigation={this.props.navigation} />
      </View>
    );
  }
}
