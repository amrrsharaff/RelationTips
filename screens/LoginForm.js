import React, { Component } from "react";
import { View, Text, Button, AsyncStorage } from "react-native";
import firebase from "firebase";
import { TitledInput } from "./TitledInput";
import Spinner from "./Spinner";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      loggedIn: false
    };
  }
  SignUpButton() {
    if (!this.state.loading) {
      return <Button onPress={this.onSignupPress.bind(this)} title="Sign up" />;
    }
  }

  signInAsync = async email => {
    await AsyncStorage.setItem("userToken", email);
    this.props.navigation.navigate("Main");
  };

  onLoginPress() {
    this.setState({ error: "", loading: true });

    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({ error: "", loading: false, loggedIn: true });
        alert("Succesful login!");
        this.signInAsync(email);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: "Authentication failed.",
          loading: false,
          loggedIn: false
        });
      });
  }
  onSignupPress() {
    this.setState({ error: "", loading: true });

    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        this.setState({ error: "", loading: false, loggedIn: true });
        alert("Sign up sucessful");
        signInAsync(email);
      })
      .catch(error => {
        alert(error.Error);
        this.setState({
          error: "Authentication failed.",
          loading: false,
          loggedIn: false
        });
      });
  }
  renderButtonOrSpinner() {
    if (this.state.loading) {
      return Spinner();
    }
    return <Button onPress={this.onLoginPress.bind(this)} title="Log in" />;
  }
  render() {
    return (
      <View>
        <TitledInput
          label="Email Address"
          placeholder="you@domain.com"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TitledInput
          label="Password"
          autoCorrect={false}
          placeholder="*******"
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        {this.renderButtonOrSpinner()}
        {this.SignUpButton()}
      </View>
    );
  }
}
const styles = {
  errorTextStyle: {
    color: "#E64A19",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10
  }
};
