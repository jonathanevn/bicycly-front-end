import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class PaymentMethods extends React.Component {
  static navigationOptions = {
    title: "Mes moyens de paiements"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the PaymentMethods screen</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("AddPayementMethod");
          }}
        >
          <Text>Ajouter un moyen de paiement</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default PaymentMethods;
