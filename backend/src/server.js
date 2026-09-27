import 'dotenv/config'
import app from './app.js'
import { 
    connectDB, 
    closeDbConnection } from './features/auth/register/services/database.js'

process.on('uncaughtException', async(err) => {
    console.log('UNCAUGHT EXCEPTION:\n', err);
    await cleanUpResource();
    process.exit(1);
});

process.on('unhandledRejection', async(reason, promise) => {
    console.log('UNHANDLED REJECTION:\n', reason);
    await cleanUpResource()
    process.exit(1);
});

process.on('SIGINT', async() => await shoutdown('SIGINT'));
process.on('SIGTERM', async() => await shoutdown('SIGTERM'));


async function shoutdown(signal){
    console.log(`\n[*] Detect ${signal}:`, 'Shouting application down\n');
    await cleanUpResource();
    process.exit(1);
}

async function cleanUpResource(){
    console.log('[*] Application resource cleaning...')
    await closeDbConnection();
    console.log('[*] Database Closed');
    server.close();
    console.log("[*] Server Closed")
}

const { PORT = 5000 } = process.env;
var server;
export default async function startServer(){
    try{
        console.log('[*] Creating Connections...');
        await connectDB();
        console.log('[*] Database Connected');
        server = app.listen(PORT, () => {
            console.log('[*] Server running on PORT', PORT, '\n');
        })
    } catch (err) {
        console.log('[*] Database Connection Failed');
        console.log('[*] Reason:', err.message || 'No Reason');
        process.exit(1);
    }
};

startServer();