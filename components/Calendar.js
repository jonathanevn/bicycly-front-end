import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { width, height } from "../constants/Layout";
import { button, text } from "../constants/Styles";
import moment from "moment/min/moment-with-locales";
import Colors from "../constants/Colors";

export default class Calendar extends Component {
  onDateChange = (date, type) => {
    if (type === "END_DATE") {
      this.props.onChangeDate({
        endDate: date
      });
    } else {
      this.props.onChangeDate({
        startDate: date,
        endDate: null
      });
    }
  };

  render() {
    const startDate = this.props.startDate
      ? this.props.startDate.toString()
      : "";
    const endDate = this.props.endDate ? this.props.endDate.toString() : "";

    const minDate = new Date(); // Today
    // const maxDate = new Date(2027, 6, 3);
    return (
      <View style={styles.container}>
        <View style={styles.date}>
          <View style={styles.startDate}>
            <Text style={styles.startEndDate}>Début</Text>
            <Text style={styles.dateSelected}>
              {!this.props.startDate
                ? "Choisir une date"
                : moment(startDate)
                    .locale("fr")
                    .format("ll")}
            </Text>
          </View>
          <View style={styles.endDate}>
            <Text style={styles.startEndDate}>Fin</Text>
            <Text style={styles.dateSelected}>
              {!this.props.endDate
                ? "Choisir une date"
                : moment(endDate)
                    .locale("fr")
                    .format("ll")}
            </Text>
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
            onDateChange={this.onDateChange}
          />
        </View>
      </View>
    );
  }
}
// moment().format("ll");
const styles = StyleSheet.create({
  container: {
    /*     flex: 1, */
    backgroundColor: "#FFFFFF"
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10
  },
  calendar: {
    marginTop: 10
  },

  startDate: {
    width: width / 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 10
  },

  startEndDate: {
    fontFamily: "Karla-Bold",
    fontSize: 15,
    color: Colors.darkGrey
  },

  endDate: {
    width: width / 2,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 10
  },

  dateSelected: {
    fontFamily: "Karla-Bold",
    fontSize: 14,
    color: Colors.lightGrey
  }
});
