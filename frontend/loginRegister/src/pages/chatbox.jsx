// ChatBox.jsx
import React, { Component } from 'react';
import '../styles/Chatbox.css'; // Make sure this path is correct

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { inputMsg } = this.state;
    if (inputMsg.trim() !== '') {
      this.props.onSend(inputMsg);
      this.setState({ inputMsg: '' });
    }
  };

  render() {
    const { inputMsg } = this.state;
    return (
      <div className="chatbox-container">
        <div className="messages-section">
          {this.props.chatLog.map((message, index) => (
            <div key={index} className="message">
              {message.name}: {message.message}
            </div>
          ))}
        </div>
        <form className="message-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={inputMsg}
            onChange={e => this.setState({ inputMsg: e.target.value })}
            className="message-input"
            placeholder="Type a message..."
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default ChatBox;
