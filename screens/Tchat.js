import React from "react";
import {
  GiftedChat,
  MessageText,
  Send,
  Bubble,
  InputToolbar
} from "react-native-gifted-chat";
import axios from "axios";
import CardTchat from "../components/CardTchat";
import { View, Text, AsyncStorage } from "react-native";

class Tchat extends React.Component {
  static navigationOptions = {
    title: "Message au propriétaire",
    headerBackTitle: null,
    headerTintColor: "#262626",
    headerTitleStyle: {
      fontFamily: "Karla-Bold",
      fontSize: 16,
      color: "#262626"
    },
    headerStyle: {
      backgroundColor: "#f8f8f8",
      borderBottomColor: "#f8f8f8"
    }
  };
  state = {
    messages: [],
    bike: {},
    thread: this.props.navigation.state.params.threadId,
    userId: this.props.navigation.state.params.userId,
    bikeId: this.props.navigation.state.params.bikeId,
    propId: this.props.navigation.state.params.propId
  };

  componentDidMount() {
    //rappel de la discussion
    // console.log("bikeID ===>", this.state.bikeId);
    // console.log("userID ===>", this.state.userId);
    // console.log("propriétaireID ===>", this.state.propId);
    // console.log("threadID ===>", this.state.thread);
    AsyncStorage.getItem("token").then(value => {
      this.setState(
        {
          token: value
        },
        () => {
          axios
            .get(
              "https://bicycly.herokuapp.com/api/tchat/message/" +
                this.state.bikeId +
                "/" +
                this.state.userId +
                "/" +
                this.state.thread
            )
            .then(response => {
              console.log(
                "rappel de l'historique de la discussion // ou affichage de la discussion sauvegardée, le cas échéant",
                response.data.messages
              );

              // this.setState({ messages: response.data, thread: random });
              // this.setState({ thread: response.data._id });
              const messages = response.data.messages.map(message => {
                return {
                  ...message,
                  user: {
                    ...message.user,
                    name: message.user.firstName
                  }
                };
              });

              this.setState(
                {
                  messages: messages || this.state.messages,
                  bike: response.data.bike
                },
                () => {
                  this.ws = new WebSocket("ws://https://bicycly.herokuapp.com");
                  this.ws.onmessage = e => {
                    const message = JSON.parse(e.data);
                    if (message.threadId === this.state.thread) {
                      this.setState({
                        messages: GiftedChat.append(
                          this.state.messages,
                          message
                        )
                      });
                    }
                  };
                }
              );
            });
        }
      );
    });
  }

  onSend(messages = []) {
    this.ws.send(
      JSON.stringify({
        text: messages[0].text,
        token: this.state.token,
        // name: "Audrey", //fullName
        // firstName: this.state.params.navigation.firstName,
        thread: this.state.thread //id de la discussion pour savoir cote back à qui appartient ce message
      })
    );
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  renderSend(props) {
    return (
      <Send
        {...props}
        textStyle={{
          color: "#262626",
          paddingVertical: 10,
          paddingHorizontal: 20
        }}
      />
    );
  }

  renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        textStyle={{ color: "#262626", fontFamily: "Karla-Regular" }}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        textStyle={{ right: { color: "#262626" } }}
        wrapperStyle={{
          right: { backgroundColor: "rgb(247, 195, 67)" }
        }}
      />
    );
  }

  render() {
    console.log("state.userId ===>", this.state.userId);
    // console.log("state.messages ===>", this.state.messages);
    // console.log("Have we got a thread ? ===>", this.state.thread);

    return (
      <View style={{ backgroundColor: "#f8f8f8", flex: 1 }}>
        <GiftedChat
          // bottomOffset={81}
          //id du User -b qui recois donc propriétaire
          user={{ _id: this.state.userId }}
          placeholder="Ecrivez votre message..."
          renderSend={this.renderSend}
          isAnimated={true}
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar}
          renderMessageText={props => {
            // console.log("props.currentMessage", props.currentMessage);

            // console.log("render tchat");
            // console.log(props.currentMessage.thread.bike.user);
            // console.log(this.state.userId);

            if (
              props.currentMessage.isRequest === true &&
              this.state.bike.user._id === this.state.userId //User -b Est-ce que je suis le propriétaire du vélo ?
            ) {
              return (
                //la demande de location avec l'acceptation ou le refus
                <React.Fragment>
                  <MessageText {...props} />
                  <View>
                    <CardTchat
                      user={this.state.bike.user.firstName}
                      bikePhoto={this.state.bike.photos[0].secure_url}
                      bike={this.state.bike.bikeBrand}
                      bikeModel={this.state.bike.bikeModel}
                      bikePrice={this.state.bike.pricePerDay}
                    />
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
      </View>
    );
  }
}

export default Tchat;
