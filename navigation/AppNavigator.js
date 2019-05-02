import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";

import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/LoginScreen";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "Main" : "Auth");
  };

  componentDidMount() {
    this._bootstrapAsync();
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: "#262626",
    fontSize: 18,
    fontWeight: "200",
    flex: 1,
    height: 40
  },
  labelStyle: {
    fontSize: 12,
    color: "#7F7D7D",
    fontWeight: "200",
    flex: 1
  },
  container: {
    height: 45,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    borderColor: "#D4D4D4",
    borderBottomWidth: 1
  }
};

const AuthStack = createStackNavigator({ SignIn: { screen: LoginScreen } });

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      AuthLoading: AuthLoadingScreen,
      Main: MainTabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
