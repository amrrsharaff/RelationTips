import React, { Component } from "react";
import { View, Text, Button, AsyncStorage } from "react-native";
import firebase from "firebase";
import { TitledInput } from "./TitledInput";
import Spinner from "./Spinner";

const SignUpButton = ({ onPress }) => (
  <Button style={[styles.general]} onPress={onPress} title="Sign up" />
);

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
  onSignUpPress() {
    this.setState({ error: "", loading: true });

    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        this.setState({ error: "", loading: false, loggedIn: true });
        alert("Sign up successful");
        this.signInAsync(email);
      })
      .catch(error => {
        alert(error);
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
    return (
      <Button
        style={[styles.general]}
        onPress={this.onLoginPress.bind(this)}
        title="Log in"
      />
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TitledInput
          style={[styles.general]}
          label="Email Address"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder="you@domain.com"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TitledInput
          style={[styles.general]}
          label="Password"
          autoCorrect={false}
          placeholder="*******"
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Text style={[styles.errorTextStyle]}>{this.state.error}</Text>
        <View style={[styles.loginContainer]}>
          {this.renderButtonOrSpinner()}
        </View>
        {!this.state.loading && (
          <SignUpButton onPress={this.onSignUpPress.bind(this)} />
        )}
      </View>
    );
  }
}
const styles = {
  general: {
    margin: 8
  },
  loginContainer: {
    paddingBottom: 16
  },
  errorTextStyle: {
    color: "#E64A19",
    alignSelf: "center",
    paddingVertical: 10
  }
};
