import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";

export default class Statement extends React.Component {
  render() {
    return (
      <View
        style={{
          borderWidth: 1
        }}
      >
        <Text>{this.props.Statement.statement}</Text>
        <Text>
          Yes: {this.props.Statement.yes}, No: {this.props.Statement.no}
        </Text>
      </View>
    );
  }
}
