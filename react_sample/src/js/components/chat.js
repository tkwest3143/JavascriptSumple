import React from "react";

export default class Chat extends React.Component {
  render() {
    return (
      <div>
        <input type="text" id="chat_text" />
        <button id="send" />
      </div>
    );
  }
}
