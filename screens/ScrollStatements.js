import React from "react";
import { ScrollView } from "react-native";
import Statement from "./Statement";

export default class ScrollStatements extends React.Component {
  _generateStatements() {
    return this.props.statements.map(statement => (
      <Statement Statement={statement} key={statement.id} />
    ));
  }
  render() {
    return <ScrollView>{this._generateStatements()}</ScrollView>;
  }
}
