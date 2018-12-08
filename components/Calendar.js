import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { width, height } from "../constants/Layout";
import { button, text } from "../constants/Styles";
import moment from "moment/min/moment-with-locales";

export default class Calendar extends Component {
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
  onPress = () => {
    this.props.dateSelected({
      selectedDate: {
        startDateSelected: this.state.selectedStartDate,
        endDateSelected: this.state.selectedEndDate
      }
    });
  };

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    // const maxDate = new Date(2027, 6, 3);
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    const endDate = selectedEndDate ? selectedEndDate.toString() : "";

    return (
      <View style={styles.container}>
        <View style={styles.date}>
          <View style={styles.startDate}>
            <Text style={text.textButton}>Début</Text>
            <Text>
              {this.state.selectedStartDate === null
                ? "Veuillez choisir une date"
                : moment(startDate)
                    .locale("fr")
                    .format("ll")}
            </Text>
          </View>
          <View style={styles.endDate}>
            <Text style={text.textButton}>Fin</Text>
            <Text>
              {this.state.selectedEndDate === null
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
  }
});
