
const helmet = require("helmet")
const AuthRoutes = require("./routes/auth");
const UserRoutes = require("./routes/user");
const express = require('express');
const connectToDB = require("./utils/db");
const cors = require('cors')
const cookieParser = require('cookie-parser');


// Node.js Server
// const http = require('http');
// const server = http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/html'});
// });

// server.listen(3000, () => {
//   console.log('Running');
// });
const dotenv = require("dotenv")
dotenv.config()


const app = express();


// Middleware Stack
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: ["http://localhost:3001", "https://nextjs-auth-sepia.vercel.app"],
  credentials: true,
}));
app.use(cookieParser());

// Connect to The database
connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running`);
});
app.use(AuthRoutes);
app.use(UserRoutes);