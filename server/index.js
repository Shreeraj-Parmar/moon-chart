import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import logger from "./logger/index.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./routes/route.js";

const app = express();
app.use(cors());
configDotenv();

const morganFormat = ":method --- :url --- :status --- :response-time ms";
app.use(morgan(morganFormat, {
    stream: {
        write: (message) => logger.info(JSON.stringify(message))
    }
}), (req, res, next) => {
    console.log("morgan is working");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use("/", router);


// app.get("/api", (req, res) => {
//     res.status(200).json({ allData: "this is dat   dda" })
// })

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})