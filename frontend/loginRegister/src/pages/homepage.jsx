import React from 'react'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import Navbar from './navbar'
import Layout from './layout'
import '../styles/homepage.css'
import ActionProvider from './Actionprovider' 
import MessageParser from './Messageparser'
import config from './config';
export default function homepage() {
  return (
    <>
    <Layout>
      <div className='chatbot'>
    <Chatbot 
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
      </div>
    </Layout>
    </>
  )
}
