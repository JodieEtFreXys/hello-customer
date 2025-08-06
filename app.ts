import dotenv from "dotenv"
import express, { Express } from "express"

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`App is running in port: `, port);
})