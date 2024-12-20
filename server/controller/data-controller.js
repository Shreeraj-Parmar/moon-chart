
import getDataFromExcle from "../utils/all-data.js";
import logger from "../logger/index.js";
import moment from "moment";



const filterDataAccCustomDateRange = (data, startDate, endDate) => {

    if (startDate && endDate) {
        return data.filter(data => {
            let day = moment(data.when, "DD/MM/YYYY").toDate();
            // console.log(day);
            let dayDateInMilliseconds = moment(day).valueOf();
            // console.log(dayDateInMilliseconds);
            let startDateInMilliseconds = moment(startDate, "DD/MM/YYYY").valueOf();
            let endDateInMilliseconds = moment(endDate, "DD/MM/YYYY").valueOf();
            return dayDateInMilliseconds >= startDateInMilliseconds && dayDateInMilliseconds <= endDateInMilliseconds;
        });
    }
}


const filterForBarChart = (data) => {
    let totalCounts = data.reduce((totals, item) => {
        totals.A += item.A || 0;
        totals.B += item.B || 0;
        totals.C += item.C || 0;
        totals.D += item.D || 0;
        totals.E += item.E || 0;
        totals.F += item.F || 0;
        return totals;
    }, { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 });

    let result = Object.entries(totalCounts).map(([key, value]) => ({ "feature": key, "count": value }));

    return result;
}



export const sendAllData = async (req, res) => {
    const { active } = req.query;
    let todayDate = moment("16/12/2024", "DD/MM/YYYY").format("DD/MM/YYYY"); // set 16/12/2024 as today
    console.log(todayDate);
    let data = getDataFromExcle();
    let newFiltredData = [];

    if (active === "Today") {
        newFiltredData = filterDataAccCustomDateRange(data, todayDate, todayDate);
    } else if (active === "Yesterday") {
        let yesterday = moment(todayDate, "DD/MM/YYYY").subtract(1, 'days').format("DD/MM/YYYY");
        console.log(yesterday);
        newFiltredData = filterDataAccCustomDateRange(data, yesterday, yesterday);
    } else if (active === "Last 7 Days") {
        let last7Days = moment(todayDate, "DD/MM/YYYY").subtract(7, 'days').format("DD/MM/YYYY");
        newFiltredData = filterDataAccCustomDateRange(data, last7Days, todayDate);
    } else if (active === "This Month") {
        let thisMonth = moment(todayDate, "DD/MM/YYYY").startOf('month').format("DD/MM/YYYY");
        // console.log(thisMonth)   
        newFiltredData = filterDataAccCustomDateRange(data, thisMonth, todayDate);
    } else if (active === "Custom Date") {
        let { startDate, endDate } = req.query;
        newFiltredData = filterDataAccCustomDateRange(data, startDate, endDate);
    }
    // console.log(newFiltredData);

    const result = filterForBarChart(newFiltredData);
    // console.log(result);
    logger.info(result);

    res.status(200).json({ barData: result });




}
