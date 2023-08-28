import "reflect-metadata"
import * as express from 'express';
import { userRouter } from "./src/routes/user";
import { loginRouter } from "./src/routes/login";
import { credentialsRouter } from "./src/routes/credentials";
import * as cors from 'cors';

const app = express();
const PORT = 3001;

const consoleMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log({
        url: req.url,
        body: req.body,
        params: req.params,
        queries: req.query
    })

    next();
}

app.use(cors());
app.use(express.json());
app.use(consoleMiddleware)

app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/credentials", credentialsRouter);

app.listen(PORT, () => {
    console.log("Server is running!");
})

