// in MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.toLowerCase().includes('hello')) {
      actions.handleHello();
    }else if (message.toLowerCase().includes('what is this about')) {
        actions.sendMessage('This is a chatbot. How can I assist you?');
  } else if (message.toLowerCase().includes('team')) {
    actions.sendMessage("My creators are Chandan,Amritesh,Saakshi, Vrinda. It is a project for our Hack36 Entry")

  }
  else if (message.toLowerCase().includes('daddy')) {
    actions.sendMessage("Chandan 😜😂")
}
}
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;