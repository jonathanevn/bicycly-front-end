import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
import { text, button } from "../constants/Styles";
import Colors from "../constants/Colors";

const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");

class CardTchat extends React.Component {
  state = {
    accepted: true
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>La demande de {this.props.user}</Text>
          </View>
          <View style={styles.wrapper}>
            <Image
              style={styles.photo}
              source={{ uri: this.props.bikePhoto }}
            />
            <View style={styles.information}>
              <View style={styles.nameBikeModel}>
                <Text style={styles.nameBike}>{this.props.bike}</Text>
                <Text style={styles.nameBike}>{this.props.bikeModel}</Text>
              </View>
              <View>
                <Text style={styles.dates}>début : 9 nov. 12:30</Text>
                <Text style={styles.dates}>fin : 23 nov. 10:30</Text>
              </View>

              <View style={styles.prices}>
                <Text style={styles.nameBike}>
                  {this.props.bikePrice}€ {"  "}
                </Text>
                <Text style={text.pricePerDay}>
                  {this.props.bikePrice}€/jour
                </Text>
              </View>
            </View>
          </View>

          {this.state.accepted === false ? (
            <View style={styles.button}>
              {/* <TouchableOpacity style={styles.buttonLeft}>
                <Text style={styles.textButton}>Refuser</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonRight}>
                <Text style={styles.textButton}>Accepter</Text>
              </TouchableOpacity> */}
            </View>
          ) : (
            <View>
              {/* <Icon
                name="check"
                size={15}
                color={"#ffc200"}
                style={{ paddingRight: 10 }}
              /> */}
              <TouchableOpacity
                style={styles.button}
                // style={button.secondary}
                onPress={this.useLibraryHandler}
              >
                <Text>Accepter</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 15,
    marginRight: 60
  },
  body: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 15,
    width: "100%",
    height: "100%"
  },
  titleSection: {
    alignItems: "center"
  },

  wrapper: {
    flexDirection: "row"
  },

  information: {
    marginLeft: 15
  },

  title: {
    fontFamily: "Karla-Bold",
    fontSize: 16,
    color: Colors.darkGrey,
    marginBottom: 15
  },

  photo: {
    // backgroundColor: "grey",
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginTop: 4
  },

  nameBikeModel: {
    flexDirection: "row",
    marginBottom: 5,
    flexWrap: "wrap",
    width: 225
  },

  nameBike: {
    fontFamily: "Karla-Bold",
    fontSize: 14,
    color: Colors.darkGrey
  },

  dates: {
    fontFamily: "Karla-Regular",
    fontSize: 13,
    color: Colors.midGrey
  },

  prices: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center"
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15
  },

  textButton: {
    fontFamily: "Karla-Regular",
    fontSize: 14,
    color: Colors.darkGrey
  },

  buttonLeft: {
    height: 30,
    width: 100,
    borderColor: "#ffc200",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20
  },
  buttonRight: {
    height: 30,
    width: 100,
    backgroundColor: "#ffc200",

    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20
  }
});

export default CardTchat;
