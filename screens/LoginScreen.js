import React from "react";
import { View } from "react-native";
import firebase from "firebase";
import LoginForm from "./LoginForm"; //Goes at the top

const containerStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "flex-end"
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
    return <LoginForm navigation={this.props.navigation} />;
  }
}
