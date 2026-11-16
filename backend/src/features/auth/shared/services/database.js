import mongoose from 'mongoose'

const { 
    MONGO_URL, 
    TASKFLOW_DB_NAME, 
    TASKFLOW_DB_APP_NAME } = process.env;

mongoose.set('transactionAsyncLocalStorage', true);
export const dbConnection = mongoose.createConnection(MONGO_URL, {
    dbName: TASKFLOW_DB_NAME,
    appName: TASKFLOW_DB_APP_NAME
});

export const connectDB = async() => await dbConnection.asPromise();

export const dbTransaction = callback => dbConnection.transaction(callback);

export const getConnectionState = () => dbConnection.readyState;
export const dbIsConnected = () => getConnectionState() === 1;
export const dbIsDisconnected = () => getConnectionState() === 0;
export const dbIsConnecting = () => getConnectionState() === 3;
export const dbIsDisconnecting = () => getConnectionState() === 4;
export const closeDbConnection = async() => await dbConnection.close();