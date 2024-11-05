import express, {Request, Response} from "express";
import { AppDataSource } from "./ormconfig.js";
import cors from "cors";
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!"); // eslint-disable-line no-console

       //routes here

        if (process.env.Node_ENV !== "test") {
            app.listen(port, () => {
                console.log(`Server is running at http://localhost:${port}`); // eslint-disable-line no-console
            });
        }
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err); // eslint-disable-line no-console
    });


export default app;