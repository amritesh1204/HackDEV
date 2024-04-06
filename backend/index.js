import chalk from "chalk";
import express from "express";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import cors from "cors";
import bcrypt from "bcrypt";
import userModel from "./models/user.js";
import session from "express-session";
import flash from "express-flash";
import http from 'http'
import path from 'path'
import {Server} from 'socket.io'
import bodyParser from "body-parser";
import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const server=http.createServer(app)
const io=new Server(server)
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'chandan', resave: false, saveUninitialized: false }));
app.use(flash()); // Initialize express-flash

// Configure CORS
const allowedOrigins = ["http://localhost:5173"]; // Update with your frontend URL for other teammates to work 
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies to be sent with requests
}));

const port = 3000;

// Connect to MongoDB
connect('mongodb+srv://Chandan:Chandan123@cluster0.bn1c8mj.mongodb.net/') 
    .then(() => {
        console.log(chalk.cyan(`MongoDB connected`));
    })
    .catch((err) => {
        console.error(chalk.red(`MongoDB connection error: ${err}`));
    });

// User Registration
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, email, password: hashedPassword });

        res.status(200).json({ status: "success", message: "User registered successfully" }); // Add success flash message
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            req.flash("error", "No record found"); // Add error flash message
            return res.json("No record found");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ email: user.email, role: user.role }, "kyu-nahi-ho-rahi-padhai", { expiresIn: "1d" });
            res.cookie('token',token)
            return res.json({ status: "success",role:user.role });
        } else {
            req.flash("error", "Incorrect password"); // Add error flash message
            return res.json("Incorrect password");
        }
    } catch (error) {
        req.flash("error", error.message); // Add error flash message
        res.status(500).json({ error: error.message });
    }
});

// Creating a server for p2

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      // Handle user disconnection
    });
  
    socket.on('fileUpload', ({ roomID, fileData }) => {
      // Broadcast the file to a single user in the specified room
      socket.to(roomID).emit('fileDownload', fileData);
    });
  });



const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.post('/send-message', async (req, res) => {
    const { message, to } = req.body;
  
    try {
      const twilioResponse = await client.messages.create({
        body: message,
        from: '+12564491199', // Your Twilio phone number
        to: to
      });
  
      res.json({ sid: twilioResponse.sid });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });
  




// Start the server
app.listen(port, () => {
    console.log(chalk.bgBlue.whiteBright(`Server is running on port ${port}`));
});
