import React from "react";
import { StyleSheet, Text, View } from "react-native";
import gql from "graphql-tag";
import {
  voteNo,
  voteYes,
  getStatements,
  getStatementsForOthers
} from "./GraphQL";
import { CLIENT } from "../constants/GraphQL";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statements: [],
      myText: "Hello, world!",
      currentStatement: Object,
      canSwipe: false
    };
  }
  static navigationOptions = {
    title: "Contribute <3 "
  };
  componentWillMount() {
    this._handleRefresh();
  }
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        onSwipeLeft={state => this._handleSwipeLeft()}
        onSwipeRight={state => this._handleSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center"
        }}
      >
        <View>
          <Text
            style={{
              borderColor: "gray",
              borderWidth: 2,
              textDecorationColor: "blue",
              fontSize: 25,
              borderRadius: 20,
              fontWeight: "600",
              alignItems: "center",
              color: "grey",
              justifyContent: "center"
            }}
          >
            {this.state.currentStatement["statement"]}
          </Text>
          <View
            style={{
              textAlign: "center",
              paddingBottom: 20,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30
              }}
            >
              Do you agree?
            </Text>
            <Text
              style={{
                textDecorationStyle: "dashed",
                fontWeight: "800",
                textDecorationColor: "#fff",
                fontSize: 25,
                color: "grey",
                textAlign: "right"
              }}
            >
              Swipe Right for Yes!
            </Text>
            <Text
              style={{
                textDecorationStyle: "dashed",
                fontWeight: "800",
                textDecorationColor: "#000",
                fontSize: 25,
                color: "grey",
                textAlign: "left"
              }}
            >
              Swipe Left for No!
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30
              }}
            >
              Yes: {this.state.currentStatement.yes}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30
              }}
            >
              No: {this.state.currentStatement.no}
            </Text>
          </View>
        </View>
      </GestureRecognizer>
    );
  }

  _handleSwipeRight(state) {
    if (this.state.canSwipe) {
      voteYes(CLIENT, this.state.currentStatement["id"]);
      if (this.state.statements.length == 0) {
        this._handleRefresh();
      } else {
        current = this.state.statements.pop();
        new_statements = this.state.statements;
        this.setState({
          currentStatement: current,
          statements: new_statements
        });
      }
    }
  }

  _handleSwipeLeft(state) {
    if (this.state.canSwipe) {
      voteNo(CLIENT, this.state.currentStatement["id"]);
      if (this.state.statements.length == 0) {
        this._handleRefresh();
      } else {
        current = this.state.statements.pop();
        new_statements = this.state.statements;
        this.setState({
          currentStatement: current,
          statements: new_statements
        });
      }
    }
  }

  _handleRefresh() {
    getStatementsForOthers(CLIENT).then(result => {
      if (result.Statements.length > 0) {
        this.setState({
          statements: result.Statements,
          currentStatement: result.Statements.pop(),
          canSwipe: true
        });
      } else {
        this.setState({
          currentStatement:
            "We appreciate your kindness and willingness to contribute. We will forward anyone who needs help to you :).",
          canSwipe: false
        });
      }
    });
  }
}
