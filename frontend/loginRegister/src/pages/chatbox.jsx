import React, { Component } from 'react';
import '../styles/Chatbox.css'; // Import CSS file

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg: ''
    };
  }

  generateChats = () => {
    const { chatLog } = this.props;
    if (!chatLog || chatLog.length === 0) {
      return (
        <div className="info">
          <p>To test this component out, open this page in a new tab or send it to a friend.</p>
        </div>
      );
    }

    return chatLog.map((item) => (
      <div className="chat" key={`chat-${item.name}-${item.timestamp}`}>
        <span className="name">{item.name}:</span> <span className="msg">{item.message}</span>
      </div>
    ));
  }

  handleSend = () => {
    const { inputMsg } = this.state;
    if (inputMsg.trim() !== '') {
      this.props.onSend(inputMsg);
      this.setState({ inputMsg: '' });
    }
  }

  handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSend();
    }
  }

  handleInputChange = (evt) => this.setState({ inputMsg: evt.target.value });

  render() {
    return (
      <div className="container">
        <div className="chatHeader">
          <h1 className="title">P2P Chat Example</h1>
        </div>
        <div className="chatBox">
          {this.generateChats()}
        </div>
        <div className="bottomBar">
          <input
            className="chatInput"
            type="text"
            placeholder="Type a message..."
            value={this.state.inputMsg}
            onChange={this.handleInputChange}
            onKeyUp={this.handleKeyUp}
          />
          <button className="sendButton" onClick={this.handleSend}>Send</button>
        </div>
      </div>
    );
  }
}

export default ChatBox;
