import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import { button, text } from "../constants/Styles";
import moment from "moment";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === "END_DATE") {
      this.setState({
        selectedEndDate: date
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null
      });
    }
  }

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    // const maxDate = new Date(2027, 6, 3);
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    const endDate = selectedEndDate ? selectedEndDate.toString() : "";

    let now = moment().format("ll");
    console.log("ici", now);
    moment().format("ll");
    console.log(startDate);

    return (
      <View style={styles.container}>
        <View style={styles.date}>
          <View>
            <Text style={text.textButton}>Début</Text>
            <Text>{startDate}</Text>
          </View>
          <View>
            <Text style={text.textButton}>Fin</Text>
            <Text>{endDate}</Text>
          </View>
        </View>
        <View style={styles.calendar}>
          <CalendarPicker
            style={text.textButton}
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={minDate} //   maxDate={maxDate}
            previousTitle="<"
            nextTitle=">"
            weekdays={["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]}
            months={[
              "Janvier",
              "Février",
              "Mars",
              "Avril",
              "Mai",
              "Juin",
              "Juillet",
              "Août",
              "Septembre",
              "Octobre",
              "Novembre",
              "Décembre"
            ]} //   todayBackgroundColor="#f2e6ff"
            selectedDayColor="#ffc200"
            selectedDayTextColor="#FFFFFF"
            textStyle={text.inputCompleted}
            customDatesStyles={[
              {
                date: moment(startDate).format("DD-MM-YY")
              }
            ]}
            onDateChange={this.onDateChange}
          />
        </View>
        <View style={styles.confirmed}>
          <TouchableOpacity style={button.primary}>
            <Text style={text.textButton} onPress={this.onPress}>
              Confirmer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
// moment().format("ll");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
    // marginTop: 100
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  calendar: {
    marginTop: 10
  },
  confirmed: {
    alignItems: "center",
    marginTop: 15
  }
});
