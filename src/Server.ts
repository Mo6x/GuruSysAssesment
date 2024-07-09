import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import session from "express-session";
import { errorHandler } from "./utils/errorHandler";
import allRoutes from "./routes/allRoutes";
import authRoutes from "./routes/authRoutes";
import authMiddleware from "./middleware/authMiddleware";



dotenv.config();
mongoose.set('strictQuery', true);

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(session({
   secret: 'your_secret_key',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false } 
 }));
 
 app.use(errorHandler);
 app.use('/api/auth', authRoutes);
 app.use('/api/posts', authMiddleware, allRoutes); 

const connect = async (): Promise<void> => {
try { await mongoose.connect(process.env.MONGO_URI!);
console.log('Connected to MongoDB');
} catch (error: any) { if (!process.env.MONGO_URI)  
throw new error('MongoDB connection error:', error) }};


const port: string | undefined = process.env.PORT;
if (!port) { process.exit(1) };
app.listen(parseInt(port), async () => { await connect();
console.log(`Server listening on port ${port}`) });
