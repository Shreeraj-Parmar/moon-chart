import xlsx from "xlsx";
import moment from "moment";



const getDataFromExcle = () => {
    const workbook = xlsx.readFile("DB.xlsx");

    const sheetName = workbook.SheetNames[0];
    // console.log(sheetName);

    const worksheet = workbook.Sheets[sheetName];
    // console.log(worksheet);
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Function to convert Excel date serial number to JavaScript Date
    function excelDateToJSDate(serial) {
        const excelEpoch = new Date(1900, 0, 1); // January 1, 1900
        const convertedDate = new Date(excelEpoch.getTime() + (serial - 2) * 24 * 60 * 60 * 1000); // Adjusting for Excel bug
        return convertedDate;
    }

    // Convert and add formatted date to each object in the array
    const formattedData = jsonData.map(row => {
        if (row.Day) {
            row.when = moment(excelDateToJSDate(row.Day)).format('DD/MM/YYYY');
        }
        return row;
    });

    // Output the result
    // console.log(formattedData);

    return formattedData;
}

export default getDataFromExcle