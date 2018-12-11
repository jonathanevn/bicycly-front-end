import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { width, height } from "../constants/Layout";
import { button, text } from "../constants/Styles";
import moment from "moment/min/moment-with-locales";

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
    const minDate = new Date(); // Today
    // const maxDate = new Date(2027, 6, 3);
    return (
      <View style={styles.container}>
        <View style={styles.date}>
          <View style={styles.startDate}>
            <Text style={text.textButton}>Début</Text>
            <Text>
              {!this.props.startDate
                ? "Veuillez choisir une date"
                : moment(startDate)
                    .locale("fr")
                    .format("ll")}
            </Text>
          </View>
          <View style={styles.endDate}>
            <Text style={text.textButton}>Fin</Text>
            <Text>
              {!this.props.endDate
                ? "Veuillez choisir une date"
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
  },
  startDate: {
    width: width / 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 10
  },
  endDate: {
    width: width / 2,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 10
  },
  confirmed: {
    alignItems: "center",
    marginBottom: 30
  }
});
