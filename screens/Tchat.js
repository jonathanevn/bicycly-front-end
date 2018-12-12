import React from "react";
import { GiftedChat, MessageText } from "react-native-gifted-chat";
import axios from "axios";
import { View, Text, AsyncStorage } from "react-native";
class Tchat extends React.Component {
  static navigationOptions = {
    title: "Message au propriétaire"
  };
  state = {
    messages: [],
    thread: undefined,
    user: null
  };

  componentDidMount() {
    //rappel de la discussion
    console.log("bikeID ===>", this.props.navigation.state.params.bikeId);
    const bikeId = this.props.navigation.state.params.bikeId;
    AsyncStorage.getItem("token").then(value => {
      console.log("token ===>", value);
      this.setState({
        user: value
      });
    });
    axios
      .get("https://bicycly.herokuapp.com/message/" + this.state.thread)
      .then(reponse => {
        console.log("rappel history discussion", reponse.data);

        // this.setState({ messages: reponse.data, thread: random });
        // this.setState({ thread: reponse.data._id });
        this.setState({
          messages: reponse.data.messages || this.state.messages,
          thread: reponse.data._id
        });
      });

    this.ws = new WebSocket("ws://https://bicycly.herokuapp.com");
    this.ws.onmessage = e => {
      const message = JSON.parse(e.data);
      this.setState({
        messages: GiftedChat.append(this.state.messages, message)
      });
    };
  }

  onSend(messages = []) {
    this.ws.send(
      JSON.stringify({
        text: messages[0].text,
        // name: "Audrey", //fullName
        // firstName: this.state.params.navigation.firstName,
        thread: this.state.thread //id de la discussion pour savoir cote back à qui appartient ce message
      })
    );
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    console.log("state.user ===>", this.state.user);
    console.log("state.messages ===>", this.state.messages);
    console.log("Have we got a thread ?", this.state.thread);

    return (
      <GiftedChat
        //id du User -b qui recois donc propriétaire
        user={{ _id: "5c0ce255019aae1f160a4ba2" }}
        renderMessageText={props => {
          console.log(props.currentMessage);
          if (
            props.currentMessage.isRequest === true &&
            props.currentMessage.thread.bike.user === "5c0ce255019aae1f160a4ba2" //User -b Est-ce que je suis le propriétaire du vélo ?
          ) {
            return (
              //la demande de location avec l'acceptation ou le refus
              <React.Fragment>
                <MessageText {...props} />
                <View>
                  <Text>Vélo à louer</Text>
                </View>
              </React.Fragment>
            );
          } else {
            return (
              //sinon retourne le message
              <React.Fragment>
                <MessageText {...props} />
              </React.Fragment>
            );
          }
        }}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
      />
    );
  }
}

export default Tchat;
