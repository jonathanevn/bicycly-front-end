import React from "react";
import { StyleSheet, Text, View, DatePickerIOS } from "react-native";

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
      console.log(this.setState),
      console.log(this.state),
      console.log(this.state.chosenDate),
      (
        <View style={styles.container}>
          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={this.setDate}
          />
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    width: "100%"
  }
});
