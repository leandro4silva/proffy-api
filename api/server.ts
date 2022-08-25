import express from 'express'
import routes from './routes';
import cors from 'cors'
import config from './config'

const app = express();


app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(config.server.port, () => {
    return console.log(`[server]: Server is running on ${config.server.port}`);
});