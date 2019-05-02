import React from "react";
import { createStatement } from "./GraphQL";
import { CLIENT } from "../constants/GraphQL";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from "react-native";
import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 22,
            paddingBottom: 20,
            width: "90%"
          }}
        >
          Hello! Need some community support? There are tons of people waiting
          for you!
        </Text>
        <TextInput
          style={{
            height: 30,
            borderColor: "gray",
            borderWidth: 1,
            width: "90%",
            fontSize: 20
          }}
          onChangeText={val => {
            this.setState({ text: val });
          }}
          text={this.state.text}
          placeholder="I think I should move out because I am sick of my parents."
        />
        <Button
          containerStyle={containerStyle}
          onPress={() => {
            this._handleSubmitStatement();
          }}
          title="Post!"
          style={{
            fontSize: 22,
            borderWidth: 2
          }}
        />
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            Make sure you write a statement, not a question since your community
            will be asked "Do you agree?"
          </Text>
        </View>
      </View>
    );
  }

  _handleSubmitStatement = () => {
    createStatement(this.state.text, CLIENT);
    alert("Submitted successfully!");
    this.setState({
      text: ""
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
const containerStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "flex-end",
  width: "30"
};
