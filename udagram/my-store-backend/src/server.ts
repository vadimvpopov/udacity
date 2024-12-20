import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import router from './routes/index';
import cors from 'cors';
//import { sequelize } from "./sequelize";

/*
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }

    await sequelize.sync();

})();
*/
const app: express.Application = express();
const port = 8080;
const address: string = `0.0.0.0:${port}`;

app.use(bodyParser.json())
//const cors = require('cors')
app.use(cors());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
});
app.use('/api', router);

app.listen(port, function () {
    console.log(`starting  app on: ${address}`)
})

export default app;



