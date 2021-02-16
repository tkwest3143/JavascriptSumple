import React from "react";
import ChatStore from "../data/chatData";

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      chats: ChatStore.getAll(),
    };
  }

  componentDidMount() {
    ChatStore.on("change", () => {
      this.setState({
        chats: ChatStore.getAll(),
      });
    });
  }

  chatSend() {
    const text = document.getElementById("chat_text").value;
    ChatStore.createChat(text, "aaa");
  }

  render() {
    const { chats } = this.state;
    const ChatComponents = chats.map((chat) => {
      return (
        <div>
          {chat.name}
          {chat.text}
        </div>
      );
    });

    return (
      <div>
        <ul>{ChatComponents}</ul>
        <input type="text" id="chat_text" />
        <button id="send" onClick={this.chatSend.bind(this)}>
          send
        </button>
      </div>
    );
  }
}
