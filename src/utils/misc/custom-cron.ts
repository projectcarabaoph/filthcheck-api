import { CronJob } from 'cron'
import https from 'https'
import dotenv from 'dotenv'

dotenv.config()

const { BACKEND_URL } = process.env

const customCron = new CronJob('*/14 * * * *', function () {
    console.log('Restarting server in 14 minutes');

    https.get(BACKEND_URL as string, (res) => {
        if (res.statusCode === 200) {
            console.log('Server restarted successfully');
        } else {
            console.error('Failed to restart server with the status code:', res.statusCode);
        }
    }).on('error', (error) => {
        console.error('Error restarting server:', error.message);
    });
})

export default customCron