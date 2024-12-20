// import winston from "winston"
import moment from "moment";
import fs from "fs";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

const developmentLogger = () => {
    //
    const myFormat = printf(({ level, message, label, timestamp }) => {
        return `[ ${timestamp} ${level} ]: ${message}`;
    });

    const logsFolder = "logs";
    const today = moment();
    fs.readdirSync(logsFolder).forEach(file => {
        const fileDate = moment(file, "DD-MM-YYYY.log");
        if (today.diff(fileDate, "days") > 7) {
            fs.unlinkSync(`${logsFolder}/${file}`);
        }
    });

    return createLogger({
        level: "debug", // abvove this level not running
        format: combine(  // combine method used to combine the formates
            colorize(), // if i write here than it shows color in console but not into the file , if  not write than color shows into the file but not in console , so when use production than dont use colorised 
            timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            // prettyPrint(),

            format.colorize({ all: true }),
            myFormat
        ),
        transports: [
            new transports.Console(), // logs in console
            new transports.File({ filename: `logs/${moment().format("DD-MM-YYYY")}.log` }), // all logs in combined.log file
            // new transports.File({ filename: "error.log", level: "error" }), // only error logs in error.log file
        ],
    })
}

export default developmentLogger;

