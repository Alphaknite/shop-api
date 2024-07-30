const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");

const date = `${format(new Date(), "MMM-dd-yyyy\tHH:mm:ss")}`;

const productLog = async (productName, productId) => {
    const log = `${date}\t${productName}\t${productId}\n`;

    try {
        const logsDir = path.resolve(__dirname, "../logs");
        if (!fs.existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir);
        }
        await fsPromises.appendFile(
            path.join(__dirname, "../logs", "Products.txt"),
            log
        );
    } catch (error) {
        console.error(error);
    }
};

const orderLog = async (orderId) => {
    const log = `${date}\t${orderId}\n`;

    try {
        const logsDir = path.resolve(__dirname, "../logs");
        if (!fs.existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir);
        }
        await fsPromises.appendFile(
            path.join(__dirname, "../logs", "Orders.txt"),
            log
        );
    } catch (error) {
        console.error(error);
    }
};

const newUserLog = async (email) => {
    const message = "signed up";
    const log = `${date}\t${email}\t${message}`;

    try {
        const logsDir = path.resolve(__dirname, "../logs");
        if (!fs.existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir);
        }
        await fsPromises.appendFile(
            path.join(__dirname, "../logs", "Users.txt"),
            log
        );
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    productLog,
    orderLog,
    newUserLog,
};
