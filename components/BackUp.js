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
    // this.state = { date: "" };
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  // onPress = () => {
  //   this.setState({
  //     date: this.state.chosenDate
  //   });
  // };

  render() {
    console.log(this.state.chosenDate);
    return (
      <View style={styles.container}>
        <View style={styles.buttonTop}>
          <TouchableOpacity style={styles.buttonLeft}>
            <Text style={text.textButton}>Début</Text>
            <Text style={[text.inputCompleted, { fontSize: 10 }]}>
              {/* Choisir une date */}
              {this.state.date}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRight}>
            <Text style={text.textButton}>Fin</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendar}>
          <DatePickerIOS
            mode="datetime"
            date={this.state.chosenDate}
            minuteInterval="30"
            onDateChange={this.setDate}
            minimumDate={new Date()}
            locale="fr"
          />
        </View>
        <TouchableOpacity style={button.primary}>
          <Text style={text.textButton} onPress={this.onPress}>
            Confirmer
          </Text>
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
    justifyContent: "center",
    marginBottom: 50
  },
  buttonTop: {
    padding: 10,
    flex: 1,
    flexDirection: "row"
  },
  buttonLeft: {
    height: 50,
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffc200",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  buttonRight: {
    height: 50,
    width: 160,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ffc200",
    borderWidth: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  calendar: {
    // flex: 1,
    width: "100%"
  }
});
