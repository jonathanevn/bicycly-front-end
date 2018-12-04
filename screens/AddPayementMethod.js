import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class AddPayementMethod extends React.Component {
  static navigationOptions = {
    title: "Ajouter un moyen de paiement"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the AddPayementMethod component</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("PaymentMethods");
          }}
        >
          <Text>Enregistrer</Text>
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

export default AddPayementMethod;
