import 'dotenv/config'
import express from "express";
import connectDB from './DB/db.js';
import userRouter from "./routes/user_Router.js"
import cors from "cors";
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: "POST, GET, PUT, PATCH, DELETE, HEAD",
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));


app.use("/api",userRouter)


// Database Connection
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
.catch((err) => console.error("MongoDB Connection failed: ", err.message));