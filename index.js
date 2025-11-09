import express from 'express';
import cors from "cors";
import SearchRoutes from './Search/routes.js';

const app = express();
app.use(cors());
app.use(express.json());
SearchRoutes(app);
app.listen(process.env.PORT || 4000);