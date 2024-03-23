/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const {
    exit,
} = require('process');


const dbUrl = 'mongodb+srv://kumard312:ShpOgVhwZHiHuxjn@cluster0.hjqcmpq.mongodb.net/lms_dev?retryWrites=true&w=majority';


// Connect to MongoDB using Mongoose
mongoose.connect(dbUrl);

// Get the default connection
const dbConn = mongoose.connection;

// Event handling for successful connection
dbConn.on('connected', () => {
  console.log(`Connected to MongoDB at ${dbUrl}`);
});

// Event handling for connection error
dbConn.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});

// Event handling for disconnection
dbConn.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// let dbConn = {};
// if (process.env.MONGO_CONN_STRING && process.env.MONGO_DB_NAME && process.env.MONGO_AUTH_SOURCE) {
//     dbConn = mongoose.createConnection(
//         `${process.env.MONGO_CONN_STRING}${process.env.MONGO_DB_NAME}?authSource=${process.env.MONGO_AUTH_SOURCE}`, {
//             useCreateIndex: true,
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//         },
//     );
// } else {
//     console.log('ERROR: DB CONNECTION NOT INITIALISED');
// }

function closeDbConn() {
    dbConn.close(() => {
        console.log('Closing mongo connection and exiting process');
        process.exit(0);
    });
}

module.exports = {
    dbConn,
    closeDbConn,
};