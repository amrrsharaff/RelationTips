import React from "react";
import { Button, AsyncStorage, View } from "react-native";
import { getStatementsForUser } from "./GraphQL";
import { CLIENT } from "../constants/GraphQL";
import ScrollStatments from "./ScrollStatements";
import { withNavigationFocus } from "react-navigation-is-focused-hoc";

var _isMounted = false;

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myStatements: []
    };
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
  updateStatements() {
    getStatementsForUser(CLIENT)
      .then(result => {
        if (result.Statements.length > 0) {
          if (_isMounted) {
            this.setState({
              myStatements: result.Statements
            });
          }
        }
      })
      .catch(error => console.log(error));
  }
  componentWillMount() {
    getStatementsForUser(CLIENT)
      .then(result => {
        if (result.Statements.length > 0) {
          if (_isMounted) {
            this.setState({
              myStatements: result.Statements
            });
          }
        }
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    _isMounted = true;
  }

  componentWillUnmount() {
    _isMounted = false;
  }

  render() {
    if (this.props.isFocused) {
      this.updateStatements();
    }
    return (
      <View>
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
        <ScrollStatments statements={this.state.myStatements} />
      </View>
    );
  }
}

export default withNavigationFocus(SettingsScreen, "SettingsScreen");
