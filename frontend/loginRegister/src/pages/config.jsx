import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import '../styles/bot.css'

const botName = 'Helper';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  header: () => <div style={{ backgroundColor: 'red', padding: "5px", borderRadius: "3px" }}>This is the header</div>,
  botAvatar: (props) => <MyAvatar {...props} />, // Replaces the default bot avatar
  botChatMessage: (props) => <MyCustomChatMessage {...props} />, // Replaces the default bot chat message container
  userAvatar: (props) => <MyCustomAvatar {...props} />, // Replaces the default user icon
  userChatMessage: (props) => <MyCustomUserChatMessage {...props} />, // Replaces the default user chat message
};

export default config;
