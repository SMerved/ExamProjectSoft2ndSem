import app from "./index.ts";
import 'reflect-metadata';

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`); // eslint-disable-line no-console
});