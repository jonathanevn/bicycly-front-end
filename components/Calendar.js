import React from "react";
import {
  StyleSheet,
  Text,
  View,
  DatePickerIOS,
  TouchableOpacity
} from "react-native";

import { button, text } from "../constants/Styles";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonTop}>
          <TouchableOpacity style={button.primary}>
            <Text>Début</Text>
          </TouchableOpacity>
          <TouchableOpacity style={button.secondary}>
            <Text>Fin</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendar}>
          <DatePickerIOS
            mode="datetime"
            date={this.state.chosenDate}
            minuteInterval="10"
            onDateChange={this.setDate}
            locale="fr"
          />
        </View>
        <TouchableOpacity style={button.primary}>
          <Text>Confirmer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 500,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonTop: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    flexDirection: "row",
    width: "100%"
  },
  buttonLeft:{
      backgroundColor: "#ffc200"
  },
  buttonRight:{
      borderColor: "#ffc200",
      borderWidth: 1
  }
  calendar: {
    flex: 1,
    width: "100%"
  }
});
